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
      className="min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 flex items-center  justify-center bg-gradient-to-b from-[#041322] to-[#041322]/90 relative"
    >
      {/* Sleek background elements */}
      <div className="absolute inset-0 ">
        {/* Smooth gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/10 blur-3xl animate-pulse-slower"></div>

        {/* Sleek animated lines */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent top-[20%] animate-scan-horizontal"></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent top-[80%] animate-scan-horizontal-reverse"></div>

        {/* Glowing corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-blue-500/10 to-transparent opacity-50 blur-2xl"></div>

        {/* Subtle animated mesh grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] animate-subtle-shift opacity-30"></div>

        {/* Floating light particles */}
        <div className="absolute w-2 h-2 rounded-full bg-white/50 blur-sm top-1/4 left-1/2 animate-float-slow"></div>
        <div className="absolute w-1 h-1 rounded-full bg-white/50 blur-sm top-1/2 left-1/4 animate-float-medium"></div>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-white/50 blur-sm top-3/4 left-3/4 animate-float-fast"></div>

        {/* Smooth wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-900/10 to-transparent animate-wave opacity-30"></div>

        {/* Glowing accent ring */}
        <div className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] border border-indigo-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse-ring"></div>
        <div className="absolute top-1/2 left-1/2 w-[30vw] h-[30vw] border border-cyan-500/15 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse-ring-delayed"></div>
      </div>

      <div className="w-full relative z-10">
        <LatestProductCard />
      </div>
    </div>
  );
};

export default HomeProducts;
