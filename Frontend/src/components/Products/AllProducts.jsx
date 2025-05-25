import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import ProductCard from "../../content/ProductsCard/productCard";
import { useSearchParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import api from "../../utils/axios";

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("http://51.21.182.124/api/products/get");
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div
        ref={sectionRef}
        className="relative bg-[#041322] min-h-screen overflow-hidden"
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

          {/* Animated aurora at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-funky-teal/10 via-funky-pink/5 to-transparent animate-aurora opacity-20"></div>
        </div>

        {/* Enhanced Groovy Heading with cosmic animations */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative z-10 text-center pt-24 px-4"
        >
          <motion.h1
            animate={{
              color: ["#19D7E8", "#DE0157", "#FFA500", "#19D7E8"],
              textShadow: [
                "0 0 10px rgba(25,215,232,0.5)",
                "0 0 15px rgba(222,1,87,0.5)",
                "0 0 10px rgba(255,165,0,0.5)",
                "0 0 10px rgba(25,215,232,0.5)",
              ],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-wider text-funky-teal"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -5, 0],
            }}
            transition={{
              delay: 0.5,
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="text-funky-green mt-2 text-xl sm:text-2xl max-w-2xl mx-auto opacity-90"
          >
            ✨ Explore our groovy collection of awesome products ✨
          </motion.p>
        </motion.div>

        {/* Enhanced Products Grid with cosmic animations */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 mt-12"
          >
            {isLoading ? (
              <motion.div
                className="col-span-full flex justify-center items-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Enhanced cosmic loader */}
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-funky-pink border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-funky-teal/30 border-b-transparent rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-funky-orange/20 border-l-transparent rounded-full animate-spin-slower"></div>
                </div>
              </motion.div>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotate: [-0.5, 0.5, -0.5],
                    boxShadow: [
                      "0 10px 30px -15px rgba(0,0,0,0.3)",
                      "0 10px 30px -15px rgba(222,1,87,0.5)",
                      "0 10px 30px -15px rgba(25,215,232,0.5)",
                      "0 10px 30px -15px rgba(0,0,0,0.3)",
                    ],
                    transition: { duration: 0.3 },
                  }}
                  className="transform transition-all duration-300 hover:shadow-2xl relative group"
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-funky-pink via-funky-teal to-funky-orange rounded-lg opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300 -z-10"></div>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.p
                  animate={{
                    scale: [1, 1.05, 1],
                    color: ["#FFA500", "#FF69B4", "#FFA500"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-funky-orange text-xl"
                >
                  No products found
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
