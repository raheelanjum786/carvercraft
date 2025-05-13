import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Select,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import api from "../../utils/axios";
import SideBar from "./SideBar";
import "../AdminGlobalStyling.css";
import { Upload } from "antd";

const AdminCardTypes = () => {
  const [cardTypes, setCardTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchCardTypes();
  }, []);

  const fetchCardTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        "http://localhost:4000/api/cardTypes/getAll"
      );
      setCardTypes(response.data);
    } catch (error) {
      console.error("Error fetching card types:", error);
      message.error("Failed to load card types");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const showModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        name: record.name,
        description: record.description,
        price: record.price,
        status: record.status,
        imageUrl: record.imageUrl,
      });
      setFileList([]);
    } else {
      setEditingId(null);
      form.resetFields();
      form.setFieldsValue({ status: "active" });
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("price", values.price.toString());
      formData.append("status", values.status);

      if (values.imageUrl) {
        formData.append("imageUrl", values.imageUrl);
      }

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("cardImage", fileList[0].originFileObj);
      }

      if (editingId) {
        await api.put(
          `http://localhost:4000/api/cardTypes/update/${editingId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.success("Card type updated successfully");
      } else {
        await api.post("http://localhost:4000/api/cardTypes/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Card type created successfully");
      }

      setIsModalVisible(false);
      fetchCardTypes();
    } catch (error) {
      console.error("Error saving card type:", error);
      message.error(error.response?.data?.error || "Failed to save card type");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:4000/api/cardTypes/${id}`);
      message.success("Card type deleted successfully");
      fetchCardTypes();
    } catch (error) {
      console.error("Error deleting card type:", error);
      message.error(
        error.response?.data?.error || "Failed to delete card type"
      );
    }
  };

  const filteredCardTypes = cardTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchText.toLowerCase()) ||
      type.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rs. ${price.toLocaleString()}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "active"
              ? "bg-[#2ECC71] text-[#FFFFFF]"
              : "bg-[#E74C3C] text-[#FFFFFF]"
          }`}
        >
          {status.toUpperCase()}
        </span>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => showModal(record)}
            className="bg-[#3498DB] border-[#3498DB] hover:bg-[#34495E]"
          />
          <Popconfirm
            title="Are you sure you want to delete this card type?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: "bg-[#3498DB] border-[#3498DB] hover:bg-[#34495E]",
            }}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              className="bg-[#E74C3C] border-[#E74C3C] hover:bg-[#C0392B]"
            />
          </Popconfirm>
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) =>
        imageUrl ? (
          <img
            src={`http://localhost:4000/api${imageUrl}`}
            alt="Card Type"
            className="w-16 h-10 object-cover rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-card.png";
            }}
          />
        ) : (
          <span className="text-[#ECF0F1]">No image</span>
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
        className={`min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-6">
          Manage Card Types
        </h1>

        <div className="bg-[#2C3E50]/30 rounded-lg shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <Input
              placeholder="Search card types..."
              prefix={<SearchOutlined className="text-[#3498DB]" />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-xs"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
              className="bg-[#3498DB] border-[#3498DB] hover:bg-[#34495E]"
            >
              Add Card Type
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={filteredCardTypes}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            className="custom-table"
            scroll={{ x: "max-content" }}
          />
        </div>

        <Modal
          title={editingId ? "Edit Card Type" : "Add New Card Type"}
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          okText={editingId ? "Update" : "Create"}
          okButtonProps={{
            className: "bg-[#3498DB] border-[#3498DB] hover:bg-[#34495E]",
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Card Type Name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input placeholder="e.g., Gold Card" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea
                placeholder="Description of the card type"
                rows={3}
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter a price" }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: "100%" }}
                prefix="Rs."
                placeholder="0.00"
              />
            </Form.Item>

            <Form.Item
              name="imageUrl"
              label="Card Image URL (Optional)"
              tooltip="Enter the path to the card image or upload a file below"
            >
              <Input placeholder="/uploads/cards/card-image.jpg" />
            </Form.Item>

            <Form.Item
              label="Upload Card Image (Optional)"
              tooltip="Upload an image file for the card"
            >
              <Upload
                listType="picture"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="status" label="Status" initialValue="active">
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminCardTypes;
