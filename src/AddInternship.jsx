import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the import path if needed

function AddInternship({ onNavigate }) {
  const [internshipDescription, setInternshipDescription] = useState("");
  const [internshipRole, setInternshipRole] = useState("");
  const [internshipUrl, setInternshipUrl] = useState("");
  const [onlineOffline, setOnlineOffline] = useState("online"); // Default to "online"
  const [requiredSkills, setRequiredSkills] = useState("");
  const [duration, setDuration] = useState(""); // New field: Duration
  const [stipend, setStipend] = useState(""); // Stipend field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate mandatory fields
    if (!internshipDescription || !internshipRole || !internshipUrl || !requiredSkills || !duration || !stipend) {
      setError("All fields (Internship Description, Internship Role, Internship URL, Required Skills, Duration, Stipend) must be filled.");
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "internships"), {
        internshipDescription,
        internshipRole,
        internshipUrl,
        onlineOffline,
        requiredSkills,
        stifund: stipend,
        duration,
        createdAt: new Date().toISOString(),
      });
      setSuccess("🎉 Internship added successfully!");
      // Reset form
      setInternshipDescription("");
      setInternshipRole("");
      setInternshipUrl("");
      setOnlineOffline("online");
      setRequiredSkills("");
      setDuration("");
      setStipend("");
    } catch (err) {
      console.error("Error adding internship:", err.message, err.code);
      setError(`❌ Failed to add internship: ${err.message}. Please try again or contact support.`);
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
          Add Internship
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
              color: "#10b981", 
              marginBottom: "20px", 
              padding: "15px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
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
            📝 Internship Description *
            <textarea
              value={internshipDescription}
              onChange={(e) => setInternshipDescription(e.target.value)}
              className="input-field"
              style={{ ...inputStyle, minHeight: "100px" }}
              placeholder="Enter internship description"
              required
            />
          </label>

          <label style={labelStyle}>
            💼 Internship Role *
            <input
              type="text"
              value={internshipRole}
              onChange={(e) => setInternshipRole(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Enter internship role"
              required
            />
          </label>

          <label style={labelStyle}>
            🔗 Internship URL *
            <input
              type="url"
              value={internshipUrl}
              onChange={(e) => setInternshipUrl(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="https://example.com/internship-details"
              required
            />
          </label>

          <label style={labelStyle}>
            🌐 Online/Offline *
            <select
              value={onlineOffline}
              onChange={(e) => setOnlineOffline(e.target.value)}
              className="input-field"
              style={inputStyle}
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </label>

          <label style={labelStyle}>
            💰 Stipend (in ₹) *
            <p style={{ 
              fontSize: "12px", 
              color: "#6b7280", 
              margin: "4px 0", 
              fontStyle: "italic" 
            }}>
              Enter amount in Rupees (e.g., ₹10,000 per month)
            </p>
            <input
              type="text"
              value={stipend}
              onChange={(e) => setStipend(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="₹10,000 per month"
              required
            />
          </label>

          <label style={labelStyle}>
            ⏳ Duration *
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Enter duration (e.g., 3 months)"
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
              placeholder="Enter required skills (e.g., HTML, CSS)"
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
            {isLoading ? "🔄 Adding Internship..." : "🎉 Add Internship"}
          </button>
        </form>

        <button
          onClick={() => onNavigate("admin-dashboard")}
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
          ← Back to Dashboard
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

export default AddInternship;