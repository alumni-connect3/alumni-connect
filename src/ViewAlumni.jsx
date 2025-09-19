import React from "react";

function ViewAlumni({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>View Alumni</h2>
      <p>This is the page to view all alumni. Add your alumni list here!</p>
      <button
        onClick={() => onNavigate("admin-dashboard")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default ViewAlumni;