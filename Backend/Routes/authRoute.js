const express = require("express");
const { authController } = require("../Controllers/authController.js");
const { isAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyotp);
router.post("/reset-password", authController.resetPassword);
router.get("/get-users", isAdmin, authController.getAllUsers);

module.exports = router;
