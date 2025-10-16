import React, { useContext, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 const authUser = useContext(AuthContext)
  console.log(authUser)

  return (
    <div className="dashboard-wrapper">
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`} id="sidebar">
        <div className="brand">R & D</div>
        <Navbar />
      </div>

      <div className={`content ${sidebarOpen ? "expanded" : ""}`} id="content">
        <Topbar />

        <div className="container-fluid mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
