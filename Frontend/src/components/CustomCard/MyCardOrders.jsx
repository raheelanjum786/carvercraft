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
          "http://13.60.44.89:4000/api/cardOrders/user"
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
      await api.post(
        `http://13.60.44.89:4000/api/cardOrders/${orderId}/cancel`
      );

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
        return "bg-funky-orange/20 text-funky-orange border-funky-orange";
      case "processing":
        return "bg-funky-teal/20 text-funky-teal border-funky-teal";
      case "completed":
        return "bg-funky-green/20 text-funky-green border-funky-green";
      case "cancelled":
        return "bg-funky-pink/20 text-funky-pink border-funky-pink";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#041322] text-funky-green flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-funky-pink"></div>
          <motion.p
            className="mt-4 text-funky-teal"
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
      <div className="min-h-screen bg-[#041322] text-funky-green relative">
        {/* Funky background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-funky-orange opacity-10 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-funky-teal opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-funky-pink opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-funky-green opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-funky-orange to-funky-pink"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Card Orders
          </motion.h1>

          {error && (
            <motion.div
              className="bg-funky-pink/10 border border-funky-pink text-funky-pink px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {orders.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 rounded-lg border border-funky-pink/30 max-w-2xl mx-auto backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-xl mb-8 text-funky-green"
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
                  className="inline-block px-8 py-3 bg-gradient-to-r from-funky-pink to-funky-teal rounded-full hover:from-funky-teal hover:to-funky-pink text-white transition-all duration-300 shadow-lg"
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
                  className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-funky-pink/30 hover:shadow-2xl transition-all duration-300"
                  variants={item}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(255, 105, 180, 0.3)",
                  }}
                >
                  <div className="p-4 border-b border-funky-pink/30">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg text-funky-orange">
                        Order #{order.id}
                      </h3>
                      <motion.span
                        className={`px-3 py-1 text-xs rounded-full border ${getStatusBadgeClass(
                          order.status
                        )}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {typeof order.status === "string"
                          ? order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)
                          : "Unknown"}
                      </motion.span>
                    </div>
                    <p className="text-funky-green/80 text-sm">
                      Ordered on:{" "}
                      {order.createdAt &&
                        new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="text-funky-teal font-medium mb-2">
                        Card Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-funky-green/60">Type:</p>
                          <p className="text-funky-green">
                            {typeof order.cardType === "string"
                              ? order.cardType
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-funky-green/60">Quantity:</p>
                          <p className="text-funky-green">
                            {order.quantity || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-funky-green/60">Price:</p>
                          <p className="text-funky-green">
                            {order.totalPrice ? `$${order.totalPrice}` : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-funky-green/60">Delivery:</p>
                          <p className="text-funky-green">
                            {typeof order.deliveryMethod === "string"
                              ? order.deliveryMethod
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-funky-teal/20 text-funky-teal rounded-lg hover:bg-funky-teal/30 transition-colors"
                        onClick={() => {
                          // View order details
                        }}
                      >
                        View Details
                      </motion.button>

                      {order.status === "pending" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-funky-pink/20 text-funky-pink rounded-lg hover:bg-funky-pink/30 transition-colors"
                          onClick={() => handleCancelOrder(order.id)}
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCardOrders;
