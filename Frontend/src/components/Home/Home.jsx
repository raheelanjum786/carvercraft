import CardModel from "../Models/CardModel.jsx";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const cardModelRef = useRef(null);

  useEffect(() => {
    // We'll target the Canvas element directly for animation
    const cardModelElement = canvasRef.current.querySelector("canvas");

    if (cardModelElement) {
      // Create the scroll animation for just the card model
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#card-model-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: false, // Ensure markers are disabled
          id: "card-animation-home",
        },
      });

      // Animation for scrolling down from Home section
      tl.to(cardModelElement, {
        scale: 0.5,
        x: "30vw",
        y: "0vh",
        duration: 1,
      });

      return () => {
        // Clean up ScrollTrigger when component unmounts
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <>
      <div className="relative z-20" ref={sectionRef}>
        {/* Original background effects */}
        <div className="absolute w-64 h-80 bg-gradient-to-r from-funky-orange via-funky-red to-funky-pink rounded-full blur-3xl opacity-20 animate-pulse right-0 bottom-0"></div>
        <div className="absolute w-64 h-80 bg-funky-green rounded-full blur-3xl opacity-20 animate-pulse left-0 top-0"></div>

        {/* New floating gradient orbs */}
        <div className="absolute w-40 h-40 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full blur-2xl opacity-20 animate-float left-1/4 top-1/3"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full blur-2xl opacity-15 animate-float-delayed right-1/4 top-1/4"></div>

        {/* Animated background lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent top-1/3 animate-slide-right opacity-30"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent top-2/3 animate-slide-left opacity-30"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-pink-300 to-transparent left-1/3 animate-slide-down opacity-30"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-300 to-transparent right-1/3 animate-slide-up opacity-30"></div>
        </div>

        {/* Particle effect container */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Glowing corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500 to-transparent opacity-20 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500 to-transparent opacity-20 blur-xl"></div>

        <div className="h-[100vh] w-full rounded-t-[200px] flex items-center justify-center second">
          <div
            ref={canvasRef}
            id="card-model-container"
            className="relative w-[80%] h-[40%] md:h-[90%] "
          >
            <Canvas
              ref={cardModelRef}
              camera={{ position: [0, 10, 20], fov: 50 }}
              className="card-model-canvas"
            >
              <ambientLight intensity={2} />
              <directionalLight position={[0, 20, 20]} intensity={2} />
              <CardModel />
            </Canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
