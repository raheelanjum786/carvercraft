import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
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
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        "http://51.21.182.124/api/expenses/getAll"
      );
      const data = await response.data;
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
      const response = await api.get("http://51.21.182.124/api/products/get");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      date: dateString,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = {
        ...formData,
        date: moment(formData.date).format("YYYY-MM-DD"),
      };

      if (formData.product) {
        const productData = JSON.parse(formData.product);
        submitData = {
          ...submitData,
          productId: productData.id,
          productName: productData.name,
        };
        delete submitData.product;
      }

      const response = await api.post(
        "http://51.21.182.124/api/expenses/create",
        submitData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Failed to create expense");

      message.success("Expense created successfully");
      await fetchExpenses();
      setActiveTab("list");
      setFormData({});
    } catch (err) {
      message.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleEditExpense = async (e) => {
    e.preventDefault();
    try {
      let submitData = {
        ...formData,
        date: moment(formData.date).format("YYYY-MM-DD"),
      };

      if (formData.product) {
        try {
          const productData = JSON.parse(formData.product);
          submitData = {
            ...submitData,
            productId: productData.id,
            productName: productData.name,
          };
          delete submitData.product;
        } catch (parseError) {
          console.error("Error parsing product data:", parseError);

          message.error("Invalid product data selected.");
          return;
        }
      } else {
        submitData.productId = null;
        delete submitData.productName;
      }

      submitData.amount = parseFloat(submitData.amount);
      if (isNaN(submitData.amount)) {
        message.error("Invalid amount provided.");
        return;
      }

      const response = await api.put(
        `http://51.21.182.124/api/expenses/update/${currentExpense.id}`,
        submitData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) throw new Error("Failed to update expense");

      message.success("Expense updated successfully");
      await fetchExpenses();
      setIsEditing(false);
      setCurrentExpense(null);
      setFormData({});
    } catch (err) {
      message.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      const response = await api.delete(
        `http://51.21.182.124/api/expenses/${id}`
      );

      if (response.status !== 200) throw new Error("Failed to delete expense");

      await fetchExpenses();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

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

  const fetchMonthlyData = async (year = new Date().getFullYear()) => {
    try {
      setLoading(true);

      const monthlyStats = Array(12)
        .fill(0)
        .map(() => ({
          total: 0,
          expenses: [],
          categories: {},
        }));

      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseYear = expenseDate.getFullYear();

        if (expenseYear === year) {
          const month = expenseDate.getMonth();
          monthlyStats[month].total += Number(expense.amount);
          monthlyStats[month].expenses.push(expense);

          if (!monthlyStats[month].categories[expense.category]) {
            monthlyStats[month].categories[expense.category] = 0;
          }
          monthlyStats[month].categories[expense.category] += Number(
            expense.amount
          );
        }
      });

      setMonthlyData(monthlyStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expenses.length > 0) {
      fetchMonthlyData(selectedYear);
    }
  }, [expenses, selectedYear]);

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
        className={`min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-3 sm:p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              className={`px-6 py-2 text-lg font-semibold ${
                activeTab === "list"
                  ? "bg-[#3498DB] text-[#FFFFFF]"
                  : "bg-[#2C3E50] text-[#ECF0F0]"
              } hover:bg-[#34495E] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("list")}
            >
              Expense List
            </Button>
            <Button
              className={`px-6 py-2 text-lg font-semibold ${
                activeTab === "add"
                  ? "bg-[#3498DB] text-[#FFFFFF]"
                  : "bg-[#2C3E50] text-[#ECF0F0]"
              } hover:bg-[#34495E] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("add")}
            >
              Add Expense
            </Button>
            <Button
              className={`px-6 py-2 text-lg font-semibold ${
                activeTab === "monthly"
                  ? "bg-[#3498DB] text-[#FFFFFF]"
                  : "bg-[#2C3E50] text-[#ECF0F0]"
              } hover:bg-[#34495E] transition-colors duration-300 shadow-lg`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly Overview
            </Button>
          </div>

          {activeTab === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#2C3E50]/10 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-xl w-full mx-auto"
            >
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 4,
                  xl: 4,
                }}
                dataSource={expenses}
                renderItem={(expense) => (
                  <List.Item>
                    <Card
                      className="border-[#34495E]/20 h-full"
                      style={{
                        backgroundColor: "rgba(44, 62, 80, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                      hoverable={false}
                      actions={[
                        <>
                          <div className="flex items-center align-middle justify-evenly">
                            <FaEdit
                              onClick={() => {
                                setIsEditing(true);
                                setFormData(expense);
                              }}
                              className="text-[#3498DB] hover:text-[#34495E] transition-colors"
                            />
                            <Popconfirm
                              title="Are you sure you want to delete this expense?"
                              onConfirm={() => handleDeleteExpense(expense.id)}
                              okText="Yes"
                              cancelText="No"
                              overlayClassName="custom-popconfirm"
                            >
                              <FaTrash
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="text-[#E74C3C] hover:text-[#34495E] transition-colors cursor-pointer"
                              />
                            </Popconfirm>
                          </div>
                        </>,
                      ]}
                    >
                      <div className="p-3 sm:p-4">
                        <h3
                          className="text-xl font-semibold text-[#FFFFFF] mb-2"
                          onClick={() => showModal(expense)}
                        >
                          {expense.title}
                        </h3>
                        <p className="text-[#ECF0F0] mb-2">
                          Category: {expense.category}
                        </p>
                        <p className="text-[#3498DB] text-lg font-bold">
                          €.{expense.amount}
                        </p>
                        <p className="text-[#ECF0F0] text-sm">
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
              className="bg-[#2C3E50]/10 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-4 sm:mb-6">
                Add New Expense
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-10 sm:h-12 text-base sm:text-lg rounded-lg px-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Product (Optional)
                  </label>
                  <select
                    className="w-full custom-select h-12 text-lg rounded-lg bg-[#34495E]"
                    onChange={(e) =>
                      handleSelectChange(e.target.value, "product")
                    }
                    disabled={productsLoading}
                  >
                    <option value="">Select a product (optional)</option>
                    {products?.map((product) => (
                      <option
                        key={product._id}
                        value={JSON.stringify({
                          id: product._id,
                          name: product.name,
                        })}
                        className="text-[#FFFFFF] hover:bg-[#34495E]"
                      >
                        {product.name} - €{product.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[#FFFFFF] text-lg">Category</label>
                  <select
                    className="w-full h-12 text-lg rounded-lg bg-[#34495E] text-[#FFFFFF] px-3"
                    onChange={(e) =>
                      handleSelectChange(e.target.value, "category")
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="text-[#FFFFFF] hover:bg-[#34495E]"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-10 sm:h-12 text-base sm:text-lg rounded-lg px-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-12 text-lg rounded-lg px-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-24 text-base sm:text-lg rounded-lg px-3 py-2"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3498DB] text-[#FFFFFF] hover:bg-[#34495E] h-12 text-lg font-semibold rounded-lg"
                >
                  Add Expense
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === "monthly" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#2C3E50]/10 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-xl w-full mx-auto"
            >
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-4">
                  Monthly Expense Overview - {selectedYear}
                </h2>

                <div className="flex justify-between items-center mb-6">
                  <Button
                    onClick={() => setSelectedYear((prev) => prev - 1)}
                    className="bg-[#2C3E50] text-[#ECF0F0] hover:bg-[#34495E]"
                  >
                    Previous Year
                  </Button>
                  <span className="text-[#FFFFFF] text-lg font-semibold">
                    {selectedYear}
                  </span>
                  <Button
                    onClick={() => setSelectedYear((prev) => prev + 1)}
                    className="bg-[#2C3E50] text-[#ECF0F0] hover:bg-[#34495E]"
                    disabled={selectedYear >= new Date().getFullYear()}
                  >
                    Next Year
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {monthlyData.map((data, index) => (
                    <Card
                      key={index}
                      className="border-[#34495E]/20"
                      style={{
                        backgroundColor: "rgba(44, 62, 80, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                      title={
                        <span className="text-[#FFFFFF]">
                          {moment().month(index).format("MMMM")}
                        </span>
                      }
                    >
                      <Statistic
                        title={
                          <span className="text-[#ECF0F0]">Total Expenses</span>
                        }
                        value={data.total.toFixed(2)}
                        precision={2}
                        prefix="€"
                        valueStyle={{ color: "#3498DB" }}
                      />

                      <div className="mt-4">
                        <h4 className="text-[#ECF0F0] mb-2">
                          Category Breakdown:
                        </h4>
                        <ul className="space-y-1">
                          {Object.entries(data.categories).map(
                            ([category, amount]) => (
                              <li
                                key={category}
                                className="flex justify-between"
                              >
                                <span className="text-[#ECF0F0]">
                                  {category}
                                </span>
                                <span className="text-[#3498DB]">
                                  €{amount.toFixed(2)}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <p className="text-[#ECF0F0]">
                          {data.expenses.length} expense
                          {data.expenses.length !== 1 ? "s" : ""} this month
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {isEditing && (
            <Modal
              title="Edit Expense"
              open={isEditing}
              onCancel={() => {
                setIsEditing(false);
                setFormData({});
              }}
              footer={null}
              className="custom-modal"
            >
              <form onSubmit={handleEditExpense} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-10 sm:h-12 text-base sm:text-lg rounded-lg px-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Product (Optional)
                  </label>
                  <Select
                    className="w-full custom-select h-12 text-lg rounded-lg"
                    placeholder="Select a product (optional)"
                    loading={productsLoading}
                    value={
                      formData.product
                        ? formData.product
                        : formData.productId
                        ? JSON.stringify({
                            id: formData.productId,
                            name: formData.productName,
                          })
                        : undefined
                    }
                    onChange={(value) => handleSelectChange(value, "product")}
                    allowClear
                    style={{
                      backgroundColor: "#34495E",
                    }}
                  >
                    {products?.map((product) => (
                      <Option
                        key={product._id}
                        value={JSON.stringify({
                          id: product._id,
                          name: product.name,
                        })}
                        className="text-[#FFFFFF] hover:bg-[#34495E]"
                      >
                        <div className="flex justify-between items-center">
                          <span>{product.name}</span>
                          <span>€{product.price}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[#FFFFFF] text-lg">Category</label>
                  <Select
                    className="w-full custom-select h-12 text-lg rounded-lg"
                    value={formData.category || undefined}
                    onChange={(value) => handleSelectChange(value, "category")}
                    required
                    style={{
                      backgroundColor: "#34495E",
                    }}
                  >
                    {categories.map((category) => (
                      <Option
                        key={category}
                        value={category}
                        className="text-[#FFFFFF] hover:bg-[#34495E]"
                      >
                        {category}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    required
                    value={formData.amount || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-10 sm:h-12 text-base sm:text-lg rounded-lg px-3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Date
                  </label>
                  <DatePicker
                    value={formData.date ? moment(formData.date) : null}
                    onChange={handleDateChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-12 text-lg rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base sm:text-lg text-[#FFFFFF]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    required
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    className="w-full bg-[#34495E] border-[#3498DB] text-[#FFFFFF] h-24 text-base sm:text-lg rounded-lg px-3 py-2"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3498DB] text-[#FFFFFF] hover:bg-[#34495E] h-12 text-lg font-semibold rounded-lg"
                >
                  Update Expense
                </button>
              </form>
            </Modal>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AdminExpenseManager;
