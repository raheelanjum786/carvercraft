import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../utils/axios";
import Footer from "../Footer/Footer";
import PaymentForm from "../Payment/PaymentForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_your_stripe_publishable_key");

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderItems = location.state?.orderItems || [];
  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
    let total = 0;

    items.forEach((item) => {
      const orderItem = {
        itemId: item.details.id,
        quantity: item.quantity,
        name: item?.name ? item.name : "",
        customerName: orderData.name,
        customerEmail: orderData.email,
        customerPhone: orderData.phone,
        shippingAddress: orderData.address,
        paymentMethod: "online",
        status: "pending",
      };

      if (item.type === "product") {
        productOrders.push(orderItem);
        total += item.details.price * item.quantity;
      }
    });

    if (productOrders.length > 0) {
      const response = await api.post(
        "http://localhost:4000/api/productOrder/create",
        {
          orders: productOrders,
        }
      );
      setOrderId(response.data.id);
      setTotalAmount(total);
      return response.data;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        paymentMethod: "online",
      };

      await createOrder(orderItems, orderData);
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("😅 Oops! Something went wrong. Let's try that again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    navigate("/order-success", {
      state: {
        message:
          "Your order has been placed and payment has been received successfully!",
        orderId: orderId,
      },
    });
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
  };

  return (
    <>
      <div className="min-h-screen bg-[#041322] py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-[#E0A387] mb-8 md:mb-12">
            🛍️ Complete Your Purchase 🎁
          </h1>

          <div className="bg-[#491B1D]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-8">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="text-[#E0A387] text-lg md:text-xl font-medium">
                💳 Online Payment Only
              </div>
            </div>

            {showPaymentForm ? (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={totalAmount}
                  orderId={orderId}
                  customerEmail={formData.email}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {["name", "phone", "email", "address"].map((field) => (
                  <div key={field}>
                    <label className="block text-base md:text-lg font-medium text-[#E0A387] mb-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {field === "phone"
                        ? "📞"
                        : field === "email"
                        ? "📧"
                        : field === "address"
                        ? "📍"
                        : "👤"}
                    </label>
                    {field === "address" ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-xl border-2 border-[#743A36] bg-[#743A36]/50 text-[#E0A387] placeholder-[#B96A59] shadow-lg focus:border-[#B96A59] focus:ring-[#B96A59] text-base md:text-lg p-3 md:p-4"
                      />
                    ) : (
                      <input
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone"
                            ? "tel"
                            : "text"
                        }
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-xl border-2 border-[#743A36] bg-[#743A36]/50 text-[#E0A387] placeholder-[#B96A59] shadow-lg focus:border-[#B96A59] focus:ring-[#B96A59] text-base md:text-lg p-3 md:p-4"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-6 border-2 border-transparent rounded-xl shadow-xl text-base md:text-lg font-bold text-[#310A0B] bg-gradient-to-r from-[#E0A387] to-[#B96A59] hover:from-[#B96A59] hover:to-[#E0A387] focus:outline-none transition-colors"
                >
                  {isLoading ? "🔄 Processing..." : "✨ Continue to Payment ✨"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyNow;
