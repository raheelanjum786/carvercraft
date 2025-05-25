import React, { useState } from "react";
import { motion } from "framer-motion";

import Footer from "../Footer/Footer";
import Navbar from "../../content/Navbar/Navbar";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ContactUs from "./ContactUs";

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
          <ContactUs />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default GetInTouch;
