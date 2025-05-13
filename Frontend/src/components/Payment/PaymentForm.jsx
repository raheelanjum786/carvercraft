import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import api from "../../utils/axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#E0A387",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#B96A59",
      },
      backgroundColor: "transparent",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentForm = ({
  amount,
  orderId,
  customerEmail,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create a payment intent when the component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await api.post(
          "http://localhost:4000/api/stripe/create-payment-intent",
          {
            amount,
            orderId,
            customerEmail,
            metadata: {
              orderId: orderId,
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment. Please try again.");
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount, orderId, customerEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: customerEmail,
          },
        },
      }
    );

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
      if (onError) onError(error);
    } else if (paymentIntent.status === "succeeded") {
      setProcessing(false);
      if (onSuccess) onSuccess(paymentIntent);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#491B1D]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-[#E0A387] mb-6">
        Payment Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-[#743A36]/50 rounded-xl border-2 border-[#743A36]">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>

        {error && (
          <div className="text-red-500 bg-red-100/10 p-3 rounded-lg">
            {error}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!stripe || processing}
          className="w-full flex justify-center py-3 px-6 border-2 border-transparent rounded-xl shadow-xl text-lg font-bold text-[#310A0B] bg-gradient-to-r from-[#E0A387] to-[#B96A59] hover:from-[#B96A59] hover:to-[#E0A387] focus:outline-none transform transition-all duration-300 disabled:opacity-50"
        >
          {processing ? "Processing..." : `Pay ₹${amount}`}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
