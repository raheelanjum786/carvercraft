import { useEffect, useState, useRef } from "react";
import api from "../../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ShoppingCart,
  Home,
  Package,
  Box,
  CreditCard,
  Info,
  Phone,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/mainLogo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/categories/get"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", icon: <Home className="w-8 h-8" />, href: "/" },
    {
      name: "Products",
      icon: <Package className="w-8 h-8" />,
      href: "/all-products",
    },
    { name: "Categories", icon: <Box className="w-8 h-8" />, dropdown: true },
    {
      name: "Custom Cards",
      icon: <CreditCard className="w-8 h-8" />,
      href: "/custom-card-order",
    },
    { name: "About Us", icon: <Info className="w-8 h-8" />, href: "/about-us" },
    {
      name: "Contact",
      icon: <Phone className="w-8 h-8" />,
      href: "/contact-us",
    },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      borderRadius: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      borderRadius: "0%",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 50,
      rotate: -5,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  const iconButtonVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      boxShadow: "0 0 15px rgba(222, 1, 87, 0.7)",
    },
    tap: {
      scale: 0.9,
      rotate: -15,
    },
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 left-4 z-[10000] bg-gradient-to-r from-funky-pink to-funky-teal p-3 rounded-full shadow-lg"
        whileHover="hover"
        whileTap="tap"
        variants={iconButtonVariants}
        transition={{ duration: 0.3 }}
      >
        {isMenuOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <Menu className="w-7 h-7 text-white" />
        )}
      </motion.button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#041322] flex flex-col items-start justify-start overflow-y-auto p-4 pt-20"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Background blobs */}
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-funky-orange opacity-10 blur-3xl"></div>
              <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-funky-teal opacity-10 blur-3xl"></div>
              <div className="absolute bottom-1/3 left-1/2 w-80 h-80 rounded-full bg-funky-pink opacity-10 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-funky-red opacity-10 blur-3xl"></div>

              {/* Animated gradient mesh */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] animate-subtle-shift opacity-20"></div>

              {/* Animated scan lines */}
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-teal/20 to-transparent top-[30%] animate-scan-horizontal"></div>
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-funky-pink/20 to-transparent top-[70%] animate-scan-horizontal-reverse"></div>
              <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-orange/20 to-transparent left-[30%] animate-scan-vertical"></div>
              <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-funky-teal/20 to-transparent right-[30%] animate-scan-vertical-reverse"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              {/* Logo */}
              <motion.div
                className="mb-12 flex justify-center"
                variants={itemVariants}
              >
                <div className="h-16 w-auto bg-gradient-to-r from-funky-orange via-funky-pink to-funky-teal p-1 rounded-xl shadow-lg">
                  <div className="bg-[#041322] h-full w-full flex items-center justify-center px-4 rounded-lg">
                    <img
                      src={Logo}
                      alt="Carvercraft"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Nav Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {" "}
                {/* Reduced gap-8 to gap-6 */}
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="relative"
                  >
                    {item.dropdown ? (
                      <div ref={categoriesRef}>
                        <motion.button
                          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          className="flex items-center gap-4 text-funky-teal hover:text-white transition-all w-full bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-funky-teal/20" // Reduced p-6 to p-4
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderColor: "rgba(25, 215, 232, 0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-shrink-0 text-funky-pink">
                            {item.icon}
                          </div>
                          <span className="text-xl font-bold">
                            {" "}
                            {/* Reduced text-2xl to text-xl */}
                            {item.name}
                          </span>
                        </motion.button>
                        <AnimatePresence>
                          {isCategoriesOpen && (
                            <motion.div
                              className="absolute top-full left-0 right-0 mt-2 bg-[#041322]/95 backdrop-blur-md rounded-xl shadow-lg py-2 z-10 border border-funky-pink/30"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              {categories.map((category) => (
                                <motion.a
                                  key={category.id}
                                  href={`/products?category=${category.id}`}
                                  className="block px-6 py-3 text-funky-teal hover:text-funky-pink text-lg"
                                  whileHover={{
                                    x: 10,
                                    backgroundColor: "rgba(25, 215, 232, 0.1)",
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {category.name}
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.a
                        href={item.href}
                        className="flex items-center gap-4 text-funky-teal hover:text-white transition-all bg-white/5 backdrop-blur-sm p-4 rounded-xl block border border-funky-teal/20" // Reduced p-6 to p-4
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(25, 215, 232, 0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex-shrink-0 text-funky-pink">
                          {item.icon}
                        </div>
                        <span className="text-xl font-bold">{item.name}</span>{" "}
                        {/* Reduced text-2xl to text-xl */}
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* User and Cart Buttons */}
              <motion.div
                className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => navigate("/cart")}
                  className="flex items-center gap-3 text-white bg-gradient-to-r from-funky-pink to-funky-teal/70 px-6 py-4 rounded-full"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(25, 215, 232, 0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="text-xl font-medium">Cart</span>
                </motion.button>

                {localStorage.getItem("token") ? (
                  <motion.div ref={userMenuRef} className="relative">
                    <motion.button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 text-white bg-gradient-to-r from-funky-teal/70 to-funky-pink px-6 py-4 rounded-full"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(222, 1, 87, 0.4)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#041322] border-2 border-white/30 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {localStorage.getItem("user")
                            ? JSON.parse(
                                localStorage.getItem("user")
                              ).email[0].toUpperCase()
                            : ""}
                        </span>
                      </div>
                      <span className="text-xl font-medium">Account</span>
                    </motion.button>
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          className="absolute bottom-full left-0 right-0 mb-2 bg-[#041322]/95 backdrop-blur-md rounded-xl shadow-lg py-2 border border-funky-pink/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.a
                            href="/my-orders"
                            className="block px-6 py-3 text-funky-teal hover:text-funky-pink text-lg"
                            whileHover={{
                              x: 10,
                              backgroundColor: "rgba(25, 215, 232, 0.1)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            My Card Orders
                          </motion.a>
                          <motion.button
                            onClick={() => {
                              localStorage.removeItem("token");
                              localStorage.removeItem("user");
                              navigate("/login");
                              setIsMenuOpen(false);
                            }}
                            className="block w-full text-left px-6 py-3 text-funky-teal hover:text-funky-pink text-lg"
                            whileHover={{
                              x: 10,
                              backgroundColor: "rgba(25, 215, 232, 0.1)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            Logout
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-3 text-white bg-gradient-to-r from-funky-teal/70 to-funky-pink px-6 py-4 rounded-full"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(222, 1, 87, 0.4)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-xl font-medium">Login</span>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
