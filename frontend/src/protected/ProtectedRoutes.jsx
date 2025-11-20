import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
const ProtectedRoutes = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the route requires ONLY admin access
  if (role === "admin" && user.role !== "admin") {
    toast.error("Access denied. Admins only.");
    return <Navigate to="/" replace />;
  }

  // Admin has access to everything automatically → GOOD!
  return children;
};

export default ProtectedRoutes;
