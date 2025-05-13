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
    const mailtoLink = `mailto:foodscravy@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#041322] py-6 sm:py-8 md:py-40 px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="w-full mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e0a387] to-[#b96a59] mb-3 sm:mb-4"
            >
              Let's Get Groovy!
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#b96a59] text-lg sm:text-xl px-4 italic"
            >
              Drop us a line and let's make magic happen! ✨
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 px-3 sm:px-4">
            <motion.div
              initial={{ x: -100, rotateY: -30 }}
              animate={{ x: 0, rotateY: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-gradient-to-tl from-[#491b1d] to-[#310a0b] p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-[#b96a59]/20"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[#e0a387] mb-8 transform hover:scale-105 transition-transform">
                Where to Find Us
              </h3>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform"
                >
                  <div className="bg-gradient-to-r from-[#b96a59] to-[#e0a387] p-3 rounded-full">
                    <i className="fas fa-phone text-[#310a0b] text-lg"></i>
                  </div>
                  <div>
                    <p className="text-[#b96a59] text-lg">Ring Ring!</p>
                    <p className="text-[#e0a387] font-medium text-lg">
                      +92 (322) 062-4390
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform"
                >
                  <div className="bg-gradient-to-r from-[#b96a59] to-[#e0a387] p-3 rounded-full">
                    <i className="fas fa-envelope text-[#310a0b] text-lg"></i>
                  </div>
                  <div>
                    <p className="text-[#b96a59] text-lg">Shoot us a mail!</p>
                    <p className="text-[#e0a387] font-medium text-lg break-all">
                      foodscravy@gmail.com
                    </p>
                  </div>
                </motion.div>

                <div className="pt-8">
                  <div className="flex space-x-6 justify-center">
                    {[FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        href="#"
                        className="bg-gradient-to-br from-[#310a0b] to-[#491b1d] p-4 rounded-full text-[#e0a387] hover:text-[#b96a59] transition-all text-xl shadow-lg"
                      >
                        <Icon />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ x: 100, rotateY: 30 }}
              animate={{ x: 0, rotateY: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-[#491b1d] to-[#310a0b] p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-[#b96a59]/20"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e0a387] to-[#b96a59] mb-8">
                Drop Your Beats Here!
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {["name", "email", "subject"].map((field) => (
                  <motion.div
                    key={field}
                    whileHover={{ scale: 1.02 }}
                    className="transform transition-all"
                  >
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Your ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      required
                      className="w-full bg-[#310a0b]/50 text-[#e0a387] placeholder-[#b96a59] px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b96a59] transition-all text-lg border border-[#b96a59]/30"
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    />
                  </motion.div>
                ))}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <textarea
                    placeholder="Spill the Tea! ☕"
                    required
                    rows="4"
                    className="w-full bg-[#310a0b]/50 text-[#e0a387] placeholder-[#b96a59] px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b96a59] transition-all resize-none text-lg border border-[#b96a59]/30"
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#b96a59] to-[#e0a387] text-[#310a0b] font-bold py-4 rounded-xl hover:from-[#e0a387] hover:to-[#b96a59] transition-all text-lg shadow-lg transform hover:-translate-y-1"
                >
                  Send it to the Moon! 🚀
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
