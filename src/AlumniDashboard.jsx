import React, { useState, useEffect } from "react";

function AlumniDashboard({ onNavigate }) {
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - in a real app, this would come from an API based on the logged-in user's email
  const mockProfileData = React.useMemo(() => ({
    name: "John Doe",
    email: "john.doe@example.com",
    graduationYear: 2018,
    degree: "Bachelor of Science in Computer Science",
    currentCompany: "Tech Innovations Inc.",
    position: "Senior Software Engineer",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/johndoe",
  }), []);

  // Simulate fetching profile data based on email
  useEffect(() => {
    if (showProfile && !profileData) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setProfileData(mockProfileData);
        setLoading(false);
      }, 800);
    }
  }, [showProfile, profileData, mockProfileData]);

  const handleViewProfile = () => {
    setShowProfile(!showProfile);
    // If we're closing the profile, clear the data
    if (showProfile) {
      setProfileData(null);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "30px" }}>Alumni Dashboard</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "40px" }}>Welcome, Alumni! Connect with your network here.</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
        <button
          onClick={() => onNavigate("alumni-event")}
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
          onClick={() => onNavigate("alumni-job")}
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
          onClick={() => onNavigate("alumni-internship")}
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
          onClick={handleViewProfile}
          style={{
            padding: "12px 24px",
            backgroundColor: showProfile ? "#1976D2" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
          onMouseOut={(e) => (e.target.style.backgroundColor = showProfile ? "#1976D2" : "#2196F3")}
        >
          {showProfile ? "Hide Profile" : "View Profile"}
        </button>
      </div>

      {/* Profile Section */}
      {showProfile && (
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          margin: "0 auto 40px",
          maxWidth: "600px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "left"
        }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "20px", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
            Your Profile
          </h2>
          
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>Loading profile data...</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Full Name</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.name}</p>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Email</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.email}</p>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Graduation Year</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.graduationYear}</p>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Degree</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.degree}</p>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Current Company</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.currentCompany}</p>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Position</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.position}</p>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "15px" }}>
                  {profileData?.skills.map((skill, index) => (
                    <span key={index} style={{
                      backgroundColor: "#e0e0e0",
                      padding: "5px 10px",
                      borderRadius: "15px",
                      fontSize: "14px"
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>Location</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>{profileData?.location}</p>
              </div>
              <div>
                <h3 style={{ color: "#7f8c8d", margin: "0 0 5px 0", fontSize: "14px" }}>LinkedIn</h3>
                <p style={{ margin: "0 0 15px 0", fontWeight: "500" }}>
                  <a href={`https://${profileData?.linkedIn}`} target="_blank" rel="noopener noreferrer" style={{ color: "#2196F3" }}>
                    {profileData?.linkedIn}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

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