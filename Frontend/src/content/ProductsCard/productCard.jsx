import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";

const ProductCard = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState(product);

  const handleAddToCart = async (item, type) => {
    try {
      let requestData;

      if (type === "product") {
        requestData = {
          productId: item.id,
          quantity: 1,
          userId: item.userId,
        };
      } else {
        requestData = {
          giftId: item.id,
          quantity: 1,
          userId: item.userId,
        };
      }

      const response = await api.post(
        "http://localhost:4000/api/cart/add",
        requestData
      );

      if (response.status === 200) {
        alert("Item added to cart successfully!");
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="relative h-[400px] sm:h-[450px] lg:h-[500px] w-full bg-gradient-to-br from-[#B96A59] to-[#743A36] shadow-lg
    hover:shadow-[0_20px_50px_rgba(49,10,11,0.3)] transition-transform duration-500 transform hover:scale-105 rounded-lg overflow-hidden"
    >
      {/* Image Section */}
      <div className="h-2/3 w-full overflow-hidden">
        {selectedProduct.imageUrls && (
          <img
            src={`http://localhost:4000/api${
              JSON.parse(selectedProduct.imageUrls)[0]
            }`}
            alt="Product"
            className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 ease-in-out"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 h-1/3 flex flex-col justify-between">
        <Link to={`/products/${product.id}`} className="cursor-pointer">
          <h2 className="text-lg sm:text-xl font-semibold text-[#E0A387] hover:text-[#E0A0A0]">
            {product.name}
            {product.isNew && (
              <span className="ml-2 px-2 py-1 bg-[#E0A387] text-[#310A0B] rounded text-xs">
                NEW
              </span>
            )}
          </h2>
        </Link>
        <p className="text-sm sm:text-base text-[#E0A387]/80 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg sm:text-xl font-bold text-[#E0A387]">
            Rs.{product.price}
          </span>
          <button
            onClick={() => handleAddToCart(product, "product")}
            className="px-4 py-2 bg-[#E0A387] text-[#310A0B] text-sm sm:text-base font-medium rounded
            hover:bg-[#E0A0A0]/90 transition-transform duration-300 transform hover:scale-110"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
