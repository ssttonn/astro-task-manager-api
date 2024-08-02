const User = require("../models/user")
const HttpError = require("../utils/httpError")
const Response = require("../utils/responseHandler")
const { ObjectId } = require("mongoose").Types

exports.getAllUsers = async (_, res, next) => {
    try {
        const users = await User.find().select(['-password', '-__v']).exec()
        return Response.success(res, 200, users)
    } catch (e) {
        return next(e)
    }
}

exports.getUserById = async (req, res, next) => {
    let userId = req.params.userId;
    if (!userId) {
        throw new HttpError(400, "User ID is required")
    }

    try {
        let user;
        try {
            user = await User.findOne(ObjectId.createFromHexString(userId)).select(['-password', '-__v']).exec()
        } catch (e) {
            throw new HttpError(400, "User not found")
        }

        if (!user) {
            throw new HttpError(404, "User not found")
        }

        return Response.success(res, 200, user)
    } catch (e) {
        return next(e)
    }
}
