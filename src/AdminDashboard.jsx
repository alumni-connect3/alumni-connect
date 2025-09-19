import { collection, deleteDoc, doc, getDocs, query, runTransaction, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";

function AdminDashboard({ onNavigate }) {
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total alumni from 'alumni' collection
        const alumniSnapshot = await getDocs(collection(db, "alumni"));
        setTotalAlumni(alumniSnapshot.size);

        // Fetch total students from 'students' collection
        const studentsSnapshot = await getDocs(collection(db, "students"));
        setTotalStudents(studentsSnapshot.size);

        // Fetch pending approvals from 'alumni_pending' collection
        const pendingSnapshot = await getDocs(query(collection(db, "alumni_pending"), where("status", "==", "pending")));
        setPendingApprovals(pendingSnapshot.size);
        const alumniList = pendingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingAlumni(alumniList);
      } catch (err) {
        console.error("Fetch Error:", err.message, err.code);
        setError(`Failed to fetch data: ${err.message}. Please try again or contact support.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (alumniId, alumniData) => {
    try {
      const pendingRef = doc(db, "alumni_pending", alumniId);
      const newAlumniRef = doc(collection(db, "alumni"));

      await runTransaction(db, async (transaction) => {
        const pendingDoc = await transaction.get(pendingRef);
        if (!pendingDoc.exists()) {
          throw new Error("Pending document does not exist.");
        }
        transaction.update(pendingRef, {
          status: "approved",
          approvedAt: new Date().toISOString(),
          approvedBy: auth.currentUser?.email || "unknown_admin",
        });

        transaction.set(newAlumniRef, {
          ...alumniData,
          status: "approved",
          approvedAt: new Date().toISOString(),
          approvedBy: auth.currentUser?.email || "unknown_admin",
        });

        transaction.delete(pendingRef);
      });

      setPendingAlumni(pendingAlumni.filter((alumni) => alumni.id !== alumniId));
      setPendingApprovals(pendingApprovals - 1); // Update pending count
      alert("✅ Alumni approved successfully!");
    } catch (err) {
      setError(`Failed to approve alumni: ${err.message}. Please try again or contact support.`);
      console.error("Approval Error:", err.message, err.code, err.stack);
    }
  };

  const handleReject = async (alumniId) => {
    try {
      const alumniRef = doc(db, "alumni_pending", alumniId);
      await deleteDoc(alumniRef);
      setPendingAlumni(pendingAlumni.filter((alumni) => alumni.id !== alumniId));
      setPendingApprovals(pendingApprovals - 1); // Update pending count
      alert("❌ Alumni rejected and deleted successfully!");
    } catch (err) {
      setError("Failed to reject alumni. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "20px", textAlign: "center", color: "#e53e3e" }}>{error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        padding: 0,
      }}
    >
      {/* Main content */}
      <div
        style={{
          padding: "40px",
          backgroundColor: "#E5E7EB",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          width: "100%",
          minHeight: "100vh",
          boxSizing: "border-box",
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Sidebar inside welcome box */}
        <div
          style={{
            width: "200px",
            backgroundColor: "#1F2937",
            color: "#F9FAFB",
            padding: "20px",
            borderRight: "1px solid #374151",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "12px",
            height: "100%",
          }}
        >
          <button
            onClick={() => onNavigate("view-students")}
            style={{
              padding: "10px",
              backgroundColor: "#2563EB",
              color: "#F9FAFB",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              textAlign: "left",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
          >
            View Students
          </button>
          <button
            onClick={() => onNavigate("view-alumni")}
            style={{
              padding: "10px",
              backgroundColor: "#2563EB",
              color: "#F9FAFB",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              textAlign: "left",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
          >
            View Alumni
          </button>
          <button
            onClick={() => onNavigate("add-event")}
            style={{
              padding: "10px",
              backgroundColor: "#2563EB",
              color: "#F9FAFB",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              textAlign: "left",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
          >
            Add Event
          </button>
          <button
            onClick={() => onNavigate("announcement")}
            style={{
              padding: "10px",
              backgroundColor: "#2563EB",
              color: "#F9FAFB",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              textAlign: "left",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
          >
            Announcement
          </button>
        </div>

        {/* Main content area */}
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => onNavigate("home")}
              style={{
                padding: "12px",
                backgroundColor: "#2563EB",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                width: "auto",
              }}
            >
              Logout
            </button>
          </div>
          <h2 style={{ color: "#111827", marginBottom: "20px", textAlign: "center" }}>
            Welcome back, Admin! 👋
          </h2>
          <p style={{ color: "#111827", marginBottom: "30px", textAlign: "center" }}>
            Here's what's happening with your alumni community today.
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "180px",
              }}
            >
              <div style={{ fontSize: "1.5rem", color: "#4CAF50" }}>📈</div>
              <h3 style={{ color: "#111827" }}>Total Alumni Registered</h3>
              <p style={{ fontSize: "2rem", color: "#111827" }}>{totalAlumni}</p>
              <p style={{ color: "#10B981" }}>+12.5%</p>
            </div>
            
            <div
              style={{
                padding: "16px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "180px",
              }}
            >
              <div style={{ fontSize: "1.5rem", color: "#2196F3" }}>🎓</div>
              <h3 style={{ color: "#111827" }}>Total Students</h3>
              <p style={{ fontSize: "2rem", color: "#111827" }}>{totalStudents}</p>
              <p style={{ color: "#2563EB" }}>+8.2%</p>
            </div>
            
            <div
              style={{
                padding: "16px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "180px",
              }}
            >
              <div style={{ fontSize: "1.5rem", color: "#FF9800" }}>🔔</div>
              <h3 style={{ color: "#111827" }}>Pending Approvals</h3>
              <p style={{ fontSize: "2rem", color: "#111827" }}>{pendingApprovals}</p>
              <p style={{ color: "#EF4444" }}>Need Review</p>
            </div>
          </div>

          {pendingAlumni.length === 0 ? (
            <p style={{ textAlign: "center", color: "#111827" }}>No pending alumni requests.</p>
          ) : (
            <div style={{ marginTop: "30px" }}>
              <h3 style={{ color: "#111827", marginBottom: "20px", textAlign: "center" }}>
                Pending Alumni Requests
              </h3>
              {pendingAlumni.map((alumni) => (
                <div
                  key={alumni.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "15px",
                    marginBottom: "15px",
                    textAlign: "left",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <p><strong>Name:</strong> {alumni.fullName}</p>
                  <p><strong>Regd No:</strong> {alumni.regdNo}</p>
                  <p><strong>Email:</strong> {alumni.email}</p>
                  <p><strong>Grad Year:</strong> {alumni.gradYear}</p>
                  <p><strong>Department:</strong> {alumni.department}</p>
                  <p><strong>Phone:</strong> {alumni.phone}</p>
                  <p><strong>DOB:</strong> {alumni.dob}</p>
                  <p><strong>Degree:</strong> {alumni.degree}</p>
                  <p><strong>Current Job:</strong> {alumni.currentJob || "N/A"}</p>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() => handleApprove(alumni.id, alumni)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#10B981",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#10B981")}
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleReject(alumni.id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#EF4444",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#DC2626")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#EF4444")}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;