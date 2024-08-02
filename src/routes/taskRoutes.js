const express = require("express")
const taskController = require("../controllers/taskController")

const router = express.Router()

router.get("/", taskController.getAllTasks)

router.get("/:taskId", taskController.getTaskById)

router.use(express.urlencoded({ extended: true }))

router.post("/create", taskController.createTask)

router.patch("/:taskId", taskController.updateTask)

module.exports = router