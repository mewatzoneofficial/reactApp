import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import API_URL from "../utils/config";

export default function AddUser() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`${API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create user");

      showSuccess("User created successfully");
      navigate("/users");
      reset();
    } catch (err) {
      console.error("❌ Error:", err);
      showError("Failed to create user.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h4 className="fw-semibold mb-3 mb-md-0">
          <i className="fa-solid fa-user-plus me-2 text-primary"></i> Add New User
        </h4>
        <NavLink to="/users" className="btn btn-outline-primary btn-sm me-2">
          <i className="fa-solid fa-list me-1"></i> View Users
        </NavLink>
      </div>

      <div className="card shadow-sm border-0 rounded-4 p-4">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required." })}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Mobile</label>
            <input
              type="text"
              {...register("mobile", {
                required: "Mobile number is required.",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid mobile number (10–15 digits).",
                },
              })}
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              placeholder="Enter mobile number"
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile.message}</div>
            )}
          </div>

          {/* Official Email */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Official Email</label>
            <input
              type="email"
              {...register("official_email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid official email format.",
                },
              })}
              className="form-control"
              placeholder="official@example.com"
            />
          </div>

          {/* Official Mobile */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Official Mobile</label>
            <input
              type="text"
              {...register("official_mobile", {
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid official mobile number (10–15 digits).",
                },
              })}
              className="form-control"
              placeholder="Enter official mobile"
            />
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required." })}
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            />
            {errors.dob && (
              <div className="invalid-feedback">{errors.dob.message}</div>
            )}
          </div>

          {/* Joining Date */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Joining Date</label>
            <input
              type="date"
              {...register("joining_date", { required: "Joining date is required." })}
              className={`form-control ${errors.joining_date ? "is-invalid" : ""}`}
            />
            {errors.joining_date && (
              <div className="invalid-feedback">{errors.joining_date.message}</div>
            )}
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Gender</label>
            <select {...register("gender", { required: "Select a valid gender." })} className="form-select">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender.message}</div>
            )}
          </div>

          {/* Submit */}
          <div className="col-12 text-end mt-3">
            <button
              type="submit"
              className="btn btn-success px-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save me-2"></i> save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
