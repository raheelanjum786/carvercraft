import React, { useState } from "react";
import ProductCard from "../../content/ProductsCard/productCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselProducts = () => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Demo products data
  const products = [
    {
      id: 1,
      name: "Classic Wooden Chair",
      price: 199.99,
      image: "/images/chair1.jpg",
      description: "Elegant handcrafted wooden chair",
    },
    {
      id: 2,
      name: "Rustic Coffee Table",
      price: 299.99,
      image: "/images/table1.jpg",
      description: "Solid wood coffee table with natural finish",
    },
    {
      id: 3,
      name: "Vintage Bookshelf",
      price: 399.99,
      image: "/images/shelf1.jpg",
      description: "Traditional style wooden bookshelf",
    },
    {
      id: 4,
      name: "Modern Dining Table",
      price: 599.99,
      image: "/images/table2.jpg",
      description: "Contemporary wooden dining table",
    },
  ];

  const checkScrollPosition = (container) => {
    setIsAtStart(container.scrollLeft === 0);
    setIsAtEnd(
      container.scrollLeft + container.offsetWidth >= container.scrollWidth - 1
    );
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 699, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="w-full py-8 sm:py-12 bg-[#131313]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#310A0B] text-center mb-6 sm:mb-8">
        Featured Products
      </h2>
      {/* Products Container */}
      <Carousel
        responsive={responsive}
        itemClass="p-[40px]"
        autoPlay={true}
        autoPlaySpeed={5000}
        stopAutoPlayOnHover={true}
        infinite={true}
        transitionDuration={500}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselProducts;

// import React, { useEffect, useState } from "react";
// import ProductCard from "../../content/ProductsCard/productCard";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import api from "../../utils/axios";

// const CarouselProducts = () => {
//   // const [scrollPosition, setScrollPosition] = useState(0);
//   const [isAtStart, setIsAtStart] = useState(true);
//   const [isAtEnd, setIsAtEnd] = useState(false);

//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("http://localhost:4000/api/products/get");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(products);
//   const checkScrollPosition = (container) => {
//     setIsAtStart(container.scrollLeft === 0);
//     setIsAtEnd(
//       container.scrollLeft + container.offsetWidth >= container.scrollWidth - 1
//     );
//   };

//   // const handlePrevSlide = () => {
//   //   const container = document.getElementById("carousel-container");
//   //   const slideWidth = container.offsetWidth;
//   //   container.scrollBy({ left: -slideWidth, behavior: "smooth" });
//   //   setTimeout(() => checkScrollPosition(container), 500);
//   // };

//   // const handleNextSlide = () => {
//   //   const container = document.getElementById("carousel-container");
//   //   const slideWidth = container.offsetWidth;
//   //   container.scrollBy({ left: slideWidth, behavior: "smooth" });
//   //   setTimeout(() => checkScrollPosition(container), 500);
//   // };

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//       slidesToSlide: 3, // optional, default to 1.
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 700 },
//       items: 2,
//       slidesToSlide: 2, // optional, default to 1.
//     },
//     mobile: {
//       breakpoint: { max: 699, min: 0 },
//       items: 1,
//       slidesToSlide: 1, // optional, default to 1.
//     },
//   };

//   return (
//     <div className="w-full py-8 sm:py-12 bg-[#E0A387]">
//       <h2 className="text-2xl sm:text-3xl font-bold text-[#310A0B] text-center mb-6 sm:mb-8">
//         Featured Products
//       </h2>
//       {/* Products Container */}
//       <Carousel
//         responsive={responsive}
//         itemClass="p-[40px]"
//         autoPlay={true}
//         autoPlaySpeed={5000}
//         stopAutoPlayOnHover={true}
//         infinite={true}
//         transitionDuration={500}
//       >
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default CarouselProducts;
