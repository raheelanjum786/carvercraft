import { motion } from "framer-motion";

const ProductDetails = ({ product, quantity, handleQuantityChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-funky-pink/20">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-funky-orange mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-funky-pink"
                        : "text-funky-pink/30"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-funky-green/70 ml-2 text-sm">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>
          <span className="text-3xl font-bold text-funky-teal">
            €{product.price}
          </span>
        </div>

        <div className="my-6 border-t border-b border-funky-pink/20 py-6">
          <p className="text-funky-green/80 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center mb-8">
          <p className="text-funky-green font-medium mr-4">Quantity</p>
          <div className="flex items-center border border-funky-pink/30 rounded-lg">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1 text-funky-green hover:bg-funky-pink/20 rounded-l-lg"
            >
              -
            </motion.button>
            <span className="px-4 py-1 text-funky-green font-medium">
              {quantity}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1 text-funky-green hover:bg-funky-pink/20 rounded-r-lg"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-funky-pink to-funky-teal text-white font-bold rounded-lg 
            hover:from-funky-teal hover:to-funky-pink transition-all duration-300 flex items-center justify-center shadow-lg"
            disabled={product.stock === 0}
          >
            <svg
              className="w-5 h-5 mr-2 animate-pulse"
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
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 px-6 bg-transparent border-2 border-funky-pink text-funky-pink font-bold rounded-lg 
            hover:bg-funky-pink/10 transition-all duration-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Wishlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
