import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CardModel from "./Models/PosModel";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pos from "../assets/pos.png";

gsap.registerPlugin(ScrollTrigger);

const PosPage = () => {
  useEffect(() => {
    // This ensures the card model is hidden when this component is visible
    const cardContainer = document.getElementById("card-model-container");
    if (cardContainer) {
      // We'll let the HomePage component handle the animation
      // This is just a safety measure
      ScrollTrigger.create({
        trigger: "#pos-page-section",
        start: "top center",
        onEnter: () => {
          gsap.to(cardContainer, { autoAlpha: 0, duration: 0.3 });
        },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#041322] ">
      {/* Canvas and model would go here */}
      <div className="w-full  flex justify-end items-end min-h-screen pl-36 lg:pr-32">
        <img src={pos} alt="cscd" className="w-96 h-96 " />
      </div>
    </div>
  );
};

export default PosPage;
