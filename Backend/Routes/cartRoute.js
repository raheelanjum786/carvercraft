const express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
} = require("../Controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.delete("/remove/:cartItemId", removeFromCart);
router.put("/update", updateQuantity);
router.delete("/clear/:userId", clearCart);

module.exports = router;
