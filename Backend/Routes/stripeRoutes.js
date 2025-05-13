const express = require("express");
const router = express.Router();
const stripeController = require("../Controllers/stripeController");

// Create a payment intent
router.post("/create-payment-intent", stripeController.createPaymentIntent);

// Handle webhook events
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeController.handleWebhook
);

module.exports = router;
