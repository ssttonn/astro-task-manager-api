const User = require("../models/user")
const Response = require("../utils/responseHandler")
const HttpError = require("../utils/httpError")

exports.getProfile = async (req, res, next) => {
    try {
        const {id} = req.userInfo
        
        const me = await User.findById(id).select(["-password", "-__v"]).exec()

        if (!me) {
            throw new HttpError(404, "User not found")
        }

        return Response.success(res, 200, me)
    } catch(e) {
        return next(e)
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ["name", "password"]

        const isValidOperation = updates.every(update => allowedUpdates.includes(update))

        if (!isValidOperation) {
            throw new HttpError(400, "Invalid updates")
        }

        const {id} = req.userInfo

        const updateBody = req.body

        const me = await User.findById(id).select(["-password", "-__v"]).exec()

        if (!me) {
            throw new HttpError(404, "User not found")
        }

        me.set({
            ...me,
            ...updateBody
        })

        try {
            await me.save()
        } catch (e) {
            throw new HttpError(400, e.message, e.errors)
        }

        return Response.success(res, 200, me)
    } catch (e) {
        return next(e)
    }
}