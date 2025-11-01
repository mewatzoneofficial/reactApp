import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { showError, showSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/config";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Login failed");

      await showSuccess("Logged in successfully.");
      localStorage.setItem("adminUser", JSON.stringify(result.data.user));
      localStorage.setItem("adminToken", result.data.token);
      navigate("/dashboard");
    } catch (err) {
      await showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); // if inside a form
    navigate("/login"); // redirect to /register
  };

  return (
    <div className="login-bg-white">
      <div className="login-card-colorful">
        <h2 className="login-title-colorful">Welcome to Tallento.ai</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form-colorful">
          <div className="input-group floating">
            <input
              type="email"
              placeholder=" "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "input_email_error" : ""}
            />
            <label>Email</label>
            {errors.email && <span className="email_error">{errors.email.message}</span>}
          </div>

          <div className="input-group floating">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                {...register("password", { required: "Password is required" })}
                className={errors.password ? "input_password_error" : ""}
              />
              <label>Password</label>
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && <span className="password_error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Logging in..." : "Register"}
          </button>

          <button type="submit" className="login-btn" onClick={handleLogin}>Login</button>

        </form>
      </div>
    </div>
  );
};

export default Register;