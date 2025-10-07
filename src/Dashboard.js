// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

// Simple Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <ul className="pagination pagination-sm mb-0">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>
      </li>

      {pages.map((p) => (
        <li key={p} className={`page-item ${currentPage === p ? "active" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(p)}>
            {p}
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
};

function Dashboard() {
  // --- Stats ---
  const [stats, setStats] = useState({
    users: 1245,
    products: 327,
    orders: 890,
  });

  // --- User growth chart data ---
  const [userGrowth, setUserGrowth] = useState([
    { month: "Jan", users: 100 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 400 },
    { month: "Apr", users: 700 },
    { month: "May", users: 900 },
    { month: "Jun", users: 1245 },
  ]);

  // --- Recent users table ---
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  // --- Fetch users (replace with API) ---
  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      // Replace this with actual API call
      const allUsers = Array.from({ length: 23 }, (_, i) => ({
        adminID: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        mobile: `123-456-789${i}`,
        created_at: new Date().toLocaleDateString(),
      }));

      const offset = (pageNumber - 1) * limit;
      const paginated = allUsers.slice(offset, offset + limit);

      setUsers(paginated);
      setTotalEntries(allUsers.length);
      setTotalPages(Math.ceil(allUsers.length / limit));
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Simulate deletion
      setUsers(users.filter((u) => u.adminID !== id));
      setTotalEntries((prev) => prev - 1);
      fetchUsers(page);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div>
      <h2 className="mb-4">📊 Dashboard </h2>

      {/* Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title text-primary">Users</h5>
                <p className="h3 mb-0">{stats.users}</p>
                <small className="text-success">▲ 5% from last month</small>
              </div>
              <FaUsers size={40} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title text-success">Products</h5>
                <p className="h3 mb-0">{stats.products}</p>
                <small className="text-success">▲ 2% from last month</small>
              </div>
              <FaBoxOpen size={40} className="text-success" />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title text-warning">Orders</h5>
                <p className="h3 mb-0">{stats.orders}</p>
                <small className="text-success">▲ 8% from last month</small>
              </div>
              <FaShoppingCart size={40} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="mb-3">User Growth Over Time</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={userGrowth}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Users Table */}
      <div className="card shadow-sm p-3">
        <h5 className="mb-3">Recent Users</h5>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Record Not Found.
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
                      <td className="text-right">
                        <Link
                          to={`/users/edit/${user.adminID}`}
                          className="text-warning me-3"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDelete(user.adminID)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalEntries)} of {totalEntries} entries
          </small>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
