// src/Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

// --- StatCard Component ---
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="col-md-3">
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h6 className={`text-${color} text-uppercase fw-bold`}>{title}</h6>
          <p className="h3 mb-0">{value}</p>
          <small className="text-success">{trend}</small>
        </div>
      </div>
    </div>
  </div>
);

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <ul className="pagination pagination-sm mb-0">
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </button>
    </li>
    {[...Array(totalPages)].map((_, i) => (
      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(i + 1)}>
          {i + 1}
        </button>
      </li>
    ))}
    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
        Next
      </button>
    </li>
  </ul>
);

// --- Line Chart Component ---
const UserGrowthChart = ({ data }) => (
  <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
    <h5 className="mb-3 fw-bold">User Growth Over Time</h5>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// --- Pie Chart Component ---
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];

const OrdersPieChart = ({ data }) => (
  <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
    <h5 className="mb-3 fw-bold">Order Distribution by Category</h5>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

function Dashboard() {
  // --- Stats ---
  const [stats] = useState([
    { title: "Users", value: 1245, icon: FaUsers, color: "primary", trend: "▲ 5% from last month" },
    { title: "Products", value: 327, icon: FaBoxOpen, color: "success", trend: "▲ 2% from last month" },
    { title: "Orders", value: 890, icon: FaShoppingCart, color: "warning", trend: "▲ 8% from last month" },
  ]);

  // --- Chart data ---
  const [userGrowth] = useState([
    { month: "Jan", users: 100 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 400 },
    { month: "Apr", users: 700 },
    { month: "May", users: 900 },
    { month: "Jun", users: 1245 },
  ]);

  const [orderData] = useState([
    { name: "Electronics", value: 400 },
    { name: "Fashion", value: 300 },
    { name: "Home & Kitchen", value: 200 },
    { name: "Beauty", value: 150 },
    { name: "Other", value: 100 },
  ]);

  // --- User list ---
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 400)); // Simulate delay
    const allUsers = Array.from({ length: 5 }, (_, i) => ({
      adminID: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      mobile: `123-456-789${i}`,
      created_at: new Date().toLocaleDateString(),
    }));

    const offset = (pageNumber - 1) * limit;
    const paginated = allUsers.slice(offset, offset + limit);

    setUsers(paginated);
    setLoading(false);
  }, [limit]);


  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  return (
    <div>
      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-md-7">
          <UserGrowthChart data={userGrowth} />
        </div>
        <div className="col-md-5">
          <OrdersPieChart data={orderData} />
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="card shadow-sm border-0 rounded-4 p-3">
        <h5 className="mb-3 fw-bold">Recent Users</h5>
        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.adminID}>
                      <td>{user.adminID}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.created_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
