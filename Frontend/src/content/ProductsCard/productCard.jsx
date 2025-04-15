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
    <div className="relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden group">
        {/* {selectedProduct.imageUrls && (
          <img
            src={`http://localhost:4000/api${
              JSON.parse(selectedProduct.imageUrls)[0]
            }`}
            alt="Product"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
        )} */}
        {product.isNew && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            NEW
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <Link to={`/products/${product.id}`} className="block">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-red-600 transition-colors duration-300 mb-2">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            Rs.{product.price.toLocaleString()}
          </span>
          <button
            onClick={() => handleAddToCart(product, "product")}
            className="px-6 py-2.5 bg-red-600 text-white rounded-full font-semibold 
            transform transition-all duration-300 hover:bg-red-700 hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            active:scale-95 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
