import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
import SideBar from "./SideBar";
import axios from "axios";
import { toast } from "react-toastify";

const AdminSettings = () => {
  const [showNewAdmin, setShowNewAdmin] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const validatePasswordChange = () => {
    const newErrors = {};
    if (!formData.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword)
      newErrors.newPassword = "New password is required";
    if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const validateNewAdmin = () => {
    const newErrors = {};
    if (!newAdminData.name) newErrors.name = "Name is required";
    if (!newAdminData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(newAdminData.email))
      newErrors.email = "Email is invalid";
    if (!newAdminData.password) newErrors.password = "Password is required";
    if (newAdminData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const validationErrors = validatePasswordChange();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://51.21.182.124/api/api/admin/settings/change-password",
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Password changed successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error changing password:", error);
        toast.error(error.response?.data?.message || "Error changing password");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const validationErrors = validateNewAdmin();
    if (Object.keys(validationErrors).length === 0) {
      setAdminLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://51.21.182.124/api/api/admin/settings/add-admin",
          newAdminData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Admin added successfully");
        setNewAdminData({
          name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
        });
        setShowNewAdmin(false);
      } catch (error) {
        console.error("Error adding admin:", error);
        toast.error(error.response?.data?.message || "Error adding admin");
      } finally {
        setAdminLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    let container = document.querySelector(".three-bg");
    if (!container) {
      container = document.createElement("div");
      container.className = "three-bg";
      document.body.appendChild(container);
    }
    container.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 5000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000)
      );
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: "#3498DB",
        size: 2,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);
    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      <motion.div
        className={` flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#2D2D2D]">
          <div className="three-bg absolute inset-0 -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-6 lg:p-8 text-white relative z-10"
          >
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#ECF0F1]"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Settings
            </motion.h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                className="bg-[#2C3E50]/40 backdrop-blur-sm rounded-lg p-4 md:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-[#3498DB]">
                  Change Password
                </h2>
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="password"
                        placeholder="Current Password"
                        className={`w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                    text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                    focus:ring-1 focus:ring-[#3498DB] transition-colors ${
                      errors.currentPassword ? "border-[#E74C3C]" : ""
                    }`}
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                      {errors.currentPassword && (
                        <p className="text-[#E74C3C] text-sm mt-1">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="New Password"
                        className={`w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                    text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                    focus:ring-1 focus:ring-[#3498DB] transition-colors ${
                      errors.newPassword ? "border-[#E74C3C]" : ""
                    }`}
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                      />
                      {errors.newPassword && (
                        <p className="text-[#E74C3C] text-sm mt-1">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className={`w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                    text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                    focus:ring-1 focus:ring-[#3498DB] transition-colors ${
                      errors.confirmPassword ? "border-[#E74C3C]" : ""
                    }`}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                      {errors.confirmPassword && (
                        <p className="text-[#E74C3C] text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#3498DB] text-white px-4 py-2 rounded hover:bg-[#2980B9] transition-colors disabled:opacity-50"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                className="bg-[#2C3E50]/40 backdrop-blur-sm rounded-lg p-4 md:p-6"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => setShowNewAdmin(!showNewAdmin)}
                  className="w-full md:w-auto bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {showNewAdmin ? "Hide Form" : "Add New Admin"}
                </button>

                <AnimatePresence>
                  {showNewAdmin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <h2 className="text-xl font-semibold mb-4 text-[#3498DB]">
                        New Admin Details
                      </h2>
                      <form onSubmit={handleAddAdmin}>
                        <div className="space-y-4">
                          <div>
                            <input
                              type="text"
                              placeholder="Name"
                              className={`w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                          text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                          focus:ring-1 focus:ring-[#3498DB] transition-colors ${
                            errors.name ? "border-[#E74C3C]" : ""
                          }`}
                              value={newAdminData.name}
                              onChange={(e) =>
                                setNewAdminData({
                                  ...newAdminData,
                                  name: e.target.value,
                                })
                              }
                            />
                            {errors.name && (
                              <p className="text-[#E74C3C] text-sm mt-1">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              type="email"
                              placeholder="Email"
                              className={`w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                          text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                          focus:ring-1 focus:ring-[#3498DB] transition-colors ${
                            errors.email ? "border-[#E74C3C]" : ""
                          }`}
                              value={newAdminData.email}
                              onChange={(e) =>
                                setNewAdminData({
                                  ...newAdminData,
                                  email: e.target.value,
                                })
                              }
                            />
                            {errors.email && (
                              <p className="text-[#E74C3C] text-sm mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Phone"
                              className="w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                          text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                          focus:ring-1 focus:ring-[#3498DB] transition-colors"
                              value={newAdminData.phone}
                              onChange={(e) =>
                                setNewAdminData({
                                  ...newAdminData,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <input
                              type="password"
                              placeholder="Password"
                              className={`w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                          text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                          focus:ring-1 focus:ring-[#3498DB] transition-colors ${
                            errors.password ? "border-[#E74C3C]" : ""
                          }`}
                              value={newAdminData.password}
                              onChange={(e) =>
                                setNewAdminData({
                                  ...newAdminData,
                                  password: e.target.value,
                                })
                              }
                            />
                            {errors.password && (
                              <p className="text-[#E74C3C] text-sm mt-1">
                                {errors.password}
                              </p>
                            )}
                          </div>
                          <textarea
                            placeholder="Address"
                            className="w-full p-2 rounded bg-[#34495E]/20 border border-[#2C3E50] 
                        text-white placeholder-[#ECF0F1]/60 focus:outline-none focus:border-[#3498DB] 
                        focus:ring-1 focus:ring-[#3498DB] transition-colors"
                            value={newAdminData.address}
                            onChange={(e) =>
                              setNewAdminData({
                                ...newAdminData,
                                address: e.target.value,
                              })
                            }
                            rows="3"
                          />
                          <button
                            type="submit"
                            disabled={adminLoading}
                            className="bg-[#3498DB] text-white px-4 py-2 rounded hover:bg-[#2980B9] transition-colors disabled:opacity-50"
                          >
                            {adminLoading ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSettings;
