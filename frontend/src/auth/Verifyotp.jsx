import React from "react";

const Verifyotp = ({email = "user@example.com" }) => {
    const verifyTheOtp = async() => {
        // Logic to verify the OTP
        console.log("Verifying OTP:", otpCode , " for email:", email);
        // You can add your verification logic here
    }
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
        SnapMart - OTP Verification
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Hello <span className="font-medium text-black dark:text-white">{email}</span>,
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
        Your OTP code is:
      </p>

      <div className="text-center bg-gray-100 dark:bg-zinc-700 text-2xl font-bold tracking-widest py-3 rounded-md text-blue-600 dark:text-blue-400 mb-4">
        {/* {otpCode} */}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Please do not share this OTP with anyone. It is valid for the next <strong>10 minutes</strong>.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
        This is an auto-generated message. Please do not reply.
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 font-medium">
        Best Regards, <br />
        SnapMart Team
      </p>
    </div>
  );
};

export default Verifyotp;
