"use client";
import React, { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { AuthContext } from "../context/AuthProvider";
const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-[90vh] md:h-[87.8vh] py-16 md:py-8.5 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center px-10">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 sm:p-10 sm:px-12 space-y-6">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Login to Your Account
          </h2>
          <p className="text-[13px] md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link to="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[12px] text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
