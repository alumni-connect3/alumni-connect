import React from "react";

function ViewStudents({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>View Students</h2>
      <p>This is the page to view all students. Add your student list here!</p>
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

export default ViewStudents;