// import axios from "axios";
import { Suspense, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import DemoLogo from "../../assets/cravyLogo.png";
import api from "../../utils/axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  console.log(email);
  // Redirect if no email is present
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "http://localhost:4000/api/auth/users/verify-otp",
        {
          email,
          code: otp,
        }
      );
      setMessage(response.data.message);

      navigate("/auth/reset-password", { state: { email, verified: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid verification code");
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="relative z-10 w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-[#B96A59]/20 to-[#743A36]/20 backdrop-blur-lg shadow-2xl"
      >
        <div className="flex justify-center mb-4">
          <img
            // src={DemoLogo}
            alt="Logo"
            className="w-20 h-20 object-contain filter drop-shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-[#E0A387] mb-2">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-[#E0A387]/80 mb-4">
          Enter the verification code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30 
              text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387] 
              transition-all duration-300 text-sm"
              placeholder="Enter OTP"
              required
              maxLength={6}
            />
          </div>

          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-[#B96A59] text-[#310A0B] font-semibold 
            shadow-lg hover:bg-[#743A36] transition-all duration-300 text-sm disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-center text-xs text-[#E0A387]">
            Didn't receive the code?{" "}
            <Link to="/forgot-password">
              <span className="font-medium hover:text-[#B96A59] transition-colors duration-300 cursor-pointer">
                Resend
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;

// import axios from "axios";
// import { Suspense, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial } from "@react-three/drei";
// import * as random from "maath/random";
// import { motion } from "framer-motion";
// import DemoLogo from "../../assets/cravyLogo.png";
// import api from "../../utils/axios";

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

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   console.log(email);
//   // Redirect if no email is present
//   if (!email) {
//     navigate("/forgot-password");
//     return null;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const response = await api.post(
//         "http://localhost:4000/api/auth/users/verify-otp",
//         {
//           email,
//           code: otp,
//         }
//       );
//       setMessage(response.data.message);

//       navigate("/auth/reset-password", { state: { email, verified: true } });
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid verification code");
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

//         <h2 className="text-2xl font-bold text-center text-[#E0A387] mb-2">
//           Verify OTP
//         </h2>

//         <p className="text-center text-sm text-[#E0A387]/80 mb-4">
//           Enter the verification code sent to your email
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg bg-[#E0A387]/10 border border-[#E0A387]/30
//               text-[#E0A387] placeholder-[#E0A387]/50 focus:outline-none focus:border-[#E0A387]
//               transition-all duration-300 text-sm"
//               placeholder="Enter OTP"
//               required
//               maxLength={6}
//             />
//           </div>

//           {message && (
//             <p className="text-green-400 text-sm text-center">{message}</p>
//           )}
//           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-2 rounded-lg bg-[#B96A59] text-[#310A0B] font-semibold
//             shadow-lg hover:bg-[#743A36] transition-all duration-300 text-sm disabled:opacity-50"
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>

//           <p className="text-center text-xs text-[#E0A387]">
//             Didn't receive the code?{" "}
//             <Link to="/forgot-password">
//               <span className="font-medium hover:text-[#B96A59] transition-colors duration-300 cursor-pointer">
//                 Resend
//               </span>
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyOTP;
