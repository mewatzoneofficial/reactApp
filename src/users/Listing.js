import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchUsers, deleteUser } from "../redux/usersSlice";
import { showError, showSuccess } from "../utils/toast";
import { formatDMY } from "../utils/common";
import Pagination from "../components/Pagination";
import CustomLoading from "../components/CustomLoading";

const Listing = () => {
  const dispatch = useDispatch();

  const {
    users,
    page,
    limit,
    totalPages,
    totalEntries,
    loading,
    error,
  } = useSelector((state) => state.users);

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchUsers({ page: newPage, limit, name: searchName, email: searchEmail }));
    }
  };

  const handleSearch = () => {
    dispatch(fetchUsers({ page: 1, limit, name: searchName, email: searchEmail }));
  };

  const handleReset = () => {
    setSearchName("");
    setSearchEmail("");
    dispatch(fetchUsers({ page: 1, limit }));
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
        await dispatch(deleteUser(id)).unwrap();
        showSuccess("User deleted successfully.");
      } catch (err) {
        showError("Error!", err || "Failed to delete user.");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold">Users</h4>
        <NavLink to="/users/create" className="btn btn-primary btn-sm me-2">
          <i className="fa-solid fa-plus"></i> Add New User
        </NavLink>
      </div>

      <div className="card p-3">
        {/* 🔍 Search Section */}
        <div className="row m-3">
          <div className="col-md-4">
            <label className="form-label fw-medium">Name</label>
            <input
              type="text"
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

        {loading ? (
          <CustomLoading />
        ) : error ? (
          <div className="text-danger text-center p-3">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Created</th>
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
                    <tr key={user.faculityID}>
                      <td>{user.faculityID}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{formatDMY(user.created_at)}</td>
                      <td>
                        <Link
                          to={`/users/edit/${user.faculityID}`}
                          className="text-warning me-3"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDelete(user.faculityID)}
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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Listing;
