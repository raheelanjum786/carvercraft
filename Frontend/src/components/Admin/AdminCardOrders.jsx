import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import SideBar from "./SideBar";

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
        "http://51.21.182.124:4000/api/cardOrders/admin/all"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to load orders");
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
        `http://51.21.182.124:4000/api/cardOrders/${orderId}/status`,
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

      alert(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#F39C12";
      case "processing":
        return "#3498DB";
      case "completed":
        return "#2ECC71";
      case "cancelled":
        return "#E74C3C";
      default:
        return "#34495E";
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
              <select
                value={filterStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full sm:w-auto p-2 rounded bg-[#1A1A1A] text-white border border-[#3498DB]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <input
                type="text"
                placeholder="Search orders..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full sm:w-64 p-2 rounded bg-[#1A1A1A] text-white border border-[#3498DB]"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center p-4 text-white">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#3498DB]">
                    <th className="p-2 text-left">Order ID</th>
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2 text-left">Card Type</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Total</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#3498DB]">
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">
                        <div className="font-medium">{order.user?.name}</div>
                        <div className="text-xs text-[#ECF0F1]">
                          {order.user?.email}
                        </div>
                      </td>
                      <td className="p-2">{order.cardType?.name}</td>
                      <td className="p-2">{order.quantity}</td>
                      <td className="p-2">
                        € {order.totalPrice.toLocaleString()}
                      </td>
                      <td className="p-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2">
                        <span
                          className="px-2 py-1 rounded"
                          style={{
                            backgroundColor: getStatusColor(order.status),
                          }}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => showOrderDetails(order)}
                          className="bg-[#3498DB] text-white px-4 py-2 rounded hover:bg-[#2C3E50]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#2D2D2D] rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Order Details</h2>
                <button
                  onClick={() => setIsModalVisible(false)}
                  className="text-white hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {selectedOrder && (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        Order #{selectedOrder.id}
                      </h3>
                      <p className="text-[#ECF0F1]">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) =>
                          handleUpdateStatus(selectedOrder.id, e.target.value)
                        }
                        className="p-2 rounded bg-[#1A1A1A] text-white border border-[#3498DB]"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-white">
                        Customer Information
                      </h4>
                      <p className="text-[#ECF0F1]">
                        <span className="text-[#3498DB]">Name:</span>{" "}
                        {selectedOrder.user?.name}
                      </p>
                      <p className="text-[#ECF0F1]">
                        <span className="text-[#3498DB]">Email:</span>{" "}
                        {selectedOrder.user?.email}
                      </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-white">
                        Order Summary
                      </h4>
                      <p className="text-[#ECF0F1]">
                        <span className="text-[#3498DB]">Card Type:</span>{" "}
                        {selectedOrder.cardType?.name}
                      </p>
                      <p className="text-[#ECF0F1]">
                        <span className="text-[#3498DB]">Quantity:</span>{" "}
                        {selectedOrder.quantity}
                      </p>
                      <p className="text-[#ECF0F1]">
                        <span className="text-[#3498DB]">Total Price:</span> €{" "}
                        {selectedOrder.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-white">
                      Design Preview
                    </h4>
                    <div className="flex justify-center">
                      <img
                        src={`http://51.21.182.124:4000/api${selectedOrder.designUrl}`}
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
                    <div className="bg-[#1A1A1A] p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-white">
                        Customer Notes
                      </h4>
                      <p className="text-[#ECF0F1]">
                        {selectedOrder.customerNotes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCardOrders;
