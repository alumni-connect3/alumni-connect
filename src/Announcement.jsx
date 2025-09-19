import React from "react";

function Announcement({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Announcement</h2>
      <p>This is the page to create or view announcements. Add your announcement form here!</p>
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

export default Announcement;