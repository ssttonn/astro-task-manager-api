const express = require("express")
const taskController = require("../controllers/taskController")

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.get("/", taskController.getAllTasks)

router.get("/:taskId", taskController.getTaskById)

router.post("/create", taskController.createTask)

router.put("/:taskId", taskController.updateTask)

module.exports = router