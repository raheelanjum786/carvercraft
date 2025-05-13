import { motion } from "framer-motion";
import { useState } from "react";
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

  // Funky animations
  const formVariants = {
    hidden: { opacity: 0, y: 50, rotate: -3 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center overflow-hidden px-4 sm:px-6">
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
          className="text-3xl font-extrabold text-center text-white mb-6 tracking-tight"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          Welcome Back!
        </motion.h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 
              text-white placeholder-white/60 focus:outline-none focus:border-white/70 
              transition-all duration-300 text-base"
              placeholder="Email"
              required
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 
              text-white placeholder-white/60 focus:outline-none focus:border-white/70 
              transition-all duration-300 text-base"
              placeholder="Password"
              required
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between text-sm text-white/80"
          >
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-white/30 text-purple-500 
                focus:ring-purple-500 focus:ring-offset-0 transition-all duration-300
                group-hover:border-white/50"
              />
              <span className="group-hover:text-white">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="hover:text-white transition-colors duration-300 hover:underline decoration-wavy decoration-pink-500 underline-offset-4"
            >
              Forgot Password?
            </Link>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 
            text-white font-bold text-lg shadow-lg hover:from-yellow-500 hover:to-purple-700 
            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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

          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-white/80 mt-6"
          >
            Don't have an account?{" "}
            <Link to="/signup">
              <motion.span
                whileHover={{ scale: 1.05, color: "#ffffff" }}
                className="font-bold text-white/90 underline decoration-wavy decoration-pink-500 underline-offset-4 cursor-pointer"
              >
                Sign up
              </motion.span>
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
