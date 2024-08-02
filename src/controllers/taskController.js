const Task = require("../models/task");
const Response = require("../utils/responseHandler");
const HttpError = require("../utils/httpError");

exports.getAllTasks = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const tasks = await Task.find({ creator: id }).populate("creator", ["-password", "-__v"]).select(["-__v"]).exec();
    return Response.success(res, 200, tasks);
  } catch (e) {
    return next(e);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    let taskId = req.params.taskId;
    if (!taskId) {
      throw new HttpError(400, "Task ID is required");
    }

    const { id } = req.userInfo;

    let task;
    try {
      task = await Task.findOne({ _id: taskId, creator: id }).populate("creator", ["-password", "-__v"]).select(["-__v"]).exec();
    } catch (e) {
      throw new HttpError(400, "Task not found");
    }

    if (!task) {
      throw new HttpError(404, "Task not found");
    }

    return Response.success(res, 200, task);
  } catch (e) {
    return next(e);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const task = new Task({
      ...req.body,
      creator: id,
    });

    try {
      await task.save();
    } catch (e) {
      throw new HttpError(400, e.message, e.errors);
    }
    return Response.success(res, 201, task);
  } catch (e) {
    return next(e);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    let taskId = req.params.taskId;
    if (!taskId) {
      throw new HttpError(400, "Task ID is required");
    }

    const { id } = req.userInfo;

    let task;
    try {
      task = await Task.findOne({ _id: taskId, creator: id }).populate("creator", ["-password", "-__v"]).select("-__v").exec();
    } catch (e) {
      throw new HttpError(400, "Task not found");
    }

    if (!task) {
      throw new HttpError(404, "Task not found");
    }

    task.set(req.body);

    try {
      await task.save();
    } catch (e) {
      throw new HttpError(400, e.message, e.errors);
    }

    return Response.success(res, 200, task);
  } catch (e) {
    return next(e);
  }
};
