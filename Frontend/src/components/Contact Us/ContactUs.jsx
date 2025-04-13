import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
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
    const mailtoLink = `mailto:raheelanjum255@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-[#131313] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg"
          >
            We're here to help and answer any questions you might have
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 p-8 rounded-2xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500 p-3 rounded-full">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div>
                  <p className="text-gray-400">Call Us</p>
                  <p className="text-white font-medium">+92 (322) 0624390</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-pink-500 p-3 rounded-full">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <p className="text-gray-400">Email Us</p>
                  <p className="text-white font-medium">foodscravy@gmail.com</p>
                </div>
              </div>
              <div className="pt-8">
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="bg-gray-700 p-3 rounded-full text-white hover:bg-purple-500 transition-colors"
                  >
                    <i className="fab fa-twitter"></i>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="bg-gray-700 p-3 rounded-full text-white hover:bg-purple-500 transition-colors"
                  >
                    <i className="fab fa-linkedin"></i>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="bg-gray-700 p-3 rounded-full text-white hover:bg-purple-500 transition-colors"
                  >
                    <i className="fab fa-instagram"></i>
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
            className="bg-gray-800 p-8 rounded-2xl shadow-2xl"
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
                  className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
                  className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
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
                  className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-all"
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
