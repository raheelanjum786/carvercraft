const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoriesController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// Public routes
router.get("/get", getAllCategories);

// Protected admin routes
router.post("/add", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
