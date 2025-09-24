import React from "react";

function StudentDashboard({ onNavigate }) {
  const buttonStyle = {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)",
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
    boxShadow: "0 8px 25px rgba(0, 180, 219, 0.3)",
    transform: "translateY(0px)",
  };

  const logoutButtonStyle = {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)",
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
    boxShadow: "0 8px 25px rgba(86, 171, 47, 0.3)",
    transform: "translateY(0px)",
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
      margin: 0,
      padding: 0,
      overflow: "auto"
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "15%",
        left: "8%",
        width: "180px",
        height: "180px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite",
        zIndex: 1,
      }}></div>
      
      <div style={{
        position: "absolute",
        top: "50%",
        right: "5%",
        width: "120px",
        height: "120px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
        borderRadius: "50%",
        animation: "float 4s ease-in-out infinite reverse",
        zIndex: 1,
      }}></div>

      <div style={{
        position: "absolute",
        bottom: "25%",
        left: "60%",
        width: "90px",
        height: "90px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        borderRadius: "50%",
        animation: "float 5s ease-in-out infinite",
        zIndex: 1,
      }}></div>

      <div style={{
        position: "absolute",
        top: "70%",
        left: "20%",
        width: "110px",
        height: "110px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        borderRadius: "50%",
        animation: "float 7s ease-in-out infinite reverse",
        zIndex: 1,
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(180deg); }
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
              rgba(255, 255, 255, 0.4),
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
            box-shadow: 0 15px 35px rgba(0, 180, 219, 0.5) !important;
          }
          
          .nav-button:active {
            transform: translateY(-2px) scale(0.98) !important;
          }
          
          .logout-button:hover {
            transform: translateY(-5px) scale(1.05) !important;
            box-shadow: 0 15px 35px rgba(86, 171, 47, 0.5) !important;
          }
          
          .logout-button:active {
            transform: translateY(-2px) scale(0.98) !important;
          }
          
          .logout-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            transition: left 0.5s;
            borderRadius: 25px;
          }
          
          .logout-button:hover::before {
            left: 100%;
          }
          
          .title-text {
            background: black;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: pulse 2s ease-in-out infinite;
          }
          
          .subtitle-text {
            color: black;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
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
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 className="title-text" style={{ 
          fontSize: "3.5rem", 
          fontWeight: "800", 
          marginBottom: "20px",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          letterSpacing: "2px"
        }}>
          Student Dashboard
        </h1>
        
        <p className="subtitle-text" style={{ 
          marginBottom: "50px", 
          fontSize: "1.2rem",
          fontWeight: "300"
        }}>
          Welcome, Student! Access your resources here.
        </p>
        
        {/* Navigation Buttons Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px", 
          marginBottom: "50px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto 50px auto",
          padding: "0 20px",
          boxSizing: "border-box"
        }}>
          <button
            className="nav-button"
            onClick={() => onNavigate("live-chat")}
            style={buttonStyle}
          >
            💬 Live Chat
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("apply-job")}
            style={buttonStyle}
          >
            💼 Apply Job
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("apply-internship")}
            style={buttonStyle}
          >
            🎓 Apply Internship
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("register-event")}
            style={buttonStyle}
          >
            📅 Register Event
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("profile")}
            style={buttonStyle}
          >
            👤 Profile
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("view-stories")}
            style={buttonStyle}
          >
            📚 View Stories
          </button>
          
          <button
            className="nav-button"
            onClick={() => onNavigate("mentorship")}
            style={buttonStyle}
          >
            🧑‍🏫 Mentorship
          </button>
          
          <button
            className="nav-button logout-button"
            onClick={() => onNavigate("home")}
            style={logoutButtonStyle}
          >
            🚪 Logout
          </button>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "60px",
          height: "60px",
          background: "linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
          borderRadius: "50%",
          animation: "float 3s ease-in-out infinite",
          zIndex: 1,
        }}></div>

        <div style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          width: "40px",
          height: "40px",
          background: "linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
          borderRadius: "50%",
          animation: "float 4s ease-in-out infinite reverse",
          zIndex: 1,
        }}></div>

        {/* Additional floating elements for richness */}
        <div style={{
          position: "absolute",
          top: "5%",
          right: "25%",
          width: "25px",
          height: "25px",
          background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          zIndex: 1,
        }}></div>

        <div style={{
          position: "absolute",
          bottom: "30%",
          right: "5%",
          width: "35px",
          height: "35px",
          background: "linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          borderRadius: "50%",
          animation: "float 5s ease-in-out infinite reverse",
          zIndex: 1,
        }}></div>
      </div>
    </div>
  );
}

export default StudentDashboard;