import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    brand: "",
    stock: 0,
    rating: 0,
    reviews: [],
    images: [],
    additionalInfo: "",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `http://localhost:4000/api/products/get/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (!product)
    return <div className="text-[#E0A387] text-center mt-20">Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-[#131313] px-6 py-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#491b1d] to-[#310A0B] p-1"
              >
                {/* <img
                  src={product.images && product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[400px] sm:h-[500px] object-cover rounded-xl"
                /> */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-[#E0A387] text-[#310A0B] px-4 py-2 rounded-full font-medium text-sm tracking-wide">
                    NEW ARRIVAL
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {product.images &&
                  product.images.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-[#E0A387]"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      {/* <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    /> */}
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="bg-gradient-to-br from-[#491b1d] to-[#310A0B] rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#E0A387] mb-2">
                      {product.name}
                    </h1>
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? "text-[#E0A387]"
                                : "text-[#E0A387]/30"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[#E0A387]/70 ml-2 text-sm">
                        ({product.reviews?.length || 0} reviews)
                      </span>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-[#E0A387]">
                    ${product.price}
                  </span>
                </div>

                <div className="my-6 border-t border-b border-[#E0A387]/20 py-6">
                  <p className="text-[#E0A387]/80 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="space-y-1">
                    <p className="text-[#E0A387]/60 text-sm">Category</p>
                    <p className="text-[#E0A387]">{product.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#E0A387]/60 text-sm">Stock</p>
                    <p className="text-[#E0A387]">{product.stock} units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#E0A387]/60 text-sm">Brand</p>
                    <p className="text-[#E0A387]">{product.brand}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#E0A387]/60 text-sm">Availability</p>
                    <p className="text-[#E0A387] font-medium">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mb-8">
                  <p className="text-[#E0A387] font-medium mr-4">Quantity</p>
                  <div className="flex items-center border border-[#E0A387]/30 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-1 text-[#E0A387] hover:bg-[#491b1d] rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-[#E0A387] font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-1 text-[#E0A387] hover:bg-[#491b1d] rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 px-6 bg-[#E0A387] text-[#310A0B] font-bold rounded-lg 
                    hover:bg-[#d89275] transition-all duration-300 flex items-center justify-center"
                    disabled={product.stock === 0}
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    Add to Cart
                  </motion.button>
                </div>
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-gradient-to-br from-[#491b1d] to-[#310A0B] rounded-2xl p-8 shadow-xl"
              >
                <h3 className="text-xl font-bold text-[#E0A387] mb-4">
                  Additional Information
                </h3>
                <div className="text-[#E0A387]/80">
                  <p>{product.additionalInfo}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDescription;
