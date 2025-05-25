const express = require("express");
const router = express.Router();
const adminSettingsController = require("../Controllers/adminSettingsController");
const { isAdmin } = require("../middleware/authMiddleware");

// Change password route (admin only)
router.post(
  "/change-password",
  isAdmin,
  adminSettingsController.changePassword
);

// Add new admin route (admin only)
router.post("/add-admin", isAdmin, adminSettingsController.addNewAdmin);

// Get all admins route (admin only)
router.get("/admins", isAdmin, adminSettingsController.getAllAdmins);

module.exports = router;
