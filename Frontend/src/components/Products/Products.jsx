import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import ProductCard from "../../content/ProductsCard/productCard";
import { useSearchParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import api from "../../utils/axios";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Funky animations configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
        bounce: 0.4,
      },
    },
  };

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
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.categoryId == category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return (
    <>
      <motion.div
        className="relative bg-[#041322] pb-16 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Heading and Description */}
        <motion.div
          className="relative z-10 text-center pt-24 px-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl text-[#E0A387] font-bold"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Our Groovy Products
          </motion.h1>
          <motion.p
            className="text-[#E0A387] mt-2 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Dive into our far-out collection of products crafted with cosmic
            vibes!
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4 z-10 relative">
          <h2 className="text-lg sm:text-xl text-[#E0A387]">
            Filter Products:
          </h2>
          <select
            className="bg-[#E0A387] text-[#310A0B] p-2 sm:p-3 rounded w-full sm:w-auto"
            onChange={(e) =>
              (window.location.search = `?category=${e.target.value}`)
            }
          >
            <option value="all">All</option>
            <option value="new">New Arrivals</option>
            <option value="sale">On Sale</option>
          </select>
        </div> */}

        {/* Content Container */}
        <motion.div
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 p-4 sm:p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <motion.div
              className="text-[#E0A387] text-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Loading groovy stuff...
            </motion.div>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Products;
