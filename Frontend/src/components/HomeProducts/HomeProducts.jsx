// HomeProducts.jsx
import LatestProductCard from "../../content/LatestProduct/LatestProductCard";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeProducts = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cardContainer = document.getElementById("card-model-container");

    if (cardContainer) {
      // Create the scroll animation for this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          id: "card-animation-products",
        },
      });

      // Animation for the card in this section
      tl.to(cardContainer, {
        x: "40vw",
        y: "0vh",
        rotation: 15,
        scale: 0.6,
        duration: 1,
      });

      return () => {
        // Clean up this section's ScrollTrigger when component unmounts
        ScrollTrigger.getById("card-animation-products")?.kill();
      };
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 flex items-center overflow-hidden justify-center"
    >
      <div className="w-full">
        <LatestProductCard />
      </div>
    </div>
  );
};

export default HomeProducts;
