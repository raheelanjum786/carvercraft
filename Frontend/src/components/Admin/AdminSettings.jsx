import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

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

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const validationErrors = validatePasswordChange();
    if (Object.keys(validationErrors).length === 0) {
      // Handle password change logic here
      console.log("Password change submitted:", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  // Add Three.js background effect
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
      antialias: true, // Add antialiasing
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // Create container if it doesn't exist
    let container = document.querySelector(".three-bg");
    if (!container) {
      container = document.createElement("div");
      container.className = "three-bg";
      document.body.appendChild(container);
    }
    container.appendChild(renderer.domElement);

    // Set renderer background and pixel ratio
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
        color: "#E0A387",
        size: 2,
        sizeAttenuation: true, // Enable size attenuation
      })
    );
    scene.add(particles);
    camera.position.z = 500;

    // Animation loop
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

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#310A0B] to-[#491B1D]">
      <div className="three-bg absolute inset-0 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 md:p-6 lg:p-8 text-white relative z-10"
      >
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Settings
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-[#743A36]/40 backdrop-blur-sm rounded-lg p-4 md:p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-[#E0A387]">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className={`w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                    text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                    focus:ring-1 focus:ring-[#E0A387] transition-colors ${
                      errors.currentPassword ? "border-red-500" : ""
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    className={`w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                    text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                    focus:ring-1 focus:ring-[#E0A387] transition-colors ${
                      errors.newPassword ? "border-red-500" : ""
                    }`}
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className={`w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                    text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                    focus:ring-1 focus:ring-[#E0A387] transition-colors ${
                      errors.confirmPassword ? "border-red-500" : ""
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-[#E0A387] text-[#310A0B] px-4 py-2 rounded hover:bg-[#c88f75] transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>

          {/* add admin*/}
          <motion.div
            className="bg-[#743A36]/40 backdrop-blur-sm rounded-lg p-4 md:p-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowNewAdmin(!showNewAdmin)}
              className="w-full md:w-auto bg-gradient-to-r from-[#B96A59] to-[#E0A387] text-[#310A0B] px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
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
                  <h2 className="text-xl font-semibold mb-4 text-[#E0A387]">
                    New Admin Details
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                      text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                      focus:ring-1 focus:ring-[#E0A387] transition-colors"
                      value={newAdminData.name}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                      text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                      focus:ring-1 focus:ring-[#E0A387] transition-colors"
                      value={newAdminData.email}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          email: e.target.value,
                        })
                      }
                    />
                    {/* <div className="phone-input-container">
                      <PhoneInput
                        country={"pk"}
                        value={newAdminData.phone}
                        onChange={(phone) =>
                          setNewAdminData({
                            ...newAdminData,
                            phone: phone,
                          })
                        }
                        inputStyle={{
                          width: "100%",
                          height: "40px",
                          fontSize: "16px",
                          backgroundColor: "rgba(185, 106, 89, 0.2)",
                          border: "1px solid #491B1D",
                          color: "#E0A387",
                        }}
                        buttonStyle={{
                          backgroundColor: "rgba(185, 106, 89, 0.2)",
                          border: "1px solid #491B1D",
                          borderRight: "none",
                        }}
                        dropdownStyle={{
                          backgroundColor: "#743A36",
                          color: "#E0A387",
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        containerClass="phone-input"
                      />
                    </div> */}
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                      text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                      focus:ring-1 focus:ring-[#E0A387] transition-colors"
                      value={newAdminData.password}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          password: e.target.value,
                        })
                      }
                    />
                    <textarea
                      placeholder="Address"
                      className="w-full p-2 rounded bg-[#B96A59]/20 border border-[#491B1D] 
                      text-[#E0A387] placeholder-[#E0A387]/60 focus:outline-none focus:border-[#E0A387] 
                      focus:ring-1 focus:ring-[#E0A387] transition-colors"
                      value={newAdminData.address}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          address: e.target.value,
                        })
                      }
                      rows="3"
                    />
                    <button className="bg-[#E0A387] text-[#310A0B] px-4 py-2 rounded hover:bg-[#c88f75] transition-colors">
                      Save
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// // Add these styles to your CSS file or add a style tag in your component
// const styles = `
//   .phone-input .selected-flag:hover,
//   .phone-input .selected-flag:focus {
//     background-color: rgba(185, 106, 89, 0.3) !important;
//   }

//   .phone-input .country-list {
//     background-color: #743A36 !important;
//     border: 1px solid #491B1D !important;
//   }

//   .phone-input .country-list .country:hover {
//     background-color: #B96A59 !important;
//   }

//   .phone-input .country-list .country.highlight {
//     background-color: #B96A59 !important;
//   }

//   .phone-input input::placeholder {
//     color: rgba(224, 163, 135, 0.6) !important;
//   }

//   .phone-input input:focus {
//     border-color: #E0A387 !important;
//     box-shadow: 0 0 0 1px #E0A387 !important;
//   }
// `;

export default AdminSettings;
