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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("http://51.21.182.124/api/products/get"),
          api.get("http://51.21.182.124/api/categories/get"),
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
        await api.delete(`http://51.21.182.124/api/products/${productId}`);
        // Refresh the products list after successful deletion
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
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
      const productData = new FormData();

      productData.append("name", updatedProduct.name);
      productData.append("category", updatedProduct.categoryId);
      productData.append("price", updatedProduct.price);
      productData.append("description", updatedProduct.description || "");
      productData.append("isLatest", updatedProduct.isLatest || false);

      if (updatedProduct.images && updatedProduct.images.length > 0) {
        updatedProduct.images.forEach((image) => {
          productData.append("images", image);
        });
      }

      const response = await api.put(
        `http://51.21.182.124/api/products/update/${updatedProduct.id}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
      alert("Failed to update product. Please try again.");
    }
  };

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
        className={`min-h-screen bg-[#1A1A1A] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-4 sm:mb-6">
          Product List
        </h1>

        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[150px]">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-[#2D2D2D] text-[#FFFFFF] px-4 py-2 rounded"
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
              className="w-full bg-[#2D2D2D] text-[#FFFFFF] px-4 py-2 rounded"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex-1 relative min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ECF0F1]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 bg-[#2D2D2D] text-[#FFFFFF] rounded"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[#FFFFFF] border-collapse min-w-[800px]">
            <thead className="bg-[#2C3E50]">
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
                  className="border-b border-[#34495E] hover:bg-[#34495E]/20 cursor-pointer"
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
                  <td className="p-4">€{product.price}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        product.status === "active"
                          ? "bg-[#2ECC71]/20 text-[#2ECC71]"
                          : "bg-[#E74C3C]/20 text-[#E74C3C]"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {product.isLatest ? (
                      <span className="text-[#2ECC71]">Yes</span>
                    ) : (
                      <span className="text-[#E74C3C]">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-[#3498DB] hover:text-[#2980B9]"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-[#E74C3C] hover:text-[#C0392B]"
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

        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#2C3E50] p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#FFFFFF]">
                  {isEditMode ? "Edit Product" : "Product Details"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                  }}
                  className="text-[#ECF0F1] hover:text-[#BDC3C7] text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {isEditMode ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(selectedProduct);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#FFFFFF] mb-2">Name</label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 bg-[#34495E] text-[#FFFFFF] rounded"
                      />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                      <label className="block text-[#FFFFFF] mb-2">
                        Category
                      </label>
                      <select
                        value={selectedProduct.categoryId}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            categoryId: parseInt(e.target.value),
                          })
                        }
                        className="w-full p-2 bg-[#34495E] text-[#FFFFFF] rounded"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Input */}
                    <div>
                      <label className="block text-[#FFFFFF] mb-2">Price</label>
                      <input
                        type="number"
                        value={selectedProduct.price}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full p-2 bg-[#34495E] text-[#FFFFFF] rounded"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[#FFFFFF] mb-2">
                        Description
                      </label>
                      <textarea
                        value={selectedProduct.description || ""}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 bg-[#34495E] text-[#FFFFFF] rounded min-h-[100px]"
                      />
                    </div>

                    {/* Latest Product Checkbox */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isLatest"
                        checked={selectedProduct.isLatest || false}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            isLatest: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-[#3498DB] bg-[#2C3E50] border-[#34495E]"
                      />
                      <label htmlFor="isLatest" className="text-[#FFFFFF]">
                        Mark as Latest Product
                      </label>
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-[#FFFFFF] mb-2">
                        Images
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setSelectedProduct({
                            ...selectedProduct,
                            images: files,
                          });
                        }}
                        className="w-full p-2 bg-[#34495E] text-[#FFFFFF] rounded"
                      />
                    </div>

                    {/* Current Images Preview */}
                    {selectedProduct.imageUrls && (
                      <div>
                        <label className="block text-[#FFFFFF] mb-2">
                          Current Images
                        </label>
                        <div className="flex gap-2 overflow-x-auto">
                          {(() => {
                            try {
                              const images = JSON.parse(
                                selectedProduct.imageUrls
                              );
                              return images.map((imageUrl, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={`http://51.21.182.124/api${imageUrl}`}
                                    alt={`Product ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded"
                                  />
                                </div>
                              ));
                            } catch (error) {
                              return (
                                <p className="text-[#E74C3C]">
                                  Error loading images
                                </p>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setIsEditMode(false);
                        }}
                        className="px-4 py-2 bg-[#34495E] text-[#FFFFFF] rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#3498DB] text-[#FFFFFF] rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <p className="text-[#FFFFFF] font-semibold mb-2">
                        Images:
                      </p>
                      <div className="flex gap-2 overflow-x-auto">
                        {selectedProduct.imageUrls ? (
                          (() => {
                            try {
                              const images = JSON.parse(
                                selectedProduct.imageUrls
                              );
                              return images.map((imageUrl, index) => (
                                <img
                                  key={index}
                                  src={`http://51.21.182.124/api${imageUrl}`}
                                  alt={`Product ${index + 1}`}
                                  className="w-32 h-32 object-cover rounded"
                                />
                              ));
                            } catch (error) {
                              console.error("Error parsing image URLs:", error);
                              return (
                                <p className="text-[#E74C3C]">
                                  Error loading images
                                </p>
                              );
                            }
                          })()
                        ) : (
                          <p className="text-[#ECF0F1]">No images available</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-[#FFFFFF] font-semibold">Name:</p>
                      <p className="text-[#ECF0F1]">{selectedProduct.name}</p>
                    </div>
                    <div>
                      <p className="text-[#FFFFFF] font-semibold">Category:</p>
                      <p className="text-[#ECF0F1]">
                        {
                          categories.find(
                            (c) => c.id === selectedProduct.categoryId
                          )?.name
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-[#FFFFFF] font-semibold">Price:</p>
                      <p className="text-[#ECF0F1]">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <p className="text-[#FFFFFF] font-semibold">Status:</p>
                      <p className="text-[#ECF0F1]">{selectedProduct.status}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#FFFFFF] font-semibold">
                        Description:
                      </p>
                      <p className="text-[#ECF0F1]">
                        {selectedProduct.description}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#FFFFFF] font-semibold">Benefits:</p>
                      <p className="text-[#ECF0F1]">
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
