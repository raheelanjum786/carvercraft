const express = require("express");
const {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductbyId,
} = require("../Controllers/productController.js");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/get", getAllProducts);
router.post("/add", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);
router.get("/get/:id", getProductbyId);
module.exports = router;
