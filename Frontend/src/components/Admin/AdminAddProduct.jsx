import React, { useState, useEffect } from "react";
import { FaUpload, FaImages, FaTrash } from "react-icons/fa";
import SideBar from "../../components/Admin/SideBar";
import { Alert, Modal } from "antd";
import api from "../../utils/axios";

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    isLatest: false,
  });
  const [images, setImages] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "Successfully Added",
    type: "success",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          "http://13.60.44.89:4000/api/categories/get"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAlert({
          show: true,
          message: "Failed to load categories",
          type: "error",
        });
      }
    };

    fetchCategories();
  }, []);

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (images.length === 0) {
        setAlert({
          show: true,
          message: "Please upload at least one image",
          type: "error",
        });
        return;
      }

      const productData = new FormData();

      // Append form data
      productData.append("name", formData.name);
      productData.append("category", formData.category);
      productData.append("price", formData.price);
      productData.append("description", formData.description);
      productData.append("isLatest", formData.isLatest);

      // Append images
      images.forEach((image) => {
        productData.append("images", image.file);
      });

      const response = await api.post(
        "http://13.60.44.89:4000/api/products/add",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlert({
        show: true,
        message: "Product created successfully!",
        type: "success",
      });

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        isLatest: false,
      });
      setImages([]);
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.error || "Failed to create product",
        type: "error",
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      setAlert({
        show: true,
        message: "Maximum 5 images allowed",
        type: "error",
      });
      return;
    }

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      <div
        className={`min-h-screen bg-[#1A1A1A] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <div className="p-4 md:p-6 w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto bg-[#2D2D2D] rounded-lg shadow-xl">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 text-center">
            Add New Product
          </h1>

          {alert.show && (
            <Alert message={alert.message} type={alert.type} className="mb-4" />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-white mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#34495E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2C3E50] text-white"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-white mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#34495E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2C3E50] text-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-white mb-2">Product Images</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-[#34495E] rounded-lg hover:border-[#3498DB] cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <FaUpload className="text-white text-xl" />
                </label>

                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 sm:w-28 sm:h-28"
                  >
                    <img
                      src={image.url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() => handlePreview(image.url)}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-[#2C3E50]/80 rounded-full text-white hover:text-[#3498DB]"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-white mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#34495E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2C3E50] text-white"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-[#34495E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2C3E50] text-white min-h-[100px]"
                required
              />
            </div>

            {/* Latest Product Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLatest"
                checked={formData.isLatest}
                onChange={(e) =>
                  setFormData({ ...formData, isLatest: e.target.checked })
                }
                className="w-4 h-4 text-[#3498DB] bg-[#2C3E50] border-[#34495E] focus:ring-[#3498DB]"
              />
              <label htmlFor="isLatest" className="text-white">
                Mark as Latest Product
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-[#3498DB] text-white rounded-md hover:bg-[#2980B9] transition duration-300"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddProduct;
