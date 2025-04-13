import { motion } from "framer-motion";
import { Suspense, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen text-white py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#B96A59] to-[#E0A387] text-transparent bg-clip-text"
          >
            About Cravy
          </motion.h1>
          <p className="text-[#E0A387] text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto px-4">
            Fueling Your Active Lifestyle with Premium Energy Bars
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20 overflow-hidden">
          <motion.div data-aos="fade-right" className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E0A387]">
              Our Story
            </h2>
            <p className="text-[#B96A59] leading-relaxed text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[#B96A59] leading-relaxed text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p className="text-[#B96A59] leading-relaxed text-sm sm:text-base">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p className="text-[#B96A59] leading-relaxed text-sm sm:text-base">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </motion.div>
          <motion.div data-aos="fade-left" className="relative">
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#743A36]">
              {/* <img
                src={CravyPic}
                alt="Natural Ingredients"
                className="w-full h-full object-cover"
              /> */}
            </div>
          </motion.div>
        </div>

        {/* Additional Feature Section */}
        <motion.div
          data-aos="fade-up"
          className="mt-12 sm:mt-16 lg:mt-20 text-center bg-[#491B1D] p-8 sm:p-12 rounded-lg border border-[#743A36]"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E0A387] mb-4 sm:mb-6">
            Our Commitment to Excellence
          </h2>
          <p className="text-[#B96A59] max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
