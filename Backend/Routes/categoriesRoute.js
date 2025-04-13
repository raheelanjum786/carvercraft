const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoriesController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
// const {
//   authenticateUser,
//   authorizeAdmin,
// } = require("../middleware/authMiddleware");

// Public routes
router.get("/get", getAllCategories);

// Protected admin routes
// authenticateUser, authorizeAdmin,
router.post("/add", isAdmin, createCategory);
router.put("/:id", isAdmin, updateCategory);
router.delete("/:id", isAdmin, deleteCategory);

module.exports = router;
