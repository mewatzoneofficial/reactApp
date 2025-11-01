import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../components/Pagination";
import "react-toastify/dist/ReactToastify.css";
import { showError, showSuccess } from "../utils/toast";
import Swal from "sweetalert2";
import API_URL from "../utils/config";

const Listing = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: pageNumber,
        limit,
      });

      if (searchName) queryParams.append("name", searchName);
      if (searchEmail) queryParams.append("email", searchEmail);

      const res = await fetch(`${API_URL}staffs?${queryParams.toString()}`);
      const data = await res.json();

      setUsers(Array.isArray(data.data.results) ? data.data.results : []);
      setPage(data.data.page || 1);
      setTotalPages(data.data.totalPages || 1);
      setTotalEntries(data.data.total || 0);
    } catch (err) {
      console.error("Error loading users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      position: "top-end",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}staffs/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete user");

        await showSuccess("User has been deleted successfully.");
        fetchUsers(page);
      } catch (err) {
        await showError("Error!", err.message || "Failed to delete user.");
      }
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers(1);
  };

  const handleReset = () => {
    setSearchName("");
    setSearchEmail("");
    setPage(1);
    fetchUsers(1);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold">Staffs</h4>
        <div>
          <NavLink to="/staffs/create" className="btn btn-primary btn-sm me-2">
            <i className="fa-solid fa-plus"></i> Add New Staff
          </NavLink>
        </div>
      </div>

      <div className="card p-3">
        {/* 🔍 Search Fields */}
        <div className="row m-3">
          <div className="col-md-4">
            <label className="form-label fw-medium">Name</label>
            <input
              type="text"
              name="name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="form-control"
              placeholder="Search Name"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium">Email</label>
            <input
              type="text"
              name="email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="form-control"
              placeholder="Search Email"
            />
          </div>

          <div className="col-md-4 d-flex align-items-end gap-2">
            <button
              onClick={handleSearch}
              className="btn btn-primary w-50"
              disabled={loading}
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="btn btn-secondary w-50"
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </div>

        {/* 📋 Table */}
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
                  <th>Mobile No.</th>
                  <th>Create Date</th>
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
                      <td>{user.official_email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.created_at}</td>
                      <td className="text-right">
                        <Link
                          to={`/staffs/edit/${user.adminID}`}
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

        {/* Pagination Info */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalEntries)} of {totalEntries} entries
          </small>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Listing;
