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
import {
  FaUsers,
  FaBox,
  FaGift,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
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

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [salesData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 3500, 4000, 3800, 4200, 4500],
        borderColor: "#E0A387",
        backgroundColor: "rgba(224, 163, 135, 0.2)",
        tension: 0.4,
      },
    ],
  });

  // Gift Type Distribution
  const [giftTypeData, setGiftTypeData] = useState({
    labels: ["Ready-Made Gifts", "Custom Gifts"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#E0A387", "#B96A59"],
      },
    ],
  });

  // Add new state for products count
  const [totalProducts, setTotalProducts] = useState(0);
  const [giftOrder, setGiftOrder] = useState(0);
  const [orders, setOrders] = useState(0);
  // Update categoryData state to be dynamic
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#E0A387", "#B96A59", "#743A36"],
      },
    ],
  });

  // Add useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetching users
        const userRes = await api.get(
          "http://localhost:4000/api/auth/users/get-users"
        );
        const userData = await userRes.data;
        setUsers(userData);
        // Fetching categories and products
        const [categoriesRes, productsRes] = await Promise.all([
          api.get("http://localhost:4000/api/categories/get"),
          api.get("http://localhost:4000/api/products/get"),
        ]);

        // Updating total products count
        setTotalProducts(productsRes.data.length);

        const giftRes = await api.get(
          "http://localhost:4000/api/giftOrder/getAll"
        );

        // Processing categories data for the chart
        const categories = categoriesRes.data;
        setGiftOrder(giftRes.data.length);

        const orderRes = await api.get(
          "http://localhost:4000/api/productOrder/getAll"
        );

        setOrders(orderRes.data.length);

        const giftDistributionRes = await api.get(
          "http://localhost:4000/api/gifts/get"
        );

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
              backgroundColor: ["#E0A387", "#B96A59", "#743A36"],
            },
          ],
        });

        // Update gift type distribution data
        const giftTypeCount = {
          "Ready-Made Gifts": 0,
          "Custom Gifts": 0,
        };

        giftDistributionRes.data.forEach((gift) => {
          if (gift.type === "Ready-Made Gifts") {
            giftTypeCount["Ready-Made Gifts"]++;
          } else if (gift.type === "Custom Gifts") {
            giftTypeCount["Custom Gifts"]++;
          }
        });

        setGiftTypeData({
          labels: Object.keys(giftTypeCount),
          datasets: [
            {
              data: Object.values(giftTypeCount),
              backgroundColor: ["#E0A387", "#B96A59"],
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
              backgroundColor: ["#E0A387", "#B96A59", "#743A36", "#491B1D"],
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
        backgroundColor: ["#E0A387", "#B96A59", "#743A36", "#491B1D"],
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
          <Avatar icon={<FaUserCircle />} className="bg-[#743A36]" />
          <div>
            <p className="text-[#E0A387] font-medium">{text}</p>
            <p className="text-[#B96A59] text-sm">{record.email}</p>
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
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
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
      render: (orders) => <span className="text-[#E0A387]">{orders}</span>,
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (time) => <span className="text-[#B96A59]">{time}</span>,
    },
  ];

  const statsCards = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: <FaUsers className="w-6 h-6" />,
      color: "#E0A387",
    },
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: <FaBox />,
      color: "#B96A59",
    },
    {
      title: "Gift Orders",
      value: giftOrder.toString(),
      icon: <FaGift />,
      color: "#743A36",
    },
    {
      title: "Total Orders",
      value: orders.toString(),
      icon: <FaShoppingCart />,
      color: "#491B1D",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-[#E0A387] mb-8 ml-16">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#E0A387] text-sm">{card.title}</p>
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
            className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-[#E0A387] mb-4">
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
                      color: "rgba(224, 163, 135, 0.1)",
                    },
                    ticks: { color: "#E0A387" },
                  },
                  x: {
                    grid: {
                      color: "rgba(224, 163, 135, 0.1)",
                    },
                    ticks: { color: "#E0A387" },
                  },
                },
                plugins: {
                  legend: {
                    labels: { color: "#E0A387" },
                  },
                },
              }}
            />
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-[#E0A387] mb-4">
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
                      labels: { color: "#E0A387" },
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
            className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-[#E0A387] mb-4">
              Order Status
            </h2>
            <Bar
              data={orderStatusData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(224, 163, 135, 0.1)",
                    },
                    ticks: { color: "#E0A387" },
                  },
                  x: {
                    grid: {
                      color: "rgba(224, 163, 135, 0.1)",
                    },
                    ticks: { color: "#E0A387" },
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
            className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-[#E0A387] mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-[#743A36]/20 rounded-lg"
                >
                  <div>
                    <p className="text-[#E0A387] font-medium">
                      {order.customer}
                    </p>
                    <p className="text-sm text-[#B96A59]">#{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#E0A387] font-medium">
                      Rs.{order.amount}
                    </p>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        order.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : order.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-blue-500/20 text-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Gift Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-bold text-[#E0A387] mb-4">
              Gift Type Distribution
            </h2>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut
                data={giftTypeData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: "#E0A387" },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
          {/* User Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#E0A387]/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg shadow-xl w-full"
          >
            <div className="bg-[#E0A387]/5 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg shadow-xl w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#E0A387]">
                  Recent Users
                </h2>
                <button
                  onClick={() => {
                    /* Add navigation to full user list */
                  }}
                  className="mt-3 sm:mt-0 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#743A36] text-[#E0A387] rounded-md hover:bg-[#B96A59] transition duration-300 text-sm sm:text-base"
                >
                  View All
                </button>
              </div>

              <div className="overflow-hidden w-full">
                <Table
                  dataSource={users}
                  columns={userColumns
                    .map((col, index) => (index < 1 ? col : null))
                    .filter(Boolean)} // Show only the first two columns
                  pagination={{ pageSize: 3 }}
                  className="user-table w-full"
                  rowKey="id"
                  style={{
                    background: "transparent",
                  }}
                  scroll={{ x: true }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
