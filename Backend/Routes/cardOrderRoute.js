const express = require("express");
const router = express.Router();
const cardOrderController = require("../Controllers/cardOrderController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// User routes (protected)
router.post("/create", authMiddleware, cardOrderController.createCardOrder);
router.get("/user", authMiddleware, cardOrderController.getUserCardOrders);
router.get("/:id", authMiddleware, cardOrderController.getCardOrder);
router.post("/:id/cancel", authMiddleware, cardOrderController.cancelCardOrder);

// Admin routes
router.get(
  "/admin/all",
  authMiddleware,
  isAdmin,
  cardOrderController.getAllCardOrders
);
router.patch(
  "/:id/status",
  authMiddleware,
  isAdmin,
  cardOrderController.updateCardOrderStatus
);

module.exports = router;
