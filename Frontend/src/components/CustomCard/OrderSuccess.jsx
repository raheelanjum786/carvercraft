import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const location = useLocation();
  const { message, orderId } = location.state || {
    message: "Your order has been placed successfully!",
    orderId: null,
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#041322] to-[#0a1f35] text-funky-green flex flex-col items-center justify-center px-4">
        {/* Funky background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-funky-orange opacity-10 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-funky-teal opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-funky-pink opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-funky-green opacity-10 blur-3xl"></div>
        </div>

        <motion.div
          className="bg-[#041322]/70 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-w-md w-full text-center border border-funky-teal/30 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <CheckCircle className="w-20 h-20 mx-auto text-funky-green mb-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-funky-teal to-funky-pink">
              Order Successful!
            </h1>

            <motion.p
              className="mb-6 text-lg text-funky-green"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {message}
            </motion.p>

            {orderId && (
              <motion.div
                className="mb-6 p-3 bg-funky-teal/10 rounded-lg border border-funky-pink/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <p className="text-funky-green">
                  Your order ID:{" "}
                  <span className="font-bold text-funky-orange">{orderId}</span>
                </p>
              </motion.div>
            )}

            <motion.p
              className="text-sm text-funky-orange mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              You will receive an email confirmation shortly.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/my-orders"
                className="px-6 py-3 bg-gradient-to-r from-funky-pink to-funky-teal rounded-full hover:from-funky-teal hover:to-funky-pink text-white shadow-lg inline-block"
              >
                View My Orders
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="px-6 py-3 border border-funky-pink rounded-full hover:border-funky-teal hover:bg-funky-pink/10 transition-all inline-block text-funky-green"
              >
                Return to Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-funky-orange"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <p>Thank you for choosing CarverCraft!</p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
