const jwt = require("jsonwebtoken")
require("dotenv").config()

const secretKey = process.env.JWT_SECRET_KEY
const refreshTokenKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "2d"})
}

exports.generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenKey, { expiresIn: "7d" })
}

exports.verifyAccessToken = (token) => {
    return jwt.verify(token, secretKey)
}

exports.verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshTokenKey)
}