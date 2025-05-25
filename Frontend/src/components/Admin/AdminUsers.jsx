import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../utils/axios";
import SideBar from "./SideBar";
// Import Modal from antd
import { Modal } from "antd";

const AdminUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Add useEffect to handle window resize and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(
          "http://51.21.182.124/api/auth/users/get-users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setDetailModalVisible(true);
  };

  const handleEdit = async (user, e) => {
    e.stopPropagation(); // Stop event propagation
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (userId, e) => {
    e.stopPropagation(); // Stop event propagation
    try {
      await api.delete(`http://51.21.182.124/api/auth/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleModalOk = async () => {
    try {
      await api.put(
        `http://51.21.182.124/api/auth/users/${editingUser._id}`,
        editingUser
      );

      // Update the users list with the edited user
      setUsers(
        users.map((user) => (user._id === editingUser._id ? editingUser : user))
      );

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const UserDetailModal = () => (
    <Modal
      title={<span style={{ color: "#FFFFFF" }}>User Details</span>}
      visible={detailModalVisible}
      onCancel={() => setDetailModalVisible(false)}
      footer={[
        <button
          key="close"
          onClick={() => setDetailModalVisible(false)}
          style={{
            backgroundColor: "#2C3E50",
            color: "#FFFFFF",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>,
      ]}
      width={isMobile ? "90%" : "600px"}
      style={{ maxWidth: "90%" }}
      bodyStyle={{
        background: "#2D2D2D",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      {selectedUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              display: "grid",
              gap: "20px",
              padding: "20px",
              backgroundColor: "#2D2D2D",
              borderRadius: "8px",
            }}
          >
            <DetailItem label="Name" value={selectedUser.name} />
            <DetailItem label="Email" value={selectedUser.email} />
            <DetailItem label="Phone" value={selectedUser.phone} />
            <DetailItem label="Contact No" value={selectedUser.contactNo} />
            <DetailItem label="Address" value={selectedUser.address} />
          </div>
        </motion.div>
      )}
    </Modal>
  );

  const DetailItem = ({ label, value }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: "grid",
        // Adjust grid columns for mobile
        gridTemplateColumns: isMobile ? "1fr" : "120px 1fr",
        gap: "10px",
        alignItems: isMobile ? "start" : "baseline", // Adjust alignment for mobile
      }}
    >
      <span style={{ fontWeight: "bold", color: "#3498DB" }}>{label}:</span>
      <span style={{ color: "#ECF0F1", wordBreak: "break-word" }}>{value}</span>
    </motion.div>
  );

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
      <motion.div
        // Adjust margin based on sidebar state and mobile
        className={`p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          minHeight: "100vh",
          position: "relative",
          background: "linear-gradient(to bottom right, #1A1A1A, #2D2D2D)",
          // Add responsive padding
          padding: isMobile ? "20px" : "50px",
        }}
      >
        <motion.h1
          variants={itemVariants}
          style={{
            color: "#FFFFFF",
            marginBottom: "24px",
            // Adjust font size for mobile
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: "bold",
          }}
        >
          User Management
        </motion.h1>

        <motion.div variants={itemVariants}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                marginBottom: "20px",
                maxWidth: "100%",
                // Make search input width responsive
                width: isMobile ? "100%" : "400px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #3498DB",
                background: "#2D2D2D",
                color: "#FFFFFF",
              }}
            />
          </div>
        </motion.div>

        {filteredUsers.length === 0 ? (
          <motion.div
            variants={itemVariants}
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#2D2D2D",
              borderRadius: "8px",
              color: "#ECF0F1",
            }}
          >
            No users found matching
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            {/* Wrap table in a responsive container */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  backgroundColor: "#2D2D2D",
                  borderRadius: "8px",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "12px", color: "#FFFFFF" }}>Name</th>
                    <th style={{ padding: "12px", color: "#FFFFFF" }}>Email</th>
                    <th style={{ padding: "12px", color: "#FFFFFF" }}>Phone</th>
                    <th style={{ padding: "12px", color: "#FFFFFF" }}>
                      Contact No
                    </th>
                    <th style={{ padding: "12px", color: "#FFFFFF" }}>
                      Address
                    </th>
                    <th style={{ padding: "12px", color: "#FFFFFF" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      onClick={() => handleRowClick(user)}
                      style={{ cursor: "pointer" }}
                    >
                      <td style={{ padding: "12px", color: "#3498DB" }}>
                        {user.name}
                      </td>
                      <td style={{ padding: "12px", color: "#FFFFFF" }}>
                        {user.email}
                      </td>
                      <td style={{ padding: "12px", color: "#FFFFFF" }}>
                        {user.phone}
                      </td>
                      <td style={{ padding: "12px", color: "#FFFFFF" }}>
                        {user.contactNo}
                      </td>
                      <td style={{ padding: "12px", color: "#FFFFFF" }}>
                        {user.address}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <motion.div
                          style={{ display: "flex", gap: "10px" }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <button
                            onClick={(e) => handleEdit(user, e)}
                            style={{
                              color: "#2ECC71",
                              cursor: "pointer",
                              background: "none",
                              border: "none",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => handleDelete(user._id, e)}
                            style={{
                              color: "#E74C3C",
                              cursor: "pointer",
                              background: "none",
                              border: "none",
                            }}
                          >
                            Delete
                          </button>
                        </motion.div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>{" "}
          </motion.div>
        )}

        <UserDetailModal />

        {/* Replace the custom edit modal div with antd Modal */}
        <Modal
          title={<span style={{ color: "#FFFFFF" }}>Edit User</span>}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={isMobile ? "90%" : "800px"}
          style={{ maxWidth: "90%" }}
          bodyStyle={{
            background: "#2D2D2D",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          {editingUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "8px",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "8px",
                }}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={editingUser.phone}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, phone: e.target.value })
                }
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "8px",
                }}
              />
              <input
                type="text"
                placeholder="Contact No"
                value={editingUser.contactNo}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    contactNo: e.target.value,
                  })
                }
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "8px",
                }}
              />
              <textarea
                placeholder="Address"
                value={editingUser.address}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    address: e.target.value,
                  })
                }
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  padding: "8px",
                  minHeight: "100px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={handleModalOk}
                  style={{
                    backgroundColor: "#2ECC71",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalVisible(false)}
                  style={{
                    backgroundColor: "#E74C3C",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </Modal>
      </motion.div>
    </>
  );
};

export default AdminUsers;

{
  /* Keep the existing CSS for the detail modal */
}
<style jsx>{`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    max-height: 80vh;
    overflow-y: auto;
    /* Ensure content doesn't overflow horizontally */
    box-sizing: border-box;
  }
`}</style>;
