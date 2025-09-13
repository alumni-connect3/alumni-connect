import React, { useState } from "react";

function SignupAlumni({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    graduationYear: "",
    degree: "",
    currentJob: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Here you would typically handle alumni signup logic
    alert(`Alumni registration for: ${formData.name} (${formData.email})`);
  };

  return (
    <div style={{
      padding: "40px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      maxWidth: "450px",
      width: "100%"
    }}>
      <h2 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>Alumni Registration</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Graduation Year:</label>
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            min="1950"
            max="2030"
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
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Degree:</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              backgroundColor: "white"
            }}
          >
            <option value="">Select Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Current Job (optional):</label>
          <input
            type="text"
            name="currentJob"
            value={formData.currentJob}
            onChange={handleChange}
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
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "20px",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#f57c00"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#FF9800"}
        >
          Register as Alumni
        </button>
      </form>
      
      <p style={{ textAlign: "center", color: "#666" }}>
        Already have an account?{" "}
        <span 
          onClick={() => onNavigate("login")}
          style={{ color: "#4CAF50", cursor: "pointer", textDecoration: "underline" }}
        >
          Login
        </span>
      </p>
      
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <span 
          onClick={() => onNavigate("role-selection")}
          style={{ color: "#666", cursor: "pointer", textDecoration: "underline" }}
        >
          ← Back to Role Selection
        </span>
      </p>
    </div>
  );
}

export default SignupAlumni;