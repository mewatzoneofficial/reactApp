import React from "react";
import { Navigate } from "react-router-dom";

const AuthAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("adminUser"));
  const token = localStorage.getItem("adminToken");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthAdmin;
