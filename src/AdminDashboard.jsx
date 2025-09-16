import { collection, deleteDoc, doc, getDocs, query, runTransaction, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";

function AdminDashboard({ onNavigate }) {
  const [pendingAlumni, setPendingAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingAlumni = async () => {
      try {
        const q = query(collection(db, "alumni_pending"), where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);
        const alumniList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingAlumni(alumniList);
      } catch (err) {
        console.error("Fetch Error:", err.message, err.code);
        setError(`Failed to fetch pending alumni: ${err.message}. Please try again or contact support.`);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAlumni();
  }, []);

  const handleApprove = async (alumniId, alumniData) => {
    try {
      const pendingRef = doc(db, "alumni_pending", alumniId);
      const newAlumniRef = doc(collection(db, "alumni"));

      await runTransaction(db, async (transaction) => {
        // Update status in pending
        const pendingDoc = await transaction.get(pendingRef);
        if (!pendingDoc.exists()) {
          throw new Error("Pending document does not exist.");
        }
        transaction.update(pendingRef, {
          status: "approved",
          approvedAt: new Date().toISOString(),
          approvedBy: auth.currentUser?.email || "unknown_admin",
        });

        // Create document in alumni
        transaction.set(newAlumniRef, {
          ...alumniData,
          status: "approved",
          approvedAt: new Date().toISOString(),
          approvedBy: auth.currentUser?.email || "unknown_admin",
        });

        // Delete from pending (will be rolled back if transaction fails)
        transaction.delete(pendingRef);
      });

      setPendingAlumni(pendingAlumni.filter((alumni) => alumni.id !== alumniId));
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
      alert("❌ Alumni rejected and deleted successfully!");
    } catch (err) {
      setError("Failed to reject alumni. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "20px", textAlign: "center", color: "#e53e3e" }}>{error}</div>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage pending alumni requests here.</p>
      {pendingAlumni.length === 0 ? (
        <p>No pending alumni requests.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {pendingAlumni.map((alumni) => (
            <div
              key={alumni.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "15px",
                textAlign: "left",
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
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;