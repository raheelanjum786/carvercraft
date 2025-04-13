import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        navigate("/login");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#310A0B] to-[#1a0506] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-5"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-[#B96A59]/10 to-[#743A36]/10 backdrop-blur-xl shadow-[0_0_40px_rgba(185,106,89,0.1)] border border-[#E0A387]/10"
      >
        <div className="flex justify-center mb-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            // src={DemoLogo}
            alt="Logo"
            className="w-24 h-24 object-contain filter drop-shadow-[0_0_15px_rgba(224,163,135,0.3)]"
          />
        </div>

        <motion.h2
          className="text-3xl font-bold text-center text-[#E0A387] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.01 }} className="group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#E0A387]/5 border border-[#E0A387]/20 
                text-[#E0A387] placeholder-[#E0A387]/40 focus:outline-none focus:border-[#E0A387]/60 
                focus:ring-2 focus:ring-[#E0A387]/20 transition-all duration-300 text-sm
                group-hover:bg-[#E0A387]/10"
                placeholder="Full Name"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#E0A387]/5 border border-[#E0A387]/20 
                text-[#E0A387] placeholder-[#E0A387]/40 focus:outline-none focus:border-[#E0A387]/60 
                focus:ring-2 focus:ring-[#E0A387]/20 transition-all duration-300 text-sm
                group-hover:bg-[#E0A387]/10"
                placeholder="Email"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#E0A387]/5 border border-[#E0A387]/20 
                text-[#E0A387] placeholder-[#E0A387]/40 focus:outline-none focus:border-[#E0A387]/60 
                focus:ring-2 focus:ring-[#E0A387]/20 transition-all duration-300 text-sm
                group-hover:bg-[#E0A387]/10"
                placeholder="Password"
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#E0A387]/5 border border-[#E0A387]/20 
                text-[#E0A387] placeholder-[#E0A387]/40 focus:outline-none focus:border-[#E0A387]/60 
                focus:ring-2 focus:ring-[#E0A387]/20 transition-all duration-300 text-sm
                group-hover:bg-[#E0A387]/10"
                placeholder="Confirm Password"
                required
              />
            </motion.div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[#E0A387] text-[#B96A59] 
              focus:ring-[#B96A59] focus:ring-offset-0 transition-all duration-300
              cursor-pointer"
            />
            <span className="text-sm text-[#E0A387]/80 hover:text-[#E0A387] transition-colors duration-300">
              I agree to the Terms and Conditions
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#B96A59] to-[#743A36] 
            text-white font-semibold shadow-lg hover:from-[#743A36] hover:to-[#B96A59]
            transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed
            transform hover:shadow-[0_0_20px_rgba(185,106,89,0.3)]"
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
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </motion.button>

          <p className="text-center text-sm text-[#E0A387]/80">
            Already have an account?{" "}
            <Link to="/login">
              <span
                className="font-medium text-[#E0A387] hover:text-[#B96A59] 
              transition-colors duration-300 cursor-pointer underline decoration-dotted
              underline-offset-4"
              >
                Sign in
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;

// import { motion } from "framer-motion";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
// import * as random from "maath/random";
// import { Suspense, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import DemoLogo from "../../assets/cravyLogo.png";
// import { useAuth } from "../../context/AuthContext";

// // StarField component (same as Login)
// function StarField() {
//   const ref = useRef();
//   const [sphere] = useState(() =>
//     random.inSphere(new Float32Array(5000), { radius: 1.5 })
//   );

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 15;
//     ref.current.rotation.y -= delta / 20;
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
//         <PointMaterial
//           transparent
//           color="#B96A59"
//           size={0.002}
//           sizeAttenuation={true}
//           depthWrite={false}
//         />
//       </Points>
//     </group>
//   );
// }

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handleSubmit = () => {};
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const result = await signup({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       if (result.success) {
//         navigate("/login");
//       } else {
//         setError(result.error);
//       }
//     } catch (err) {
//       setError("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   return (
//     <div className="relative min-h-screen bg-[#310A0B] flex items-center justify-center overflow-hidden px-4 sm:px-6">
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [0, 0, 1] }}>
//           <Suspense fallback={null}>
//             <StarField />
//           </Suspense>
//         </Canvas>
//       </div>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={formVariants}
//         className="relative z-10 w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-[#B96A59]/20 to-[#743A36]/20 backdrop-blur-lg shadow-2xl"
//       >
//         <div className="flex justify-center mb-4">
//           <img
//             src={DemoLogo}
//             alt="Logo"
//             className="w-20 h-20 object-contain filter drop-shadow-lg"
//           />
//         </div>

//         <h2 className="text-2xl font-bold text-center text-[#E0A387] mb-4">
//           Create Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
//               {error}
//             </div>
//           )}

//           <div>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30
//               text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387]
//               transition-all duration-300 text-sm"
//               placeholder="Full Name"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30
//               text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387]
//               transition-all duration-300 text-sm"
//               placeholder="Email"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30
//               text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387]
//               transition-all duration-300 text-sm"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30
//               text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387]
//               transition-all duration-300 text-sm"
//               placeholder="Confirm Password"
//               required
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               className="w-3 h-3 rounded border-[#E0A387] text-[#B96A59] focus:ring-[#B96A59]"
//             />
//             <span className="text-xs text-[#E0A387]">
//               I agree to the Terms and Conditions
//             </span>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-lg bg-[#B96A59] text-[#310A0B] font-semibold
//             shadow-lg hover:bg-[#743A36] transition-all duration-300 text-sm disabled:opacity-50"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>

//           <p className="text-center text-xs text-[#E0A387]">
//             Already have an account?{" "}
//             <Link to="/login">
//               <span className="font-medium hover:text-[#B96A59] transition-colors duration-300 cursor-pointer">
//                 Sign in
//               </span>
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;
