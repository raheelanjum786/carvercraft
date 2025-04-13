import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = JSON.parse(localStorage?.getItem("user") || "");

      // Replace with actual user ID when implementing authentication
      try {
        const response = await api.get(
          `http://localhost:4000/api/cart/get/${user.id}`
        );
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
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
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await api.delete(`http://localhost:4000/api/cart/remove/${cartItemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartItemId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleProceedToCheckout = async () => {
    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.product ? item.product.name : item.gift.name,
      price: item.product ? item.product.price : item.gift.price,
      quantity: item.quantity,
      type: item.product ? "product" : "gift",
      details: item.product || item.gift,
    }));

    try {
      const user = JSON.parse(localStorage?.getItem("user") || "");
      if (!user || !user.id) throw new Error("User not authenticated.");

      await api.delete(`http://localhost:4000/api/cart/clear/${user.id}`);

      setCartItems([]);

      navigate("/buyNow", { state: { orderItems } });
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
    }
  };

  return (
    <>
      <div className="relative bg-[#310A0B] min-h-screen">
        <div className="absolute inset-0 " style={{ zIndex: 0 }}>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <Suspense fallback={null}>
              <StarBackground />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 p-20">
          <h1 className="text-3xl text-center text-[#E0A387] pt-8">
            Your Cart
          </h1>
          <p className="text-center text-[#E0A387] mt-2">
            Review your selected products below.
          </p>

          <div className="overflow-x-auto p-4">
            <table className="min-w-full table-auto border-collapse border border-gray-700">
              <thead>
                <tr className="bg-[#491B1D] text-[#E0A387]">
                  <th className="border border-gray-700 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-700 px-4 py-2">Price</th>
                  <th className="border border-gray-700 px-4 py-2">Quantity</th>
                  <th className="border border-gray-700 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#743A36]">
                    <td className="border border-gray-700 px-4 py-2 text-[#E0A387]">
                      {item.product?.name ? item.product.name : item.gift?.name}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-[#B96A59]">
                      {item.product?.description
                        ? item.product.description
                        : item.gift.description}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-[#E0A387]">
                      $
                      {item.product?.price
                        ? item.product.price
                        : item.gift.price}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-[#E0A387]">
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
                        className="bg-[#310A0B] border border-[#E0A387] rounded px-2 py-1 w-20 relative z-20"
                      />
                    </td>
                    <td className="border border-gray-700 px-4 py-2 text-[#E0A387]">
                      <button
                        className="bg-[#743A36] px-3 py-1 rounded hover:bg-[#491B1D] relative z-20"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right text-[#E0A387] text-xl">
              Total: $
              {cartItems.reduce(
                (total, item) =>
                  total +
                  (item.product?.price
                    ? item.product?.price
                    : item.gift?.price) *
                    item?.quantity,
                0
              )}
            </div>
          </div>

          <div className="flex justify-center mt-4 pb-8">
            <button
              className="bg-[#743A36] text-[#E0A387] p-2 rounded hover:bg-[#491B1D]"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
