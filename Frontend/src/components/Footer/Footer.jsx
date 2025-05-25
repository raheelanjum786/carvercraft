import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus({ type: "error", message: "Please enter your email address" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(
        "http://51.21.182.124/api/api/newsletter/subscribe",
        { email }
      );
      setStatus({ type: "success", message: response.data.message });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative z-20 flex justify-center px-4 bg-[#041322] ">
      <div className="container px-6 py-8 backdrop-blur-md bg-funky-teal/10 border border-funky-pink/30 rounded-2xl shadow-2xl">
        <motion.h1
          className="text-xl font-bold text-center lg:text-3xl text-funky-orange drop-shadow-[0_0_10px_rgba(255,105,180,0.7)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌟 Get Your Daily Dose of Awesome! 🌈
        </motion.h1>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col justify-center mx-auto mt-8 space-y-4 md:space-y-0 md:flex-row"
        >
          <motion.input
            whileFocus={{ scale: 1.05 }}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-6 py-3 text-funky-green bg-white/80 backdrop-blur-lg border-2 border-funky-pink rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-4 ring-funky-teal/50 outline-none"
            placeholder="✨ Sprinkle some email magic here! ✨"
          />

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-8 py-3 text-base font-bold tracking-wider text-white transition-all duration-500 transform md:w-auto md:mx-4 bg-gradient-to-r from-funky-pink via-funky-orange to-funky-teal rounded-full hover:shadow-[0_0_20px_rgba(255,105,180,0.5)] disabled:opacity-70"
          >
            {isSubmitting ? "🔄 Sending..." : "🚀 Blast Off to Awesomeness!"}
          </motion.button>
        </form>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center mt-4 px-4 py-2 rounded-full ${
              status.type === "success"
                ? "bg-green-500/20 text-green-100"
                : "bg-red-500/20 text-red-100"
            }`}
          >
            {status.message}
          </motion.div>
        )}

        <hr className="h-0.5 bg-gradient-to-r from-transparent via-funky-pink/50 to-transparent border-none my-8" />

        <div className="flex flex-col items-center justify-between md:flex-row">
          <motion.a
            href="#"
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="transition-transform duration-300 group"
          >
            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-funky-orange via-funky-pink to-funky-teal">
              CarverCraft
            </span>
          </motion.a>

          <div className="flex mt-6 md:m-0">
            <div className="-mx-4">
              {["About", "Blog", "News", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.1, rotate: -6, y: -3 }}
                  className="px-4 text-base font-medium text-funky-green hover:text-funky-orange transition-all duration-300 inline-block hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
