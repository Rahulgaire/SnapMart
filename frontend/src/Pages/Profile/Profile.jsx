import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import Modal from "./Modal";
import owner from "../../../assets/owner.jpg";
import { AuthContext } from "../../context/AuthProvider";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://snapmart-backend.onrender.com/api/profile/${user.email}`,
          { withCredentials: true }
        );
        setProfile(res.data.user);
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]); // FIX

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!profile) return <p className="text-center mt-10">No profile found</p>;

  return (
    <div className="max-w-6xl mx-auto mt-3 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT SIDE – PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-2xl px-8 py-1">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center underline decoration-blue-500">
          Admin Profile
        </h2>

        <div className="flex items-center gap-6 relative mb-8">
          <div className="relative">
            <img
              src={profile.img || owner}
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
            <h3 className="text-xl font-semibold text-gray-900">
              {profile.name}
            </h3>
            <p className="text-gray-600 text-sm">Role: {profile.role}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={profile.name}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Member Since</label>
            <input
              type="text"
              value={new Date(profile.createdAt).toLocaleDateString()}
              readOnly
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>

          <Modal />
        </div>
      </div>

      {/* RIGHT SIDE – EXTRA INFO */}
      <div className="bg-white shadow-xl rounded-2xl px-8 py-1">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Details</h2>

        <div className="space-y-4 text-gray-700">
          <p><strong>Last Login:</strong> 12 Feb 2025</p>
          <p><strong>Total Orders:</strong> 48</p>
          <p><strong>Admin Level:</strong> Super Admin</p>
          <p><strong>Status:</strong> Active</p>
        </div>

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Actions</h2>

        <div className="flex flex-col gap-3">
          <button className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
            Update Security
          </button>
          <button className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            Delete Account
          </button>
        </div>
      </div>

    </div>
  );

};

export default Profile;
