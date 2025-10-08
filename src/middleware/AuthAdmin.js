import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthAdmin = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in → render child routes
  return <Outlet />;
};

export default AuthAdmin;
