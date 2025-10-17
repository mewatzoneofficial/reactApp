import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const defaultUser = {
    name: "",
    mobile: "",
    email: "",
    official_email: "",
    official_mobile: "",
    password: "",
    image: "",
    dob: "",
    joining_date: "",
    gender: "",
  };

  const [user, setUser] = useState(defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [changed, setChanged] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    setUser({ ...defaultUser, ...storedUser });
    setImagePreview(storedUser?.image || "");
  }, []);

  useEffect(() => {
    setChanged(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("adminUser", JSON.stringify(user));
    setIsEditing(false);
    setChanged(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      navigate("/");
    }
  };

  const InputField = ({ label, name, type = "text", ...rest }) => (
    <div className="col-md-6 mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        value={user[name]}
        onChange={handleChange}
        disabled={!isEditing}
        {...rest}
      />
    </div>
  );

  return (
    <div className="card mx-auto shadow">
      <div className="card-header text-center">
        <h3>User Profile</h3>
      </div>
      <div className="card-body">
        <div className="text-center mb-4">
          <img
            src={
              imagePreview ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt={`${user.name || "User"} Profile`}
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          {isEditing && (
            <input
              type="file"
              name="image"
              className="form-control mt-2"
              onChange={handleChange}
              accept="image/*"
            />
          )}
        </div>

        <div className="row">
          <InputField label="Name" name="name" required />
          <InputField
            label="Mobile"
            name="mobile"
            type="tel"
            pattern="[0-9]{10}"
            title="Enter 10-digit mobile number"
          />
          <InputField label="Email" name="email" type="email" />
          <InputField label="Official Email" name="official_email" type="email" />
          <InputField
            label="Official Mobile"
            name="official_mobile"
            type="tel"
            pattern="[0-9]{10}"
            title="Enter 10-digit mobile number"
          />
          <InputField label="Password" name="password" type="password" />
          <InputField label="Date of Birth" name="dob" type="date" />
          <InputField label="Joining Date" name="joining_date" type="date" />
          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className="form-select"
              value={user.gender}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4">
          {isEditing ? (
            <>
              <button
                className="btn btn-success"
                onClick={handleSave}
                disabled={!changed}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setUser(JSON.parse(localStorage.getItem("adminUser") || "{}"));
                  setImagePreview(
                    JSON.parse(localStorage.getItem("adminUser") || "{}").image || ""
                  );
                  setChanged(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
