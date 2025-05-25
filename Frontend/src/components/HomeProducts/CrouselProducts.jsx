import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../../content/ProductsCard/productCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import api from "../../utils/axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CarouselProducts = () => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [products, setProducts] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://13.60.44.89:4000/api/products/get"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const cardContainer = document.getElementById("card-model-container");

    if (cardContainer) {
      // Create the scroll animation for this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          id: "card-animation-carousel",
        },
      });

      // Animation for the card in this section - move to center
      tl.to(cardContainer, {
        x: "0vw",
        y: "0vh",
        rotation: 0,
        scale: 0.5,
        duration: 1,
      });

      return () => {
        // Clean up this section's ScrollTrigger when component unmounts
        ScrollTrigger.getById("card-animation-carousel")?.kill();
      };
    }
  }, []);

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
    <div ref={sectionRef} className="w-full bg-[#041322]">
      {/* Funky background elements */}
      <div className="absolute  ">
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-funky-orange opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-funky-green opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-funky-teal text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-funky-pink to-funky-teal">
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
    </div>
  );
};

export default CarouselProducts;
