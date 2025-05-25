import { motion } from "framer-motion";
const Review = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-16"
    >
      <div className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-funky-pink/20">
        <h2 className="text-2xl font-bold text-funky-orange mb-8 relative inline-block">
          Customer Reviews
          <motion.div
            className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-funky-pink to-funky-teal"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index + 1 }}
                className="border-b border-funky-pink/20 pb-6 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-funky-teal">{review.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-funky-pink"
                              : "text-funky-pink/30"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-funky-green/60 text-xs ml-2">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className="px-3 py-1 bg-funky-teal/20 text-funky-teal text-xs rounded-full"
                  >
                    Verified Purchase
                  </motion.div>
                </div>
                <p className="text-funky-green/80 mt-3">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-funky-green/70">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}

        {/* Write a Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-10 pt-8 border-t border-funky-pink/20"
        >
          <h3 className="text-xl font-bold text-funky-orange mb-6">
            Write a Review
          </h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-funky-green mb-2">Your Name</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="w-full px-4 py-3 bg-black/30 border border-funky-pink/50 rounded-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-funky-green"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-funky-green mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  className="w-full px-4 py-3 bg-black/30 border border-funky-pink/50 rounded-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-funky-green"
                  placeholder="Your email (won't be published)"
                />
              </div>
            </div>

            <div>
              <label className="block text-funky-green mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-funky-pink/40 hover:text-funky-pink transition-colors"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-funky-green mb-2">Your Review</label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                rows="4"
                className="w-full px-4 py-3 bg-black/30 border border-funky-pink/50 rounded-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-funky-green"
                placeholder="Share your experience with this product..."
              ></motion.textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-funky-pink to-funky-teal text-white font-bold rounded-lg 
            hover:from-funky-teal hover:to-funky-pink transition-all duration-300 shadow-lg"
            >
              Submit Review
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Review;
