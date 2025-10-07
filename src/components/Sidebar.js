import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `nav-link text-white ${isActive ? "bg-primary font-weight-bold" : ""}`;

  return (
    <div className="d-flex flex-column h-100">
      <div className="p-3 border-bottom border-secondary text-center">
        <h4>AdminPanel</h4>
      </div>

      <nav className="nav flex-column p-3">
        <NavLink to="/dashboard" className={linkClass}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/users" className={linkClass}>
          👥 Users
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          📦 Products
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          ⚙️ Settings
        </NavLink>

        <NavLink to="/staffs" className={linkClass}>
          ⚙️ Staff
        </NavLink>
      </nav>

      <div className="mt-auto text-center border-top border-secondary py-3">
        <small>© 2025 Tallento.Ai Admin</small>
      </div>
    </div>
  );
}

export default Sidebar;
