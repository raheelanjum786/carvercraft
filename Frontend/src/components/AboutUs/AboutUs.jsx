import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 mb-6">
            Our Journey
          </h1>
          <p className="text-orange-200 text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            data-aos="fade-right"
            className="bg-[#1f1f1f] rounded-2xl p-8 shadow-xl border border-orange-900/20"
          >
            <h2 className="text-3xl font-bold text-orange-400 mb-6">
              Lorem Ipsum Dolor
            </h2>
            <div className="space-y-4 text-orange-100/80">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia.
              </p>
            </div>
          </motion.div>
          <motion.div data-aos="fade-left" className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 p-1">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                {/* Image placeholder with stylish gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div data-aos="fade-up" className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 blur-3xl" />
          <div className="relative bg-black/40 backdrop-blur-sm rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-bold text-orange-400 mb-6">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {["Quality", "Innovation", "Sustainability"].map(
                (value, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-gradient-to-br from-orange-900/20 to-red-900/20"
                  >
                    <h3 className="text-xl font-semibold text-orange-300 mb-3">
                      {value}
                    </h3>
                    <p className="text-orange-100/70">
                      Committed to excellence in every aspect of our product
                      development and customer experience.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
