import React from "react";

function Home({ onNavigate }) {
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
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Welcome to My App</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        This is your home page. Please login or sign up to continue.
      </p>
      
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <button 
          onClick={() => onNavigate("login")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
        >
          Login
        </button>
        
        <button 
          onClick={() => onNavigate("role-selection")}  // Updated to go to role selection
          style={{
            padding: "12px 24px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0b7dda"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#2196F3"}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;