import React from "react";

function RoleSelection({ onNavigate }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      maxWidth: "500px",
      width: "100%"
    }}>
      <h2 style={{ color: "#333", marginBottom: "30px" }}>Select Your Role</h2>
      <p style={{ color: "#666", marginBottom: "40px" }}>
        Please select whether you are a student or an alumni to continue with registration.
      </p>
      
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        flexWrap: "wrap",
        marginBottom: "40px"
      }}>
        <div 
          onClick={() => onNavigate("signup")}
          style={{
            padding: "30px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            cursor: "pointer",
            width: "160px",
            textAlign: "center",
            transition: "all 0.3s",
            border: "2px solid #e9ecef"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e3f2fd";
            e.target.style.borderColor = "#2196F3";
            e.target.style.transform = "translateY(-5px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f8f9fa";
            e.target.style.borderColor = "#e9ecef";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            fontSize: "48px",
            marginBottom: "15px",
            color: "#2196F3"
          }}>🎓</div>
          <h3 style={{ color: "#333", marginBottom: "10px" }}>Student</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>Currently enrolled in an educational institution</p>
        </div>
        
        <div 
          onClick={() => onNavigate("signup-alumni")}
          style={{
            padding: "30px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            cursor: "pointer",
            width: "160px",
            textAlign: "center",
            transition: "all 0.3s",
            border: "2px solid #e9ecef"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fff3e0";
            e.target.style.borderColor = "#FF9800";
            e.target.style.transform = "translateY(-5px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f8f9fa";
            e.target.style.borderColor = "#e9ecef";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <div style={{
            fontSize: "48px",
            marginBottom: "15px",
            color: "#FF9800"
          }}>👨‍🎓</div>
          <h3 style={{ color: "#333", marginBottom: "10px" }}>Alumni</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>Graduate of an educational institution</p>
        </div>
      </div>
      
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <span 
          onClick={() => onNavigate("home")}
          style={{ color: "#666", cursor: "pointer", textDecoration: "underline" }}
        >
          ← Back to Home
        </span>
      </p>
    </div>
  );
}

export default RoleSelection;