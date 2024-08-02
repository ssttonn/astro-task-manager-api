const mongoose = require("mongoose")
const User = require("../models/user")

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true
  }
});

module.exports = Task;
