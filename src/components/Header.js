import React from "react";
import { FiBell } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
        </div>

        {/* Notifications */}
        <div className="relative group">
          <FiBell size={20} className="text-gray-600 cursor-pointer" />
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100">
                New user registered
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                Order #1024 completed
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">Server rebooted</li>
            </ul>
          </div>
        </div>

        {/* User Profile */}
        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
            <span className="hidden md:inline text-gray-700 font-medium">
              John Doe
            </span>
          </div>
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
