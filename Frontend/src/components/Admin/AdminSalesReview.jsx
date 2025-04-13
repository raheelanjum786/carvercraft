import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Facebook,
  Globe,
  Search,
  Share,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import SideBar from "./SideBar";

const channelsData = [
  { name: "Jan", facebook: 4000, direct: 2400, organic: 2400, referral: 1500 },
  { name: "Feb", facebook: 3000, direct: 1398, organic: 2210, referral: 2500 },
  { name: "Mar", facebook: 2000, direct: 9800, organic: 2290, referral: 3500 },
  { name: "Apr", facebook: 2780, direct: 3908, organic: 2000, referral: 4500 },
];

const revenueData = [
  { name: "Jan", facebook: 4000, google: 2400 },
  { name: "Feb", facebook: 3000, google: 1398 },
  { name: "Mar", facebook: 2000, google: 9800 },
  { name: "Apr", facebook: 2780, google: 3908 },
];

const AdminSalesReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statCards = [
    {
      title: "Sales",
      amount: "$230,220",
      increase: "+55%",
      icon: <TrendingUp />,
    },
    { title: "Customers", amount: "3,200", increase: "+12%", icon: <Users /> },
    {
      title: "Avg. Revenue",
      amount: "$1,200",
      increase: "+$213",
      icon: <DollarSign />,
    },
  ];

  return (
    <>
      <div className="flex">
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      </div>
      <div
        className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        {/* <div className="h-full w-full overflow-x-hidden">
        <SideBar /> */}
        <div
          className="
       
         grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 bg-[#E0A387] rounded-lg"
        >
          {/*  h-screen w-screen ml-16*/}
          {/* Stat Cards */}
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#310A0B] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-[#E0A387]">
                      {card.title}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-[#E0A387]/10 rounded-full text-[#E0A387]"
                    >
                      {card.icon}
                    </motion.div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-2xl font-bold text-[#B96A59]">
                      {card.amount}
                    </h5>
                    <span className="inline-flex items-center mt-1 text-sm text-[#743A36]">
                      {card.increase}
                      <span className="text-xs ml-1">since last month</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Channels Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#310A0B] rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h6 className="text-xl font-bold text-[#E0A387]">Channels</h6>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#E0A387]/80 hover:bg-[#E0A387] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                See traffic channels
              </motion.button>
            </div>

            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={channelsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="facebook" stroke="#4F46E5" />
                  <Line type="monotone" dataKey="direct" stroke="#10B981" />
                  <Line type="monotone" dataKey="organic" stroke="#F59E0B" />
                  <Line type="monotone" dataKey="referral" stroke="#8B5CF6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          {/* Revenue Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#310A0B] rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-4"
          >
            <h6 className="text-xl font-bold text-[#E0A387] mb-6">Revenue</h6>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="facebook" fill="#4F46E5" />
                  <Bar dataKey="google" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          {/* Top Selling Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#310A0B] rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-4"
          >
            <h6 className="text-xl font-bold text-[#E0A387] mb-6">
              Top Selling Products
            </h6>
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ads Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Refunds
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    {
                      name: "Nike v22 Running",
                      value: "$130,992",
                      spent: "$9,500",
                      refunds: { count: 13, up: true },
                    },
                    {
                      name: "Business Kit",
                      value: "$80,250",
                      spent: "$4,200",
                      refunds: { count: 40, up: false },
                    },
                  ].map((product, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-10 w-10 rounded-full bg-gray-200"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.spent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {product.refunds.count}
                          {product.refunds.up ? (
                            <ChevronUp className="ml-2 text-green-500" />
                          ) : (
                            <ChevronDown className="ml-2 text-red-500" />
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminSalesReview;
