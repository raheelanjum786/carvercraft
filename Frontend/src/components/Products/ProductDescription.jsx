import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

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
    return <div className="text-funky-green text-center mt-20">Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-[#041322] px-6 py-40 relative">
        {/* Funky background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-funky-orange opacity-10 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-funky-teal opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-funky-pink opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-funky-green opacity-10 blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <ProductGallery product={product} />

            {/* Right: Product Details */}
            <ProductDetails
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
            />
          </div>

          {/* Reviews Section */}
          {/* <ProductReviews product={product} /> */}

          {/* Related Products */}
          {/* <RelatedProducts /> */}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDescription;
