import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);

  // Helper function to process image URLs
  const processImageUrl = (url) => {
    try {
      // Try to parse as JSON first
      const parsedUrl = JSON.parse(url);
      return `http://51.21.182.124/api/api${parsedUrl}`;
    } catch (error) {
      return url;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://51.21.182.124/api/api/products/get"
        );
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Get first 4 products for related items
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold text-funky-orange mb-8 relative inline-block">
        You Might Also Like
        <motion.div
          className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-funky-pink to-funky-teal"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.4, duration: 0.8 }}
        />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 rounded-xl overflow-hidden shadow-lg border border-funky-pink/20"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={
                  processImageUrl(product.imageUrls) ||
                  "/placeholder-product.jpg"
                }
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  console.error("Product image failed to load");
                  e.target.src = "/placeholder-product.jpg";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-funky-teal">{product.name}</h3>
              <p className="text-funky-green/70 text-sm mt-1">
                {product.category}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-funky-orange">
                  ${product.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-funky-pink/20 rounded-full text-funky-pink"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;
