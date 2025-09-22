import React from "react";

function StudentDashboard({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "30px" }}>Student Dashboard</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "40px" }}>Welcome, Student! Access your resources here.</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
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
          onClick={() => onNavigate("apply-job")}
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
          Apply Job
        </button>
        <button
          onClick={() => onNavigate("apply-internship")}
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
          Apply Internship
        </button>
        <button
          onClick={() => onNavigate("register-event")}
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
          Register Event
        </button>
        <button
          onClick={() => onNavigate("profile")}
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
          Profile
        </button>
        <button
          onClick={() => onNavigate("view-stories")}
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
          View Stories
        </button>
        <button
          onClick={() => onNavigate("home")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;