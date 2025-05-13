const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = {
  // Create a payment intent
  createPaymentIntent: async (req, res) => {
    try {
      const { amount, orderId, customerEmail, metadata } = req.body;

      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "inr",
        payment_method_types: ["card"],
        receipt_email: customerEmail,
        metadata: {
          orderId: orderId,
          ...metadata,
        },
      });

      // Return the client secret
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Handle webhook events from Stripe
  handleWebhook: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Update order status in database
        if (paymentIntent.metadata.orderId) {
          try {
            await prisma.order.update({
              where: { id: parseInt(paymentIntent.metadata.orderId) },
              data: { status: "processing" },
            });
          } catch (error) {
            console.error("Error updating order status:", error);
          }
        }
        break;
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
        console.log("Payment failed:", failedPayment.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  },
};

module.exports = stripeController;
