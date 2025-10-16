import React from "react";

const StatCard = () => {
  return (
      <div style={styles.cardContainer}>
        <div style={{ ...styles.card, ...styles.purple }}>
          <div style={styles.number}>30</div>
          <div style={styles.label}>Total Days</div>
        </div>

        <div style={{ ...styles.card, ...styles.green }}>
          <div style={styles.number}>20</div>
          <div style={styles.label}>Total Payable Days</div>
        </div>

        <div style={{ ...styles.card, ...styles.blue }}>
          <div style={styles.number}>50</div>
          <div style={styles.label}>Total WFA Days</div>
        </div>

        <div style={{ ...styles.card, ...styles.yellow }}>
          <div style={styles.number}>90</div>
          <div style={styles.label}>Total Office Days</div>
        </div>
      </div>
  );
};

const styles = {

  cardContainer: {
    display: "flex",
    margin: "20px",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    width: "200px",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    color: "#333",
  },
  purple: { backgroundColor: "#d7c9ff" },
  green: { backgroundColor: "#dff7dc" },
  blue: { backgroundColor: "#dceeff" },
  yellow: { backgroundColor: "#fff1d6" },
  number: {
    fontSize: "20px",
    marginBottom: "5px",
  },
  label: {
    fontSize: "14px",
  },
};

export default StatCard;
