import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Verifyotp from "./Verifyotp";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [page,setPage] = useState("register");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://snapmart-backend.onrender.com/auth/user/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (res.status === 201) {
        toast.success("Registration successful!");
        setPage("verify");
      } else {
        toast.error("Registration failed. Please try again.");
      }
      setPage("verify");
    } catch (error) {
      console.log(error)
      toast.error(
        `${error?.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   {page==='register' ? <div className="h-[89vh] md:h-[87.9vh] bg-gray-100 dark:bg-zinc-900 flex items-center justify-center px-7 ">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 sm:p-8 md:px-10 space-y-1 my-1 ">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create an Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Register to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Rahul Gaire"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
              className="absolute right-3 top-9 text-gray-600 dark:text-gray-300"
            >
              {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              onChange={handleChange}
              value={formData.confirmPassword}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label="Toggle confirm password visibility"
              className="absolute right-3 top-9 text-gray-600 dark:text-gray-300"
            >
              {showConfirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition duration-200 ${
              loading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Login here
          </Link>
        </p>
      </div>
    </div>
    :
    <Verifyotp email={formData.email}/>
    }
    </>
  );
};

export default Register;
