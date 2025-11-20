import React, { useState, useEffect, useCallback } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

// Debounce Utility
const debounce = (func, delay = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [updating, setUpdating] = useState(null);

  // Fetch Cart
  const loadCart = async () => {
    try {
      const res = await axios.get("https://snapmart-backend.onrender.com/api/cart", {
        withCredentials: true,
      });

      setCartItems(res.data.cart);
    } catch (error) {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // BACKEND QTY UPDATE (DEBOUNCED)
  const updateQtyDebounced = useCallback(
    debounce(async (productId, qty) => {
      try {
        await axios.post(
          "https://snapmart-backend.onrender.com/api/cart/update",
          { productId, quantity: qty },
          { withCredentials: true }
        );

        setUpdating(null);
        loadCart();
      } catch {
        toast.error("Update failed");
      }
    }, 400),
    []
  );

  // INSTANT LOCAL UPDATE + DEBOUNCED BACKEND CALL
  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );

    setUpdating(productId);
    updateQtyDebounced(productId, newQty);
  };

  // REMOVE FROM CART
  const removeItem = async (productId, name) => {
    try {
      // Instant remove
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );

      await axios.post(
        "https://snapmart-backend.onrender.com/api/cart/remove",
        { productId },
        { withCredentials: true }
      );

      toast.success(`${name} is removed from cart`);
    } catch (err) {
      toast.error("Remove failed");
      loadCart();
    }
  };

  // Total Amount
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* CART ITEMS */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-3">
            Your Cart
          </h2>

          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-500 uppercase border-b">
                <th className="py-3 text-left">Image</th>
                <th className="py-3 text-left">Title</th>
                <th className="py-3 text-left">Qty</th>
                <th className="py-3 text-left">Price</th>
                <th className="py-3 text-center">Remove</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Cart is empty
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.productId._id} className="border-b hover:bg-blue-50">

                    <td className="py-3">
                      <img
                        src={item.productId.img}
                        alt={item.productId.title}
                        className="w-16 h-16 object-cover rounded shadow"
                      />
                    </td>

                    <td>{item.productId.title}</td>

                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId._id, item.quantity - 1)
                          }
                          className="px-3 py-1 bg-blue-100 rounded"
                        >
                          -
                        </button>

                        <span className="font-semibold">{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.productId._id, item.quantity + 1)
                          }
                          className="px-3 py-1 bg-blue-100 rounded"
                        >
                          +
                        </button>

                        {updating === item.productId._id && (
                          <span className="text-xs text-blue-500">Updating…</span>
                        )}
                      </div>
                    </td>

                    <td className="font-semibold">₹{item.productId.price}</td>

                    <td className="text-center">
                      <button
                        onClick={() => removeItem(item.productId._id, item.productId.title)}
                        className="text-red-600"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* SUMMARY */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-20 h-fit">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Summary</h2>

          <div className="text-gray-700 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between font-bold text-blue-700 text-lg">
              <span>Total Price:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded shadow hover:bg-blue-700">
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
