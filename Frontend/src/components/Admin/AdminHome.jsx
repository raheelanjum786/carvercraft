import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { FaUsers, FaBox, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Table, Avatar } from "antd";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import api from "../../utils/axios";

/*
 * Professional Color Palette:
 * Primary: #2C3E50 (Dark Blue)
 * Secondary: #34495E (Lighter Blue)
 * Accent: #3498DB (Bright Blue)
 * Text Primary: #FFFFFF (White)
 * Text Secondary: #ECF0F1 (Light Gray)
 * Background Primary: #1A1A1A (Almost Black)
 * Background Secondary: #2D2D2D (Dark Gray)
 * Success: #2ECC71 (Green)
 * Warning: #F39C12 (Orange)
 * Danger: #E74C3C (Red)
 * Chart Colors: ["#3498DB", "#2ECC71", "#F39C12", "#E74C3C"]
 */

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [salesData, setSalesData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 3500, 4000, 3800, 4200, 4500],
        borderColor: "#3498DB",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        tension: 0.4,
      },
    ],
  });

  // Add new state for products count
  const [totalProducts, setTotalProducts] = useState(0);

  const [orders, setOrders] = useState(0);
  // Update categoryData state to be dynamic
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#3498DB", "#2ECC71", "#F39C12", "#E74C3C"],
      },
    ],
  });

  // Add useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetching users
        const userRes = await api.get("/api/auth/users/get-users");
        const userData = await userRes.data;
        setUsers(userData);

        // Fetching categories and products
        const [categoriesRes, productsRes] = await Promise.all([
          api.get("/api/categories/get"),
          api.get("/api/products/get"),
        ]);

        // Updating total products count
        setTotalProducts(productsRes.data.length);

        // Processing categories data for the chart
        const categories = categoriesRes.data;

        const orderRes = await api.get("/api/productOrder/getAll");

        setOrders(orderRes.data.length);

        // Counting products per category
        const categoryCount = {};
        productsRes.data.forEach((product) => {
          const category = categories.find((c) => c.id === product.categoryId);
          if (category) {
            categoryCount[category.name] =
              (categoryCount[category.name] || 0) + 1;
          }
        });

        // Update category chart data
        setCategoryData({
          labels: Object.keys(categoryCount),
          datasets: [
            {
              data: Object.values(categoryCount),
              backgroundColor: ["#3498DB", "#2ECC71", "#F39C12", "#E74C3C"],
            },
          ],
        });

        // Fetch Order Status Data
        const orderStatusCount = {
          Pending: 0,
          Processing: 0,
          Completed: 0,
          Cancelled: 0,
        };

        orderRes.data.forEach((order) => {
          if (order.status in orderStatusCount) {
            orderStatusCount[order.status]++;
          }
        });

        setOrderStatusData({
          labels: Object.keys(orderStatusCount),
          datasets: [
            {
              data: Object.values(orderStatusCount),
              backgroundColor: ["#3498DB", "#2ECC71", "#F39C12", "#E74C3C"],
            },
          ],
        });

        // Set Recent Orders
        const recentOrdersData = orderRes.data.slice(0, 3).map((order) => ({
          id: order.id,
          customer: order.customerName,
          amount: order.totalAmount,
          status: order.status,
        }));

        setRecentOrders(recentOrdersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [orderStatusData, setOrderStatusData] = useState({
    labels: ["Pending", "Processing", "Completed", "Cancelled"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#3498DB", "#2ECC71", "#F39C12", "#E74C3C"],
      },
    ],
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const userColumns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<FaUserCircle />} className="bg-[#34495E]" />
          <div>
            <p className="text-white font-medium">{text}</p>
            <p className="text-[#ECF0F1] text-sm">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === "active"
              ? "bg-[#2ECC71]/20 text-[#2ECC71]"
              : "bg-[#E74C3C]/20 text-[#E74C3C]"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      render: (orders) => <span className="text-white">{orders}</span>,
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (time) => <span className="text-[#ECF0F1]">{time}</span>,
    },
  ];

  // Add new state for sales data
  const [salesOverview, setSalesOverview] = useState({
    totalSales: 0,
    uniqueCustomers: 0,
    avgRevenue: 0,
  });

  // Add to your existing useEffect or create a new one
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const salesRes = await api.get("/api/sales/overview");
        const salesData = salesRes.data;

        setSalesOverview(salesData.overview);

        // Update sales chart data if needed
        setSalesData({
          labels: salesData.channelsData.map((item) => item.name),
          datasets: [
            {
              label: "Sales",
              data: salesData.channelsData.map(
                (item) =>
                  Object.values(item).reduce(
                    (sum, val) => (typeof val === "number" ? sum + val : sum),
                    0
                  ) - 0
              ),
              borderColor: "#3498DB",
              backgroundColor: "rgba(52, 152, 219, 0.2)",
              tension: 0.4,
            },
          ],
        });

        // You can also update other charts with the sales data
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const statsCards = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: <FaUsers className="w-6 h-6" />,
      color: "#3498DB",
    },
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: <FaBox />,
      color: "#2ECC71",
    },
    {
      title: "Total Orders",
      value: orders.toString(),
      icon: <FaShoppingCart />,
      color: "#F39C12",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8 ml-16">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#ECF0F1] text-sm">{card.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {card.value}
                  </h3>
                </div>
                <div className="text-3xl" style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Sales Overview
            </h2>
            <Line
              data={salesData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: { color: "#ECF0F1" },
                  },
                  x: {
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: { color: "#ECF0F1" },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: "#ECF0F1" },
                  },
                },
              }}
            />
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Product Categories
            </h2>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut
                data={categoryData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: "#ECF0F1" },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Order Status</h2>
            <Bar
              data={orderStatusData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: { color: "#ECF0F1" },
                  },
                  x: {
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: { color: "#ECF0F1" },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-[#34495E]/30 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{order.customer}</p>
                    <p className="text-sm text-[#ECF0F1]">#{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">Rs.{order.amount}</p>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        order.status === "completed"
                          ? "bg-[#2ECC71]/20 text-[#2ECC71]"
                          : order.status === "pending"
                          ? "bg-[#F39C12]/20 text-[#F39C12]"
                          : "bg-[#3498DB]/20 text-[#3498DB]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2D2D2D] p-4 sm:p-5 md:p-6 rounded-lg shadow-xl w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-black">
                Recent Users
              </h2>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#34495E]">
                    <th className="py-3 px-4 text-left">User</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 3).map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#34495E]/50 hover:bg-[#34495E]/20"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#34495E] flex items-center justify-center">
                            <FaUserCircle className="text-[#ECF0F1]" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-[#ECF0F1]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
