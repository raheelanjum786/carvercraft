import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        // Check user role and redirect accordingly
        if (result.user && result.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#131313] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 bg-[url('path/to/pattern.png')] opacity-5"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-[#B96A59]/10 to-[#743A36]/10 backdrop-blur-xl shadow-[0_0_40px_rgba(185,106,89,0.1)] border border-[#B96A59]/20"
      >
        <div className="flex justify-center mb-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            // src={CravyLogo}
            alt="Logo"
            className="w-24 h-24 object-contain filter drop-shadow-[0_0_15px_rgba(224,163,135,0.3)]"
          />
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-[#E0A387] mb-6 tracking-wide"
        >
          Welcome Back
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#E0A387]/5 border-2 border-[#E0A387]/20 
              text-[#E0A387] placeholder-[#E0A387]/40 focus:outline-none focus:border-[#E0A387]/50 
              transition-all duration-300 text-sm group-hover:border-[#E0A387]/30"
              placeholder="Email"
              required
            />
          </div>

          <div className="group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#E0A387]/5 border-2 border-[#E0A387]/20 
              text-[#E0A387] placeholder-[#E0A387]/40 focus:outline-none focus:border-[#E0A387]/50 
              transition-all duration-300 text-sm group-hover:border-[#E0A387]/30"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-[#E0A387]/80">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-[#E0A387]/30 text-[#B96A59] 
                focus:ring-[#B96A59] focus:ring-offset-0 transition-all duration-300
                group-hover:border-[#E0A387]/50"
              />
              <span className="group-hover:text-[#E0A387]">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="hover:text-[#B96A59] transition-colors duration-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#B96A59] to-[#943A36] text-white font-semibold 
            shadow-lg hover:from-[#943A36] hover:to-[#B96A59] transition-all duration-300 text-sm disabled:opacity-50
            disabled:cursor-not-allowed transform hover:shadow-[0_0_20px_rgba(185,106,89,0.3)]"
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>

          <p className="text-center text-sm text-[#E0A387]/80 mt-6">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="font-medium text-[#E0A387] hover:text-[#B96A59] transition-colors duration-300 cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
