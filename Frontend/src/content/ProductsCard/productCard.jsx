import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [wobble, setWobble] = useState(false);

  useEffect(() => {
    if (wobble) {
      const timer = setTimeout(() => setWobble(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wobble]);

  const handleAddToCart = async (item) => {
    setWobble(true);
    try {
      const requestData = {
        productId: item.id,
        quantity: 1,
        userId: item.userId,
      };

      const response = await api.post(
        "http://13.60.44.89:4000/api/cart/add",
        requestData
      );
      console.log("requestData", requestData);

      if (response.status === 200) {
        alert("Woohoo! 🎉 Item zoomed into your cart!");
      } else {
        alert("Oopsie! 😅 Cart got stage fright!");
      }
    } catch (error) {
      alert(
        "Yikes! 🙈 " + (error.response?.data?.error || "Something's wonky!")
      );
    }
  };

  return (
    <div
      className={`relative w-full max-w-sm mx-auto bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 
      rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 
      ${isHovered ? "rotate-2 scale-105" : ""} 
      ${wobble ? "animate-[wiggle_0.5s_ease-in-out]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden group">
        {product.imageUrls && (
          <img
            src={(() => {
              try {
                // Try to parse as JSON first
                const parsedUrls = JSON.parse(product.imageUrls);
                return `http://13.60.44.89:4000/api${parsedUrls}`;
              } catch (error) {
                return product.imageUrls;
              }
            })()}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {product.isNew && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            ✨ NEW ✨
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 backdrop-blur-sm bg-white/30">
        <Link to={`/products/${product.id}`} className="block">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-funky-pink to-funky-teal bg-clip-text text-transparent hover:from-funky-teal hover:to-funky-pink transition-all duration-300 mb-2">
            {product.name}
          </h2>
        </Link>

        <p className="text-funky-green text-sm mb-4 line-clamp-2 italic">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-funky-pink to-funky-orange bg-clip-text text-transparent">
            €.{product.price.toLocaleString()}
          </span>
          <button
            onClick={() => handleAddToCart(product, "product")}
            className="px-6 py-2.5 bg-gradient-to-r from-funky-pink to-funky-teal text-white rounded-full font-bold
            transform transition-all duration-300 hover:from-funky-teal hover:to-funky-pink hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-funky-green focus:ring-offset-2
            active:scale-95 shadow-lg hover:shadow-xl"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
