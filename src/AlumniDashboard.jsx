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

  const buttonStyle = {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    transform: "translateY(0px)",
  };

  const profileButtonStyle = {
    ...buttonStyle,
    background: showProfile 
      ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" 
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: showProfile 
      ? "0 8px 25px rgba(17, 153, 142, 0.4)" 
      : "0 8px 25px rgba(102, 126, 234, 0.3)",
  };

  const logoutButtonStyle = {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    position: "fixed",
    bottom: "30px",
    left: "30px",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
    transform: "translateY(0px)",
    zIndex: 1000,
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      width: "100vw",
      height: "100vh",
      background: "#E8ECEC",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "auto",
      margin: 0,
      padding: 0
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "200px",
        height: "200px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite",
        zIndex: 1,
      }}></div>
      
      <div style={{
        position: "absolute",
        top: "60%",
        right: "10%",
        width: "150px",
        height: "150px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        borderRadius: "50%",
        animation: "float 4s ease-in-out infinite reverse",
        zIndex: 1,
      }}></div>

      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "50%",
        width: "100px",
        height: "100px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        borderRadius: "50%",
        animation: "float 5s ease-in-out infinite",
        zIndex: 1,
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .nav-button {
            position: relative;
          }
          
          .nav-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transition: left 0.5s;
            border-radius: 25px;
          }
          
          .nav-button:hover::before {
            left: 100%;
          }
          
          .nav-button:hover {
            transform: translateY(-5px) scale(1.05) !important;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.5) !important;
          }
          
          .nav-button:active {
            transform: translateY(-2px) scale(0.98) !important;
          }
          
          .profile-card {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
            animation: slideInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .skill-tag {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .skill-tag:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
          }
          
          .logout-button:hover {
            transform: translateY(-3px) scale(1.1) !important;
            box-shadow: 0 12px 30px rgba(255, 107, 107, 0.6) !important;
          }
          
          .title-text {
            background: black;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: pulse 2s ease-in-out infinite;
          }
        `}
      </style>

      <div style={{ 
        padding: "40px 20px", 
        textAlign: "center", 
        position: "relative", 
        zIndex: 10,
        minHeight: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column"
      }}>
        <h1 className="title-text" style={{ 
          fontSize: "3.5rem", 
          fontWeight: "800", 
          marginBottom: "20px",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          letterSpacing: "2px"
        }}>
          Alumni Dashboard
        </h1>
        
        <p style={{ 
          color: "black", 
          marginBottom: "50px", 
          fontSize: "1.2rem",
          fontWeight: "300",
          textShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>
          Welcome, Alumni! Connect with your network here.
        </p>
        
        {/* Navigation Buttons Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "25px", 
          marginBottom: "50px",
          maxWidth: "1200px",
          margin: "0 auto 50px auto",
          padding: "0 20px"
        }}>
          <button
            className="nav-button"
            onClick={() => onNavigate("alumni-event")}
            style={buttonStyle}
          >
            🎉 Events
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("alumni-job")}
            style={buttonStyle}
          >
            💼 Jobs
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("alumni-internship")}
            style={buttonStyle}
          >
            🎓 Internships
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("stories")}
            style={buttonStyle}
          >
            📚 Stories
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("live-chat")}
            style={buttonStyle}
          >
            💬 Live Chat
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("mentorship")}
            style={buttonStyle}
          >
            🧑‍🏫 Mentorship
          </button>
          
          <button
            className="nav-button"
            onClick={handleViewProfile}
            style={profileButtonStyle}
          >
            {showProfile ? "👤 Hide Profile" : "👤 View Profile"}
          </button>
        </div>

        {/* Profile Section */}
        {showProfile && (
          <div className="profile-card" style={{
            borderRadius: "20px",
            padding: "40px",
            margin: "0 auto 40px",
            maxWidth: "700px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            textAlign: "left",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            <h2 style={{ 
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "30px", 
              borderBottom: "3px solid #667eea", 
              paddingBottom: "15px",
              fontSize: "2rem",
              fontWeight: "700"
            }}>
              Your Profile
            </h2>
            
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px"
                }}></div>
                <p style={{ 
                  color: "#667eea", 
                  fontSize: "1.1rem",
                  fontWeight: "500" 
                }}>
                  Loading profile data...
                </p>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "25px" 
              }}>
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Full Name
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    {profileData?.name}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Email
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    {profileData?.email}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Graduation Year
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    {profileData?.graduationYear}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Degree
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    {profileData?.degree}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Current Company
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    {profileData?.currentCompany}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Position
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    {profileData?.position}
                  </p>
                </div>
                
                <div style={{ gridColumn: "span 2" }}>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 15px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Skills
                  </h3>
                  <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "12px", 
                    marginBottom: "20px" 
                  }}>
                    {profileData?.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="skill-tag"
                        style={{
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "500",
                          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.2)"
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    Location
                  </h3>
                  <p style={{ 
                    margin: "0 0 20px 0", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    color: "#2c3e50"
                  }}>
                    📍 {profileData?.location}
                  </p>
                </div>
                
                <div>
                  <h3 style={{ 
                    color: "#667eea", 
                    margin: "0 0 8px 0", 
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    LinkedIn
                  </h3>
                  <p style={{ margin: "0 0 20px 0", fontWeight: "600" }}>
                    <a 
                      href={`https://${profileData?.linkedIn}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        color: "#667eea",
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = "#764ba2";
                        e.target.style.textDecoration = "underline";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = "#667eea";
                        e.target.style.textDecoration = "none";
                      }}
                    >
                      🔗 {profileData?.linkedIn}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Logout Button */}
        <button
          className="logout-button"
          onClick={() => onNavigate("home")}
          style={logoutButtonStyle}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AlumniDashboard;