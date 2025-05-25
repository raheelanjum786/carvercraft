import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import api from "../../utils/axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#7CFFCB",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#FF69B4",
      },
      backgroundColor: "transparent",
    },
    invalid: {
      color: "#FF69B4",
      iconColor: "#FF69B4",
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
    const createPaymentIntent = async () => {
      try {
        const response = await api.post(
          "http://13.60.44.89:4000/api/stripe/create-payment-intent",
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
      return;
    }

    const cardElement = elements.getElement(CardElement);

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

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-funky-pink/30"
    >
      <motion.div className="flex items-center mb-6" variants={itemVariants}>
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-funky-orange to-funky-pink rounded-full flex items-center justify-center mr-3 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </motion.div>
        <motion.h2
          className="text-2xl font-bold text-funky-orange"
          variants={itemVariants}
        >
          Payment Details
        </motion.h2>
      </motion.div>

      <motion.div className="mb-6 text-funky-green/80" variants={itemVariants}>
        <p>Complete your purchase by providing your card information below.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          className="p-5 bg-black/30 rounded-xl border-2 border-funky-pink/50 shadow-inner"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
        >
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </motion.div>

        <motion.div
          className="flex justify-between items-center text-funky-green/80 text-sm"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-funky-teal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure payment
          </div>
          <div>Amount: €{amount}</div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-funky-pink bg-funky-pink/10 p-4 rounded-lg border border-funky-pink/30"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!stripe || processing}
          className="w-full flex justify-center py-4 px-6 rounded-xl shadow-xl text-lg font-bold text-white bg-gradient-to-r from-funky-pink to-funky-teal hover:from-funky-teal hover:to-funky-pink transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {processing ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing Payment...
            </span>
          ) : (
            `Pay €${amount}`
          )}
        </motion.button>
      </form>

      <motion.div
        className="mt-6 text-center text-funky-green/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Your card information is encrypted and secure</p>
      </motion.div>
    </motion.div>
  );
};

export default PaymentForm;
