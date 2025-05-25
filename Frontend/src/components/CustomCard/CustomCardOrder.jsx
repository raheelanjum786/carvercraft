import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";

const CustomCardOrder = () => {
  const [cardTypes, setCardTypes] = useState([]);
  const [selectedCardType, setSelectedCardType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [designFile, setDesignFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchCardTypes = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/cardTypes/getAll"
        );
        setCardTypes(response.data);
        if (response.data.length > 0) {
          setSelectedCardType(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching card types:", error);
        setError("Failed to load card types. Please try again later.");
      }
    };

    fetchCardTypes();
  }, []);

  // Create floating particles
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      const createParticle = () => {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 bg-white/20 rounded-full";

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation duration
        const duration = 5 + Math.random() * 10;
        particle.style.animation = `floatAround ${duration}s ease-in-out infinite`;

        // Remove after some time
        setTimeout(() => {
          particle.remove();
        }, duration * 1000);

        section.appendChild(particle);
      };

      // Create particles at intervals
      const interval = setInterval(createParticle, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDesignFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCardType) {
      setError("Please select a card type");
      return;
    }

    if (!designFile) {
      setError("Please upload your design");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("cardTypeId", selectedCardType);
      formData.append("quantity", quantity);
      formData.append("customerNotes", notes);
      formData.append("design", designFile);

      const response = await api.post(
        "http://localhost:4000/api/cardOrders/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        navigate("/order-success", {
          state: {
            message: "Your custom card order has been placed successfully!",
            orderId: response.data.id,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setError(
        error.response?.data?.error ||
          "Failed to submit order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedCardType) return 0;
    const cardType = cardTypes.find(
      (type) => type.id === parseInt(selectedCardType)
    );
    return cardType ? cardType.price * quantity : 0;
  };

  return (
    <>
      <div
        ref={sectionRef}
        className="min-h-screen bg-[#041322] text-funky-green relative overflow-hidden"
      >
        {/* Enhanced cosmic background animations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Original funky blobs with enhanced animations */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
              filter: ["blur(30px)", "blur(40px)", "blur(30px)"],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-funky-orange to-funky-pink opacity-10 blur-3xl -top-48 -left-48"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, 0, 180],
              filter: ["blur(40px)", "blur(50px)", "blur(40px)"],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-l from-funky-teal to-funky-green opacity-10 blur-3xl -bottom-64 -right-64"
          ></motion.div>

          {/* New cosmic elements */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-funky-pink/20 via-purple-600/10 to-transparent blur-3xl top-1/4 left-1/3"
          ></motion.div>

          {/* Animated horizontal scan lines */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-teal/20 to-transparent top-[20%] animate-scan-horizontal"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-pink/20 to-transparent top-[60%] animate-scan-horizontal-reverse"></div>

          {/* Animated vertical scan lines */}
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-orange/20 to-transparent left-[25%] animate-scan-vertical"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-teal/20 to-transparent right-[25%] animate-scan-vertical-reverse"></div>

          {/* Animated cosmic grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] animate-subtle-shift opacity-20"></div>

          {/* Cosmic dust particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-funky-teal/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}

          {/* Animated cosmic rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[80vw] h-[80vh] border border-funky-orange/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05],
              scale: [0.8, 1, 0.8],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] border border-funky-pink/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [360, 0],
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 0.9, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Animated aurora at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-funky-teal/10 via-funky-pink/5 to-transparent animate-aurora opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-funky-orange to-funky-pink"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Custom Card Order
          </motion.h1>

          {error && (
            <motion.div
              className="bg-[#041322]/30 border border-funky-red text-funky-red px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div
            className="bg-[#041322BB] backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-funky-teal/30 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Animated border effect */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute w-full h-1 bg-white/30 top-0 animate-slide-right"></div>
              <div className="absolute w-full h-1 bg-white/30 bottom-0 animate-slide-left"></div>
              <div className="absolute h-full w-1 bg-white/30 left-0 animate-slide-down"></div>
              <div className="absolute h-full w-1 bg-white/30 right-0 animate-slide-up"></div>
            </div>

            {/* Animated spotlight effect */}
            <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></div>

            {/* Animated nebula effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-funky-pink/5 via-funky-teal/5 to-funky-orange/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-nebula-pulse opacity-30"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* Card Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block text-funky-teal mb-3 font-semibold text-xl">
                  Select Card Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cardTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                        selectedCardType === type.id
                          ? "border-funky-teal bg-gradient-to-br from-funky-pink/20 to-funky-teal/20 shadow-lg"
                          : "border-funky-pink/50 hover:border-funky-teal hover:shadow-md"
                      }`}
                      onClick={() => setSelectedCardType(type.id)}
                      whileHover={{
                        boxShadow: "0 10px 25px -5px rgba(25, 215, 232, 0.3)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      {/* Card type glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-funky-pink via-funky-teal to-funky-orange rounded-lg opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 -z-10"></div>

                      {/* Card type shine effect */}
                      <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>

                      {type.imageUrl && (
                        <div className="mb-3 h-32 overflow-hidden rounded group">
                          <motion.img
                            src={`http://localhost:4000/api${type.imageUrl}`}
                            alt={type.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-card.png";
                            }}
                          />
                        </div>
                      )}
                      <h3 className="font-bold text-lg mb-1 text-funky-orange">
                        {type.name}
                      </h3>
                      <p className="text-sm text-funky-green/80 mb-2">
                        {type.description}
                      </p>
                      <p className="font-semibold text-funky-teal">
                        € {type.price.toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Design Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-funky-teal mb-3 font-semibold text-xl">
                  Upload Your Design
                </label>
                <motion.div
                  className="border-2 border-dashed border-funky-pink/70 rounded-lg p-6 text-center relative overflow-hidden group"
                  whileHover={{ borderColor: "#19D7E8" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Upload area glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-funky-pink/20 via-funky-teal/20 to-funky-orange/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>

                  {/* Animated cosmic particles in upload area */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-funky-teal/40 rounded-full"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}

                  {previewUrl ? (
                    <motion.div
                      className="mb-4 relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Preview image cosmic frame */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-funky-pink via-funky-teal to-funky-orange rounded-md opacity-30 blur-sm"></div>

                      <img
                        src={previewUrl}
                        alt="Design Preview"
                        className="max-h-64 mx-auto rounded-md shadow-lg relative z-10"
                      />
                      <motion.button
                        type="button"
                        onClick={() => {
                          setDesignFile(null);
                          setPreviewUrl("");
                        }}
                        className="mt-3 text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded-full relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Remove</span>
                        {/* Button shine effect */}
                        <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="py-10 relative">
                      <motion.p
                        className="text-funky-teal mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        Drag and drop your design file here, or click to browse
                      </motion.p>
                      <motion.p
                        className="text-xs text-funky-teal/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        Supported formats: JPG, PNG, PDF, AI, PSD (Max 10MB)
                      </motion.p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
                    onChange={handleFileChange}
                    className="hidden"
                    id="design-upload"
                  />
                  <motion.label
                    htmlFor="design-upload"
                    className="inline-block px-5 py-2 bg-gradient-to-r from-funky-red/20 to-funky-orange/50  text-funky-teal rounded-full cursor-pointer shadow-md relative overflow-hidden group"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(116, 58, 54, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">
                      {previewUrl ? "Change Design" : "Select File"}
                    </span>
                    {/* Button shine effect */}
                    <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>
                  </motion.label>
                </motion.div>
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="block text-funky-teal mb-3 font-semibold text-xl">
                  Quantity
                </label>
                <div className="relative group">
                  {/* Input glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-funky-pink/20 via-funky-teal/20 to-funky-orange/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>

                  <motion.input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-funky-pink/50 rounded-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-funky-green relative z-10"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="block text-funky-teal mb-3 font-semibold text-xl">
                  Special Instructions (Optional)
                </label>
                <div className="relative group">
                  {/* Textarea glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-funky-pink/20 via-funky-teal/20 to-funky-orange/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>

                  <motion.textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-black/30 border border-funky-pink/50 rounded-lg focus:outline-none focus:border-funky-teal focus:ring-2 focus:ring-funky-teal/30 transition-all duration-300 text-funky-green relative z-10"
                    placeholder="Any special requirements or notes for your order..."
                    whileFocus={{ scale: 1.02 }}
                  ></motion.textarea>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="bg-gradient-to-br from-funky-pink/10 to-funky-teal/10 p-6 rounded-lg shadow-inner border border-funky-pink/30 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {/* Summary glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-funky-pink/10 via-funky-teal/10 to-funky-orange/10 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>

                {/* Animated cosmic particles in summary */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-funky-orange/40 rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                <h3 className="font-bold text-xl mb-4 text-funky-orange relative z-10">
                  Order Summary
                </h3>
                <div className="flex justify-between mb-2 text-funky-green relative z-10">
                  <span>Card Type:</span>
                  <span className="font-medium">
                    {selectedCardType
                      ? cardTypes.find(
                          (t) => t.id === parseInt(selectedCardType)
                        )?.name
                      : "None selected"}
                  </span>
                </div>
                <div className="flex justify-between mb-2 text-funky-green relative z-10">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <motion.div
                  className="flex justify-between font-bold text-xl mt-4 pt-3 border-t border-funky-pink/30 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="text-funky-green">Total:</span>
                  <motion.span
                    className="text-funky-orange"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(255,165,0,0.3)",
                        "0 0 10px rgba(255,165,0,0.5)",
                        "0 0 5px rgba(255,165,0,0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    € {calculateTotal().toLocaleString()}
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading || !selectedCardType || !designFile}
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                    loading || !selectedCardType || !designFile
                      ? "bg-funky-pink/30 text-white/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-funky-pink to-funky-teal hover:from-funky-teal hover:to-funky-pink text-white shadow-lg"
                  }`}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(222, 1, 87, 0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center relative z-10">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="relative z-10">Place Custom Order</span>
                  )}
                  {/* Button shine effect */}
                  <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>
                </motion.button>
              </motion.div>
            </form>

            {/* Cosmic corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-funky-pink/30 rounded-tl-lg animate-pulse-slow"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-funky-teal/30 rounded-tr-lg animate-pulse-slower"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-funky-teal/30 rounded-bl-lg animate-pulse-slower"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-funky-pink/30 rounded-br-lg animate-pulse-slow"></div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomCardOrder;
