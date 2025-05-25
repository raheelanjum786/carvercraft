import { useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-funky-pink/20 to-funky-teal/20 p-1"
        whileHover={{ scale: 1.02, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={(() => {
            try {
              // Try to parse as JSON first
              const parsedUrls = JSON.parse(product.imageUrls);
              return `http://localhost:4000/api${parsedUrls}`;
            } catch (error) {
              return product.imageUrls;
            }
          })()}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        {product.isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="absolute top-4 right-4 bg-funky-orange text-white px-4 py-2 rounded-full font-medium text-sm tracking-wide transform rotate-3 shadow-lg"
          >
            NEW ARRIVAL
          </motion.div>
        )}
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {product.images && product.images.length > 0 ? (
          product.images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.9 }}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                selectedImage === index
                  ? "border-funky-pink"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={(() => {
                  try {
                    const parsedUrls = JSON.parse(product.imageUrls);
                    return `http://localhost:4000/api${parsedUrls}`;
                  } catch (error) {
                    return img;
                  }
                })()}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-20 object-cover transition-all duration-300 hover:brightness-110"
                onError={(e) => {
                  console.error("Thumbnail failed to load:", e);
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23CCCCCC' width='100' height='100'/%3E%3C/svg%3E";
                }}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-4 text-center py-4 text-funky-green/70">
            No product images available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
