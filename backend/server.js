/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import listEndpoints from 'express-list-endpoints';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/finalProjectApi';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// ------------ SCHEMAS AND MODELS -------------

const { Schema } = mongoose;

// ------------ MARATHON SCHEMA AND MODEL -------------
const marathonSchema = new Schema({
	name: String,
	city: String,
	lat: Number,
	lon: Number,
	country: String,
	website: String,
	image: String,
});

const Marathon = mongoose.model('Marathon', marathonSchema);

// ------------ USER SCHEMA AND MODEL -------------
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 20,
	},
	password: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
	marathons: [
		{
			type: Schema.Types.ObjectId,
			default: [],
			ref: 'Marathon',
		},
	],
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

// if (process.env.RESET_DB) {
// 	console.log('Resetting database');
// 	const seedDatabase = async () => {
// 		await User.deleteMany();
// 	};
// 	seedDatabase();
// }

app.use((req, res, next) => {
	if (mongoose.connection.readyState === 1) {
		next();
	} else {
		res.status(503).json({ error: 'Service unavailable' });
	}
});

app.get('/', (req, res) => {
	res.send(listEndpoints(app));
});

// Gets the races from MongoDB
app.get('/marathons', async (req, res) => {
	try {
		const allmarathons = await Marathon.find().exec();
		res.status(200).json(allmarathons);
	} catch (err) {
		res.status(400).json({
			error: err.errors,
		});
	}
});

app.get('/marathons/:id', async (req, res) => {
	const { id } = req.params;
	try {
		if (id) {
			const marathon = await Marathon.findById(id);
			res.status(200).json({
				success: true,
				response: marathon,
			});
		} else {
			res.status(404).json({
				success: false,
				response: 'No marathon with that id was found',
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			response: 'Invalid request',
		});
	}
});

// ---------- Register endpoint ----------
app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();

		const newUser = await new User({
			username: username,
			password: bcrypt.hashSync(password, salt),
		}).save();

		res.status(201).json({
			success: true,
			userId: newUser._id,
			username: newUser.username,
			accessToken: newUser.accessToken,
			userSince: newUser.createdAt,
			marathons: newUser.marathons,
		});
	} catch (error) {
		if (error.errors.username.kind === 'unique') {
			res.status(400).json({
				success: false,
				message: 'The username already exists',
			});
		} else if (error.errors.username.kind === 'minlength') {
			res.status(400).json({
				success: false,
				message: 'The username is too short',
			});
		} else if (error.errors.username.kind === 'maxlength') {
			res.status(400).json({
				success: false,
				message: 'The username is too long',
			});
		} else {
			res.status(400).json({
				success: false,
				message: 'Something went wrong, please try again',
				error,
			});
		}
	}
});

// ------------ Login endpoint ------------
app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username: username });
		if (user && bcrypt.compareSync(password, user.password)) {
			res.json({
				success: true,
				userId: user._id,
				username: user.username,
				accessToken: user.accessToken,
				userSince: user.createdAt,
				marathons: user.marathons,
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Username and password don't match",
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Something went wrong, please try again',
			error,
		});
	}
});

// Check if the accesstoken is valid
const authenticateUser = async (req, res, next) => {
	const accessToken = req.header('Authorization');
	try {
		const user = await User.findOne({ accessToken: accessToken });
		if (user) {
			next();
		} else {
			res.status(401).json({
				success: false,
				message: 'Please log in',
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: 'Invalid request',
			error,
		});
	}
};

// ---------- Authenticated endpoint to get all users ----------
app.get('/users', authenticateUser);
app.get('/users', async (req, res) => {
	try {
		const allUsers = await User.find().exec();
		res.status(200).json(allUsers);
	} catch (err) {
		res.status(400).json({
			error: err.errors,
		});
	}
});

// --------- Get all marathons of a specific user ------------
app.get('/users/:userId/marathons', async (req, res) => {
	const { userId } = req.params;
	try {
		if (userId) {
			const user = await User.findById(userId).populate('marathons');

			res.status(200).json({
				success: true,
				response: {
					user: user.username,
					marathons: user.marathons,
				},
			});
		} else {
			res.status(404).json({
				success: false,
				response: 'No user with that id was found',
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			response: 'Invalid request',
		});
	}
});

// --------- Add marathons to a user -----------
app.patch('/users/:userId/addMarathon', async (req, res) => {
	const { userId } = req.params;
	const { marathonId } = req.body;

	try {
		const marathonToAdd = await Marathon.findById(marathonId);
		const user = await User.findById(userId);

		const isAlreadyInList = user.marathons.includes(marathonToAdd._id);

		if (userId && !isAlreadyInList) {
			await User.findByIdAndUpdate(userId, {
				$push: {
					marathons: marathonId,
				},
			});

			const user = await User.findById(userId);
			const marathon = await Marathon.findById(marathonId).populate('name');

			res.status(200).json({
				success: true,
				response: `${marathon.name} added to user with username ${user.username}`,
			});
		} else if (userId && isAlreadyInList) {
			res.status(400).json({
				success: false,
				response: 'The marathon is already in your list',
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			response: 'Something went wrong',
		});
	}
});

// --------- Delete marathons from a user ---------
app.patch('/users/:userId/deleteMarathon', async (req, res) => {
	const { userId } = req.params;
	const { marathonId } = req.body;

	try {
		const marathonToDelete = await Marathon.findById(marathonId);
		const user = await User.findById(userId);

		const isInList = user.marathons.includes(marathonToDelete._id);

		if (userId && !isInList) {
			res.status(400).json({
				success: false,
				response: 'The marathon is not in your list',
			});
		} else if (userId && isInList) {
			await User.findByIdAndUpdate(userId, {
				$pull: {
					marathons: marathonId,
				},
			});

			const user = await User.findById(userId);
			const marathon = await Marathon.findById(marathonId).populate('name');

			res.status(200).json({
				success: true,
				response: `${marathon.name} deleted from user with username ${user.username}`,
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			response: 'Something went wrong',
		});
	}
});

// ----------- Delete user account ------------
app.delete('/users/:userId', authenticateUser);
app.delete('/users/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		await User.deleteOne({ _id: userId });
		res.status(200).json({
			success: true,
			response: `User with user id ${userId} was successfully deleted.`,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			response: "Something went wrong, couldn't delete user account",
			error,
		});
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
