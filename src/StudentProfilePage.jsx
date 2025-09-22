import React from "react";

function StudentProfilePage({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>Student Profile</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Name: [Student Name]</p>
      <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Enrollment Year: [Year]</p>
      <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Department: [Department]</p>
      <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Email: [Student Email]</p>
      <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>Location: [Location]</p>
      <button
        onClick={() => onNavigate("student-dashboard")}
        style={{
          padding: "12px 24px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default StudentProfilePage;