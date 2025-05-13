import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const MyCardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/cardOrders/user"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await api.post(`http://localhost:4000/api/cardOrders/${orderId}/cancel`);

      // Update the order status in the UI
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(error.response?.data?.error || "Failed to cancel order");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500";
      case "processing":
        return "bg-blue-500/20 text-blue-300 border-blue-500";
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500";
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#131313] to-[#2D0A0B] text-[#E0A387] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#E0A387]"></div>
          <motion.p
            className="mt-4 text-[#B96A59]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Loading your orders...
          </motion.p>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#131313] to-[#2D0A0B] text-[#E0A387]">
        <div className="container mx-auto px-4 py-12">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#E0A387] to-[#FF7F50]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Card Orders
          </motion.h1>

          {error && (
            <motion.div
              className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {orders.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-[#310A0B]/30 rounded-lg border border-[#743A36]/30 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                You don't have any card orders yet.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/custom-card-order"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#743A36] to-[#B96A59] rounded-full hover:from-[#B96A59] hover:to-[#E0A387] hover:text-[#310A0B] transition-colors shadow-lg"
                >
                  Create Your First Custom Card
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  className="bg-[#310A0B]/70 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-[#743A36]/30 hover:shadow-2xl transition-all duration-300"
                  variants={item}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(116, 58, 54, 0.4)",
                  }}
                >
                  <div className="p-4 border-b border-[#743A36]">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <motion.span
                        className={`px-3 py-1 text-xs rounded-full border ${getStatusBadgeClass(
                          order.status
                        )}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </motion.span>
                    </div>
                    <p className="text-sm text-[#B96A59]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center mb-5">
                      <motion.div
                        className="w-20 h-20 bg-[#491B1D] rounded-lg overflow-hidden mr-4 shadow-md"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={`http://localhost:4000/api${order.designUrl}`}
                          alt="Design Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-design.png";
                          }}
                        />
                      </motion.div>
                      <div>
                        <p className="font-semibold text-lg">
                          {order.cardType.name} Card
                        </p>
                        <p className="text-sm text-[#B96A59]">
                          Quantity: {order.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-[#743A36] pt-4">
                      <p className="font-bold text-lg">
                        Total:{" "}
                        <span className="text-[#E0A387]">
                          Rs. {order.totalPrice.toLocaleString()}
                        </span>
                      </p>

                      {order.status === "pending" && (
                        <motion.button
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded-full text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Cancel Order
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {orders.length > 0 && (
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/custom-card-order"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#743A36] to-[#B96A59] rounded-full hover:from-[#B96A59] hover:to-[#E0A387] hover:text-[#310A0B] transition-colors shadow-lg"
                >
                  Create Another Custom Card
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCardOrders;
