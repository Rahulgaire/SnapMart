import React from "react";
import { FaPen } from "react-icons/fa";
import Modal from "./Modal";

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl px-8 ">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Admin Profile
      </h2>

      {/* Profile Avatar & Info */}
      <div className="flex items-center gap-6 relative mb-8">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Admin Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
          <label
            htmlFor="image"
            className="absolute bottom-1 right-1 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-white shadow hover:scale-105 transition"
          >
            <FaPen size={14} />
            <input type="file" className="hidden" name="profile" id="image" />
          </label>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">Rahul Gaire</h3>
          <p className="text-gray-600 text-sm">Role: Admin</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value="Rahul Gaire"
            disabled
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value="rahul@example.com"
            readOnly
            className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>

        <Modal />
      </div>
    </div>
  );
};

export default Profile;
