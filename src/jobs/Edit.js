import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import API_URL from "../utils/config";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}users/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");

        setFormData({
          name: data.data.name || "",
          email: data.data.email || "",
          mobile: data.data.mobile || "",
        });
      } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user");

      showSuccess("User updated successfully");
      navigate("/users"); 
    } catch (err) {
      console.error(err);
      showError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h4 className="fw-semibold mb-3 mb-md-0">
          <i className="fa-solid fa-user-edit me-2 text-primary"></i>
          Edit User
        </h4>
        <NavLink to="/users" className="btn btn-outline-primary btn-sm me-2">
          <i className="fa-solid fa-list me-1"></i> View Users
        </NavLink>
      </div>

      {/* Form Card */}
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <form className="row g-3" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${
                errors.name ? "is-invalid" : formData.name ? "is-valid" : ""
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${
                errors.email ? "is-invalid" : formData.email ? "is-valid" : ""
              }`}
              placeholder="example@email.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`form-control ${
                errors.mobile ? "is-invalid" : formData.mobile ? "is-valid" : ""
              }`}
              placeholder="Enter mobile number"
            />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>

          {/* Submit */}
          <div className="col-12 text-end mt-3">
            <button type="submit" className="btn btn-success px-4" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save me-2"></i> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
