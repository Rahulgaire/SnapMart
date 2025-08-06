import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Verifyotp = ({ email = "user@example.com", onVerified }) => {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyTheOtp = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      toast.error("Please enter the OTP.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "https://snapmart-backend.onrender.com/auth/user/verify-otp",
        {
          email,
          otpCode,
        }
      );
      if (res.status === 200) {
        toast.success("OTP verified successfully!");
        if (onVerified) onVerified();
      }
    } catch (error) {
      toast.error(
        error?.response?.data || error.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-zinc-900 rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
        SnapMart - OTP Verification
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Hello <span className="font-medium text-black dark:text-white">{email}</span>,
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
        Please enter the OTP code sent to your email:
      </p>

      <form onSubmit={verifyTheOtp} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>


    </div>
  );
};

export default Verifyotp;
