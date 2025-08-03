import React from "react";
import { FaPen } from "react-icons/fa";
import Modal from "./Modal";

const Profile = () => {
  return (
    <>
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl px-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Profile</h2>

      <div className="flex items-center gap-6 relative">
        <label htmlFor="image" className="absolute left-20 top-10 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center bg-white shadow">
          <FaPen size={16} />
          <input type="file" className="hidden" name="profile" id="image" />
        </label>

        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />

        <div>
          <h3 className="text-xl font-medium">Rahul Gaire</h3>
          <p className="text-gray-600">Role: Admin</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value="Rahul Gaire"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value="rahul@example.com"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            readOnly
          />
        </div>

        <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
      <div className="mt-10 text-center">
        <button className="ml-4 bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition">
          <Modal />
        </button>
      </div>
    </>
  );
};

export default Profile;
