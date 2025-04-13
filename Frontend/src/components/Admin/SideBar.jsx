import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaCalculator,
  FaMoneyBill,
  FaSubscript,
  FaTimes,
} from "react-icons/fa";
import {
  FaHome,
  FaPlus,
  FaList,
  FaBoxes,
  FaUsers,
  FaClipboardList,
  FaGift,
  FaPen,
  FaCog,
} from "react-icons/fa";

const SideBar = ({ isOpen, setIsOpen, isMobile, setIsMobile }) => {
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/admin", icon: <FaHome />, label: "Dashboard" },
    { path: "/admin/products/add", icon: <FaPlus />, label: "Add Product" },
    { path: "/admin/products/list", icon: <FaList />, label: "Product List" },
    { path: "/admin/categories", icon: <FaBoxes />, label: "Categories" },
    { path: "/admin/users", icon: <FaUsers />, label: "Users" },
    {
      path: "/admin/product/orders",
      icon: <FaClipboardList />,
      label: "Orders",
    },
    { path: "/admin/gift/orders", icon: <FaGift />, label: "Gift Orders" },
    { path: "/admin/gift/create", icon: <FaPen />, label: "Create Gift" },
    { path: "/admin/gift/list", icon: <FaList />, label: "Gifts List" },
    { path: "/admin/employers", icon: <FaUsers />, label: "Employer List" },
    { path: "/admin/sales", icon: <FaMoneyBill />, label: "Sales" },
    {
      path: "/admin/expenses",
      icon: <FaCalculator />,
      label: "Expense Management",
    },
    {
      path: "/admin/subscription",
      icon: <FaSubscript />,
      label: "Subscribed Newsletter",
    },
    { path: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-5 left-4 z-50 p-2 rounded-lg bg-[#310A0B] text-[#E0A387] hover:bg-[#491B1D] transition-all duration-300"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        initial={false}
        animate={{
          width: isOpen ? "256px" : "84px",
          x: isMobile && !isOpen ? "-100%" : 0,
        }}
        className={`fixed top-0 left-0 h-screen bg-[#310A0B] text-[#E0A387]
          overflow-hidden z-40 shadow-xl`}
      >
        {/* Mobile Close Button */}
        {isMobile && isOpen && (
          <button
            className="absolute top-5 right-4 p-2 rounded-lg bg-[#491B1D] text-[#E0A387]"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        )}

        <div className="flex flex-col h-full">
          {/* Logo/Header Section */}
          <div className="p-6 pb-12 border-b border-[#743A36]/20">
            {isOpen && (
              <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ x: 6 }}
                  className={`rounded-lg overflow-hidden ${
                    location.pathname === item.path
                      ? "bg-[#743A36]"
                      : "hover:bg-[#491B1D]"
                  }`}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      isOpen ? "gap-4 p-3" : "p-3 justify-center"
                    } w-full`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {isOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="p-6 border-t border-[#743A36]/20">
            {isOpen && (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#743A36] flex items-center justify-center">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-sm text-[#E0A387]/60">Administrator</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
