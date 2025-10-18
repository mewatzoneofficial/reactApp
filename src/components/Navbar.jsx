import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav flex-column mt-3">
      <NavLink className="nav-link" to="/" end>
        <i className="fa-solid fa-house"></i> Dashboard
      </NavLink>
      <NavLink className="nav-link" to="/staffs">
        <i className="fa-solid fa-user"></i> Staffs
      </NavLink>
      <NavLink className="nav-link" to="/users">
        <i className="fa-solid fa-users"></i> Users
      </NavLink>
      
      <NavLink className="nav-link" to="/employers">
        <i className="fa-solid fa-cogs"></i> Employer
      </NavLink>

      <NavLink className="nav-link" to="/jobs">
        <i className="fa-solid fa-cogs"></i> Job
      </NavLink>

      <NavLink className="nav-link" to="/settings">
        <i className="fa-solid fa-cogs"></i> Settings
      </NavLink>
      <NavLink className="nav-link" to="/chats">
        <i className="fa-solid fa-cogs"></i> Chats
      </NavLink>
      
    </nav>
  );
}

export default Navbar;
