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
      <div className="min-h-screen bg-gradient-to-b from-[#131313] to-[#2D0A0B] text-[#E0A387] flex flex-col items-center justify-center px-4">
        <motion.div
          className="bg-[#310A0B]/70 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-w-md w-full text-center border border-[#743A36]/30"
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
            <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E0A387] to-[#FF7F50]">
              Order Successful!
            </h1>

            <motion.p
              className="mb-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {message}
            </motion.p>

            {orderId && (
              <motion.div
                className="mb-6 p-3 bg-[#491B1D]/40 rounded-lg border border-[#743A36]/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <p>
                  Your order ID:{" "}
                  <span className="font-bold text-[#E0A387]">{orderId}</span>
                </p>
              </motion.div>
            )}

            <motion.p
              className="text-sm text-[#B96A59] mb-8"
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
                className="px-6 py-3 bg-gradient-to-r from-[#743A36] to-[#B96A59] rounded-full hover:from-[#B96A59] hover:to-[#E0A387] hover:text-[#310A0B] transition-colors shadow-lg inline-block"
              >
                View My Orders
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="px-6 py-3 border border-[#743A36] rounded-full hover:border-[#E0A387] hover:bg-[#743A36]/30 transition-all inline-block"
              >
                Return to Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-[#B96A59]"
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
