import React, { useState, useEffect } from "react";
import { Table, Input, Select, Tag, Modal, Button, message } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import api from "../../utils/axios";
import SideBar from "./SideBar";
// import "../AdminGlobalStyling.css";

const { Option } = Select;

const AdminCardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        "http://localhost:4000/api/cardOrders/admin/all"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  const showOrderDetails = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(
        `http://localhost:4000/api/cardOrders/${orderId}/status`,
        {
          status: newStatus,
        }
      );

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      message.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#F39C12"; // Warning
      case "processing":
        return "#3498DB"; // Accent
      case "completed":
        return "#2ECC71"; // Success
      case "cancelled":
        return "#E74C3C"; // Danger
      default:
        return "#34495E"; // Secondary
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toString().includes(searchText) ||
      order.user?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.cardType?.name?.toLowerCase().includes(searchText.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div>
          <div className="font-medium text-[#FFFFFF]">{record.user?.name}</div>
          <div className="text-xs text-[#ECF0F1]">{record.user?.email}</div>
        </div>
      ),
    },
    {
      title: "Card Type",
      dataIndex: ["cardType", "name"],
      key: "cardType",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 90,
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `Rs. ${price.toLocaleString()}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="small"
          onClick={() => showOrderDetails(record)}
          className="bg-[#3498DB] border-[#3498DB] hover:bg-[#2C3E50]"
        >
          View
        </Button>
      ),
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
        <h1 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-6">
          Custom Card Orders
        </h1>

        <div className="bg-[#2D2D2D] rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select
                defaultValue="all"
                style={{ width: 150 }}
                onChange={handleStatusChange}
                className="w-full sm:w-auto"
              >
                <Option value="all">All Statuses</Option>
                <Option value="pending">Pending</Option>
                <Option value="processing">Processing</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>

              <Input
                placeholder="Search orders..."
                prefix={<SearchOutlined className="text-[#3498DB]" />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredOrders}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            className="custom-table"
            scroll={{ x: "max-content" }}
          />
        </div>

        <Modal
          title="Order Details"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={700}
        >
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[#FFFFFF]">
                    Order #{selectedOrder.id}
                  </h3>
                  <p className="text-[#ECF0F1]">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Select
                    value={selectedOrder.status}
                    onChange={(value) =>
                      handleUpdateStatus(selectedOrder.id, value)
                    }
                    style={{ width: 150 }}
                  >
                    <Option value="pending">Pending</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#2D2D2D] p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-[#FFFFFF]">
                    Customer Information
                  </h4>
                  <p>
                    <span className="text-[#3498DB]">Name:</span>{" "}
                    <span className="text-[#ECF0F1]">
                      {selectedOrder.user?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#3498DB]">Email:</span>{" "}
                    <span className="text-[#ECF0F1]">
                      {selectedOrder.user?.email}
                    </span>
                  </p>
                </div>

                <div className="bg-[#2D2D2D] p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-[#FFFFFF]">
                    Order Summary
                  </h4>
                  <p>
                    <span className="text-[#3498DB]">Card Type:</span>{" "}
                    <span className="text-[#ECF0F1]">
                      {selectedOrder.cardType?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#3498DB]">Quantity:</span>{" "}
                    <span className="text-[#ECF0F1]">
                      {selectedOrder.quantity}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#3498DB]">Total Price:</span>{" "}
                    <span className="text-[#ECF0F1]">
                      Rs. {selectedOrder.totalPrice.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-[#2D2D2D] p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-[#FFFFFF]">
                  Design Preview
                </h4>
                <div className="flex justify-center">
                  <img
                    src={`http://localhost:4000/api${selectedOrder.designUrl}`}
                    alt="Customer Design"
                    className="max-h-64 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-design.png";
                    }}
                  />
                </div>
              </div>

              {selectedOrder.customerNotes && (
                <div className="bg-[#2D2D2D] p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-[#FFFFFF]">
                    Customer Notes
                  </h4>
                  <p className="text-[#ECF0F1]">
                    {selectedOrder.customerNotes}
                  </p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default AdminCardOrders;
