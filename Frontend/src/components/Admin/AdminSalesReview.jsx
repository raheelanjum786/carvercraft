import React, { useState, useEffect } from "react";
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
import api from "../../utils/axios";

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
  const [loading, setLoading] = useState(true);

  const [salesOverview, setSalesOverview] = useState({
    totalSales: 0,
    uniqueCustomers: 0,
    avgRevenue: 0,
  });
  const [channelsData, setChannelsData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "http://51.21.182.124/api/api/sales/overview"
        );
        const data = response.data;

        setSalesOverview(data.overview);
        setChannelsData(data.channelsData);
        setTopProducts(data.topProducts);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const statCards = [
    {
      title: "Sales",
      amount: formatCurrency(salesOverview.totalSales),
      increase: "+55%",
      icon: <TrendingUp />,
    },
    {
      title: "Customers",
      amount: salesOverview.uniqueCustomers.toLocaleString(),
      increase: "+12%",
      icon: <Users />,
    },
    {
      title: "Avg. Revenue",
      amount: formatCurrency(salesOverview.avgRevenue),
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
        className={`min-h-screen bg-[#1A1A1A] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 bg-[#2D2D2D] rounded-lg">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#2C3E50] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-[#FFFFFF]">
                      {card.title}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-[#34495E] rounded-full text-[#3498DB]"
                    >
                      {card.icon}
                    </motion.div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-2xl font-bold text-[#ECF0F1]">
                      {loading ? "Loading..." : card.amount}
                    </h5>
                    <span className="inline-flex items-center mt-1 text-sm text-[#3498DB]">
                      {card.increase}
                      <span className="text-xs ml-1">since last month</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#2C3E50] rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h6 className="text-xl font-bold text-[#FFFFFF]">Channels</h6>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3498DB] hover:bg-[#2980B9] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                See traffic channels
              </motion.button>
            </div>

            <div className="h-64 mb-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[#ECF0F1]">Loading chart data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={channelsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#34495E" />
                    <XAxis dataKey="name" stroke="#ECF0F1" />
                    <YAxis stroke="#ECF0F1" />
                    <Tooltip />
                    <Line type="monotone" dataKey="facebook" stroke="#3498DB" />
                    <Line type="monotone" dataKey="direct" stroke="#2ECC71" />
                    <Line type="monotone" dataKey="organic" stroke="#F39C12" />
                    <Line type="monotone" dataKey="referral" stroke="#E74C3C" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#2C3E50] rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-4"
          >
            <h6 className="text-xl font-bold text-[#FFFFFF] mb-6">
              Top Selling Products
            </h6>
            {loading ? (
              <p className="text-[#ECF0F1]">Loading top products...</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="bg-[#34495E] w-8 h-8 rounded-full flex items-center justify-center text-[#3498DB] mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <h6 className="text-[#FFFFFF] font-medium">
                          {product.name}
                        </h6>
                        <p className="text-[#ECF0F1] text-sm">
                          {product.quantity} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#3498DB] font-bold">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminSalesReview;
