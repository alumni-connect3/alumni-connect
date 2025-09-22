import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Adjust the import path if needed
import { collection, getDocs } from "firebase/firestore";

function ApplyJob({ onNavigate }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);
      } catch (err) {
        console.error("Error fetching jobs:", err.message);
        setError("Failed to load jobs. Please try again.");
      }
    };
    fetchJobs();
  }, []);

  const handleView = (job) => {
    setSelectedJob(job);
  };

  const handleRegister = (applyjob, jobRole) => {
    window.open(applyjob, "_blank"); // Opens the applyjob in a new tab
    alert(`Registering for: ${jobRole}`); // Optional feedback
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>Apply for Jobs</h1>
      {error ? (
        <p style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</p>
      ) : (
        <>
          {jobs.length === 0 ? (
            <p style={{ color: "#7f8c8d" }}>Loading jobs...</p>
          ) : (
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "left",
                  }}
                >
                  <h3 style={{ color: "#2c3e50", marginBottom: "5px" }}>{job.jobRole}</h3>
                  <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Location: {job.location || "N/A"}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleView(job)}
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
                      onClick={() => handleRegister(job.jobUrl || "https://www.google.com", job.jobRole)}
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
          {selectedJob && (
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
              <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Job Details</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Role:</strong> {selectedJob.jobRole}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Company:</strong> {selectedJob.companyName || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Location:</strong> {selectedJob.location || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "10px" }}><strong>Description:</strong> {selectedJob.description || "No description available"}</p>
              <button
                onClick={() => setSelectedJob(null)}
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

export default ApplyJob;