import { motion, useScroll, useTransform } from "framer-motion";
import { LampContainer } from "../../content/ui/lampBg";
import { useRef } from "react";

const Home = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <div className="bg-[#131313] w-full min-h-screen overflow-hidden">
        <div ref={ref} className="relative min-h-screen">
          {/* Main Container */}
          <LampContainer>
            <motion.h1
              style={{ y, opacity }}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-9xl font-medium tracking-tight text-transparent md:text-10xl lg:text-12xl xl:text-14xl md:text-10xl lg:text-12xl xl:text-[13rem] 2xl:text-[14rem] transition-transform duration-700 ease-in-out hover:scale-110"
            >
              CarverCraft
            </motion.h1>
          </LampContainer>
        </div>
        <div className="relative min-h-screen">{/* Main Container */}</div>
      </div>
    </>
  );
};

export default Home;
