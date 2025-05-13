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
      <div className="overflow-hidden relative z-20" ref={sectionRef}>
        <div className="h-[100vh] w-full rounded-t-[200px] flex items-center justify-center second">
          <div
            ref={canvasRef}
            id="card-model-container"
            className="relative w-[80%] h-[90%] "
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
