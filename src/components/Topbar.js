import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const authuserdata = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-outline-secondary btn-sm d-lg-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="search-box">
          <i className="fa fa-search"></i>
          <input
            type="text"
            className="form-control"
            placeholder="Search for menu..."
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="icon-btn">
          <i className="fa-solid fa-bell fa-lg"></i>
          <span className="badge bg-danger">9</span>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa-solid fa-user"></i> {authuserdata.name || "User"}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Profiel
              </NavLink>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
