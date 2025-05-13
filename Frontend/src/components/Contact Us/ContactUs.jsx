import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactUs from "../../assets/contactUs.png";
gsap.registerPlugin(ScrollTrigger);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
          id: "card-animation-contact",
        },
      });

      // Final animation for the card - center it and make it prominent
      tl.to(cardContainer, {
        x: "10  vw",
        y: "-20vh",
        rotation: 0,
        scale: 0.6,
        duration: 1,
      });

      return () => {
        ScrollTrigger.getById("card-animation-contact")?.kill();
      };
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:raheelanjum255@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full mx-auto "
      >
        <div className="text-center mb-16">
          <motion.h2
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4"
          >
            Let's Connect!
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 text-xl">
            Drop us a line and let's create something awesome together
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-8 rounded-3xl shadow-2xl backdrop-blur-lg border border-purple-500/20 relative"
          >
            <div className="absolute bottom-0 translate-x-1/3 right-0 z-40 h-[400px] w-[400px]">
              <img src={contactUs} alt="" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-8 bg-clip-text">
              Contact Information
            </h3>
            <div className="space-y-8">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl">
                  <i className="fas fa-phone text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-purple-300">Ring Ring</p>
                  <p className="text-white font-medium text-lg">
                    +32 328 23823 832
                  </p>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-2xl">
                  <i className="fas fa-envelope text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-purple-300">Drop a Line</p>
                  <p className="text-white font-medium text-lg">
                    temporary@gmail.com
                  </p>
                </div>
              </motion.div>
              <div className="pt-8">
                <div className="flex space-x-6">
                  {[FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
                    <motion.a
                      key={index}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        y: -5,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      href="#"
                      className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl text-white text-xl hover:shadow-lg hover:shadow-purple-500/50"
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-8 rounded-3xl shadow-2xl backdrop-blur-lg border border-purple-500/20"
          >
            <div className="grid grid-cols-1 gap-6">
              {[
                { type: "text", placeholder: "Your Name", key: "name" },
                { type: "email", placeholder: "Your Email", key: "email" },
                { type: "text", placeholder: "Subject", key: "subject" },
              ].map((input, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                    className="w-full bg-purple-900/30 text-white placeholder-purple-300 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all backdrop-blur-sm"
                    onChange={(e) =>
                      setFormData({ ...formData, [input.key]: e.target.value })
                    }
                  />
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <textarea
                  placeholder="Your Message"
                  required
                  rows="4"
                  className="w-full bg-purple-900/30 text-white placeholder-purple-300 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all backdrop-blur-sm resize-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </motion.div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-all"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
