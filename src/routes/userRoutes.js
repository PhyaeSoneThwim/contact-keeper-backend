const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { uploadProfile } = require("../middlewares/upload");
const { resizeProfile } = require("../middlewares/resize");
const protect = require("../middlewares/protect");
const router = express.Router();

router.post("/register", uploadProfile, resizeProfile, authController.register);
router.post("/login", authController.login);

router.use(protect);
router.get("/get-me", userController.getMe);
router.patch(
  "/update-me",
  uploadProfile,
  resizeProfile,
  userController.updateMe
);
module.exports = router;
