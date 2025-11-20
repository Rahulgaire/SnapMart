// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  // console.log(user)
  // Optional: load user from token on page refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://snapmart-backend.onrender.com/api/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const register = async (formData, setLoading, setPage) => {
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
      console.log(res.data)
      if (res.status === 201) {
        toast.success(res.data?.message || "Registration successful!");
        setPage("verify");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error)
      toast.error(
        `${error?.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  const login = async (formData) => {
    try {
      const res = await axios.post("https://snapmart-backend.onrender.com/auth/user/login",
        formData,
        { withCredentials: true }
      );
      // console.log(res);

      if (res.status === 200) {
        toast.success("Login successful!");
        setUser(res.data.user || { email: formData.email, role: res.data.role });

        // Store token
        localStorage.setItem("token", res.data.token);
        Cookies.set("token", res.data.token);

        // Navigate based on role
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    try {
      const res = axios.post("https://snapmart-backend.onrender.com/auth/user/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
