import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
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
              <i className="fa-solid fa-user"></i> Saukat Ali
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
