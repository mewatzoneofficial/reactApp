import React, { useCallback, useEffect, useState } from "react";
import { formatDMY } from "../utils/common";
import CustomLoading from "../components/CustomLoading";
import API_URL from "../utils/config";

const RecentUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecentUsers = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: 1,
        limit:5,
      });
      const res = await fetch(`${API_URL}users?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(Array.isArray(data.data.results) ? data.data.results : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecentUsers();
  }, [fetchRecentUsers]);

  return (
    <>
      <div className="card shadow-sm border-0 rounded-4 p-3">
        <h5 className="mb-3 fw-bold">Recent Users</h5>
        {loading ? (
          <CustomLoading />
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
                    <tr key={user.faculityID}>
                      <td>{user.faculityID}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{ user.mobile}</td>
                      <td>{formatDMY(user.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentUser;
