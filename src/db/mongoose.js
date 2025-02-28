const mongoose = require("mongoose");

require("dotenv").config();

const connectionURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sttonn-cluster0.ebbfsbd.mongodb.net/astro-task-manager`;

mongoose.connect(connectionURL).then(async (_) => {
  console.log("MongoDB connected")
});
