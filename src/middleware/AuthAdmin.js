import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthAdmin = () => {
  const { user } = useContext(AuthContext); // ✅ useContext here

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthAdmin;
