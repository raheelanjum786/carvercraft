import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LatestProductCard = () => {
  const demoProducts = [
    {
      id: 1,
      name: "Handcrafted Wooden Bowl",
      description:
        "Beautiful hand-carved wooden bowl made from sustainable maple wood. Perfect for serving or decoration.",
      price: 2999,
      benefits: "Eco-friendly, Durable, Unique design, Food-safe finish",
      imageUrls: JSON.stringify([
        "https://images.unsplash.com/photo-1578903100724-d95a8de24d50?q=80&w=1000&auto=format&fit=crop",
        "https://images.pexels.com/photos/6308586/pexels-photo-6308586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ]),
      isLatest: true,
    },
    {
      id: 2,
      name: "Artisan Ceramic Vase",
      description:
        "Elegant ceramic vase with traditional patterns, handmade by local artisans.",
      price: 3499,
      benefits: "Handcrafted, Unique patterns, Versatile use, Durable material",
      imageUrls: JSON.stringify([
        "https://images.unsplash.com/photo-1578903100724-d95a8de24d50?q=80&w=1000&auto=format&fit=crop",
        "https://images.pexels.com/photos/6308586/pexels-photo-6308586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ]),
      isLatest: true,
    },
  ];

  const [products, setProducts] = useState(demoProducts);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleAddToCart = (item) => {
    alert(`Added ${item.name} to cart!`);
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

  if (products.length === 0) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8">
      <div className="w-full max-w-7xl relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-black/30 rounded-full hover:bg-black/50 transition-all duration-300 z-20 group"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-black/30 rounded-full hover:bg-black/50 transition-all duration-300 z-20 group"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Product Card */}
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#1a1a1a] to-[#2d1f1f] shadow-2xl rounded-2xl overflow-hidden hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-500 backdrop-blur-lg min-h-[500px] sm:min-h-[600px] lg:min-h-[550px] w-full">
          {/* Image Section */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
            <div className="h-full relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              {products[currentSlide]?.imageUrls &&
                JSON.parse(products[currentSlide].imageUrls).map(
                  (imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )
                )}
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 relative bg-gradient-to-br from-transparent to-black/10">
            <div className="absolute -right-32 -top-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="animate-fadeIn">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                {products[currentSlide]?.name}
                <span className="ml-2 sm:ml-3 inline-block px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm rounded-full animate-pulse">
                  NEW ARRIVAL
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-300 animate-slideRight leading-relaxed">
              {products[currentSlide]?.description}
            </p>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold animate-slideLeft text-white">
              ₹{products[currentSlide]?.price.toLocaleString()}
              <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-purple-500 to-pink-500 mt-2 rounded-full" />
            </div>

            <div className="space-y-3 sm:space-y-4 animate-slideUp">
              <h3 className="font-bold text-lg sm:text-xl text-white">
                Key Benefits
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {products[currentSlide]?.benefits
                  .split(", ")
                  .map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-2 sm:mr-3 animate-pulse" />
                      <span>{benefit}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="pt-4 sm:pt-6 animate-slideUp">
              <button
                onClick={() => handleAddToCart(products[currentSlide])}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProductCard;
// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import api from "../../utils/axios";

// const LatestProductCard = () => {
//   const [products, setProducts] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("http://localhost:4000/api/products/get");
//         const data = await response.data;
//         const latestProducts = data.filter((product) => product.isLatest);
//         setProducts(latestProducts);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddToCart = async (item) => {
//     try {
//       const requestData = {
//         productId: item.id,
//         quantity: 1,
//         userId: item.userId,
//       };

//       const response = await api.post(
//         "http://localhost:4000/api/cart/add",
//         requestData
//       );
//       if (response.status === 200) {
//         alert("Item added to cart successfully!");
//       } else {
//         alert("Failed to add item to cart.");
//       }
//     } catch (error) {
//       alert(error.message || "Something went wrong");
//     }
//   };

//   const nextSlide = () => {
//     if (products.length > 0) {
//       setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
//     }
//   };

//   const prevSlide = () => {
//     if (products.length > 0) {
//       setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 4000);
//     return () => clearInterval(interval);
//   }, [products.length]);

//   if (products.length === 0) {
//     return null;
//   }

//   return (
//     <div className="p-6 sm:p-8 lg:p-12 relative">
//       {/* Chevron Slider Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors z-20"
//       >
//         <ChevronLeft className="w-6 h-6 text-white" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors z-20"
//       >
//         <ChevronRight className="w-6 h-6 text-white" />
//       </button>

//       {/* Product Card */}
//       <div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#B96A59] to-[#743A36] shadow-2xl rounded-lg overflow-hidden hover:shadow-[0_20px_50px_rgba(49,10,11,0.3)] transition-all duration-500 backdrop-blur-sm h-[600px] sm:h-[800px] lg:h-[500px] w-full space-y-4 lg:space-y-0 lg:space-x-4">
//         {/* Image Section */}
//         <div className="relative w-full lg:w-1/2 h-full">
//           <div className="h-full overflow-hidden relative group flex items-center justify-center">
//             <div className="absolute inset-0 bg-gradient-to-t from-[#310A0B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
//             {products[currentSlide]?.imageUrls &&
//               JSON.parse(products[currentSlide].imageUrls).map(
//                 (imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={`http://localhost:4000/api${imageUrl}`}
//                     alt={`Product ${index + 1}`}
//                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out"
//                   />
//                 )
//               )}
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="w-full lg:w-1/2 p-6 lg:p-8 space-y-6 relative">
//           <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#E0A387]/10 rounded-full blur-3xl" />

//           <div className="animate-slideDown">
//             <h2 className="text-xl sm:text-2xl font-bold text-[#E0A387] mb-2 line-clamp-2">
//               {products[currentSlide]?.name}
//               <span className="inline-block badge bg-[#E0A387] text-[#310A0B] border-none animate-pulse ml-2 text-xs align-middle">
//                 NEW
//               </span>
//             </h2>
//           </div>

//           <p className="text-sm sm:text-base lg:text-lg text-[#E0A387]/90 animate-slideRight leading-relaxed line-clamp-3">
//             {products[currentSlide]?.description}
//           </p>

//           <div className="text-2xl sm:text-3xl font-bold animate-slideLeft text-[#E0A387] relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#E0A387]/30">
//             Rs.{products[currentSlide]?.price}
//           </div>

//           <div className="space-y-2 animate-slideUp">
//             <h3 className="font-bold text-lg sm:text-xl text-[#E0A387]">
//               Benefits:
//             </h3>
//             <ul className="space-y-2">
//               <li className="flex items-start text-sm sm:text-base text-[#E0A387]/90 hover:text-[#E0A387] transition-colors duration-300">
//                 <span className="w-2 h-2 bg-[#E0A387] rounded-full mr-3 mt-1 animate-pulse"></span>
//                 <span>{products[currentSlide]?.benefits}</span>
//               </li>
//             </ul>
//           </div>

//           <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-2 animate-slideUp">
//             <button
//               className="w-full sm:w-auto px-6 py-3 border-2 border-[#E0A387] text-[#E0A387] hover:bg-[#E0A387] hover:text-[#310A0B] transition-all duration-300 rounded-lg"
//               onClick={() => handleAddToCart(products[currentSlide])}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LatestProductCard;
