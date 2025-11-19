import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // 1️⃣ If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ If route requires ADMIN only
  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/" replace />; // block normal user
  }

  // 3️⃣ If route requires USER only
  if (role === "user" && user.role !== "user") {
    return <Navigate to="/admin" replace />; // block admin
  }

  // 4️⃣ Both roles allowed → simply render page
  return children;
};

export default ProtectedRoutes;
