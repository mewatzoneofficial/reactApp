import React from "react";

function CustomLoading({
  message = "Loading...",
  size = 90,
  overlayOpacity = 0.8,
  colors = ["#28a745", "#007bff", "#ffc107", "#dc3545"],
}) {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `rgba(255, 255, 255, ${overlayOpacity})`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 9999,
    animation: "fadeIn 0.5s ease-in-out",
  };

  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${size / 10}px solid #f3f3f3`,
    borderTop: `${size / 10}px solid ${colors[0]}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite, colorCycle 2s linear infinite",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const textStyle = {
    marginTop: "12px",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#333",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  // Generate keyframes dynamically
  const colorKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes colorCycle {
      0% { border-top-color: ${colors[0]}; }
      25% { border-top-color: ${colors[1]}; }
      50% { border-top-color: ${colors[2]}; }
      75% { border-top-color: ${colors[3]}; }
      100% { border-top-color: ${colors[0]}; }
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes pulse {
      0% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 0.6; transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{colorKeyframes}</style>
      <div style={overlayStyle} aria-busy="true" aria-label={message}>
        <div style={spinnerStyle}></div>
        <p style={textStyle}>{message}</p>
      </div>
    </>
  );
}

export default CustomLoading;
