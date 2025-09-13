import React, { useState } from "react";

function SignupAlumni({ onNavigate }) {
  const [form, setForm] = useState({
    fullName: "",
    regdNo: "",
    department: "",
    phone: "",
    dob: "",
    gradYear: "",
    degree: "",
    currentJob: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const err = {};
    if (!form.fullName.trim()) err.fullName = "Full name is required";
    if (!form.regdNo.trim()) err.regdNo = "Registration number is required";
    if (!form.department.trim()) err.department = "Department/Branch is required";

    if (!form.phone.trim()) err.phone = "Phone number is required";
    else if (!/^\+?\d{7,15}$/.test(form.phone))
      err.phone = "Enter a valid phone (digits, optional +, 7-15 chars)";

    if (!form.dob) err.dob = "Date of birth is required";

    if (!form.gradYear) err.gradYear = "Graduation year is required";
    else if (Number(form.gradYear) < 1900 || Number(form.gradYear) > currentYear + 10)
      err.gradYear = "Enter a realistic graduation year";

    if (!form.degree) err.degree = "Degree is required";

    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      err.email = "Enter a valid email";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) err.confirmPassword = "Confirm password is required";
    else if (form.confirmPassword !== form.password)
      err.confirmPassword = "Passwords do not match";

    if (!form.agree) err.agree = "You must agree to the terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    console.log("Submitting Alumni form:", form);
    alert("Alumni registration successful (demo). Check console for payload.");

    // Reset form
    setForm({
      fullName: "",
      regdNo: "",
      department: "",
      phone: "",
      dob: "",
      gradYear: "",
      degree: "",
      currentJob: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });
    setErrors({});
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "800px",
        width: "100%"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          {/* Graduation hat icon */}
          <div style={{
            height: "60px",
            width: "60px",
            margin: "0 auto 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff3e0",
            borderRadius: "50%"
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ height: "30px", width: "30px", color: "#FF9800" }}
            >
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 7.75L4.21 7 12 4.25 19.79 7 12 9.75zm-7 6.56V13l7 3 7-3v3.31c0 2.63-4.67 4.69-7 4.69s-7-2.06-7-4.69z" />
            </svg>
          </div>

          <h2 style={{ color: "#333", margin: "0 0 5px 0", fontSize: "24px" }}>Alumni Registration</h2>
          <p style={{ color: "#666", margin: 0 }}>Create your alumni account to join the network</p>
        </div>

        <form onSubmit={handleSubmit} style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "20px" 
        }}>
          {/* Full Name */}
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                padding: "12px",
                border: errors.fullName ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.fullName && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.fullName}</span>}
          </div>

          {/* Registration Number */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Registration / Roll Number</label>
            <input
              name="regdNo"
              value={form.regdNo}
              onChange={handleChange}
              placeholder="Enter your registration number"
              style={{
                padding: "12px",
                border: errors.regdNo ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.regdNo && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.regdNo}</span>}
          </div>

          {/* Department */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Department / Branch</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Enter your department"
              style={{
                padding: "12px",
                border: errors.department ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.department && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.department}</span>}
          </div>

          {/* Phone Number */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +1234567890"
              inputMode="tel"
              style={{
                padding: "12px",
                border: errors.phone ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.phone && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.phone}</span>}
          </div>

          {/* Date of Birth */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Date of Birth</label>
            <input
              name="dob"
              value={form.dob}
              onChange={handleChange}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              style={{
                padding: "12px",
                border: errors.dob ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.dob && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.dob}</span>}
          </div>

          {/* Graduation Year */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Graduation Year</label>
            <input
              name="gradYear"
              value={form.gradYear}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 2023"
              min="1900"
              max={currentYear + 10}
              style={{
                padding: "12px",
                border: errors.gradYear ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.gradYear && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.gradYear}</span>}
          </div>

          {/* Degree */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Degree</label>
            <select
              name="degree"
              value={form.degree}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: errors.degree ? "1px solid #e53e3e" : "1px solid #ddd",
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
            {errors.degree && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.degree}</span>}
          </div>

          {/* Current Job */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Current Job (optional)</label>
            <input
              name="currentJob"
              value={form.currentJob}
              onChange={handleChange}
              placeholder="Enter your current job"
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
          </div>

          {/* Email */}
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
              style={{
                padding: "12px",
                border: errors.email ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.email && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              type="password"
              style={{
                padding: "12px",
                border: errors.password ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.password && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Confirm Password</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              type="password"
              style={{
                padding: "12px",
                border: errors.confirmPassword ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px"
              }}
            />
            {errors.confirmPassword && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{errors.confirmPassword}</span>}
          </div>

          {/* Agreement Checkbox */}
          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center" }}>
            <input 
              name="agree" 
              type="checkbox" 
              checked={form.agree} 
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <span style={{ color: "#555", fontSize: "14px" }}>Agree to Terms & Privacy Policy</span>
          </div>
          {errors.agree && <span style={{ gridColumn: "1 / -1", color: "#e53e3e", fontSize: "14px", marginTop: "-15px" }}>{errors.agree}</span>}

          {/* Submit Button */}
          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.3s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#f57c00"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#FF9800"}
            >
              Register as Alumni
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666", margin: "0 0 10px 0" }}>
            Already have an account?{" "}
            <span 
              onClick={() => onNavigate("login")}
              style={{ color: "#4CAF50", cursor: "pointer", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>
          <p style={{ margin: 0 }}>
            <span 
              onClick={() => onNavigate("role-selection")}
              style={{ color: "#666", cursor: "pointer", textDecoration: "underline" }}
            >
              ← Back to Role Selection
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupAlumni;