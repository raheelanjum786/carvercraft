import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import ProductCard from "../../content/ProductsCard/productCard";
import { useSearchParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import api from "../../utils/axios";

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/products/get"
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

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
      <div className="relative bg-[#041322] min-h-screen">
        {/* Funky Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#E0A387] to-purple-500 opacity-10 blur-3xl -top-48 -left-48"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, 0, 180],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-[#E0A387] to-blue-500 opacity-10 blur-3xl -bottom-64 -right-64"
          ></motion.div>
        </div>

        {/* Groovy Heading */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative z-10 text-center pt-24 px-4"
        >
          <motion.h1
            animate={{
              color: ["#E0A387", "#f0b397", "#E0A387"],
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl sm:text-6xl font-bold mb-4 tracking-wider"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#E0A387] mt-2 text-xl sm:text-2xl max-w-2xl mx-auto opacity-90"
          >
            ✨ Explore our groovy collection of awesome products ✨
          </motion.p>
        </motion.div>

        {/* Funky Category Pills */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 flex justify-center gap-4 mb-8 px-4 flex-wrap"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{
                scale: 1.1,
                rotate: [-1, 1, -1],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#E0A387] to-[#e0877f] text-[#131313] shadow-lg"
                  : "bg-[#E0A387] bg-opacity-10 text-[#E0A387] border border-[#E0A387] border-opacity-20"
              } hover:shadow-xl transition-all duration-300`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid with Funky Animations */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 mt-12"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotate: [-0.5, 0.5, -0.5],
                  transition: { duration: 0.3 },
                }}
                className="transform transition-all duration-300 hover:shadow-2xl"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
