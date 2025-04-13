import { Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AboutUs from "./AboutUs";
import Footer from "../Footer/Footer";
const AboutUsPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div ref={containerRef} className="bg-[#310A0B] relative">
        {/* Three.js Canvas */}

        {/* Hero Section with Parallax */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -300]),
          }}
          className="min-h-screen flex items-center justify-center relative"
        >
          <div className="text-center text-white z-10">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-7xl font-bold mb-6 bg-gradient-to-r from-[#B96A59] to-[#E0A387] text-transparent bg-clip-text"
            >
              Discover Cravy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#E0A387] text-xl"
            >
              Where Nature Meets Innovation
            </motion.p>
          </div>
        </motion.div>

        {/* Original AboutUs Component */}
        <AboutUs />

        {/* Additional Interactive Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 px-4 bg-[#491B1D]"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#E0A387] mb-8">
              Join the Cravy Movement
            </h2>
            <p className="text-[#B96A59] mb-8 max-w-2xl mx-auto">
              Be part of a community that values quality, health, and
              sustainability. Subscribe to our newsletter for exclusive updates
              and offers.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
