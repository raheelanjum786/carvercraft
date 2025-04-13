const express = require("express");
const {
  getProductOrders,
  getProductOrderById,
  updateProductOrderStatus,
  createProductOrder,
} = require("../Controllers/productOrderController");

const router = express.Router();

// Get all orders
router.get("/getAll", getProductOrders);

//create order
router.post("/create", createProductOrder);

// Get a specific order by ID
router.get("/:id", getProductOrderById);

// Update order status
router.patch("/:id/status", updateProductOrderStatus);

module.exports = router;
