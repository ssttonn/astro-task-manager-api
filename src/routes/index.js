const express = require('express');

const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")
const taskRoutes = require("./taskRoutes");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

router.use("/auth", authRoutes)

router.use(authMiddleware)
router.use("/users", userRoutes)
router.use("/tasks", taskRoutes)

module.exports = router