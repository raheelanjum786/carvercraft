import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import SideBar from "../../components/Admin/SideBar";
import api from "../../utils/axios";

const AdminCategories = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingCategory, setEditingCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/categories/get"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const newCategoryObj = {
      name: newCategory,
      status: "active",
    };

    try {
      const response = await api.post(
        "http://localhost:4000/api/categories/add",
        newCategoryObj
      );
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }

    setNewCategory("");
    setShowAddForm(false);
  };

  const deleteCategory = async (id) => {
    try {
      await api.delete(`http://localhost:4000/api/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || category.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (category) => {
    setEditingCategory({ ...category });
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!editingCategory.name.trim()) return;
    try {
      const response = await api.put(
        `http://localhost:4000/api/categories/${editingCategory.id}`,
        editingCategory
      );
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id ? response.data : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }

    setShowEditModal(false);
    setEditingCategory(null);
  };

  return (
    <>
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />

      <div
        className={`min-h-screen bg-[#1A1A1A] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <div className="p-6 md:p-6 w-full max-w-4xl bg-[#2D2D2D] rounded-lg shadow-xl">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
            Category Management
          </h1>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full md:w-auto mb-4 flex items-center justify-center md:justify-start gap-2 bg-[#3498DB] text-white px-4 py-2 rounded-md hover:bg-[#2C3E50] transition duration-300"
          >
            <FaPlus /> Add Category
          </button>

          {showAddForm && (
            <div className="mb-4 md:mb-6 p-4 bg-[#34495E] rounded-md">
              <form
                onSubmit={addCategory}
                className="flex flex-col md:flex-row gap-4"
              >
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="flex-1 px-4 py-2 border border-[#2C3E50] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2D2D2D] text-white"
                />
                <select
                  value={editingCategory?.status || "active"}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      status: e.target.value,
                    })
                  }
                  className="w-full md:w-auto px-4 py-2 border border-[#2C3E50] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2D2D2D] text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#2ECC71] text-white px-4 py-2 rounded-md hover:bg-[#27AE60] transition duration-300"
                >
                  Add
                </button>
              </form>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full md:w-auto px-8 py-2 border border-[#2C3E50] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2D2D2D] text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ECF0F1]" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#2C3E50] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#2D2D2D] text-white placeholder-[#ECF0F1]"
              />
            </div>
          </div>

          <div className="bg-[#2D2D2D] rounded-md shadow-lg">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-[#34495E] last:border-b-0 hover:bg-[#34495E] transition duration-300 gap-4 md:gap-0"
              >
                <div>
                  <h3 className="font-semibold text-white text-lg md:text-base">
                    {category.name}
                  </h3>
                  <span
                    className={`text-sm ${
                      category.status === "active"
                        ? "text-[#2ECC71]"
                        : "text-[#E74C3C]"
                    }`}
                  >
                    {category.status}
                  </span>
                </div>
                <div className="flex gap-4 md:gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-[#3498DB] hover:text-[#2C3E50] transition duration-300"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="p-2 text-[#E74C3C] hover:text-[#C0392B] transition duration-300"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showEditModal && (
            <div className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-[#2D2D2D] p-4 md:p-6 rounded-lg shadow-xl w-full max-w-sm md:max-w-md">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4">
                  Edit Category
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#ECF0F1] mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={editingCategory?.name || ""}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#2C3E50] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#34495E] text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#ECF0F1] mb-2">
                    Status
                  </label>
                  <select
                    value={editingCategory?.status || "active"}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-[#2C3E50] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB] bg-[#34495E] text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex flex-col md:flex-row justify-end gap-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="w-full md:w-auto px-4 py-2 bg-[#34495E] text-white rounded-md hover:bg-[#2C3E50] transition duration-300 order-2 md:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className="w-full md:w-auto px-4 py-2 bg-[#3498DB] text-white rounded-md hover:bg-[#2980B9] transition duration-300 order-1 md:order-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
