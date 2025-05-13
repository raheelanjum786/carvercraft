const express = require("express");
const router = express.Router();
const cardTypeController = require("../Controllers/cardTypeController");
const { isAdmin } = require("../middleware/authMiddleware");

// Public routes
router.get("/getAll", cardTypeController.getAllCardTypes);
router.get("/:id", cardTypeController.getCardType);

// Admin only routes
router.post("/create", isAdmin, cardTypeController.createCardType);
router.put("/update/:id", isAdmin, cardTypeController.updateCardType);
router.delete("/:id", isAdmin, cardTypeController.deleteCardType);

module.exports = router;