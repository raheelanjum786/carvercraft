import { Suspense, useState, useEffect } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wobble, setWobble] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const wobbleInterval = setInterval(() => {
      setWobble((prev) => !prev);
    }, 2000);
    return () => clearInterval(wobbleInterval);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = JSON.parse(localStorage?.getItem("user") || "");
      try {
        const response = await api.get(
          `http://localhost:4000/api/cart/get/${user.id}`
        );
        setCartItems(response.data.items || []);
        setIsLoading(false);
      } catch (error) {
        console.error("🛒 Oopsie! Cart fetch failed:", error);
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await api.put("http://localhost:4000/api/cart/update", {
        cartItemId,
        quantity,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
      setWobble(true);
      setTimeout(() => setWobble(false), 500);
    } catch (error) {
      console.error("🔢 Quantity update went wrong:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await api.delete(`http://localhost:4000/api/cart/remove/${cartItemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId)
      );
    } catch (error) {
      console.error("🗑️ Remove failed:", error);
    }
  };

  const handleProceedToCheckout = async () => {
    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      type: "product",
      details: item.product,
    }));

    try {
      const user = JSON.parse(localStorage?.getItem("user") || "");
      if (!user || !user.id) throw new Error("🔑 Authentication needed!");

      await api.delete(`http://localhost:4000/api/cart/clear/${user.id}`);
      setCartItems([]);
      navigate("/buy-now", { state: { orderItems } });
    } catch (error) {
      console.error("💳 Checkout error:", error);
    }
  };

  return (
    <>
      <div className="relative bg-[#041322] min-h-screen">
        <div
          className={`relative z-10 p-4 sm:p-8 md:p-12 lg:p-20 ${
            wobble ? "animate-wiggle" : ""
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-[#E0A387] pt-4 sm:pt-8 font-extrabold animate-pulse">
            🛍️ Your Funky Cart 🛍️
          </h1>
          <p className="text-sm sm:text-base text-center text-[#E0A387] mt-2 animate-bounce">
            ✨ Check out your awesome picks below! ✨
          </p>

          <div className="overflow-x-auto p-2 sm:p-4 backdrop-blur-sm bg-opacity-30 bg-black rounded-xl mt-4">
            <div className="min-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border-2 border-[#E0A387]">
                <thead>
                  <tr className="bg-gradient-to-r from-[#491B1D] to-[#743A36] text-[#E0A387]">
                    <th className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      🎁 Product Name
                    </th>
                    <th className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse hidden sm:table-cell">
                      📝 Description
                    </th>
                    <th className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      💰 Price
                    </th>
                    <th className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      🔢 Qty
                    </th>
                    <th className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base animate-pulse">
                      ⚡ Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#743A36] transition-all duration-300"
                    >
                      <td className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-[#E0A387]">
                        {item.product.name}
                      </td>
                      <td className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-[#B96A59] hidden sm:table-cell">
                        {item.product.description}
                      </td>
                      <td className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-[#E0A387]">
                        💎 ${item.product.price}
                      </td>
                      <td className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-[#E0A387]">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="bg-[#310A0B] border-2 border-[#E0A387] rounded-full px-1 py-0.5 sm:px-2 sm:py-1 w-12 sm:w-16 md:w-20 relative z-20 focus:ring-4 focus:ring-[#E0A387] transition-all duration-300 text-xs sm:text-sm"
                        />
                      </td>
                      <td className="border-2 border-[#E0A387] px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base text-[#E0A387]">
                        <button
                          className="bg-gradient-to-r from-[#743A36] to-[#491B1D] px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:from-[#491B1D] hover:to-[#743A36] relative z-20 transition-all duration-300 transform hover:scale-110 text-xs sm:text-sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          🗑️ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-right text-[#E0A387] text-lg sm:text-xl md:text-2xl font-bold animate-pulse">
              Total: 💎 $
              {cartItems.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              )}
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 pb-4 sm:pb-6 md:pb-8">
            <button
              className="bg-gradient-to-r from-[#743A36] to-[#491B1D] text-[#E0A387] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full hover:from-[#491B1D] hover:to-[#743A36] transform hover:scale-110 transition-all duration-300 font-bold text-sm sm:text-lg md:text-xl shadow-lg"
              onClick={handleProceedToCheckout}
            >
              🚀 Proceed to Checkout 🎉
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
