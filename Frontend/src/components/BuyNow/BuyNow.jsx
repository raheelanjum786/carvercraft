import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";
import PaymentForm from "../Payment/PaymentForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_your_stripe_publishable_key");

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderItems = location.state?.orderItems || [];
  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Create floating particles
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const createParticle = () => {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 bg-white/20 rounded-full";

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation duration
        const duration = 5 + Math.random() * 10;
        particle.style.animation = `floatAround ${duration}s ease-in-out infinite`;

        // Remove after some time
        setTimeout(() => {
          particle.remove();
        }, duration * 1000);

        section.appendChild(particle);
      };

      // Create particles at intervals
      const interval = setInterval(createParticle, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createOrder = async (items, orderData) => {
    const productOrders = [];
    let total = 0;

    items.forEach((item) => {
      const orderItem = {
        itemId: item.details.id,
        quantity: item.quantity,
        name: item?.name ? item.name : "",
        customerName: orderData.name,
        customerEmail: orderData.email,
        customerPhone: orderData.phone,
        shippingAddress: orderData.address,
        paymentMethod: "online",
        status: "pending",
      };

      if (item.type === "product") {
        productOrders.push(orderItem);
        total += item.details.price * item.quantity;
      }
    });

    if (productOrders.length > 0) {
      const response = await api.post(
        "http://51.21.182.124/api/api/productOrder/create",
        {
          orders: productOrders,
        }
      );
      setOrderId(response.data.id);
      setTotalAmount(total);
      return response.data;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        paymentMethod: "online",
      };

      await createOrder(orderItems, orderData);
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("😅 Oops! Something went wrong. Let's try that again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    navigate("/order-success", {
      state: {
        message:
          "Your order has been placed and payment has been received successfully!",
        orderId: orderId,
      },
    });
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <div
        ref={sectionRef}
        className="min-h-screen bg-[#041322] py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Enhanced cosmic background animations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Original funky blobs with enhanced animations */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
              filter: ["blur(30px)", "blur(40px)", "blur(30px)"],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-funky-orange to-funky-pink opacity-10 blur-3xl -top-48 -left-48"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, 0, 180],
              filter: ["blur(40px)", "blur(50px)", "blur(40px)"],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-funky-teal to-funky-green opacity-10 blur-3xl -bottom-64 -right-64"
          ></motion.div>

          {/* New cosmic elements */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-funky-pink/20 via-purple-600/10 to-transparent blur-3xl top-1/4 left-1/3"
          ></motion.div>

          {/* Animated horizontal scan lines */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-teal/20 to-transparent top-[20%] animate-scan-horizontal"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-pink/20 to-transparent top-[60%] animate-scan-horizontal-reverse"></div>

          {/* Animated vertical scan lines */}
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-orange/20 to-transparent left-[25%] animate-scan-vertical"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-teal/20 to-transparent right-[25%] animate-scan-vertical-reverse"></div>

          {/* Animated cosmic grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] animate-subtle-shift opacity-20"></div>

          {/* Cosmic dust particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-funky-teal/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Animated cosmic rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[80vw] h-[80vh] border border-funky-orange/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05],
              scale: [0.8, 1, 0.8],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] border border-funky-pink/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [360, 0],
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* An animated aurora at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-funky-teal/10 via-funky-pink/5 to-transparent animate-aurora opacity-20"></div>
        </div>

        {/* Floating shapes - keep existing ones */}
        <motion.div
          className="absolute top-20 left-20 w-12 h-12 bg-funky-orange opacity-30 rounded-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-32 right-20 w-16 h-16 bg-funky-pink opacity-30 rounded-full"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/4 w-10 h-10 bg-funky-teal opacity-30 rounded-lg rotate-45"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="max-w-3xl mx-auto relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-funky-orange to-funky-pink"
            variants={itemVariants}
          >
            Complete Your Purchase
          </motion.h1>

          <motion.div
            className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-funky-pink/30"
            variants={itemVariants}
          >
            <motion.div
              className="flex justify-center mb-6 md:mb-8"
              variants={itemVariants}
            >
              <div className="text-funky-orange text-lg md:text-xl font-medium relative inline-block">
                <span>💳 Online Payment Only</span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-funky-pink to-funky-teal"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>

            {showPaymentForm ? (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={totalAmount}
                  orderId={orderId}
                  customerEmail={formData.email}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8"
                variants={containerVariants}
              >
                {["name", "phone", "email", "address"].map((field, index) => (
                  <motion.div
                    key={field}
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label className="block text-base md:text-lg font-medium text-funky-teal mb-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {field === "phone"
                        ? "📞"
                        : field === "email"
                        ? "📧"
                        : field === "address"
                        ? "📍"
                        : "👤"}
                    </label>
                    {field === "address" ? (
                      <motion.textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        whileFocus={{ scale: 1.02 }}
                        className="mt-1 block w-full rounded-xl border-2 border-funky-pink/50 bg-black/30 text-funky-green placeholder-funky-green/60 shadow-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-base md:text-lg p-3 md:p-4"
                      />
                    ) : (
                      <motion.input
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone"
                            ? "tel"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                        whileFocus={{ scale: 1.02 }}
                        className="mt-1 block w-full rounded-xl border-2 border-funky-pink/50 bg-black/30 text-funky-green placeholder-funky-green/60 shadow-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-base md:text-lg p-3 md:p-4"
                      />
                    )}
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                  className="w-full flex justify-center py-3 px-6 rounded-xl shadow-xl text-base md:text-lg font-bold text-white bg-gradient-to-r from-funky-pink to-funky-teal hover:from-funky-teal hover:to-funky-pink transition-all duration-300"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
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
                      Processing...
                    </span>
                  ) : (
                    "Continue to Payment"
                  )}
                </motion.button>
              </motion.form>
            )}
          </motion.div>

          <motion.div
            className="mt-8 text-center text-funky-green/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>Your payment information is securely processed</p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default BuyNow;
