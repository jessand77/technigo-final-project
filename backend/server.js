/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';

// Delete this later when the data from MongoDB works?
import marathons from './data/marathons.json';
import Marathon from './models/marathon';
import User from './models/user';

// Delete these imports, cant make it work properly
import marathonRoutes from './routes/marathon-routes';
import userRoutes from './routes/user-routes';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/finalProjectApi';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: 'Service unavailable' });
  }
});

app.use('/', marathonRoutes, userRoutes);

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

app.get('/secret', (req, res) => {
  res.send(process.env.SECRET_KEY);
});

// Gets the races from internal json file
app.get('/marathons', (req, res) => {
  res.status(200).json({
    marathons: marathons,
  });
});

// Gets the races from MongoDB
app.get('/allmarathons', async (req, res) => {
  try {
    const allmarathons = await Marathon.find().exec();
    res.status(200).json(allmarathons);
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
});

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
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: 'The username already exists',
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

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');
  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'Please log in'
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid request',
      error
    })
  }
}

app.get('/users', authenticateUser)
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

app.get('/marathons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const marathon = await Marathon.findById(id);
      res.status(200).json({
        success: true,
        response: marathon.name
      })
    } else {
      res.status(404).json({
        success: false,
        response: 'No marathon with that id was found'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: 'Invalid request'
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
