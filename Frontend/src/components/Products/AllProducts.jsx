import { motion } from "framer-motion";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/products/get"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    <>
      <div className="relative bg-[#131313] min-h-screen">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 rounded-full bg-[#E0A387] opacity-5 -top-32 -left-32"></div>
          <div className="absolute w-96 h-96 rounded-full bg-[#E0A387] opacity-5 -bottom-48 -right-48"></div>
        </div>

        {/* Heading and Description */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 text-center pt-24 px-4"
        >
          <h1 className="text-4xl sm:text-5xl text-[#E0A387] font-bold mb-4 tracking-wide">
            Our Products
          </h1>
          <p className="text-[#E0A387] mt-2 text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
            Explore our exclusive range of products designed just for you.
          </p>
        </motion.div>

        {/* Category Pills */}
        <div className="relative z-10 flex justify-center gap-4 mb-8 px-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-[#E0A387] text-[#131313]"
                  : "bg-[#E0A387] bg-opacity-10 text-[#E0A387]"
              } hover:bg-opacity-20 transition-all duration-300`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          // variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 mt-12"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              // variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="transform transition-all duration-300"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
