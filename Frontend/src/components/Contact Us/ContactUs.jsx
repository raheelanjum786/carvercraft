import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import contactUs from "../../assets/contactUs.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef(null);

  // Remove the useEffect with GSAP animation

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
    <div
      ref={sectionRef}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative contact-section"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-funky-pink opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-funky-teal opacity-10 blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full mx-auto relative z-10"
      >
        {/* Rest of the JSX remains the same */}
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
            className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-funky-pink via-funky-teal to-funky-orange mb-4"
          >
            Let's Connect!
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-funky-green text-xl"
          >
            Drop us a line and let's create something awesome together
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-8 rounded-3xl shadow-2xl backdrop-blur-lg border border-funky-pink/20 relative overflow-hidden group"
          >
            {/* Animated border effect */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute w-full h-1 bg-white/30 top-0 animate-slide-right"></div>
              <div className="absolute w-full h-1 bg-white/30 bottom-0 animate-slide-left"></div>
              <div className="absolute h-full w-1 bg-white/30 left-0 animate-slide-down"></div>
              <div className="absolute h-full w-1 bg-white/30 right-0 animate-slide-up"></div>
            </div>

            <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></div>

            <div className="absolute bottom-0 translate-x-1/3 right-0 -z-10 md:h-[400px] md:w-[400px] animate-hover-glow">
              <img src={contactUs} alt="" />
            </div>

            <h3 className="text-3xl font-bold text-funky-teal mb-8 bg-clip-text relative">
              Contact Information
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-funky-pink to-funky-teal group-hover:w-full transition-all duration-700"></span>
            </h3>

            <div className="space-y-8">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-gradient-to-r from-funky-pink to-funky-orange p-4 rounded-2xl relative overflow-hidden group">
                  <i className="fas fa-phone text-white text-xl relative z-10"></i>
                  {/* Icon pulse effect */}
                  <div className="absolute inset-0 bg-white/20 scale-0 rounded-2xl group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>
                <div>
                  <p className="text-funky-teal">Ring Ring</p>
                  <p className="text-funky-green font-medium text-lg">
                    +32 328 23823 832
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <div className="bg-gradient-to-r from-funky-pink to-funky-red p-4 rounded-2xl relative overflow-hidden group">
                  <i className="fas fa-envelope text-white text-xl relative z-10"></i>
                  {/* Icon pulse effect */}
                  <div className="absolute inset-0 bg-white/20 scale-0 rounded-2xl group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </div>
                <div>
                  <p className="text-funky-teal">Drop a Line</p>
                  <p className="text-funky-green font-medium text-lg">
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
                      className="bg-gradient-to-br from-funky-pink to-funky-teal p-4 rounded-2xl text-white text-xl hover:shadow-lg hover:shadow-funky-pink/50 relative overflow-hidden group"
                    >
                      <Icon className="relative z-10" />
                      {/* Social icon glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 blur-xl transition-opacity duration-300"></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 p-8 rounded-3xl shadow-2xl backdrop-blur-lg border border-funky-teal/20 relative overflow-hidden group"
          >
            {/* Form background animations */}
            <div className="absolute inset-0 bg-gradient-to-br from-funky-pink/5 via-funky-teal/5 to-funky-orange/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-nebula-pulse opacity-30"></div>

            {/* Animated border effect */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute w-full h-1 bg-white/30 top-0 animate-slide-right-delayed"></div>
              <div className="absolute w-full h-1 bg-white/30 bottom-0 animate-slide-left-delayed"></div>
              <div className="absolute h-full w-1 bg-white/30 left-0 animate-slide-down-delayed"></div>
              <div className="absolute h-full w-1 bg-white/30 right-0 animate-slide-up-delayed"></div>
            </div>

            <div className="grid grid-cols-1 gap-6 relative z-10">
              {[
                { type: "text", placeholder: "Your Name", key: "name" },
                { type: "email", placeholder: "Your Email", key: "email" },
                { type: "text", placeholder: "Subject", key: "subject" },
              ].map((input, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                    className="w-full bg-purple-900/30 text-funky-teal placeholder-funky-orange/70 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-funky-pink transition-all backdrop-blur-sm relative z-10"
                    onChange={(e) =>
                      setFormData({ ...formData, [input.key]: e.target.value })
                    }
                  />
                  {/* Input focus animation */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-funky-pink to-funky-teal group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </motion.div>
              ))}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <textarea
                  placeholder="Your Message"
                  required
                  rows="4"
                  className="w-full bg-purple-900/30 text-funky-teal placeholder-funky-orange/70 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-funky-pink transition-all backdrop-blur-sm resize-none relative z-10"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
                {/* Textarea focus animation */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-funky-pink to-funky-teal group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(222, 1, 87, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-funky-pink via-funky-orange to-funky-red text-white font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Send Message</span>
                {/* Button shine effect */}
                <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
