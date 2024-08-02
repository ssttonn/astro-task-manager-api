const Task = require("../models/task")
const Response = require("../utils/responseHandler")
const HttpError = require("../utils/httpError")

exports.getAllTasks = async (_, res, next) => {
    try {
        const tasks = await Task.find().select(['-__v']).exec()
        return Response.success(res, 200, tasks)
    } catch (e) {
        return next(e)
    }
}

exports.getTaskById = async (req, res, next) => {
    let taskId = req.params.taskId;
    if (!taskId) {
        throw new HttpError(400, "Task ID is required")
    }

    try {
        let task;
        try {
            task = await Task.findById(taskId).select(['-__v']).exec()
        } catch (e) {
            throw new HttpError(400, "Task not found")
        }

        if (!task) {
            throw new HttpError(404, "Task not found")
        }

        return Response.success(res, 200, task)
    } catch (e) {
       return next(e)
    }
}

exports.createTask = async (req, res, next) => {
    const task = new Task(req.body)
    try {
        try {
            await task.save()
        } catch (e) {
            throw new HttpError(400, e.message, e.errors)
        }
        return Response.success(res, 201, task)
    } catch (e) {
        return next(e)
    }
}

exports.updateTask = async (req, res, next) => {
    let taskId = req.params.taskId;
    if (!taskId) {
        throw new HttpError(400, "Task ID is required")
    }

    try {
        let task;
        try {
            task = await Task.findById(taskId).exec()
        } catch (e) {
            throw new HttpError(400, "Task not found")
        }

        if (!task) {
            throw new HttpError(404, "Task not found")
        }

        task.set(req.body)

        try {
            await task.save()
        } catch (e) {
            throw new HttpError(400, e.message, e.errors)
        }

        return Response.success(res, 200, task)
    } catch (e) {
        return next(e)
    }
}