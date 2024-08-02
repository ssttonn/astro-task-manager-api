const express = require("express")
const profileController = require("../controllers/profileController")
const router = express.Router()

router.get("/me", profileController.getProfile)

router.use(express.urlencoded({ extended: true }))
router.patch("/me", profileController.updateProfile)

module.exports = router