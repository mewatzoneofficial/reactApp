import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../components/Pagination";
import { API_URL } from "../config";
import "react-toastify/dist/ReactToastify.css";
import { showError, showSuccess } from "../utils/toast";
import Swal from "sweetalert2";

const Listing = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}users?page=${pageNumber}&limit=${limit}`
      );
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
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });

  if (confirm.isConfirmed) {
    try {
      const res = await fetch(`${API_URL}users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");

      await showSuccess("Deleted!", "User has been deleted successfully.");
      fetchUsers(page);
    } catch (err) {
      await showError("Error!", err.message || "Failed to delete user.");
    }
  }
};



  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     try {
  //       await fetch(`${API_URL}users/${id}`, { method: "DELETE" });
  //       // showSuccess("User deleted successfully!");
  //       // ✅ Success Alert
  //     await Swal.fire({
  //       title: "User Created!",
  //       text: "The user has been deleted successfully.",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //       confirmButtonColor: "#198754",
  //     });
      
  //       fetchUsers(page);
  //     } catch (err) {
  //       console.error("Failed to delete user:", err);
  //       // showError("Failed to delete user.");
  //       // ❌ Error Alert
  //       Swal.fire({
  //         title: "Error!",
  //         text: err.message || "Failed to create user.",
  //         icon: "error",
  //         confirmButtonText: "Try Again",
  //         confirmButtonColor: "#d33",
  //       });
  //     }
  //   }
  // };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold">Users</h4>
        <div>
          <NavLink to="/users/create" className="btn btn-primary btn-sm me-2">
            <i className="fa-solid fa-plus"></i> Add New User
          </NavLink>
        </div>
      </div>

      <div className="card p-3">
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
