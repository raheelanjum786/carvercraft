import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import SideBar from "./SideBar";
import "../AdminGlobalStyling.css";

const AdminCardTypes = () => {
  const [cardTypes, setCardTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "active",
    imageUrl: "",
  });

  useEffect(() => {
    fetchCardTypes();
  }, []);

  const fetchCardTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        "http://13.60.44.89:4000/api/cardTypes/getAll"
      );
      setCardTypes(response.data);
    } catch (error) {
      console.error("Error fetching card types:", error);
      alert("Failed to load card types");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const showModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      setFormData({
        name: record.name,
        description: record.description,
        price: record.price,
        status: record.status,
        imageUrl: record.imageUrl,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "active",
        imageUrl: "",
      });
    }
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      status: "active",
      imageUrl: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description || "");
      submitData.append("price", formData.price.toString());
      submitData.append("status", formData.status);

      if (formData.imageUrl) {
        submitData.append("imageUrl", formData.imageUrl);
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        submitData.append("cardImage", fileList[0].originFileObj);
      }

      if (editingId) {
        await api.put(
          `http://13.60.44.89:4000/api/cardTypes/update/${editingId}`,
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Card type updated successfully");
      } else {
        await api.post(
          "http://13.60.44.89:4000/api/cardTypes/create",
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Card type created successfully");
      }

      setIsModalVisible(false);
      fetchCardTypes();
    } catch (error) {
      console.error("Error saving card type:", error);
      alert(error.response?.data?.error || "Failed to save card type");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card type?")) {
      try {
        await api.delete(`http://13.60.44.89:4000/api/cardTypes/${id}`);
        alert("Card type deleted successfully");
        fetchCardTypes();
      } catch (error) {
        console.error("Error deleting card type:", error);
        alert(error.response?.data?.error || "Failed to delete card type");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileList([{ originFileObj: e.target.files[0] }]);
    }
  };

  const filteredCardTypes = cardTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchText.toLowerCase()) ||
      type.description?.toLowerCase().includes(searchText.toLowerCase())
  );

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
        className={`min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-6">
          Manage Card Types
        </h1>

        <div className="bg-[#2C3E50]/30 rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search card types..."
                value={searchText}
                onChange={handleSearch}
                className="max-w-xs p-2 rounded border border-[#34495E] bg-[#2C3E50] text-[#FFFFFF] placeholder-[#ECF0F1]"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ECF0F1]">
                🔍
              </span>
            </div>
            <button
              onClick={() => showModal()}
              className="bg-[#3498DB] hover:bg-[#34495E] text-[#FFFFFF] px-4 py-2 rounded flex items-center gap-2"
            >
              <span>+</span>
              Add Card Type
            </button>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[#FFFFFF]">
                <thead>
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Price</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                    <th className="p-2 text-left">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCardTypes.map((type) => (
                    <tr key={type.id}>
                      <td className="p-2">{type.id}</td>
                      <td className="p-2">{type.name}</td>
                      <td className="p-2">{type.description}</td>
                      <td className="p-2">€ {type.price.toLocaleString()}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            type.status === "active"
                              ? "bg-[#2ECC71] text-[#FFFFFF]"
                              : "bg-[#E74C3C] text-[#FFFFFF]"
                          }`}
                        >
                          {type.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => showModal(type)}
                            className="bg-[#3498DB] text-white p-1 rounded"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(type.id)}
                            className="bg-[#E74C3C] text-white p-1 rounded"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                      <td className="p-2">
                        {type.imageUrl ? (
                          <img
                            src={`http://13.60.44.89:4000/api${type.imageUrl}`}
                            alt="Card Type"
                            className="w-16 h-10 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-card.png";
                            }}
                          />
                        ) : (
                          <span className="text-[#ECF0F1]">No image</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2C3E50] p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">
                {editingId ? "Edit Card Type" : "Add New Card Type"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]">
                    Card Type Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Gold Card"
                    className="mt-1 block w-full rounded-md border-[#34495E] bg-[#2C3E50] text-[#FFFFFF] placeholder-[#ECF0F1]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-[#34495E] bg-[#2C3E50] text-[#FFFFFF] placeholder-[#ECF0F1]"
                    placeholder="Description of the card type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-[#34495E] bg-[#2C3E50] text-[#FFFFFF]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]">
                    Card Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="/uploads/cards/card-image.jpg"
                    className="mt-1 block w-full rounded-md border-[#34495E] bg-[#2C3E50] text-[#FFFFFF] placeholder-[#ECF0F1]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]">
                    Upload Card Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 block w-full text-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#FFFFFF]">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-[#34495E] bg-[#2C3E50] text-[#FFFFFF]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3498DB] text-white rounded hover:bg-[#34495E]"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCardTypes;
