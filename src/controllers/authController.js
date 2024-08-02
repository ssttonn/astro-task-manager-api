
const User = require('../models/user')
const Response = require('../utils/responseHandler')
const {generateAccessToken, generateRefreshToken} = require('../utils/jwt')
const {validatePassword} = require('../utils/validators')
const bcrypt = require('bcryptjs')
const HttpError = require('../utils/httpError')

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new HttpError(400, 'Email and password are required')
        }

        const passwordError = validatePassword(password)

        if (passwordError) {
            throw new HttpError(400, passwordError.message)
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        const existingUser = await User.findOne({ email }).exec()

        if (existingUser) {
            throw new HttpError(409, 'User already exists')
        }

        const user = new User({ ...req.body, password: hashedPassword })
        
        try {
            await user.save()
        } catch (e) {
            console.log(e)
            throw new HttpError(400, e.message, e.errors)
        }

        const { _id } = user

        const accessToken = generateAccessToken({ id: _id, email })
        const refreshToken = generateRefreshToken({ id: _id, email })
        const now = new Date()

        // Expires after 2 days
        const expiresIn = now.setDate(now.getDate() + 2)
        
        return Response.success(res, 201, {
            "accessToken": accessToken,
            "refreshToken": refreshToken,
            "expiresIn": expiresIn
        })
    } catch (e) {
        return next(e)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User
            .findOne({ email })
            .select('+password')
            .exec()

        if (!user) {
            throw new HttpError(404, 'User not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new HttpError(401, 'Invalid credentials')
        }

        const { _id } = user

        const accessToken = generateAccessToken({ id: _id, email })
        const refreshToken = generateRefreshToken({ id: _id, email })
        const now = new Date()

        // Expires after 2 days
        const expiresIn = now.setDate(now.getDate() + 2)

        return Response.success(res, 200, {
            "accessToken": accessToken,
            "refreshToken": refreshToken,
            "expiresIn": expiresIn
        })
    }
    catch (e) {
        return next(e)
    }
}