const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const protect = require("../middlewares/protect");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.use(protect);
router.get("/get-me", userController.getMe);
module.exports = router;
