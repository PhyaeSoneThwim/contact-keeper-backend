const express = require("express");
const authController = require("../controllers/authController");
const { uploadProfile } = require("../middlewares/upload");
const { resizeProfile } = require("../middlewares/resize");
const router = express.Router();

router.post("/register", uploadProfile, resizeProfile, authController.register);
router.post("/login", authController.login);

module.exports = router;
