import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { motion } from "framer-motion";
import { Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Fetch categories
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

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="group max-w-screen-xl mx-auto">
        {/* Desktop Navbar */}
        <div
          className="transition-all duration-500 ease-in-out 
                     w-[200px] group-hover:w-full 
                     rounded-full group-hover:rounded-none
                     bg-gray-800 text-white
                     p-4 mx-auto mt-2
                     transform group-hover:scale-100 scale-95"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 transition-transform duration-500 transform group-hover:scale-110">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            </div>

            {/* Nav Items - Hidden when compressed, visible on hover */}
            <div className="hidden group-hover:flex items-center space-x-4 mx-4 transition-all duration-500 opacity-0 group-hover:opacity-100">
              <a
                href="/"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="/allProducts"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Products
              </a>

              {/* Categories Dropdown */}
              <div className="relative group/categories">
                <button className="flex items-center hover:text-gray-300 transition-colors duration-300">
                  Categories <FaChevronDown className="ml-1 h-3 w-3" />
                </button>
                <div className="absolute hidden group-hover/categories:block mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 transform origin-top scale-95 group-hover/categories:scale-100">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="/about"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="hover:text-gray-300 transition-colors duration-300"
              >
                Contact
              </a>
            </div>

            {/* Cart Button - Always visible */}
            <button
              onClick={() => navigate("/cart")}
              className="text-white p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-700 transition-colors duration-300"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* Login/User Button */}
            {localStorage.getItem("token") ? (
              <div className="relative group/user">
                <div className="w-8 h-8 rounded-full bg-[#E0A387] border-2 border-white flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                  <span className="text-sm font-bold text-white">
                    {localStorage.getItem("user")
                      ? JSON.parse(
                          localStorage.getItem("user")
                        ).email[0].toUpperCase()
                      : ""}
                  </span>
                </div>
                <div className="absolute hidden group-hover/user:block right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 transform origin-top scale-95 group-hover/user:scale-100">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full transition-colors duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="md:hidden absolute top-4 right-4 inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg hover:bg-gray-700/10 focus:outline-none focus:ring-2 focus:ring-gray-700 text-white"
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:hidden transition-all duration-300 transform ${
            isMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <ul className="font-medium flex flex-col p-4 mt-4 rounded-lg bg-gray-800/90 border border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 rounded text-white hover:bg-gray-700 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/allProducts"
                className="block py-2 px-3 rounded text-white hover:bg-gray-700 transition-colors duration-300"
              >
                Products
              </a>
            </li>
            <li>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full py-2 px-3 rounded text-white hover:bg-gray-700 transition-colors duration-300"
              >
                Categories
                <FaChevronDown
                  className={`${
                    isCategoriesOpen ? "rotate-180" : ""
                  } transition-transform duration-300`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isCategoriesOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <ul className="pl-6">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`/products?category=${category.id}`}
                        className="block py-2 px-3 rounded text-white hover:bg-gray-700 transition-colors duration-300"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 rounded text-white hover:bg-gray-700 transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 rounded text-white hover:bg-gray-700 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
            <li className="mt-4 space-y-2">
              <button
                onClick={() => navigate("/cart")}
                className="w-full px-4 py-2 bg-[#E0A387] text-white rounded-md hover:bg-[#E0A387]/80 transition-all duration-300"
              >
                Cart
              </button>
              {localStorage.getItem("token") ? (
                <div className="space-y-2">
                  <button
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#E0A387] flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="text-white text-lg font-bold">
                      {localStorage.getItem("user")
                        ? JSON.parse(
                            localStorage.getItem("user")
                          ).email[0].toUpperCase()
                        : ""}
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
