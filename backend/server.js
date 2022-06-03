/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
// import crypto from 'crypto';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';

dotenv.config();

// Delete this later when the data from MongoDB works?
import marathons from './data/marathons.json';
import { Marathon } from './models/marathon';
import User from './models/user';

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

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username: username,
      password: bcrypt.hashSync(password, salt)
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
      res.status(409).json({ success: false, message: 'The username already exists' });
    } else {
      res.status(400).json({ success: false, message: 'Something went wrong, please try again', error })
    }
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
