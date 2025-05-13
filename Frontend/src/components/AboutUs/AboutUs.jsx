import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutUs from "../../assets/aboutUs.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const cardContainer = document.getElementById("card-model-container");

    if (cardContainer) {
      // Create the scroll animation for this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          id: "card-animation-about",
        },
      });

      // Animation for the card in this section - move to left side
      tl.to(cardContainer, {
        x: "-30vw",
        y: "0vh",
        rotation: -15,
        scale: 0.7,
        duration: 1,
      });

      return () => {
        // Clean up this section's ScrollTrigger when component unmounts
        ScrollTrigger.getById("card-animation-about")?.kill();
      };
    }
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="absolute right-0 top-20 w-[200px]">
          <img src={aboutUs} alt="" />
        </div>
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 animate-bounce">
            Our Groovy Journey
          </h1>
          <p className="text-white/90 text-2xl md:text-3xl font-light max-w-3xl mx-auto animate-pulse">
            Crafting digital dreams into reality ✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            data-aos="fade-right"
            className="bg-gradient-to-br from-violet-600 to-indigo-800 rounded-[3rem] p-8 shadow-2xl border-4 border-white/20 min-h-[80vh] transform -rotate-2"
          >
            <h2 className="text-4xl font-bold text-yellow-300 mb-6 animate-pulse">
              Cosmic Innovation Hub
            </h2>
            <div className="space-y-4 text-white/90">
              <p className="transform hover:scale-105 transition-transform">
                We're not just thinking outside the box - we're redesigning the
                entire geometric concept of boxes! Our team of digital
                dreamweavers crafts experiences that defy conventional reality.
              </p>
              <p className="transform hover:scale-105 transition-transform">
                Join us on a psychedelic journey through the digital cosmos,
                where every pixel tells a story and every interaction sparks joy
                in the matrix of possibilities.
              </p>
            </div>
          </motion.div>
          <motion.div
            data-aos="fade-left"
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="relative group"
          >
            <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-2 animate-spin-slow">
              <div className="w-full h-full rounded-full overflow-hidden relative transform rotate-3">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          data-aos="fade-up"
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 blur-3xl animate-pulse" />
          <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] p-10 text-center border-4 border-white/30">
            <h2 className="text-4xl font-bold text-yellow-300 mb-6 animate-bounce">
              Our Cosmic Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Radical Quality",
                "Mind-Bending Innovation",
                "Stellar Sustainability",
              ].map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-600/50 to-pink-600/50 transform hover:rotate-3 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-yellow-300 mb-3">
                    {value}
                  </h3>
                  <p className="text-white">
                    Pushing boundaries and breaking barriers in the digital
                    cosmos, one pixel at a time! 🚀
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
