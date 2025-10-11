// import { Navigate, Outlet } from "react-router-dom";
// const AuthAdmin = ({ isAuthenticated }) => {
//   if (!isAuthenticated) {
//     // Not logged in → redirect to login
//     return <Navigate to="/login" replace />;
//   }
//   // Logged in → render child routes
//   return <Outlet />;
// };
// export default AuthAdmin;



import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthAdmin = () => {
  const { user } = useContext(AuthContext); // ✅ useContext here

  // Redirect to login if user is not authenticated
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthAdmin;
