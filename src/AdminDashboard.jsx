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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background:
          "radial-gradient(1200px 600px at -10% -20%, rgba(173, 216, 230, 0.35), rgba(173, 216, 230, 0) 60%),\n           radial-gradient(900px 500px at 110% -10%, rgba(255, 183, 197, 0.35), rgba(255, 183, 197, 0) 55%),\n           linear-gradient(135deg, #eaf3ff 0%, #f7faff 50%, #e9fff6 100%)",
        padding: 0,
      }}
    >
      <div
        style={{
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          width: "100%",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              padding: "12px",
              backgroundColor: "#FF9800",
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
        <h2 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
          Welcome back, Admin! 👋
        </h2>
        <p style={{ color: "#666", marginBottom: "30px", textAlign: "center" }}>
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
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              textAlign: "center",
              minWidth: "180px",
            }}
          >
            <div style={{ fontSize: "1.5rem", color: "#4CAF50" }}>📈</div>
            <h3>Total Alumni Registered</h3>
            <p style={{ fontSize: "2rem", color: "#333" }}>{totalAlumni}</p>
            <p style={{ color: "#4CAF50" }}>+12.5%</p>
          </div>
          
          <div
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              textAlign: "center",
              minWidth: "180px",
            }}
          >
            <div style={{ fontSize: "1.5rem", color: "#2196F3" }}>🎓</div>
            <h3>Total Students</h3>
            <p style={{ fontSize: "2rem", color: "#333" }}>{totalStudents}</p>
            <p style={{ color: "#2196F3" }}>+8.2%</p>
          </div>
          
          <div
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              textAlign: "center",
              minWidth: "180px",
            }}
          >
            <div style={{ fontSize: "1.5rem", color: "#FF9800" }}>🔔</div>
            <h3>Pending Approvals</h3>
            <p style={{ fontSize: "2rem", color: "#333" }}>{pendingApprovals}</p>
            <p style={{ color: "#FF9800" }}>Need Review</p>
          </div>
        </div>

        {pendingAlumni.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>No pending alumni requests.</p>
        ) : (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
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
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(alumni.id)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#e53e3e",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#e53e3e")}
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
  );
}

export default AdminDashboard;