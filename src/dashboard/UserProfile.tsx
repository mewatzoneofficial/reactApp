import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { showSuccess, showError } from "../utils/toast";
import API_URL from "../utils/config";
interface UserFormData {
  name: string;
  email: string;
  mobile: string;
  official_email?: string;
  official_mobile?: string;
  dob: string;
  joining_date: string;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Inactive";
  category: string[];
  image?: string;
}

const defaultUser: UserFormData = {
  name: "",
  email: "",
  mobile: "",
  official_email: "",
  official_mobile: "",
  dob: new Date().toISOString().split("T")[0],
  joining_date: new Date().toISOString().split("T")[0],
  gender: "Male",
  status: "Active",
  category: ["Education"],
  image: "",
};

function UserProfile() {
  const navigate = useNavigate();
  // Retrieve the data
  const adminUser = localStorage.getItem("adminUser");
  const adminUserData = adminUser ? JSON.parse(adminUser) : null;
  console.log(adminUserData, adminUserData.adminID);

  const [imagePreview, setImagePreview] = useState<string>(
    defaultUser.image || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    defaultValues: JSON.parse(
      localStorage.getItem("adminUser") || JSON.stringify(defaultUser)
    ),
  });

  const watchedImage = watch("image");

  useEffect(() => {
    setImagePreview(watchedImage || defaultUser.image || "");
  }, [watchedImage]);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      const res = await fetch(
        `${API_URL}dashboard/profile/${adminUserData.adminID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save user");

      localStorage.setItem("adminUser", JSON.stringify(data));
      showSuccess("Profile updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      showError('Failed to save user')
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setValue("image", reader.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="card mx-auto shadow" style={{ maxWidth: 1200 }}>
      <div className="card-body">
        <div className="text-center mb-4">
          <img
            src={
              imagePreview ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="User Profile"
            className="rounded-circle"
            style={{ width: 120, height: 120, objectFit: "cover" }}
          />
          <input
            type="file"
            accept="image/*"
            className="form-control mt-2"
            onChange={handleImageChange}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Mobile */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile.message}</div>
              )}
            </div>

            {/* Official Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Official Email</label>
              <input
                type="email"
                className="form-control"
                {...register("official_email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid official email",
                  },
                })}
              />
            </div>

            {/* Official Mobile */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Official Mobile</label>
              <input
                type="text"
                className="form-control"
                {...register("official_mobile", {
                  pattern: {
                    value: /^[0-9]{10,12}$/,
                    message: "Invalid official mobile",
                  },
                })}
              />
            </div>

            {/* DOB */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                {...register("dob", { required: "Date of birth is required" })}
              />
              {errors.dob && (
                <div className="invalid-feedback">{errors.dob.message}</div>
              )}
            </div>

            {/* Joining Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Joining Date</label>
              <input
                type="date"
                className={`form-control ${
                  errors.joining_date ? "is-invalid" : ""
                }`}
                {...register("joining_date", {
                  required: "Joining date is required",
                })}
              />
              {errors.joining_date && (
                <div className="invalid-feedback">
                  {errors.joining_date.message}
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                {...register("gender", { required: "Select a gender" })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>

            {/* Status */}
            <div className="col-md-6 mb-3">
              <label className="form-label me-3">Status</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  value="Active"
                  className="form-check-input"
                  {...register("status", { required: "Select a status" })}
                />
                <label className="form-check-label">Active</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  value="Inactive"
                  className="form-check-input"
                  {...register("status", { required: "Select a status" })}
                />
                <label className="form-check-label">Inactive</label>
              </div>
              {errors.status && (
                <div className="invalid-feedback d-block">
                  {errors.status.message}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              {["Health", "Finance", "Education"].map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    type="checkbox"
                    value={cat}
                    className="form-check-input"
                    {...register("category", {
                      required: "Select at least one category",
                    })}
                  />
                  <label className="form-check-label">{cat}</label>
                </div>
              ))}
              {errors.category && (
                <div className="invalid-feedback d-block">
                  {errors.category.message}
                </div>
              )}
            </div>

            <div className="col-12 text-end mt-3">
              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
