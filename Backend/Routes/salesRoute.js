const express = require("express");
const router = express.Router();
const salesController = require("../Controllers/salesController");
const { isAdmin } = require("../middleware/authMiddleware");

// Get sales overview data (protected for admin only)
router.get("/overview", isAdmin, salesController.getSalesOverview);

// Create a new sale record (protected for admin only)
router.post("/create", isAdmin, salesController.createSale);

// Get monthly sales report (protected for admin only)
router.get(
  "/report/:month/:year",
  isAdmin,
  salesController.getMonthlySalesReport
);

module.exports = router;
