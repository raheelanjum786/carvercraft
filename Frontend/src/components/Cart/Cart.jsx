import { Suspense, useState, useEffect, useRef } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wobble, setWobble] = useState(false);
  const sectionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const wobbleInterval = setInterval(() => {
      setWobble((prev) => !prev);
    }, 2000);
    return () => clearInterval(wobbleInterval);
  }, []);

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
        s;

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

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = JSON.parse(localStorage?.getItem("user") || "");
      try {
        const response = await api.get(
          `http://51.21.182.124/api/cart/get/${user.id}`
        );
        console.log("🛒 Cart fetched:", response.data);
        setCartItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("🛒 Oopsie! Cart fetch failed:", error);
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);
  console.log("Set Items", setCartItems);
  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await api.put("http://51.21.182.124/api/cart/update", {
        cartItemId,
        quantity,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
      setWobble(true);
      setTimeout(() => setWobble(false), 500);
    } catch (error) {
      console.error("🔢 Quantity update went wrong:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await api.delete(`http://51.21.182.124/api/cart/remove/${cartItemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId)
      );
    } catch (error) {
      console.error("🗑️ Remove failed:", error);
    }
  };

  const handleProceedToCheckout = async () => {
    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      type: "product",
      details: item.product,
    }));

    try {
      const user = JSON.parse(localStorage?.getItem("user") || "");
      if (!user || !user.id) throw new Error("🔑 Authentication needed!");

      await api.delete(`http://51.21.182.124/api/cart/clear/${user.id}`);
      setCartItems([]);
      navigate("/buy-now", { state: { orderItems } });
    } catch (error) {
      console.error("💳 Checkout error:", error);
    }
  };

  return (
    <>
      <div
        ref={sectionRef}
        className="relative bg-[#041322] min-h-screen overflow-hidden py-8"
      >
        {/* Enhanced cosmic background animations */}
        <div className="absolute inset-0 ">
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

          {/* Animated aurora at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-funky-teal/10 via-funky-pink/5 to-transparent animate-aurora opacity-20"></div>
        </div>

        <div
          className={`relative z-10 p-4 sm:p-8 md:p-12 lg:p-20 ${
            wobble ? "animate-wiggle" : ""
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-funky-teal pt-4 sm:pt-8 font-extrabold animate-pulse">
            🛍️ Your Cart 🛍️
          </h1>
          <p className="text-sm sm:text-base text-center text-funky-orange mt-2 animate-bounce">
            ✨ Check out your awesome picks below! ✨
          </p>

          <div className="overflow-x-auto p-2 sm:p-4 backdrop-blur-sm bg-opacity-30 bg-black rounded-xl mt-4">
            <div className="min-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border-2 border-funky-pink">
                <thead>
                  <tr className="bg-gradient-to-r from-funky-pink/30 to-funky-teal/30 text-funky-orange">
                    <th className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      🎁 Product Name
                    </th>
                    <th className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse hidden sm:table-cell">
                      📝 Description
                    </th>
                    <th className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      💰 Price
                    </th>
                    <th className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      🔢 Qty
                    </th>
                    <th className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      ⚡ Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <div className="w-12 h-12 border-4 border-funky-pink border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  ) : cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        <p className="text-funky-orange text-lg animate-pulse">
                          Your cart is empty! Time to add some groovy items! ✨
                        </p>
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-funky-pink/20 transition-all duration-300"
                      >
                        <td className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-funky-teal">
                          {item.product.name}
                        </td>
                        <td className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-funky-green hidden sm:table-cell">
                          {item.product.description}
                        </td>
                        <td className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-funky-teal">
                          💎 €{item.product.price}
                        </td>
                        <td className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-funky-teal">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="bg-[#310A0B] border-2 border-funky-orange rounded-full px-1 py-0.5 sm:px-2 sm:py-1 w-12 sm:w-16 md:w-20 relative z-20 focus:ring-4 focus:ring-funky-pink transition-all duration-300 text-xs sm:text-sm text-funky-teal"
                          />
                        </td>
                        <td className="border-2 border-funky-pink px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-funky-teal">
                          <button
                            className="bg-gradient-to-r from-funky-pink to-funky-red px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:from-funky-red hover:to-funky-pink relative z-20 transition-all duration-300 transform hover:scale-110 text-xs sm:text-sm text-white"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            🗑️ Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right text-funky-orange text-lg sm:text-xl md:text-2xl font-bold animate-pulse">
              Total: 💎 €
              {cartItems.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              )}
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 pb-4 sm:pb-6 md:pb-8">
            <button
              className="bg-gradient-to-r from-funky-teal to-funky-green text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full hover:from-funky-green hover:to-funky-teal transform hover:scale-110 transition-all duration-300 font-bold text-sm sm:text-lg md:text-xl shadow-lg"
              onClick={handleProceedToCheckout}
            >
              🚀 Proceed to Checkout 🎉
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
