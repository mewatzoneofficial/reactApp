import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { API_URL } from "./config";
import { showError, showSuccess } from "./utils/toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Login failed");

      await showSuccess("User has been Login successfully.");
        localStorage.setItem("authUser", JSON.stringify(result.data.user));
        localStorage.setItem("token", result.data.token);

      navigate("/users");
    } catch (err) {
      console.error(err);
      await showError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
