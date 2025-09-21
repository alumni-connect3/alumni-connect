import React from "react";

function AlumniDashboard({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "30px" }}>Alumni Dashboard</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "40px" }}>Welcome, Alumni! Connect with your network here.</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
        <button
          onClick={() => onNavigate("alumni-event")} // Updated to navigate to AlumniEvent
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
          Events
        </button>
        <button
          onClick={() => onNavigate("alumni-job")} // Updated to navigate to AlumniJob
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
          Jobs
        </button>
        <button
          onClick={() => onNavigate("alumni-internship")} // Updated to navigate to AlumniInternship
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
          Internships
        </button>
        <button
          onClick={() => onNavigate("stories")}
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
          Stories
        </button>
        <button
          onClick={() => onNavigate("live-chat")}
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
          Live Chat
        </button>
        <button
          onClick={() => onNavigate("view-profile")}
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
          View Profile
        </button>
      </div>

      {/* Logout Button at Bottom Left */}
      <button
        onClick={() => onNavigate("home")}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          padding: "12px 24px",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
      >
        Logout
      </button>
    </div>
  );
}

export default AlumniDashboard;