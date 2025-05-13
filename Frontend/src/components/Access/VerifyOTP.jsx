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

  // Funky animations
  const formVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  // Generate random funky background patterns
  const generatePattern = () => {
    const patterns = [
      "radial-gradient(circle at 10% 20%, #FF6B6B 0%, #556270 90%)",
      "linear-gradient(45deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
      "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Funky background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-yellow-300 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-pink-400 opacity-20 blur-3xl"></div>
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-20 w-12 h-12 bg-yellow-300 rounded-lg opacity-70"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-70"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-10 h-10 bg-green-400 rounded-lg opacity-70 rotate-45"
        animate={{
          y: [0, -15, 0],
          x: [0, 15, 0],
          rotate: [45, 90, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20"
      >
        <motion.div
          className="flex justify-center mb-6"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-4xl font-bold text-white">CC</span>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          Verify Your OTP
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-center text-white/80 mb-8"
        >
          Enter the verification code sent to your email
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 
              text-white placeholder-white/60 focus:outline-none focus:border-white/70 
              transition-all duration-300 text-lg tracking-wider text-center"
              placeholder="Enter OTP"
              required
              maxLength={6}
              style={{ letterSpacing: "0.5em" }}
            />
          </motion.div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-300 text-center font-medium"
            >
              {message}
            </motion.p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
            text-white font-bold text-lg shadow-lg hover:from-yellow-500 hover:to-purple-700 
            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
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
                Verifying...
              </span>
            ) : (
              "Verify & Continue"
            )}
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="text-center text-white/80 mt-4"
          >
            Didn't receive the code?{" "}
            <Link to="/forgot-password">
              <motion.span
                whileHover={{ scale: 1.05, color: "#ffffff" }}
                className="font-bold text-white/90 underline decoration-wavy decoration-pink-500 underline-offset-4 cursor-pointer"
              >
                Resend
              </motion.span>
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
