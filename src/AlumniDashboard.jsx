
function AlumniDashboard({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Alumni Dashboard</h1>
      <p>Welcome, Alumni! Connect with your network here.</p>
      <button
        onClick={() => onNavigate("home")}
        style={{
          padding: "12px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AlumniDashboard;