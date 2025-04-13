import { useState, useEffect } from "react";
import { Modal, Input, Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import api from "../../utils/axios";
import SideBar from "./SideBar";

const AdminUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Animation variants for Framer Motion
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (text, record) => (
        <span
          style={{ cursor: "pointer", color: "#743A36" }}
          onClick={() => handleRowClick(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg", "xl"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      responsive: ["lg", "xl"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["xl"],
    },
    {
      title: "Actions",
      key: "actions",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (_, user) => (
        <motion.div
          style={{ display: "flex", gap: "10px" }}
          whileHover={{ scale: 1.05 }}
        >
          <EditOutlined
            onClick={() => handleEdit(user)}
            style={{ color: "#743A36", cursor: "pointer", fontSize: "18px" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(user.id)}
            style={{ color: "#491B1D", cursor: "pointer", fontSize: "18px" }}
          />
        </motion.div>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(
          "http://localhost:4000/api/auth/users/get-users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = async (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  // const handleDelete = () => {};
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:4000/auth/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // const handleModalOk = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/auth/users/${editingUser.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(editingUser),
  //       }
  //     );
  //     if (response.ok) {
  //       setUsers(
  //         users.map((user) => (user.id === editingUser.id ? editingUser : user))
  //       );
  //       setIsModalVisible(false);
  //     } else {
  //       console.error("Error updating user:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };

  const handleModalOk = () => {};
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setDetailModalVisible(true);
  };

  const UserDetailModal = () => (
    <Modal
      title={
        <div
          style={{
            color: "#310A0B",
            fontSize: "1.5rem",
            borderBottom: "2px solid #743A36",
            paddingBottom: "10px",
          }}
        >
          User Details
        </div>
      }
      open={detailModalVisible}
      onCancel={() => setDetailModalVisible(false)}
      footer={[
        <Button
          key="close"
          onClick={() => setDetailModalVisible(false)}
          style={{
            backgroundColor: "#743A36",
            color: "#E0A387",
            border: "none",
          }}
        >
          Close
        </Button>,
      ]}
      width={600}
      centered
      maskStyle={{ backdropFilter: "blur(8px)" }}
      style={{
        overflow: "hidden",
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
              backgroundColor: "rgba(224, 163, 135, 0.1)",
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
        gridTemplateColumns: "120px 1fr",
        gap: "10px",
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
          color: "#743A36",
        }}
      >
        {label}:
      </span>
      <span
        style={{
          color: "#491B1D",
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
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
      {/* s */}
      <motion.div
        className={`p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          padding: "50px",
          minHeight: "100vh",
          position: "relative",
          background: "linear-gradient(to bottom right, #310A0B, #743A36)",
        }}
      >
        <motion.h1
          variants={itemVariants}
          style={{
            color: "#E0A387",
            marginBottom: "24px",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          User Management
        </motion.h1>

        <motion.div variants={itemVariants}>
          <Input.Search
            placeholder="Search users..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              marginBottom: "20px",
              maxWidth: "100%",
              width: "400px",
            }}
            allowClear
            enterButton
            size="large"
            onSearch={(value) => setSearchText(value)}
          />
        </motion.div>

        {filteredUsers.length === 0 ? (
          <motion.div
            variants={itemVariants}
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "rgba(224, 163, 135, 0.9)",
              borderRadius: "8px",
              color: "#310A0B",
            }}
          >
            No users found matching
            {/* "{searchText}" */}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Table
              columns={columns}
              dataSource={filteredUsers}
              rowKey="id"
              style={{
                backgroundColor: "rgba(224, 163, 135, 0.9)",
                borderRadius: "8px",
                overflow: "auto",
                backdropFilter: "blur(10px)",
              }}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
                style: { cursor: "pointer" },
              })}
              scroll={{ x: true }}
            />
          </motion.div>
        )}

        <UserDetailModal />

        <Modal
          title="Edit User"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          width={800}
        >
          {editingUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Input
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <Input
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <Input
                placeholder="Phone"
                value={editingUser.phone}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, phone: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <Input
                placeholder="Contact No"
                value={editingUser.contactNo}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, contactNo: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <Input.TextArea
                placeholder="Address"
                value={editingUser.address}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, address: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
            </motion.div>
          )}
        </Modal>
      </motion.div>
    </>
  );
};

export default AdminUsers;
