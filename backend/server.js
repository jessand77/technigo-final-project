import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";

import marathons from "./data/marathons.json"

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get('/marathons', (req, res) => {
  res.status(200).json({
    marathons: marathons,
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
