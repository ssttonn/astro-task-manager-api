const express = require('express');

const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")
const taskRoutes = require("./taskRoutes");
const profileRoutes = require("./profileRoutes")
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

router.use("/auth", authRoutes)

router.use(authMiddleware)
router.use("/users", userRoutes)
router.use("/tasks", taskRoutes)
router.use("/profile", profileRoutes)

module.exports = router