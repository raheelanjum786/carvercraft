const express = require("express");
const {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductbyId,
  addProductReview,
  getRelatedProducts,
} = require("../Controllers/productController.js");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Public routes
router.get("/get", getAllProducts);
router.get("/get/:id", getProductbyId);
router.get("/related/:categoryId", getRelatedProducts);

// Protected routes
router.post("/add", isAdmin, createProduct);
router.put("/update/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

// User routes (require authentication but not admin)
router.post("/:id/reviews", authMiddleware, addProductReview);

module.exports = router;
