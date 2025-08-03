import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">Your Cart</h2>

          <table className="w-full text-sm text-gray-700">
            <thead className="uppercase text-xs text-gray-500 border-b-2">
              <tr>
                <th className="py-3 text-left">Image</th>
                <th className="py-3 text-left">Title</th>
                <th className="py-3 text-left">Qty</th>
                <th className="py-3 text-left">Price</th>
                <th className="py-3 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* Example item row */}
              <tr className="hover:bg-blue-50 border-b">
                <td className="py-3">
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Product"
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                </td>
                <td className="py-3 font-medium">Sample Product</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition">
                      -
                    </button>
                    <span className="px-2 font-semibold">1</span>
                    <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition">
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 font-semibold text-blue-700">$49.99</td>
                <td className="py-3 text-center">
                  <button className="text-red-600 hover:text-red-800">
                    <TrashIcon className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary & Shipping */}
        <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 sticky top-20 h-fit">
          {/* Summary */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Summary</h2>
            <div className="text-gray-700 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between text-base font-bold text-blue-700">
                <span>Total Price:</span>
                <span>$49.99</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Info</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="City"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300">
              <option value="">Select Method</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/* Place Order */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow transition duration-200 mt-2">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
