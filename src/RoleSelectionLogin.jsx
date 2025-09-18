function RoleSelectionLogin({ onNavigate }) {
  const handleRoleSelect = (role) => {
    onNavigate("login", { role });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        boxSizing: "border-box",
        margin: "0",
        position: "fixed",
        top: "0",
        left: "0",
        overflow: "auto"
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "32px 24px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          maxWidth: "500px",
          width: "100%",
          marginTop: "40px",
          marginBottom: "20px"
        }}
      >
        <h1 style={{ 
          color: "#2c3e50", 
          marginBottom: "8px", 
          fontSize: "28px",
          fontWeight: "600",
          letterSpacing: "-0.5px"
        }}>
          Select Your Role
        </h1>
        
        <p style={{
          color: "#6c757d",
          fontSize: "15px",
          lineHeight: "1.4",
          marginBottom: "28px",
          fontWeight: "400"
        }}>
          Please select whether you are a student or an alumni to continue with registration.
        </p>

        <div style={{ 
          display: "flex", 
          gap: "20px", 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {/* Admin Card */}
          <div
            onClick={() => handleRoleSelect("admin")}
            style={{
              flex: "1",
              minWidth: "150px",
              maxWidth: "160px",
              padding: "24px 18px",
              backgroundColor: "#f8f9fa",
              border: "2px solid #e9ecef",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "center"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#FF9800";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 152, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.borderColor = "#e9ecef";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ 
              fontSize: "36px", 
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center"
            }}>
              👨‍💼
            </div>
            <h3 style={{ 
              color: "#2c3e50", 
              fontSize: "16px", 
              fontWeight: "600",
              marginBottom: "6px",
              margin: "0 0 6px 0"
            }}>
              Admin
            </h3>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "12px",
              lineHeight: "1.3",
              margin: "0",
              fontWeight: "400"
            }}>
              System administrator with full access
            </p>
          </div>

          {/* Student Card */}
          <div
            onClick={() => handleRoleSelect("student")}
            style={{
              flex: "1",
              minWidth: "150px",
              maxWidth: "160px",
              padding: "28px 20px",
              backgroundColor: "#f8f9fa",
              border: "2px solid #e9ecef",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "center"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#4CAF50";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.borderColor = "#e9ecef";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ 
              fontSize: "36px", 
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center"
            }}>
              🎓
            </div>
            <h3 style={{ 
              color: "#2c3e50", 
              fontSize: "16px", 
              fontWeight: "600",
              marginBottom: "6px",
              margin: "0 0 6px 0"
            }}>
              Student
            </h3>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "12px",
              lineHeight: "1.3",
              margin: "0",
              fontWeight: "400"
            }}>
              Currently enrolled in an educational institution
            </p>
          </div>

          {/* Alumni Card */}
          <div
            onClick={() => handleRoleSelect("alumni")}
            style={{
              flex: "1",
              minWidth: "150px",
              maxWidth: "160px",
              padding: "28px 20px",
              backgroundColor: "#f8f9fa",
              border: "2px solid #e9ecef",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textAlign: "center"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#2196F3";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(33, 150, 243, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f8f9fa";
              e.currentTarget.style.borderColor = "#e9ecef";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ 
              fontSize: "36px", 
              marginBottom: "12px",
              display: "flex",
              justifyContent: "center"
            }}>
              👨‍🎓
            </div>
            <h3 style={{ 
              color: "#2c3e50", 
              fontSize: "16px", 
              fontWeight: "600",
              marginBottom: "6px",
              margin: "0 0 6px 0"
            }}>
              Alumni
            </h3>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "12px",
              lineHeight: "1.3",
              margin: "0",
              fontWeight: "400"
            }}>
              Graduate of an educational institution
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div style={{ marginTop: "24px" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{ 
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#495057";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#6c757d";
              e.target.style.transform = "translateY(0)";
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectionLogin;