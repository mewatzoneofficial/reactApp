// NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" style={styles.link}>
        Go back home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#333",
  },
  title: {
    fontSize: "6rem",
    margin: 0,
  },
  message: {
    fontSize: "1.5rem",
    margin: "1rem 0",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
  },
};

export default NotFound;
