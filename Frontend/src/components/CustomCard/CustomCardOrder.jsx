import React, { useState, useEffect } from "react";
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
      <div className="min-h-screen bg-[#041322] text-[#E0A387]">
        <div className="container mx-auto px-4 py-12">
          <motion.h1
            className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#E0A387] to-[#FF7F50]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Custom Card Order
          </motion.h1>

          {error && (
            <motion.div
              className="bg-[#041322]/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div
            className="bg-[#041322BB] backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-[#743A36]/30 shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Card Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block text-[#E0A387] mb-3 font-semibold text-xl">
                  Select Card Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cardTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedCardType === type.id
                          ? "border-[#E0A387] bg-gradient-to-br from-[#743A36]/70 to-[#491B1D]/70 shadow-lg"
                          : "border-[#743A36] hover:border-[#E0A387]/50 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedCardType(type.id)}
                      whileHover={{
                        boxShadow: "0 10px 25px -5px rgba(224, 163, 135, 0.3)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
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
                      <h3 className="font-bold text-lg mb-1">{type.name}</h3>
                      <p className="text-sm text-[#B96A59] mb-2">
                        {type.description}
                      </p>
                      <p className="font-semibold">
                        Rs. {type.price.toLocaleString()}
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
                <label className="block text-[#E0A387] mb-3 font-semibold text-xl">
                  Upload Your Design
                </label>
                <motion.div
                  className="border-2 border-dashed border-[#743A36] rounded-lg p-6 text-center"
                  whileHover={{ borderColor: "#E0A387" }}
                  transition={{ duration: 0.3 }}
                >
                  {previewUrl ? (
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={previewUrl}
                        alt="Design Preview"
                        className="max-h-64 mx-auto rounded-md shadow-lg"
                      />
                      <motion.button
                        type="button"
                        onClick={() => {
                          setDesignFile(null);
                          setPreviewUrl("");
                        }}
                        className="mt-3 text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="py-10">
                      <motion.p
                        className="text-[#B96A59] mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        Drag and drop your design file here, or click to browse
                      </motion.p>
                      <motion.p
                        className="text-xs text-[#B96A59]/70"
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
                    className="inline-block px-5 py-2 bg-gradient-to-r from-[#743A36] to-[#B96A59] text-[#E0A387] rounded-full cursor-pointer shadow-md"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(116, 58, 54, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {previewUrl ? "Change Design" : "Select File"}
                  </motion.label>
                </motion.div>
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="block text-[#E0A387] mb-3 font-semibold text-xl">
                  Quantity
                </label>
                <motion.input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full px-4 py-3 bg-[#310A0B] border border-[#743A36] rounded-lg focus:outline-none focus:border-[#E0A387] focus:ring-2 focus:ring-[#E0A387]/30 transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="block text-[#E0A387] mb-3 font-semibold text-xl">
                  Special Instructions (Optional)
                </label>
                <motion.textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#310A0B] border border-[#743A36] rounded-lg focus:outline-none focus:border-[#E0A387] focus:ring-2 focus:ring-[#E0A387]/30 transition-all duration-300"
                  placeholder="Any special requirements or notes for your order..."
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="bg-gradient-to-br from-[#491B1D]/70 to-[#310A0B]/70 p-6 rounded-lg shadow-inner border border-[#743A36]/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="font-bold text-xl mb-4 text-[#E0A387]">
                  Order Summary
                </h3>
                <div className="flex justify-between mb-2">
                  <span>Card Type:</span>
                  <span className="font-medium">
                    {selectedCardType
                      ? cardTypes.find(
                          (t) => t.id === parseInt(selectedCardType)
                        )?.name
                      : "None selected"}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <motion.div
                  className="flex justify-between font-bold text-xl mt-4 pt-3 border-t border-[#743A36]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span>Total:</span>
                  <span className="text-[#E0A387]">
                    Rs. {calculateTotal().toLocaleString()}
                  </span>
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
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    loading || !selectedCardType || !designFile
                      ? "bg-[#743A36]/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#743A36] to-[#B96A59] hover:from-[#B96A59] hover:to-[#E0A387] hover:text-[#310A0B] shadow-lg"
                  }`}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(116, 58, 54, 0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
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
                    "Place Order"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomCardOrder;
