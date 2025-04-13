import React, { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "react-modal"; // Ensure you have react-modal installed
import { Alert } from "antd";
import api from "../../utils/axios";
import SideBar from "./SideBar";

const AdminCreateGift = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    price: "",
    description: "",
    benefits: "",
    isReadyMade: true,
  });

  const [images, setImages] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "Successfully Added",
    type: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.title ||
      !formData.price ||
      !formData.description
    ) {
      setAlert({
        show: true,
        message: "Please fill out all required fields.",
        type: "error",
      });
      return;
    }

    if (images.length === 0) {
      setAlert({
        show: true,
        message: "Please upload at least one image",
        type: "error",
      });
      return;
    }

    try {
      const productData = new FormData();

      // Append form data
      productData.append("name", formData.name);
      productData.append("title", formData.title);
      productData.append("price", formData.price);
      productData.append("description", formData.description);
      productData.append("benefits", formData.benefits);
      productData.append("isReadyMade", formData.isReadyMade);

      // Append images
      images.forEach((image) => {
        productData.append("images", image.file);
      });

      console.log([...productData.entries()]); // Debugging

      // Submit data
      const response = await api.post(
        "http://localhost:4000/api/gifts/create",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlert({
        show: true,
        message: "Gift created successfully!",
        type: "success",
      });

      // Reset form
      setFormData({
        name: "",
        title: "",
        price: "",
        description: "",
        benefits: "",
        isReadyMade: true,
      });
      setImages([]);
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.error || "Failed to create gift",
        type: "error",
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const saveGift = () => {
    // Handle saving the gift data here
    console.log({ ...formData, images });
    setPreviewOpen(false); // Close modal after saving
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <div className="flex">
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      </div>
      <div
        className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-[#E0A387]/5 backdrop-blur-sm rounded-lg shadow-xl p-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#E0A387] mb-8 text-center">
            Create New Gift
          </h1>
          {alert.show && (
            <Alert severity={alert.type} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gift Type Selection */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <h2 className="flex-1 py-3 px-6 text-center text-[#E0A387]">
                Ready-Made Gift
              </h2>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-[#E0A387] mb-2">Gift Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#743A36] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B96A59] bg-[#310A0B]/60 text-[#E0A387]"
                required
              />
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-[#E0A387] mb-2">Display Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#743A36] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B96A59] bg-[#310A0B]/60 text-[#E0A387]"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-[#E0A387] mb-2">Gift Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-[#743A36] rounded-lg hover:border-[#B96A59] cursor-pointer group transition-all duration-300">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <FaUpload className="mx-auto text-[#E0A387] text-xl mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[#E0A387] text-sm">Add Images</span>
                  </div>
                </label>

                {images.map((image, index) => (
                  <div key={index} className="relative h-32">
                    <img
                      src={image.url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-[#310A0B]/80 rounded-full text-[#E0A387] hover:text-[#B96A59] transition-colors duration-300"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-[#E0A387] mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#743A36] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B96A59] bg-[#310A0B]/60 text-[#E0A387]"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#E0A387] mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#743A36] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B96A59] bg-[#310A0B]/60 text-[#E0A387] min-h-[100px]"
                required
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-[#E0A387] mb-2">Benefits</label>
              <textarea
                value={formData.benefits}
                onChange={(e) =>
                  setFormData({ ...formData, benefits: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#743A36] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B96A59] bg-[#310A0B]/60 text-[#E0A387] min-h-[100px]"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: "",
                    title: "",
                    price: "",
                    description: "",
                    benefits: "",
                    isReadyMade: true,
                  });
                  setImages([]);
                }}
                className="px-6 py-3 bg-[#310A0B] text-[#E0A387] rounded-md hover:bg-[#491B1D] transition duration-300"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#743A36] text-[#E0A387] rounded-md hover:bg-[#B96A59] transition duration-300"
              >
                Create Gift
              </button>
            </div>
          </form>
        </motion.div>

        {/* Modal for Preview */}
        <Modal
          isOpen={previewOpen}
          onRequestClose={() => setPreviewOpen(false)}
          contentLabel="Preview Gift"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={false}
        >
          <div className="flex">
            <div className="flex flex-col items-center">
              <button onClick={prevImage} className="mb-2">
                Previous
              </button>
              {images.length > 0 && (
                <img
                  src={images[currentImageIndex].url}
                  alt={`Preview ${currentImageIndex}`}
                  className="w-64 h-64 object-cover rounded-lg"
                />
              )}
              <button onClick={nextImage} className="mt-2">
                Next
              </button>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold text-[#E0A387]">
                {formData.title}
              </h2>
              <p className="text-[#E0A387]">{formData.description}</p>
              <p className="text-[#E0A387]">Price: ${formData.price}</p>
              <p className="text-[#E0A387]">Benefits: {formData.benefits}</p>
              <button
                onClick={saveGift}
                className="mt-4 px-4 py-2 bg-[#743A36] text-[#E0A387] rounded-md hover:bg-[#B96A59] transition duration-300"
              >
                Save Gift
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AdminCreateGift;
