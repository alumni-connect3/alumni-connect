import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the import path if needed

function ViewAlumni({ onNavigate }) {
  const [alumniList, setAlumniList] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All"); // State for filter

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const alumniSnapshot = await getDocs(collection(db, "alumni"));
        const alumniData = alumniSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlumniList(alumniData);
      } catch (err) {
        console.error("Fetch Error:", err.message, err.code);
        setError(`Failed to fetch alumni: ${err.message}. Please try again or contact support.`);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // Filter alumni based on selected department
  const filteredAlumni = filterDepartment === "All"
    ? alumniList
    : alumniList.filter(alumni => alumni.department === filterDepartment);

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "20px", textAlign: "center", color: "#e53e3e" }}>{error}</div>;

  // Extract unique departments for the filter dropdown
  const uniqueDepartments = ["All", ...new Set(alumniList.map(alumni => alumni.department).filter(Boolean))];

  const handleCloseProfile = () => {
    setSelectedAlumni(null); // Close the profile details
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        padding: 0,
        background: "linear-gradient(135deg, #eaf3ff 0%, #f7faff 50%, #e9fff6 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "20px",
          width: "200px",
          position: "relative",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "0 10px 10px 0",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Filter dropdown moved to the left side */}
        <select
          className="filter-select"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept || "Unknown"}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
          backgroundColor: "transparent",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ color: "#1a365d", marginBottom: "25px", fontSize: "2rem", fontWeight: "600" }}>
          View Alumni
        </h2>
        <style>
          {`
            .alumni-box {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 200px;
              height: 200px;
              background-color: rgba(255, 255, 255, 0.9);
              border: 2px solid #e2e8f0;
              border-radius: 15px;
              margin: 10px;
              padding: 15px;
              text-align: left;
              vertical-align: top;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              transition: all 0.3s ease;
              overflow: hidden;
              position: relative;
              backdrop-filter: blur(5px);
            }
            .alumni-box:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 15px rgba(37, 99, 235, 0.1);
              border-color: rgba(37, 99, 235, 0.5);
              cursor: pointer;
            }
            .alumni-content {
              flex-grow: 1;
              overflow-y: auto;
              padding-bottom: 40px;
            }
            .alumni-content p {
              margin: 8px 0;
              color: #4a5568;
              font-size: 0.95rem;
            }
            .alumni-content p strong {
              color: #2d3748;
              font-weight: 600;
            }
            .profile-details {
              margin-top: 20px;
              padding: 25px;
              background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
              border: 2px solid rgba(226, 232, 240, 0.6);
              border-radius: 15px;
              text-align: left;
              max-width: 400px;
              margin: 20px auto;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              transition: all 0.3s ease;
              backdrop-filter: blur(5px);
            }
            .profile-details:hover {
              box-shadow: 0 8px 15px rgba(37, 99, 235, 0.1);
              background: linear-gradient(145deg, #ffffff 0%, #edf2ff 100%);
            }
            .profile-details h3 {
              color: #2d3748;
              margin-bottom: 15px;
              font-size: 1.25rem;
              font-weight: 600;
            }
            .profile-details p {
              margin: 12px 0;
              color: #4a5568;
              font-size: 0.95rem;
              line-height: 1.5;
            }
            .profile-details p strong {
              color: #2d3748;
              font-weight: 600;
            }
            .view-btn {
              padding: 10px 16px;
              background: linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s ease;
              width: calc(100% - 20px);
              position: absolute;
              bottom: 10px;
              left: 10px;
              box-sizing: border-box;
              font-weight: 500;
              text-transform: uppercase;
              font-size: 0.85rem;
              letter-spacing: 0.5px;
              box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
            }
            .view-btn:hover {
              background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
            }
            .filter-select {
              padding: 10px;
              border: 2px solid #e2e8f0;
              border-radius: 8px;
              font-size: 0.95rem;
              cursor: pointer;
              width: 100%;
              color: #4a5568;
              background-color: #ffffff;
              transition: all 0.3s ease;
            }
            .filter-select:hover {
              border-color: #2563EB;
            }
            .filter-select:focus {
              outline: none;
              border-color: #2563EB;
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
            }
            .close-btn {
              padding: 10px 20px;
              background-color: #6B7280;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s ease;
              width: auto;
              margin-top: 15px;
              font-weight: 500;
              text-transform: uppercase;
              font-size: 0.85rem;
              letter-spacing: 0.5px;
            }
            .close-btn:hover {
              background-color: #4B5563;
              transform: translateY(-2px);
              box-shadow: 0 2px 4px rgba(75, 85, 99, 0.3);
            }

          `}
        </style>
        {filteredAlumni.length === 0 ? (
          <p>No alumni found for the selected department.</p>
        ) : (
          <div>
            <h3 style={{ color: "#333", marginBottom: "20px" }}>Alumni List</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {filteredAlumni.map((alumni) => (
                <div key={alumni.id} className="alumni-box">
                  <div className="alumni-content">
                    <p><strong>Name:</strong> {alumni.fullName || "N/A"}</p>
                    <p><strong>Department:</strong> {alumni.department || "N/A"}</p>
                    <p><strong>Reg No:</strong> {alumni.regdNo || "N/A"}</p>
                  </div>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedAlumni(alumni)}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
            {selectedAlumni && (
              <div className="profile-details">
                <h3>Alumni Details</h3>
                <p><strong>Name:</strong> {selectedAlumni.fullName || "N/A"}</p>
                <p><strong>Department:</strong> {selectedAlumni.department || "N/A"}</p>
                <p><strong>Reg No:</strong> {selectedAlumni.regdNo || "N/A"}</p>
                <p><strong>Email:</strong> {selectedAlumni.email || "N/A"}</p>
                <p><strong>Phone:</strong> {selectedAlumni.phone || "N/A"}</p>
                <p><strong>Grad Year:</strong> {selectedAlumni.gradYear || "N/A"}</p>
                <p><strong>DOB:</strong> {selectedAlumni.dob || "N/A"}</p>
                <p><strong>Degree:</strong> {selectedAlumni.degree || "N/A"}</p>
                <p><strong>Current Job:</strong> {selectedAlumni.currentJob || "N/A"}</p>
                <button
                  className="close-btn"
                  onClick={handleCloseProfile}
                  style={{ marginTop: "10px", width: "auto" }}
                >
                  Close
                </button>

              </div>
            )}
          </div>
        )}
        <button
          onClick={() => onNavigate("admin-dashboard")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "30px",
            fontWeight: "500",
            textTransform: "uppercase",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#1d4ed8";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 6px rgba(37, 99, 235, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#2563EB";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 4px rgba(37, 99, 235, 0.2)";
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ViewAlumni;