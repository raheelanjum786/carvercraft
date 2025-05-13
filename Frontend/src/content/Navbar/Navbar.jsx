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

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navRef = useRef(null);
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

  // Only enable hover effect on desktop
  useEffect(() => {
    const handleMouseEnter = () => {
      if (window.innerWidth > 768) setIsNavExpanded(true);
    };
    const handleMouseLeave = () => {
      if (window.innerWidth > 768) {
        setTimeout(() => setIsNavExpanded(false), 500);
      }
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("mouseenter", handleMouseEnter);
      navElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (navElement) {
        navElement.removeEventListener("mouseenter", handleMouseEnter);
        navElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const navItems = [
    { name: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
    {
      name: "Products",
      icon: <Package className="w-5 h-5" />,
      href: "/all-products",
    },
    { name: "Categories", icon: <Box className="w-5 h-5" />, dropdown: true },
    {
      name: "Custom Cards",
      icon: <CreditCard className="w-5 h-5" />,
      href: "/custom-card-order",
    },
    { name: "About Us", icon: <Info className="w-5 h-5" />, href: "/about-us" },
    {
      name: "Contact",
      icon: <Phone className="w-5 h-5" />,
      href: "/contact-us",
    },
  ];

  const navItemVariants = {
    hidden: { opacity: 0, y: -20, rotate: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      height: "auto",
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 150,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const mobileMenuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[9999]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div ref={navRef} className="max-w-screen-xl mx-auto p-2">
        <motion.div
          className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                     transition-all duration-700 ease-in-out
                     ${
                       isNavExpanded
                         ? "w-full rounded-xl"
                         : "w-full md:w-fit rounded-full"
                     }
                     p-4 mx-auto shadow-lg backdrop-blur-lg
                     hover:shadow-xl hover:shadow-purple-500/20`}
          layout
          transition={{ layout: { duration: 0.7, type: "spring" } }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <img
                src="/logo.png"
                alt="CarverCraft Logo"
                className="h-8 w-auto mr-4"
              />
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </motion.button>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  {item.dropdown ? (
                    <div ref={categoriesRef}>
                      <motion.button
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                        className="flex items-center gap-2 text-white hover:text-[#E0A387] transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {item.icon}
                        {isNavExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            transition={{ duration: 0.4 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </motion.button>
                      <AnimatePresence>
                        {isCategoriesOpen && (
                          <motion.div
                            className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {categories.map((category) => (
                              <motion.a
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                className="block px-4 py-2 text-gray-700 hover:bg-[#E0A387]/20"
                                whileHover={{
                                  x: 5,
                                  backgroundColor: "#E0A387",
                                }}
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
                      className="flex items-center gap-2 text-white hover:text-[#E0A387] transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {item.icon}
                      {isNavExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          transition={{ duration: 0.4 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  className="fixed inset-y-0 right-0 w-64 bg-gray-900 p-6 shadow-lg md:hidden"
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-2 text-white hover:text-[#E0A387]"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate("/cart")}
                className="text-white hover:text-[#E0A387]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>

              {localStorage.getItem("token") ? (
                <motion.div
                  ref={userMenuRef}
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E0A387] to-[#B96A59] flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-white font-bold">
                      {localStorage.getItem("user")
                        ? JSON.parse(
                            localStorage.getItem("user")
                          ).email[0].toUpperCase()
                        : ""}
                    </span>
                  </motion.button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.a
                          href="/my-orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-[#E0A387]/20"
                          whileHover={{ x: 5, backgroundColor: "#E0A387" }}
                        >
                          My Card Orders
                        </motion.a>
                        <motion.button
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            navigate("/login");
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#E0A387]/20"
                          whileHover={{ x: 5, backgroundColor: "#E0A387" }}
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
                  className="text-white hover:text-[#E0A387]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Login
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
