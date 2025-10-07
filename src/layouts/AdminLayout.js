import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`} id="sidebar">
        <div className="brand">R</div>
        <Navbar />
      </div>

      {/* MAIN CONTENT */}
      <div className={`content ${sidebarOpen ? "expanded" : ""}`} id="content">
        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <div className="container-fluid mt-4">
            <Outlet/>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AdminLayout;
