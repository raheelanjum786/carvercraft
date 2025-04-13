// routes/newsletterRoutes.js
const express = require("express");
const {
  subscribeToNewsletter,
  getSubscribers,
  sendNewsletter,
  unsubscribeFromNewsletter,
  getNewsletterLogs,
} = require("../Controllers/subscriptionController");
const router = express.Router();

router.post("/subscribe", subscribeToNewsletter);
router.get("/subscribers", getSubscribers);
router.post("/send-newsletter", sendNewsletter);
router.post("/unsubscribe", unsubscribeFromNewsletter);
router.get("/logs", getNewsletterLogs);

module.exports = router;
