import React, { useState } from "react";

function Login({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle login logic
    alert(`Login attempted with email: ${formData.email}`);
  };

  return (
    <div style={{
      padding: "40px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      maxWidth: "400px",
      width: "100%"
    }}>
      <h2 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "20px",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
        >
          Login
        </button>
      </form>
      
      <p style={{ textAlign: "center", color: "#666" }}>
        Don't have an account?{" "}
        <span 
          onClick={() => onNavigate("signup")}
          style={{ color: "#2196F3", cursor: "pointer", textDecoration: "underline" }}
        >
          Sign up
        </span>
      </p>
      
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

export default Login;