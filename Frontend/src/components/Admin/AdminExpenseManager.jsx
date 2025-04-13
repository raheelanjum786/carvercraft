import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  List,
  Card,
  Statistic,
  Popconfirm,
  message,
} from "antd";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaShoppingCart,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import moment from "moment";
import "./AdminGlobalStyling.css";
import axios from "axios";
const { Option } = Select;
const { RangePicker } = DatePicker;
import api from "../../utils/axios";
import SideBar from "./SideBar";

const AdminExpenseManager = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        "http://localhost:4000/api/expenses/getAll"
      );
      const data = await response.data;
      console.log(data);
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await api.get("http://localhost:4000/api/products/get");
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create expense
  const onFinish = async (expenseData) => {
    console.log(expenseData);

    try {
      let formattedData = {
        ...expenseData,
        date: moment(expenseData.date).format("YYYY-MM-DD"),
      };

      if (expenseData.product) {
        const productData = JSON.parse(expenseData.product);
        formattedData = {
          ...formattedData,
          productId: productData.id,
          productName: productData.name,
        };
        // Remove the original product field
        delete formattedData.product;
      }

      console.log("Submitting expense:", formattedData);

      const response = await api.post(
        "http://localhost:4000/api/expenses/create",
        formattedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // const response = await api.post(
      //   "http://localhost:4000/api/expenses/create",
      //   expenseData,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      if (response.status !== 200) throw new Error("Failed to create expense");

      message.success("Expense created successfully");
      await fetchExpenses();
      setActiveTab("list");
    } catch (err) {
      message.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  // Update expense
  const handleEditExpense = async (e) => {
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);

    try {
      const response = await api.put(
        `http://localhost:4000/api/expenses/update/${currentExpense.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Failed to update expense");

      await fetchExpenses();
      setIsEditing(false);
      setCurrentExpense(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      const response = await api.delete(
        `http://localhost:4000/api/expenses/${id}`
      );

      if (response.status !== 200) throw new Error("Failed to delete expense");

      await fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalExpense = expenses.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0
    );
    const monthlyExpenses = expenses.reduce((acc, exp) => {
      const month = new Date(exp.date).getMonth();
      acc[month] = (acc[month] || 0) + Number(exp.amount);
      return acc;
    }, {});

    return {
      totalExpense,
      monthlyExpenses,
      averageExpense: totalExpense / (expenses.length || 1),
    };
  };

  const stats = getStatistics();

  const categories = [
    "Raw Materials",
    "Packaging",
    "Labor",
    "Utilities",
    "Marketing",
    "Equipment",
    "Other",
  ];

  const showModal = (expense) => {
    setCurrentExpense(expense);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

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
        className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-3 sm:p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              className={`px-6 py-2 text-lg font-semibold ${
                activeTab === "list"
                  ? "bg-[#E0A387] text-[#310A0B]"
                  : "bg-[#743A36] text-[#E0A387]"
              } hover:bg-[#B96A59] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("list")}
            >
              Expense List
            </Button>
            <Button
              className={`px-6 py-2 text-lg font-semibold ${
                activeTab === "add"
                  ? "bg-[#E0A387] text-[#310A0B]"
                  : "bg-[#743A36] text-[#E0A387]"
              } hover:bg-[#B96A59] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("add")}
            >
              Add Expense
            </Button>
            <Button
              className={`px-6 py-2 text-lg font-semibold ${
                activeTab === "monthly"
                  ? "bg-[#E0A387] text-[#310A0B]"
                  : "bg-[#743A36] text-[#E0A387]"
              } hover:bg-[#B96A59] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly Overview
            </Button>
          </div>

          {activeTab === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#E0A387]/5 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-xl w-full mx-auto"
            >
              <List
                grid={{
                  gutter: 16,
                  xs: 1, // 1 column for extra small screens
                  sm: 1, // 1 column for small screens
                  md: 2, // 2 columns for medium screens
                  lg: 4, // 3 columns for large screens
                  xl: 4, // 3 columns for extra large screens
                }}
                dataSource={expenses}
                renderItem={(expense) => (
                  <List.Item>
                    <Card
                      className="border-[#E0A387]/20 h-full"
                      style={{
                        backgroundColor: "rgba(116, 58, 54, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                      hoverable={false}
                      actions={[
                        <>
                          <div className="flex items-center align-middle justify-evenly">
                            <FaEdit
                              onClick={() => {
                                setIsEditing(true);
                                // setCurrentExpense(expense);
                                editForm.setFieldsValue({
                                  ...expense,
                                  date: moment(expense.date),
                                });
                              }}
                              className=" text-[#E0A387] hover:text-[#B96A59] transition-colors"
                            />
                            <Popconfirm
                              title="Are you sure you want to delete this expense?"
                              onConfirm={() => handleDeleteExpense(expense.id)}
                              okText="Yes"
                              cancelText="No"
                              overlayClassName="custom-popconfirm"
                            >
                              <FaTrash className="text-[#E0A387] hover:text-[#B96A59] transition-colors" />
                            </Popconfirm>
                          </div>
                        </>,
                      ]}
                    >
                      <div className="p-3 sm:p-4">
                        <h3
                          className="text-xl font-semibold text-[#E0A387] mb-2"
                          onClick={() => showModal(expense)}
                        >
                          {expense.title}
                        </h3>
                        <p className="text-[#B96A59] mb-2">
                          Category: {expense.category}
                        </p>
                        <p className="text-[#E0A387] text-lg font-bold">
                          Rs.{expense.amount}
                        </p>
                        <p className="text-[#B96A59] text-sm">
                          {moment(expense.date).format("MMMM D, YYYY")}
                        </p>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </motion.div>
          )}

          {activeTab === "add" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#E0A387]/5 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#E0A387] mb-4 sm:mb-6">
                Add New Expense
              </h2>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                className="space-y-6"
              >
                <Form.Item
                  name="title"
                  label={
                    <span className="text-base sm:text-lg text-[#E0A387]">
                      Title
                    </span>
                  }
                  rules={[{ required: true, message: "Please input title!" }]}
                >
                  <Input className="bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-10 sm:h-12 text-base sm:text-lg rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="product"
                  label={
                    <span className="text-base sm:text-lg text-[#E0A387]">
                      Product (Optional)
                    </span>
                  }
                >
                  <Select
                    className="custom-select h-12 text-lg rounded-lg"
                    placeholder="Select a product (optional)"
                    loading={productsLoading}
                    dropdownClassName="custom-select-dropdown"
                    allowClear
                    style={{
                      backgroundColor: "#743A36",
                    }}
                  >
                    {products?.map((product) => (
                      <Option
                        key={product._id}
                        // Change this to pass an object with both id and name
                        value={JSON.stringify({
                          id: product._id,
                          name: product.name,
                        })}
                        className="text-[#E0A387] hover:bg-[#743A36]/40"
                      >
                        <div className="flex justify-between items-center">
                          <span>{product.name}</span>
                          <span>Rs.{product.price}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="category"
                  label={
                    <span className="text-[#E0A387] text-lg">Category</span>
                  }
                  rules={[
                    { required: true, message: "Please select category!" },
                  ]}
                >
                  <Select
                    className="custom-select h-12 text-lg rounded-lg"
                    value=""
                    dropdownClassName="custom-select-dropdown"
                    style={{
                      backgroundColor: "#743A36",
                    }}
                  >
                    {categories.map((category) => (
                      <Option
                        key={category}
                        value={category}
                        className="text-[#E0A387] hover:bg-[#743A36]/40"
                      >
                        {category}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="amount"
                  label={
                    <span className="text-base sm:text-lg text-[#E0A387]">
                      Amount
                    </span>
                  }
                  rules={[{ required: true, message: "Please input amount!" }]}
                >
                  <Input
                    type="number"
                    className="bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-10 sm:h-12 text-base sm:text-lg rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="date"
                  label={
                    <span className="text-base sm:text-lg text-[#E0A387]">
                      Date
                    </span>
                  }
                  rules={[{ required: true, message: "Please select date!" }]}
                >
                  <DatePicker className="w-full bg-[#743A36] border-[#E0A387] text-[#E0A387] h-12 text-lg rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label={
                    <span className="text-base sm:text-lg text-[#E0A387]">
                      Description
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please input description!" },
                  ]}
                >
                  <Input.TextArea
                    className="bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-10 sm:h-12 text-base sm:text-lg rounded-lg"
                    rows={4}
                  />
                </Form.Item>

                <Form.Item className="mb-0" label={null}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-[#743A36] text-[#E0A387] hover:bg-[#B96A59] h-12 text-lg font-semibold w-full rounded-lg"
                  >
                    Add Expense
                  </Button>
                </Form.Item>
              </Form>
            </motion.div>
          )}

          {activeTab === "monthly" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Date Range Filter */}
              <div className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl mb-6">
                <h3 className="text-xl font-semibold text-[#E0A387] mb-4">
                  Filter by Date Range
                </h3>
                <RangePicker
                  onChange={handleDateRangeChange}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-12 text-lg rounded-lg"
                />
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Total Expenses",
                    value: getStatistics().totalExpense,
                    icon: <FaMoneyBillWave />,
                    color: "#E0A387",
                  },
                  {
                    title: "Total Revenue",
                    value: getStatistics().totalRevenue,
                    icon: <FaChartLine />,
                    color: "#B96A59",
                  },
                  {
                    title: "Total Sales",
                    value: getStatistics().totalSales,
                    icon: <FaShoppingCart />,
                    color: "#743A36",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl"
                  >
                    <Statistic
                      title={
                        <span className="text-base sm:text-lg text-[#E0A387]">
                          {stat.title}
                        </span>
                      }
                      value={stat.value}
                      valueStyle={{
                        color: stat.color,
                        fontSize: "1.5rem",
                        "@media (min-width: 640px)": { fontSize: "2rem" },
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Filtered Expense List */}
              <div className="bg-[#E0A387]/5 backdrop-blur-sm p-6 rounded-lg shadow-xl">
                <h3 className="text-xl font-semibold text-[#E0A387] mb-4">
                  Expense Details
                </h3>
                <List
                  dataSource={expenses}
                  renderItem={(expense) => (
                    <List.Item
                      className="border-b border-[#E0A387]/20 py-4"
                      onClick={() => showModal(expense)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <h4 className="text-[#E0A387] text-lg font-semibold">
                            {expense.title}
                          </h4>
                          <p className="text-[#B96A59]">{expense.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#E0A387] text-lg font-bold">
                            ${expense.amount}
                          </p>
                          <p className="text-[#B96A59] text-sm">
                            {moment(expense.date).format("MMMM D, YYYY")}
                          </p>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* View Details Modal */}
          <Modal
            title={null}
            open={!!currentExpense}
            onCancel={() => setCurrentExpense(null)}
            footer={null}
            className="custom-modal"
            width={600}
          >
            <div className="p-2 md:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#E0A387] mb-4 sm:mb-6">
                {currentExpense?.title}
              </h2>
              <div className="bg-[#743A36]/20 p-2 md:p-6 rounded-lg space-y-2 md:space-y-4">
                <div className="text-[#E0A387] text-lg">
                  <span className="font-semibold">Category:</span>{" "}
                  {currentExpense?.category}
                </div>
                <div className="text-[#E0A387] text-lg">
                  <span className="font-semibold">Amount:</span> $
                  {currentExpense?.amount}
                </div>
                <div className="text-[#E0A387] text-lg">
                  <span className="font-semibold">Date:</span>{" "}
                  {moment(currentExpense?.date).format("MMMM D, YYYY")}
                </div>
                <div className="text-[#E0A387] text-lg">
                  <span className="font-semibold">Description:</span>
                  <p className="mt-2">{currentExpense?.description}</p>
                </div>
                <div className="text-[#E0A387] text-lg">
                  <span className="font-semibold">Product:</span>
                  <p className="mt-2">{currentExpense?.product}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setCurrentExpense(null)}
                  className="bg-[#743A36] text-[#E0A387] hover:bg-[#B96A59] px-6 py-2 text-lg font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            title="Edit Expense"
            open={isEditing}
            onCancel={() => setIsEditing(false)}
            footer={null}
            className="custom-modal"
          >
            <Form
              form={editForm}
              onFinish={handleEditExpense}
              layout="vertical"
              className="space-y-6"
            >
              <Form.Item
                name="title"
                label={
                  <span className="text-base sm:text-lg text-[#E0A387]">
                    Title
                  </span>
                }
              >
                <Input className="bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-10 sm:h-12 text-base sm:text-lg rounded-lg" />
              </Form.Item>

              <Form.Item
                name="category"
                label={
                  <span className="text-base sm:text-lg text-[#E0A387]">
                    Category
                  </span>
                }
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select className="custom-select h-12 text-lg">
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="amount"
                label={
                  <span className="text-base sm:text-lg text-[#E0A387]">
                    Amount
                  </span>
                }
                rules={[{ required: true, message: "Please input amount!" }]}
              >
                <Input
                  type="number"
                  className="bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-10 sm:h-12 text-base sm:text-lg rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="date"
                label={
                  <span className="text-base sm:text-lg text-[#E0A387]">
                    Date
                  </span>
                }
                rules={[{ required: true, message: "Please select date!" }]}
              >
                <DatePicker className="w-full bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-12 text-lg rounded-lg" />
              </Form.Item>

              <Form.Item
                name="description"
                label={
                  <span className="text-base sm:text-lg text-[#E0A387]">
                    Description
                  </span>
                }
                rules={[
                  { required: true, message: "Please input description!" },
                ]}
              >
                <Input.TextArea
                  className="bg-[#743A36]/20 border-[#E0A387] text-[#E0A387] h-10 sm:h-12 text-base sm:text-lg rounded-lg"
                  rows={4}
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#743A36] text-[#E0A387] hover:bg-[#B96A59] w-full"
                >
                  Update Expense
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </motion.div>
      </div>
    </>
  );
};

export default AdminExpenseManager;
