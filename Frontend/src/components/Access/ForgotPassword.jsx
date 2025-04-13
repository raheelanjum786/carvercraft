import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import DemoLogo from "../../assets/cravyLogo.png";
import axios from "axios";
import api from "../../utils/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "http://localhost:4000/api/auth/users/forgot-password",
        {
          email,
        }
      );
      setMessage(response.data.message);

      // Pass email to VerifyOTP using navigate with state
      navigate("/auth/verify-otp", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
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
    <div className="relative min-h-screen bg-[#310A0B] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Three.js Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>

      {/* Forgot Password Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="relative z-10 w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-[#B96A59]/20 to-[#743A36]/20 backdrop-blur-lg shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            // src={DemoLogo}
            alt="Logo"
            className="w-20 h-20 object-contain filter drop-shadow-lg"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#E0A387] mb-2">
          Reset Password
        </h2>

        {/* Subtitle */}
        <p className="text-center text-sm text-[#E0A387]/80 mb-4">
          Enter your email to receive password reset instructions
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30 
              text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387] 
              transition-all duration-300 text-sm"
              placeholder="Email"
              required
            />
          </div>

          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-[#B96A59] text-[#310A0B] font-semibold 
            shadow-lg hover:bg-[#743A36] transition-all duration-300 text-sm disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Back to Login */}
          <p className="text-center text-xs text-[#E0A387]">
            Remember your password?{" "}
            <Link to="/login">
              <span className="font-medium hover:text-[#B96A59] transition-colors duration-300 cursor-pointer">
                Back to Login
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

// import { motion } from "framer-motion";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
// import * as random from "maath/random";
// import { Suspense, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import DemoLogo from "../../assets/cravyLogo.png";
// import axios from "axios";
// import api from "../../utils/axios";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await api.post(
//         "http://localhost:4000/api/auth/users/forgot-password",
//         {
//           email,
//         }
//       );
//       setMessage(response.data.message);

//       // Pass email to VerifyOTP using navigate with state
//       navigate("/auth/verify-otp", { state: { email } });
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred");
//     } finally {
//       setIsLoading(false);
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
//       {/* Three.js Background */}
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [0, 0, 1] }}>
//           <Suspense fallback={null}>
//             <StarField />
//           </Suspense>
//         </Canvas>
//       </div>

//       {/* Forgot Password Container */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={formVariants}
//         className="relative z-10 w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-[#B96A59]/20 to-[#743A36]/20 backdrop-blur-lg shadow-2xl"
//       >
//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={DemoLogo}
//             alt="Logo"
//             className="w-20 h-20 object-contain filter drop-shadow-lg"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center text-[#E0A387] mb-2">
//           Reset Password
//         </h2>

//         {/* Subtitle */}
//         <p className="text-center text-sm text-[#E0A387]/80 mb-4">
//           Enter your email to receive password reset instructions
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Input */}
//           <div>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30
//               text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387]
//               transition-all duration-300 text-sm"
//               placeholder="Email"
//               required
//             />
//           </div>

//           {message && (
//             <p className="text-green-400 text-sm text-center">{message}</p>
//           )}
//           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 rounded-lg bg-[#B96A59] text-[#310A0B] font-semibold
//             shadow-lg hover:bg-[#743A36] transition-all duration-300 text-sm disabled:opacity-50"
//           >
//             {isLoading ? "Sending..." : "Send Reset Link"}
//           </button>

//           {/* Back to Login */}
//           <p className="text-center text-xs text-[#E0A387]">
//             Remember your password?{" "}
//             <Link to="/login">
//               <span className="font-medium hover:text-[#B96A59] transition-colors duration-300 cursor-pointer">
//                 Back to Login
//               </span>
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default ForgotPassword;
