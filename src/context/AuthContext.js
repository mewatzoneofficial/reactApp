import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext('them');

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async (token) => {
    try {
      const res = await API.get("/dashboard/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile(token);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      await fetchProfile(token);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
