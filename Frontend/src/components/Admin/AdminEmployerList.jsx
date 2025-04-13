import React, { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Users, Plus, Trash2, Edit2, MoreVertical } from "lucide-react";
import api from "../../utils/axios";
import SideBar from "./SideBar";
import { data } from "react-router-dom";

const AdminEmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [currentEmployer, setCurrentEmployer] = useState(null);
  const [activeTab, setActiveTab] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    description: "",
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

  console.log("Employees", employers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "http://localhost:4000/api/employers/create",
        formData
      );
      if (response.ok) {
        fetchEmployers();
        setActiveTab("list");
        setFormData({
          name: "",
          email: "",
          phone: "",
          salary: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error creating employer:", error);
    }
  };

  const handleDelete = async () => {
    const id = data.id;
    console.log("id: " + id);
    try {
      const response = await api.delete(
        `http://localhost:4000/api/employers/${id}`
      );
      if (response.ok) {
        fetchEmployers();
      }
    } catch (error) {
      console.error("Error deleting employer:", error);
    }
  };

  const handleUpdate = async () => {
    const id = data._id;
    console.log("id: " + id);
    try {
      const response = await api.put(
        `http://localhost:4000/api/employers/update/${id}`,
        formData
      );
      if (response.ok) {
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
        className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6 flex-1 ${
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
                  ? "bg-[#E0A387] text-[#310A0B]"
                  : "bg-[#743A36] text-[#E0A387]"
              } hover:bg-[#B96A59] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("add")}
            >
              <Plus className="inline-block mr-2" size={20} />
              Add Employer
            </button>
            <button
              className={`px-6 py-2 text-lg font-semibold rounded-lg ${
                activeTab === "list"
                  ? "bg-[#E0A387] text-[#310A0B]"
                  : "bg-[#743A36] text-[#E0A387]"
              } hover:bg-[#B96A59] transition-colors duration-300 shadow-lg`}
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
              className="bg-[#E0A387]/5 backdrop-blur-sm p-2 rounded-lg shadow-xl"
            >
              <div className="grid gap-4">
                {employers.map((employer) => (
                  <div
                    key={employer._id}
                    className="bg-[#743A36]/20 p-2 rounded-lg "
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[#E0A387] text-xl font-semibold">
                          {employer.name}
                        </h3>
                        <p className="text-[#B96A59] mt-2">
                          {employer.description}
                        </p>
                        <div className="mt-4 text-[#E0A387]">
                          <p>Email: {employer.email}</p>
                          <p>Phone: {employer.phone}</p>
                          <p>Salary: Rs.{employer.salary}</p>
                        </div>
                      </div>
                      <Menu as="div" className="relative">
                        <Menu.Button className="text-[#E0A387] hover:bg-[#743A36] p-2 rounded-full">
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
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#743A36] rounded-lg shadow-lg p-2">
                            <Menu.Item>
                              <button
                                className="flex items-center w-full px-4 py-2 text-[#E0A387] hover:bg-[#B96A59] rounded-lg"
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
                                className="flex items-center w-full px-4 py-2 text-[#E0A387] hover:bg-[#B96A59] rounded-lg"
                                onClick={() => handleDelete(employer._id)}
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
              className="bg-[#E0A387]/5 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-[#E0A387] mb-6">
                Add New Employer
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-[#E0A387] text-lg block mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {key === "description" ? (
                      <textarea
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full bg-[#743A36]/20 border border-[#E0A387] text-[#E0A387] p-3 rounded-lg"
                        rows={4}
                      />
                    ) : (
                      <input
                        type={key === "email" ? "email" : "text"}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full bg-[#743A36]/20 border border-[#E0A387] text-[#E0A387] h-12 px-4 rounded-lg"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full bg-[#743A36] text-[#E0A387] hover:bg-[#B96A59] h-12 text-lg font-semibold rounded-lg"
                >
                  Save Employer
                </button>
              </form>
            </motion.div>
          )}

          {isModalOpen && (
            <div className="flex inset-0 bg-black bg-opacity-50  items-center justify-center">
              <div className="bg-[#310A0B] p-8 rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-[#E0A387] mb-6">
                  Edit Employer
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(currentEmployer._id);
                  }}
                  className="space-y-6"
                >
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-[#E0A387] text-lg block mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      {key === "description" ? (
                        <textarea
                          value={value}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="w-full bg-[#743A36]/20 border border-[#E0A387] text-[#E0A387] p-3 rounded-lg"
                          rows={4}
                        />
                      ) : (
                        <input
                          type={key === "email" ? "email" : "text"}
                          value={value}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="w-full bg-[#743A36]/20 border border-[#E0A387] text-[#E0A387] h-12 px-4 rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 bg-[#743A36] text-[#E0A387] hover:bg-[#B96A59] rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#E0A387] text-[#310A0B] hover:bg-[#B96A59] rounded-lg"
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
