import React, { useRef, useEffect } from "react";
import AboutUs from "./AboutUs";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  const sectionRef = useRef(null);

  // Create floating particles
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const createParticle = () => {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 bg-white/20 rounded-full";

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation duration
        const duration = 5 + Math.random() * 10;
        particle.style.animation = `floatAround ${duration}s ease-in-out infinite`;

        // Remove after some time
        setTimeout(() => {
          particle.remove();
        }, duration * 1000);

        section.appendChild(particle);
      };

      // Create particles at intervals
      const interval = setInterval(createParticle, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#041322] relative overflow-hidden">
      {/* Enhanced cosmic background animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Original funky blobs with enhanced animations */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
            filter: ["blur(30px)", "blur(40px)", "blur(30px)"],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-funky-orange to-funky-pink opacity-10 blur-3xl -top-48 -left-48"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 0, 180],
            filter: ["blur(40px)", "blur(50px)", "blur(40px)"],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-funky-teal to-funky-green opacity-10 blur-3xl -bottom-64 -right-64"
        ></motion.div>

        {/* New cosmic elements */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-funky-pink/20 via-purple-600/10 to-transparent blur-3xl top-1/4 left-1/3"
        ></motion.div>

        {/* Animated horizontal scan lines */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-teal/20 to-transparent top-[20%] animate-scan-horizontal"></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-pink/20 to-transparent top-[60%] animate-scan-horizontal-reverse"></div>

        {/* Animated vertical scan lines */}
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-orange/20 to-transparent left-[25%] animate-scan-vertical"></div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-teal/20 to-transparent right-[25%] animate-scan-vertical-reverse"></div>

        {/* Animated cosmic grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] animate-subtle-shift opacity-20"></div>

        {/* Cosmic dust particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-funky-teal/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Animated cosmic rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[80vw] h-[80vh] border border-funky-orange/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
            opacity: [0.05, 0.1, 0.05],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] border border-funky-pink/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [360, 0],
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated aurora at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-funky-teal/10 via-funky-pink/5 to-transparent animate-aurora opacity-20"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 overflow-hidden animate-pulse">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-funky-orange/10 rounded-full blur-3xl animate-spin"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-funky-red/10 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-funky-pink/10 rounded-full blur-2xl animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-funky-green/10 rounded-full blur-3xl animate-bounce"></div>
        </div>

        <motion.div
          className="text-center text-white z-10 px-4 hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-funky-teal via-funky-pink to-funky-orange text-transparent bg-clip-text hover:tracking-wider transition-all duration-500 pb-20"
            animate={{
              textShadow: [
                "0 0 10px rgba(25,215,232,0.5)",
                "0 0 15px rgba(222,1,87,0.5)",
                "0 0 10px rgba(255,165,0,0.5)",
                "0 0 10px rgba(25,215,232,0.5)",
              ],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Carvercraft Legacy
          </motion.h1>

          {/* Crazy Carousel with Bullet Points */}
          <motion.div
            className="mt-12 relative h-[400px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Cosmic orbit path */}
            <div className="absolute w-[300px] h-[300px] border-2 border-dashed border-funky-pink/30 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* Rotating bullet points */}
            {["Premium Metal Cards", "Custom Designs", "Exclusive Perks"].map(
              (text, index) => (
                <motion.div
                  key={index}
                  className="absolute left-1/2 top-1/2 w-40 h-40 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    x: [0, Math.cos(index * ((2 * Math.PI) / 3)) * 150 - 20],
                    y: [0, Math.sin(index * ((2 * Math.PI) / 3)) * 150 - 20],
                    scale: [1, 1.2, 0.8, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    x: {
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    y: {
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    scale: {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    delay: index * 0.5,
                  }}
                >
                  <div className="bg-gradient-to-r from-funky-orange to-funky-pink p-3 rounded-full shadow-lg shadow-funky-pink/30 transform hover:rotate-12 transition-all duration-300">
                    <p className="text-white font-bold text-center whitespace-nowrap">
                      {text}
                    </p>
                  </div>
                </motion.div>
              )
            )}

            {/* Featured point with title and description */}
            <motion.div
              className="absolute left-1/2 top-0 transform -translate-x-1/2 bg-gradient-to-br from-funky-teal/80 to-funky-green/80 p-4 rounded-xl w-64 backdrop-blur-sm"
              animate={{
                y: [0, 50, 0],
                x: [-100, 0, 100, 0, -100],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <h3 className="text-white text-xl font-bold mb-2">
                Cosmic Cards
              </h3>
              <p className="text-white/90 text-sm">
                Our signature metal cards are crafted from aerospace-grade
                materials for the ultimate flex.
              </p>
            </motion.div>

            {/* Cosmic divider */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-full h-1 bg-gradient-to-r from-transparent via-funky-orange/50 to-transparent"
              animate={{
                rotate: [0, 180, 360],
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Second featured point */}
            <motion.div
              className="absolute left-1/2 bottom-0 transform -translate-x-1/2 bg-gradient-to-br from-funky-pink/80 to-funky-red/80 p-4 rounded-xl w-64 backdrop-blur-sm"
              animate={{
                y: [0, -50, 0],
                x: [100, 0, -100, 0, 100],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "loop",
                delay: 5,
              }}
            >
              <h3 className="text-white text-xl font-bold mb-2">
                Galactic Membership
              </h3>
              <p className="text-white/90 text-sm">
                Join our exclusive community for early access to limited edition
                designs and special events.
              </p>
            </motion.div>

            {/* Animated stars between elements */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}

            {/* Floating bullet points at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
              {["Tap to Pay", "RFID Protection", "Lifetime Warranty"].map(
                (text, index) => (
                  <motion.div
                    key={`bottom-${index}`}
                    className="bg-funky-teal/30 backdrop-blur-sm px-3 py-1 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, index % 2 === 0 ? 10 : -10, 0],
                      rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.7,
                    }}
                  >
                    <p className="text-white text-sm whitespace-nowrap">
                      {text}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AboutUs />

      <div className="py-24 px-4 bg-gradient-to-b from-funky-pink/30 to-funky-teal/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-funky-orange/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-funky-teal/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -20, 0],
              y: [0, 20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          ></motion.div>

          {/* Additional cosmic elements */}
          <motion.div
            className="absolute top-1/2 left-1/3 w-40 h-40 bg-funky-pink/15 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          ></motion.div>

          {/* Animated stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Cosmic scan line */}
          <motion.div
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-funky-teal/30 to-transparent"
            style={{ top: "50%" }}
            animate={{
              y: [-100, 100],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
        </div>

        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-funky-orange to-funky-pink mb-8 hover:scale-110 transition-all duration-300 pb-10"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,165,0,0.3)",
                "0 0 15px rgba(222,1,87,0.3)",
                "0 0 10px rgba(255,165,0,0.3)",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            We’re building a crew.
          </motion.h2>
          <motion.p
            className="text-funky-green/80 mb-12 max-w-3xl mx-auto text-xl leading-relaxed hover:rotate-1 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to the tribe of bold spenders, quiet flexers, and custom
            card connoisseurs. From anime edits to streetwear drops, our
            community is where the loud, proud, and creative come to swipe in
            styles
          </motion.p>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-funky-pink to-funky-teal text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-funky-pink/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300 relative overflow-hidden group"
            whileHover={{
              boxShadow: "0 10px 25px -5px rgba(222, 1, 87, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Funky With Us!</span>
            {/* Button shine effect */}
            <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>

            {/* Animated cosmic particles around button */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-funky-teal/40 rounded-full"
                style={{
                  top: `${50 + (Math.random() * 100 - 50)}%`,
                  left: `${50 + (Math.random() * 100 - 50)}%`,
                }}
                animate={{
                  x: [0, Math.random() * 60 - 30],
                  y: [0, Math.random() * 60 - 30],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
