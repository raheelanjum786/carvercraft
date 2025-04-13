import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";

// Updated 3D Component with darker colors

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderItems = location.state?.orderItems || [];

  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createOrder = async (items, orderData) => {
    const productOrders = [];

    // Separate items into products and gifts
    items.forEach((item) => {
      const orderItem = {
        itemId: item.details.id,
        quantity: item.quantity,
        name: item?.name ? item.name : "",
        customerName: orderData.name,
        customerEmail: orderData.email,
        customerPhone: orderData.phone,
        shippingAddress: orderData.address,
        paymentMethod: orderData.paymentMethod,
        status: "pending",
      };

      if (item.type === "product") {
        productOrders.push(orderItem);
      }
    });

    // Create product orders
    if (productOrders.length > 0) {
      await api.post("http://localhost:4000/api/productOrder/create", {
        orders: productOrders,
      });
    }

    // Create gift orders
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        paymentMethod,
      };

      await createOrder(orderItems, orderData);

      // Show success message and redirect
      alert("Order placed successfully!");
      // navigate("/orders"); // Assuming you have an orders page
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#131313] pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Updated 3D Background Animation */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <color attach="background" args={["#310A0B"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center text-[#E0A387] mb-12">
            Complete Your Purchase
          </h1>

          <div className="bg-[#491B1D]/90 backdrop-blur-md rounded-lg shadow-xl p-6">
            <div className="flex justify-center space-x-8 mb-8">
              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-[#B96A59]"
                />
                <span className="text-[#E0A387]">Cash on Delivery</span>
              </motion.label>

              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-[#B96A59]"
                />
                <span className="text-[#E0A387]">Online Payment</span>
              </motion.label>
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === "online" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#743A36] p-4 rounded-lg mb-6"
                >
                  <div className="flex items-center justify-center">
                    <span>😞</span>
                    <span className="ml-2">We will be available soon!</span>
                  </div>
                  {/* <h3 className="text-lg font-semibold text-[#E0A387] mb-2">
                  Bank Account Details
                </h3>
                <p className="text-[#E0A387]">Bank Name: Your Bank</p>
                <p className="text-[#E0A387]">Account Number: XXXX-XXXX-XXXX</p>
                <p className="text-[#E0A387]">
                  Account Holder: Your Company Name
                </p> */}
                </motion.div>
              )}

              {paymentMethod && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#E0A387]">
                      Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-[#743A36] bg-[#743A36]/50 text-[#E0A387] placeholder-[#B96A59] shadow-sm focus:border-[#B96A59] focus:ring-[#B96A59]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E0A387]">
                      Phone Number
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-[#743A36] bg-[#743A36]/50 text-[#E0A387] placeholder-[#B96A59] shadow-sm focus:border-[#B96A59] focus:ring-[#B96A59]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E0A387]">
                      Email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-[#743A36] bg-[#743A36]/50 text-[#E0A387] placeholder-[#B96A59] shadow-sm focus:border-[#B96A59] focus:ring-[#B96A59]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#E0A387]">
                      Address
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="mt-1 block w-full rounded-md border-[#743A36] bg-[#743A36]/50 text-[#E0A387] placeholder-[#B96A59] shadow-sm focus:border-[#B96A59] focus:ring-[#B96A59]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#310A0B] bg-[#E0A387] hover:bg-[#B96A59] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B96A59] transition-colors duration-200"
                  >
                    {isLoading ? "Processing..." : "Done"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default BuyNow;
