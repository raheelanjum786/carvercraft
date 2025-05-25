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
    <div ref={sectionRef} className="min-h-screen bg-[#041322] relative">
      {/* Enhanced background animations */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-funky-orange opacity-20 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-funky-teal opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-funky-pink opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-funky-green opacity-20 blur-3xl"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
        <div
          className="absolute w-0.5 h-40 bg-gradient-to-b from-white to-transparent -rotate-45 animate-shooting-star"
          style={{ top: "10%", left: "80%" }}
        ></div>
        <div
          className="absolute w-0.5 h-20 bg-gradient-to-b from-white to-transparent -rotate-45 animate-shooting-star-delayed"
          style={{ top: "40%", left: "90%" }}
        ></div>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-funky-orange/50 rounded-full animate-float-cosmic"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 20}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] bg-gradient-to-br from-funky-pink/5 via-funky-teal/5 to-funky-orange/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-nebula-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vh] border border-funky-pink/10 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-cosmic-rotation-reverse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-funky-teal mb-6 animate-bounce">
            We don’t just make metal cards
          </h1>
          <p className="text-funky-orange text-2xl md:text-3xl font-light max-w-3xl mx-auto animate-pulse">
            we carve personality into steel.✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            data-aos="fade-right"
            className="bg-gradient-to-br from-funky-red to-funky-green rounded-[3rem] p-8 shadow-2xl border-4 border-white/20 min-h-[80vh] transform -rotate-2 relative"
          >
            {/* Text content container with animated border */}
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-funky-pink mb-6">
                What We Do
              </h2>
              <div className="space-y-4 text-[#041322]/80">
                <p className="transform hover:scale-105 transition-transform text-xl">
                  We transform your everyday debit or credit card into a custom
                  metal flex piece that’s as bold as you are.
                </p>
                <p className="transform hover:scale-105 transition-transform text-xl">
                  Using secure tech and high precision engraving, we clone your
                  card’s data (securely), design it to your vibe, and craft a
                  metal version that slaps “visually & literally”.
                </p>
                <p className="transform hover:scale-105 transition-transform text-xl">
                  Whether it’s for the aesthetic, the sound it makes at
                  checkout, or just to ditch the plastic, CarverCraft is how
                  Next Gen upgrade their wallet game.
                </p>
              </div>
            </div>

            {/* Animated background elements inside the card */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute w-full h-1 bg-white/30 top-0 animate-slide-right"></div>
              <div className="absolute w-full h-1 bg-white/30 bottom-0 animate-slide-left"></div>
              <div className="absolute h-full w-1 bg-white/30 left-0 animate-slide-down"></div>
              <div className="absolute h-full w-1 bg-white/30 right-0 animate-slide-up"></div>
            </div>
          </motion.div>
          <motion.div
            data-aos="fade-left"
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="relative group"
          >
            <img
              src={aboutUs}
              alt="About Us"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>

        <motion.div
          data-aos="fade-up"
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-funky-orange via-funky-pink to-funky-teal blur-3xl animate-pulse" />
          <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] p-10 text-center border-4 border-white/30">
            <h2 className="text-4xl font-bold text-funky-orange mb-6 animate-bounce">
              Our Cosmic Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Self-Expression is Power",
                  description:
                    "We believe your wallet should speak your vibe. Every card is a canvas made to reflect your style, story, and statement.",
                },
                {
                  title: "No Boring Allowed",
                  description:
                    "We’re done with the default. CarverCraft exists to replace bland with bold, and plastic with premium. If it doesn’t spark curiosity, we’re not making it.",
                },
                {
                  title: "Design With a Pulse",
                  description:
                    "Tech, taste, and trends move fast and so do we. Our designs are inspired by culture, not corporate. We stay real, raw, and always relevant",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-funky-pink/50 to-funky-teal/50 transform hover:rotate-3 transition-all duration-300 relative group"
                >
                  {/* Animated spotlight effect */}
                  <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <h3 className="text-2xl font-bold text-funky-orange mb-3">
                    {item.title}
                  </h3>
                  <p className="text-funky-green">{item.description}</p>
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
