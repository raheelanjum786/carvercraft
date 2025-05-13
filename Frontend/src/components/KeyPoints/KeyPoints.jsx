import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KeyPoints = () => {
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
          id: "card-animation-keypoints",
        },
      });

      // Animation for the card in this section - move to right side and rotate
      tl.to(cardContainer, {
        x: "30vw",
        y: "10vh",
        rotation: 30,
        scale: 0.4,
        duration: 1,
      });

      return () => {
        // Clean up this section's ScrollTrigger when component unmounts
        ScrollTrigger.getById("card-animation-keypoints")?.kill();
      };
    }
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
      <div className="h-screen w-full"></div>
    </div>
  );
};

export default KeyPoints;
