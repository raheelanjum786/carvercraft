import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../utils/axios";

const LatestProductCard = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/products/get"
        );
        const data = response.data;
        const latestProducts = data.filter((product) => product.isLatest);
        setProducts(latestProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to empty array if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const requestData = {
        productId: item.id,
        quantity: 1,
        userId: item.userId,
      };

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
      alert(error.message || "Something went wrong");
    }
  };

  const nextSlide = () => {
    if (products.length > 0) {
      setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (products.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [products.length]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 ">
      <div className="w-full max-w-7xl relative">
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full hover:from-blue-500/50 hover:to-purple-500/50 transition-all duration-300 z-20 group"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-300 z-20 group"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#1a1a3a] to-[#0d0d1f] shadow-2xl rounded-2xl overflow-hidden hover:shadow-[0_25px_60px_rgba(123,97,255,0.2)] transition-all duration-500 backdrop-blur-lg min-h-[500px] sm:min-h-[600px] lg:min-h-[550px] w-full">
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
            <div className="h-full relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a3a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              {products[currentSlide]?.imageUrls &&
                (() => {
                  try {
                    const images =
                      typeof products[currentSlide].imageUrls === "string"
                        ? JSON.parse(products[currentSlide].imageUrls)
                        : products[currentSlide].imageUrls;

                    return images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={
                          imageUrl.startsWith("http")
                            ? imageUrl
                            : `http://localhost:4000/api${imageUrl}`
                        }
                        alt={`Product ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
                      />
                    ));
                  } catch (error) {
                    // If parsing fails, try to display as a single image
                    console.error("Error parsing imageUrls:", error);
                    const imageUrl = products[currentSlide].imageUrls;
                    return (
                      <img
                        src={
                          imageUrl.startsWith("http")
                            ? imageUrl
                            : `http://localhost:4000/api${imageUrl}`
                        }
                        alt="Product"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
                      />
                    );
                  }
                })()}
              <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-20 mix-blend-overlay" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 relative bg-gradient-to-br from-[#1a1a3a]/50 to-[#0d0d1f]/50">
            <div className="absolute -right-32 -top-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <div className="animate-fadeIn">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                {products[currentSlide]?.name}
                <span className="ml-2 sm:ml-3 inline-block px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs sm:text-sm rounded-full animate-pulse">
                  EXCLUSIVE
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-blue-100/80 animate-slideRight leading-relaxed">
              {products[currentSlide]?.description}
            </p>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold animate-slideLeft text-white">
              ₹{products[currentSlide]?.price.toLocaleString()}
              <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full" />
            </div>

            <div className="space-y-3 sm:space-y-4 animate-slideUp">
              <h3 className="font-bold text-lg sm:text-xl text-white">
                Card Features
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {products[currentSlide]?.benefits
                  .split(", ")
                  .map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 animate-pulse" />
                      <span>{benefit}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="pt-4 sm:pt-6 animate-slideUp">
              <button
                onClick={() => handleAddToCart(products[currentSlide])}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Pre-order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProductCard;
