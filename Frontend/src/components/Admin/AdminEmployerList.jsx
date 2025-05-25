import React, { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Users, Plus, Trash2, Edit2, MoreVertical } from "lucide-react";
import api from "../../utils/axios";
import SideBar from "./SideBar";
// Remove the incorrect import of data from react-router-dom
// import { data } from "react-router-dom";

const AdminEmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [currentEmployer, setCurrentEmployer] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Update formData to include all fields that match the Prisma schema
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    description: "",
    position: "",
    department: "",
    startDate: "", // Changed from joinDate to startDate to match schema
    status: "active", // Changed default to lowercase to match schema
  });

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const response = await api.get(
        "http://localhost:4000/api/employers/getAll"
      );
      const data = await response.data;
      setEmployers(data);
    } catch (error) {
      console.error("Error fetching employers:", error);
    }
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await api.post(
        "http://localhost:4000/api/employers/create",
        formData
      );
      if (response.status === 201) {
        await fetchEmployers();
        setActiveTab("list");
        setFormData({
          name: "",
          email: "",
          phone: "",
          salary: "",
          description: "",
          position: "",
          department: "",
          startDate: "",
          status: "active",
        });
      }
    } catch (error) {
      console.error("Error creating employer:", error);
      if (error.response && error.response.data) {
        // Display the error message from the server
        setError(
          error.response.data.error ||
            "Failed to create employer. Email might already be in use."
        );
      } else {
        setError("Failed to create employer. Email might already be in use.");
      }
    }
  };

  const handleDelete = async (id) => {
    // Fix: Use the passed id parameter instead of data.id
    try {
      const response = await api.delete(
        `http://localhost:4000/api/employers/${id}`
      );
      if (response.status === 200) {
        // Fix: Check status instead of response.ok
        fetchEmployers();
      }
    } catch (error) {
      console.error("Error deleting employer:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // Create a copy of formData without the id, createdAt, and updatedAt fields
      const { id: formId, createdAt, updatedAt, ...updateData } = formData;

      const response = await api.put(
        `http://localhost:4000/api/employers/update/${id}`,
        updateData
      );
      if (response.status === 200) {
        fetchEmployers();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating employer:", error);
    }
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
        className={`min-h-screen bg-[#1A1A1A] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4 mb-8">
            <button
              className={`px-6 py-2 text-lg font-semibold rounded-lg ${
                activeTab === "add"
                  ? "bg-[#3498DB] text-white"
                  : "bg-[#2C3E50] text-[#ECF0F1]"
              } hover:bg-[#34495E] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("add")}
            >
              <Plus className="inline-block mr-2" size={20} />
              Add Employer
            </button>
            <button
              className={`px-6 py-2 text-lg font-semibold rounded-lg ${
                activeTab === "list"
                  ? "bg-[#3498DB] text-white"
                  : "bg-[#2C3E50] text-[#ECF0F1]"
              } hover:bg-[#34495E] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("list")}
            >
              <Users className="inline-block mr-2" size={20} />
              Employer List
            </button>
          </div>

          {activeTab === "list" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#2D2D2D] p-4 rounded-lg shadow-xl"
            >
              <div className="grid gap-4">
                {employers.map((employer) => (
                  <div
                    key={employer.id} // Changed from _id to id
                    className="bg-[#2C3E50] p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white text-xl font-semibold">
                          {employer.name}
                        </h3>
                        <p className="text-[#ECF0F1] mt-2">
                          {employer.description}
                        </p>
                        <div className="mt-4 text-[#ECF0F1]">
                          <p>Email: {employer.email}</p>
                          <p>Phone: {employer.phone}</p>
                          <p>Salary: €{employer.salary}</p>
                        </div>
                      </div>
                      <Menu as="div" className="relative">
                        <Menu.Button className="text-white hover:bg-[#34495E] p-2 rounded-full">
                          <MoreVertical size={20} />
                        </Menu.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#2C3E50] rounded-lg shadow-lg p-2">
                            <Menu.Item>
                              <button
                                className="flex items-center w-full px-4 py-2 text-white hover:bg-[#34495E] rounded-lg"
                                onClick={() => {
                                  setCurrentEmployer(employer);
                                  setFormData(employer);
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit2 size={16} className="mr-2" />
                                Edit
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                className="flex items-center w-full px-4 py-2 text-white hover:bg-[#E74C3C] rounded-lg"
                                onClick={() => handleDelete(employer.id)}
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#2D2D2D] p-8 rounded-lg shadow-xl max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Add New Employer
              </h2>
              {error && (
                <div className="bg-[#E74C3C] text-white p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-[#ECF0F1] text-lg block mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      {key === "description" ? (
                        <textarea
                          value={value}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="w-full bg-[#2C3E50] border border-[#34495E] text-white p-3 rounded-lg"
                          rows={4}
                        />
                      ) : key === "startDate" ? (
                        <input
                          type="date"
                          value={value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full bg-[#2C3E50] border border-[#34495E] text-white h-12 px-4 rounded-lg"
                        />
                      ) : key === "status" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="w-full bg-[#2C3E50] border border-[#34495E] text-white h-12 px-4 rounded-lg"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="on leave">On Leave</option>
                        </select>
                      ) : (
                        <input
                          type={
                            key === "email"
                              ? "email"
                              : key === "salary"
                              ? "number"
                              : "text"
                          }
                          value={value}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="w-full bg-[#2C3E50] border border-[#34495E] text-white h-12 px-4 rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3498DB] text-white hover:bg-[#2980B9] h-12 text-lg font-semibold rounded-lg"
                >
                  Save Employer
                </button>
              </form>
            </motion.div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-[#2D2D2D] p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Edit Employer
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(currentEmployer.id);
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(formData).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-[#ECF0F1] text-lg block mb-2">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        {key === "description" ? (
                          <textarea
                            value={value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full bg-[#2C3E50] border border-[#34495E] text-white p-3 rounded-lg"
                            rows={4}
                          />
                        ) : key === "joinDate" ? (
                          <input
                            type="date"
                            value={value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full bg-[#2C3E50] border border-[#34495E] text-white h-12 px-4 rounded-lg"
                          />
                        ) : key === "status" ? (
                          <select
                            value={value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full bg-[#2C3E50] border border-[#34495E] text-white h-12 px-4 rounded-lg"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                          </select>
                        ) : (
                          <input
                            type={
                              key === "email"
                                ? "email"
                                : key === "salary"
                                ? "number"
                                : "text"
                            }
                            value={value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full bg-[#2C3E50] border border-[#34495E] text-white h-12 px-4 rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 bg-[#34495E] text-white hover:bg-[#2C3E50] rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#3498DB] text-white hover:bg-[#2980B9] rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AdminEmployerList;
