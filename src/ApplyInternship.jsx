import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Adjust the import path if needed
import { collection, getDocs } from "firebase/firestore";

function ApplyInternship({ onNavigate }) {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "internships"));
        const internshipsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInternships(internshipsData);
      } catch (err) {
        console.error("Error fetching internships:", err.message);
        setError("Failed to load internships. Please try again.");
      }
    };
    fetchInternships();
  }, []);

  const handleView = (internship) => {
    setSelectedInternship(internship);
  };

  const handleRegister = (internshipUrl, internshipRole) => {
    window.open(internshipUrl, "_blank"); // Opens the internshipUrl in a new tab
    alert(`Registering for: ${internshipRole}`); // Optional feedback
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>Apply for Internships</h1>
      {error ? (
        <p style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</p>
      ) : (
        <>
          {internships.length === 0 ? (
            <p style={{ color: "#7f8c8d" }}>Loading internships...</p>
          ) : (
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {internships.map((internship) => (
                <div
                  key={internship.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "left",
                  }}
                >
                  <h3 style={{ color: "#2c3e50", marginBottom: "5px" }}>{internship.internshipRole}</h3>
                  <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>remote: {internship.onlineOffline || "N/A"}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleView(internship)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRegister(internship.internshipUrl || "https://www.google.com", internship.internshipRole)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedInternship && (
            <div
              style={{
                maxWidth: "600px",
                margin: "20px auto",
                backgroundColor: "#ffffff",
                padding: "15px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Internship Details</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Role:</strong> {selectedInternship.internshipRole}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Created At:</strong> {selectedInternship.createdAt || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Duration:</strong> {selectedInternship.duration || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Description:</strong> {selectedInternship.internshipDescription || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Online/Offline:</strong> {selectedInternship.onlineOffline || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Required Skills:</strong> {selectedInternship.requiredSkills || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "10px" }}><strong>Stipend:</strong> {selectedInternship.stifund || "N/A"}</p>
              <button
                onClick={() => setSelectedInternship(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
      <button
        onClick={() => onNavigate("student-dashboard")}
        style={{
          padding: "12px 24px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
          marginTop: "20px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default ApplyInternship;