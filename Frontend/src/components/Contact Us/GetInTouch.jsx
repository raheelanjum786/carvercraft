import React, { useState } from "react";
import { motion } from "framer-motion";

import Footer from "../Footer/Footer";
import Navbar from "../../content/Navbar/Navbar";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    // Create mailto link
    const mailtoLink = `mailto:foodscravy@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#310a0b] py-6 sm:py-8 md:py-40 px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto w-full"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#e0a387] mb-3 sm:mb-4"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#b96a59] text-base sm:text-lg px-4"
            >
              We're here to help and answer any questions you might have
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#491b1d] p-6 sm:p-8 rounded-2xl shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#e0a387] mb-6 sm:mb-8">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-[#b96a59] p-2 sm:p-3 rounded-full">
                    <i className="fas fa-phone text-[#e0a387] text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[#b96a59] text-sm sm:text-base">
                      Call Us
                    </p>
                    <p className="text-[#e0a387] font-medium text-sm sm:text-base">
                      +92 (322) 062-4390
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="bg-[#b96a59] p-2 sm:p-3 rounded-full">
                    <i className="fas fa-envelope text-[#e0a387] text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <p className="text-[#b96a59] text-sm sm:text-base">
                      Email Us
                    </p>
                    <p className="text-[#e0a387] font-medium text-sm sm:text-base break-all">
                      foodscravy@gmail.com
                    </p>
                  </div>
                </div>
                <div className="pt-6 sm:pt-8">
                  <div className="flex space-x-3 sm:space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href="#"
                      className="bg-[#310a0b] p-2 sm:p-3 rounded-full text-[#e0a387] hover:bg-[#b96a59] transition-colors"
                    >
                      <FaTwitter />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href="#"
                      className="bg-[#310a0b] p-2 sm:p-3 rounded-full text-[#e0a387] hover:bg-[#b96a59] transition-colors"
                    >
                      <FaLinkedin />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href="#"
                      className="bg-[#310a0b] p-2 sm:p-3 rounded-full text-[#e0a387] hover:bg-[#b96a59] transition-colors"
                    >
                      <FaInstagram />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-[#491b1d] p-6 sm:p-8 rounded-2xl shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#e0a387] mb-6 sm:mb-8">
                Send us a Message
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full bg-[#310a0b] text-[#e0a387] placeholder-[#b96a59] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b96a59] transition-all text-sm sm:text-base"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full bg-[#310a0b] text-[#e0a387] placeholder-[#b96a59] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b96a59] transition-all text-sm sm:text-base"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    className="w-full bg-[#310a0b] text-[#e0a387] placeholder-[#b96a59] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b96a59] transition-all text-sm sm:text-base"
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    required
                    rows="4"
                    className="w-full bg-[#310a0b] text-[#e0a387] placeholder-[#b96a59] px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b96a59] transition-all resize-none text-sm sm:text-base"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#b96a59] text-[#e0a387] font-medium py-2 sm:py-3 rounded-lg hover:bg-[#e0a387] hover:text-[#310a0b] transition-all text-sm sm:text-base"
                >
                  Send Message
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default GetInTouch;
