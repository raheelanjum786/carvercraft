import { useState, useEffect } from "react";
import api from "../../utils/axios";
import SideBar from "./SideBar";

const AdminProductOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/productOrder/getAll"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders);
  const statusOptions = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filter and search functionality
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.customerName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm?.toLowerCase());
    order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  console.log("Filtered Orders", filteredOrders);

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
        <h1 className="my-12 text-xl sm:text-2xl md:text-3xl font-bold text-[#E0A387] sm:mb-6">
          Product Orders
        </h1>
        {/* Filter and Search Section */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto bg-[#E0A387] text-[#310A0B] px-10 rounded text-sm sm:text-base"
          >
            <option value="all">All Orders</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 bg-[#E0A387] text-[#310A0B] rounded"
          />
        </div>
        {/* Orders Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="w-full overflow-x-scroll">
            <table className="w-full text-[#E0A387] border-collapse min-w-[800px]">
              <thead className="bg-[#743A36]">
                <tr>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Order ID
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Product ID
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Customer
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Product
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Quantity
                  </th>

                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Price
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm hidden sm:table-cell">
                    Date
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="p-2 sm:p-4 text-left text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center p-4 text-sm">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-[#743A36] hover:bg-[#743A36]/20"
                      >
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          {order.id}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          {order.orderProducts[0].productId}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          {order.customerName}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          {order.orderProducts[0].product.name}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          {order.orderProducts[0].quantity}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          Rs.{order.total}
                        </td>

                        <td className="p-2 sm:p-4 text-xs sm:text-sm hidden sm:table-cell">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="bg-[#B96A59] text-[#E0A387] px-7 rounded text-xs sm:text-sm w-full sm:w-auto"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2 sm:p-4 text-xs sm:text-sm">
                          <button
                            className="bg-[#E0A387] text-[#310A0B] px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-[#E0A0A0] transition-colors w-full sm:w-auto"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsModalOpen(true);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span className="text-sm text-[#E0A387] mr-2">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-[#E0A387] text-[#310A0B] px-5 py-2 rounded text-sm w-full sm:w-auto"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-[#E0A387] ml-2">entries</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#E0A387] text-[#310A0B] px-2 py-1 rounded text-sm hover:bg-[#E0A0A0] transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-[#E0A387] mx-2">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(filteredOrders.length / itemsPerPage)
                }
                className="bg-[#E0A387] text-[#310A0B] px-2 py-1 rounded text-sm hover:bg-[#E0A0A0] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#743A36] p-4 sm:p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-2xl font-bold text-[#E0A387]">
                  Order Details
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#E0A387] hover:text-[#E0A0A0] text-xl sm:text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Order ID:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Customer Name:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Email:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base break-words">
                      {selectedOrder.customerEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Address:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.shippingAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Product:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.orderProducts[0].product.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Quantity:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.orderProducts[0].quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Price:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      ${selectedOrder.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Status:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Date:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#E0A387] font-semibold text-sm sm:text-base">
                      Description:
                    </p>
                    <p className="text-[#E0A387] text-sm sm:text-base">
                      {selectedOrder.orderProducts[0].product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductOrders;
