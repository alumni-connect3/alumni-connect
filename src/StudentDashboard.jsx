
function StudentDashboard({ onNavigate }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Student Dashboard</h1>
      <p>Welcome, Student! Access your resources here.</p>
      <button
        onClick={() => onNavigate("home")}
        style={{
          padding: "12px",
          backgroundColor: "#4CAF50",
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

export default StudentDashboard;