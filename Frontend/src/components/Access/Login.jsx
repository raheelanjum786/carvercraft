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
    <div className="relative min-h-screen bg-[#041322] flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Original background blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-funky-orange opacity-20 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-funky-teal opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-funky-pink opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-funky-red opacity-20 blur-3xl"></div>

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] animate-subtle-shift opacity-30"></div>

        {/* Animated horizontal scan lines */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-teal/30 to-transparent top-[30%] animate-scan-horizontal"></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-pink/30 to-transparent top-[70%] animate-scan-horizontal-reverse"></div>

        {/* Animated vertical scan lines */}
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-orange/30 to-transparent left-[30%] animate-scan-vertical"></div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-teal/30 to-transparent right-[30%] animate-scan-vertical-reverse"></div>

        {/* Glowing corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-funky-orange/10 to-transparent opacity-50 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-funky-teal/10 to-transparent opacity-50 blur-2xl"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/50 rounded-full animate-float-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced floating shapes with more complex animations */}
      <motion.div
        className="absolute top-20 left-20 w-12 h-12 bg-gradient-to-br from-funky-orange to-funky-pink rounded-lg opacity-70 backdrop-blur-sm"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 0 0 rgba(0,0,0,0)",
            "0 0 20px rgba(255,105,180,0.3)",
            "0 0 0 rgba(0,0,0,0)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-br from-funky-pink to-funky-teal rounded-full opacity-70 backdrop-blur-sm"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0 rgba(0,0,0,0)",
            "0 0 25px rgba(25,215,232,0.4)",
            "0 0 0 rgba(0,0,0,0)",
          ],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-10 h-10 bg-gradient-to-br from-funky-green to-funky-teal rounded-lg opacity-70 rotate-45 backdrop-blur-sm"
        animate={{
          y: [0, -15, 0],
          x: [0, 15, 0],
          rotate: [45, 90, 45],
          boxShadow: [
            "0 0 0 rgba(0,0,0,0)",
            "0 0 15px rgba(0,255,170,0.3)",
            "0 0 0 rgba(0,0,0,0)",
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* New animated shape */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-14 h-14 bg-gradient-to-br from-funky-teal to-funky-orange rounded-lg opacity-70 backdrop-blur-sm"
        animate={{
          y: [0, 20, 0],
          x: [0, 20, 0],
          rotate: [0, -60, 0],
          borderRadius: ["20%", "50%", "20%"],
          boxShadow: [
            "0 0 0 rgba(0,0,0,0)",
            "0 0 20px rgba(255,165,0,0.4)",
            "0 0 0 rgba(0,0,0,0)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden"
      >
        {/* Form background animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent top-0 animate-slide-right"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent bottom-0 animate-slide-left"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent left-0 animate-slide-down"></div>
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent right-0 animate-slide-up"></div>

          <div className="absolute -inset-[100px] bg-gradient-to-r from-funky-pink/5 via-funky-teal/5 to-funky-orange/5 rounded-full blur-3xl animate-pulse-slow opacity-50"></div>
        </div>

        <motion.div
          className="flex justify-center mb-6 relative"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-funky-orange via-funky-pink to-funky-teal rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 relative overflow-hidden group">
            <span className="text-4xl font-bold text-white relative z-10">
              CC
            </span>
            {/* Logo shine effect */}
            <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shine transition-opacity"></div>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl font-extrabold text-center text-funky-teal mb-6 tracking-tight"
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
            className="group relative"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-funky-teal/30 
              text-white placeholder-white/60 focus:outline-none focus:border-funky-pink/70 
              transition-all duration-300 text-base"
              placeholder="Email"
              required
            />
            {/* Input focus animation */}
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-funky-pink to-funky-teal group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="group relative"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-funky-teal/30 
              text-white placeholder-white/60 focus:outline-none focus:border-funky-pink/70 
              transition-all duration-300 text-base"
              placeholder="Password"
              required
            />
            {/* Input focus animation */}
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-funky-pink to-funky-teal group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between text-sm text-funky-green"
          >
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-white/30 text-funky-pink 
                focus:ring-funky-teal focus:ring-offset-0 transition-all duration-300
                group-hover:border-white/50"
              />
              <span className="group-hover:text-white transition-colors duration-300">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="hover:text-funky-teal transition-colors duration-300 hover:underline decoration-wavy decoration-funky-pink underline-offset-4 relative group"
            >
              Forgot Password?
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-funky-pink group-hover:w-full transition-all duration-300"></span>
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
            className="w-full py-4 rounded-xl bg-gradient-to-r from-funky-orange via-funky-pink to-funky-teal 
            text-white font-bold text-lg shadow-lg hover:from-funky-teal hover:to-funky-pink 
            transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10">
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
            </span>
            {/* Button shine effect */}
            <span className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transform -skew-x-12 group-hover:animate-shine"></span>
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-funky-green mt-6"
          >
            Don't have an account?{" "}
            <Link to="/signup">
              <motion.span
                whileHover={{ scale: 1.05, color: "#19D7E8" }}
                className="font-bold text-funky-teal underline decoration-wavy decoration-funky-pink underline-offset-4 cursor-pointer relative group"
              >
                Sign up
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-funky-pink group-hover:w-full transition-all duration-300"></span>
              </motion.span>
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
