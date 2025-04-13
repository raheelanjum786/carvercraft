import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import api from "../../utils/axios";
import SideBar from "./SideBar";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Fetch products and categories when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("http://localhost:4000/api/products/get"),
          api.get("http://localhost:4000/api/categories/get"),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`http://localhost:4000/api/products/${productId}`);
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await api.put(
        `http://localhost:4000/api/products/${updatedProduct.id}`,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === response.data.id ? response.data : product
        )
      );
      setIsModalOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Filter and search functionality
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "all" ||
      categories
        .find((c) => c.id === product.categoryId)
        ?.name?.toLowerCase() === filterCategory?.toLowerCase();

    const matchesStatus =
      filterStatus === "all" ||
      product.status?.toLowerCase() === filterStatus?.toLowerCase();
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <>
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />

      <div
        className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E0A387] mb-4 sm:mb-6">
          Product List
        </h1>

        {/* Filters and Search */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[150px]">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-[#E0A387] text-[#310A0B] px-4 py-2 rounded"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#E0A387] text-[#310A0B] px-4 py-2 rounded"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex-1 relative min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#310A0B]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 bg-[#E0A387] text-[#310A0B] rounded"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[#E0A387] border-collapse min-w-[800px]">
            <thead className="bg-[#743A36]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Latest</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#743A36] hover:bg-[#743A36]/20 cursor-pointer"
                >
                  <td
                    className="p-4"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                      setIsEditMode(false);
                    }}
                  >
                    {product.name}
                  </td>
                  <td className="p-4">
                    {categories.find((c) => c.id === product.categoryId)?.name}
                  </td>
                  <td className="p-4">Rs.{product.price}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        product.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {product.isLatest ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-[#E0A387] hover:text-[#B96A59]"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-[#E0A387] hover:text-[#B96A59]"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Details/Edit Modal */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#743A36] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#E0A387]">
                  {isEditMode ? "Edit Product" : "Product Details"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                  }}
                  className="text-[#E0A387] hover:text-[#E0A0A0] text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {isEditMode ? (
                  // Edit Form
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(selectedProduct);
                    }}
                    className="space-y-4"
                  >
                    {/* Add your edit form fields here */}
                    <div>
                      <label className="block text-[#E0A387] mb-2">Name</label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 bg-[#310A0B] text-[#E0A387] rounded"
                      />
                    </div>
                    {/* Add more form fields as needed */}
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setIsEditMode(false);
                        }}
                        className="px-4 py-2 bg-[#310A0B] text-[#E0A387] rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#B96A59] text-[#E0A387] rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                    {/* Add image upload field */}
                    <div>
                      <label className="block text-[#E0A387] mb-2">
                        Images
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          // Handle image upload
                          const files = Array.from(e.target.files);
                          setSelectedProduct({
                            ...selectedProduct,
                            images: files,
                          });
                        }}
                        className="w-full p-2 bg-[#310A0B] text-[#E0A387] rounded"
                      />
                    </div>
                  </form>
                ) : (
                  // View Details
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Images */}
                    <div className="col-span-2">
                      <p className="text-[#E0A387] font-semibold mb-2">
                        Images:
                      </p>
                      <div className="flex gap-2 overflow-x-auto">
                        {selectedProduct.imageUrls &&
                          JSON.parse(selectedProduct.imageUrls).map(
                            (imageUrl, index) => (
                              <img
                                key={index}
                                src={`http://localhost:4000/api${imageUrl}`}
                                alt={`Product ${index + 1}`}
                                className="w-32 h-32 object-cover rounded"
                              />
                            )
                          )}
                      </div>
                    </div>
                    <div>
                      <p className="text-[#E0A387] font-semibold">Name:</p>
                      <p className="text-[#E0A387]">{selectedProduct.name}</p>
                    </div>
                    <div>
                      <p className="text-[#E0A387] font-semibold">Category:</p>
                      <p className="text-[#E0A387]">
                        {
                          categories.find(
                            (c) => c.id === selectedProduct.categoryId
                          )?.name
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-[#E0A387] font-semibold">Price:</p>
                      <p className="text-[#E0A387]">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <p className="text-[#E0A387] font-semibold">Status:</p>
                      <p className="text-[#E0A387]">{selectedProduct.status}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#E0A387] font-semibold">
                        Description:
                      </p>
                      <p className="text-[#E0A387]">
                        {selectedProduct.description}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#E0A387] font-semibold">Benefits:</p>
                      <p className="text-[#E0A387]">
                        {selectedProduct.benefits}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductList;
