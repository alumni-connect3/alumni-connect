import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the import path if needed

function AlumniJob({ onNavigate }) {
  const [jobRole, setJobRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate mandatory fields
    if (!jobRole || !companyName || !salary || !location || !jobUrl || !jobDescription || !requiredSkills) {
      setError("All fields (Job Role, Company Name, Salary, Location, Job URL, Job Description, Required Skills) must be filled.");
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        jobRole,
        companyName,
        salary,
        location,
        jobUrl,
        jobDescription,
        requiredSkills,
        createdAt: new Date().toISOString(),
      });
      setSuccess("🎉 Job added successfully!");
      // Reset form
      setJobRole("");
      setCompanyName("");
      setSalary("");
      setLocation("");
      setJobUrl("");
      setJobDescription("");
      setRequiredSkills("");
    } catch (err) {
      console.error("Error adding job:", err.message, err.code);
      setError(`❌ Failed to add job: ${err.message}. Please try again or contact support.`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "16px",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: "#ffffff",
  };

  const labelStyle = {
    marginBottom: "15px",
    textAlign: "left",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600",
    display: "block",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        position: "relative",
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          .form-container {
            animation: slideInFromTop 0.8s ease-out;
          }
          
          .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }
          
          .shape {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
          }
          
          .shape:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 20%;
            left: 10%;
            animation-delay: -2s;
          }
          
          .shape:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 60%;
            right: 15%;
            animation-delay: -4s;
          }
          
          .shape:nth-child(3) {
            width: 40px;
            height: 40px;
            bottom: 20%;
            left: 20%;
            animation-delay: -1s;
          }
          
          .input-field:focus {
            border-color: #4f46e5 !important;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
            transform: translateY(-1px) !important;
          }
          
          .success-message {
            animation: pulse 2s ease-in-out;
          }
        `}
      </style>

      <div
        className="form-container"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2 
          style={{ 
            color: "#ffffff", 
            marginBottom: "30px", 
            fontSize: "2.5rem", 
            fontWeight: "700",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "1px",
          }}
        >
          Add Alumni Job
        </h2>
        
        {error && (
          <div style={{ 
            color: "#ef4444", 
            marginBottom: "20px", 
            padding: "15px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "500",
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div 
            className="success-message"
            style={{ 
              color: "#2563eb", 
              marginBottom: "20px", 
              padding: "15px",
              backgroundColor: "rgba(37, 99, 235, 0.1)",
              border: "1px solid rgba(37, 99, 235, 0.3)",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {success}
          </div>
        )}
        
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <label style={labelStyle}>
            💼 Job Role *
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Enter job role"
              required
            />
          </label>

          <label style={labelStyle}>
            🏢 Company Name *
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Enter company name"
              required
            />
          </label>

          <label style={labelStyle}>
            💰 Salary (in ₹) *
            <p style={{ 
              fontSize: "12px", 
              color: "#6b7280", 
              margin: "4px 0", 
              fontStyle: "italic" 
            }}>
              Enter amount in Rupees (e.g., ₹50,000 per annum)
            </p>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="₹60,0000 per annum"
              required
            />
          </label>

          <label style={labelStyle}>
            📍 Location *
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Enter location"
              required
            />
          </label>

          <label style={labelStyle}>
            🔗 Job URL *
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="https://example.com/job-details"
              required
            />
          </label>

          <label style={labelStyle}>
            📝 Job Description *
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="input-field"
              style={{ ...inputStyle, minHeight: "100px" }}
              placeholder="Enter job description"
              required
            />
          </label>

          <label style={labelStyle}>
            🎯 Required Skills *
            <textarea
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="input-field"
              style={{ ...inputStyle, minHeight: "100px" }}
              placeholder="Enter required skills (e.g., Java, Python)"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "16px 32px",
              backgroundColor: isLoading ? "#9ca3af" : "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: isLoading ? "not-allowed" : "pointer",
              marginTop: "30px",
              fontWeight: "600",
              fontSize: "16px",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = "#4338ca";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(79, 70, 229, 0.5)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = "#4f46e5";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(79, 70, 229, 0.4)";
              }
            }}
          >
            {isLoading ? "🔄 Adding Job..." : "🎉 Add Job"}
          </button>
        </form>

        <button
          onClick={() => onNavigate("alumni-dashboard")} // Updated to navigate to alumni-dashboard
          style={{
            padding: "14px 28px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            cursor: "pointer",
            marginTop: "25px",
            fontWeight: "500",
            fontSize: "14px",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 15px rgba(255, 255, 255, 0.2)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          ← Back to Alumni Dashboard
        </button>
      </div>

      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
    </div>
  );
}

export default AlumniJob;