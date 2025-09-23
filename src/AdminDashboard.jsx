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
      setPendingApprovals(pendingApprovals - 1);
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
      setPendingApprovals(pendingApprovals - 1);
      alert("❌ Alumni rejected and deleted successfully!");
    } catch (err) {
      setError("Failed to reject alumni. Please try again.");
      console.error(err);
    }
  };

  const sidebarButtonStyle = {
    padding: "12px 16px",
    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "left",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    transform: "translateY(0px)",
    position: "relative",
    overflow: "hidden",
    width: "100%",
  };

  const logoutButtonStyle = {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)",
    transform: "translateY(0px)",
    position: "relative",
    overflow: "hidden",
  };

  const approveButtonStyle = {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    marginRight: "12px",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
    transform: "translateY(0px)",
    position: "relative",
    overflow: "hidden",
  };

  const rejectButtonStyle = {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    transform: "translateY(0px)",
    position: "relative",
    overflow: "hidden",
  };

  if (loading) return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          border: "4px solid #e0f2fe",
          borderTop: "4px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 20px"
        }}></div>
        <p style={{ fontSize: "1.2rem", color: "#1e40af", fontWeight: "600" }}>Loading Dashboard...</p>
        <style>
          {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        border: "2px solid #fecaca"
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⚠️</div>
        <p style={{ color: "#dc2626", fontSize: "1.1rem", fontWeight: "500" }}>{error}</p>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      height: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "120px",
        height: "120px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
        borderRadius: "50%",
        animation: "float 8s ease-in-out infinite",
        zIndex: 1,
      }}></div>
      
      <div style={{
        position: "absolute",
        top: "60%",
        right: "8%",
        width: "80px",
        height: "80px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
        borderRadius: "50%",
        animation: "float 6s ease-in-out infinite reverse",
        zIndex: 1,
      }}></div>

      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "70%",
        width: "60px",
        height: "60px",
        background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
        borderRadius: "50%",
        animation: "float 7s ease-in-out infinite",
        zIndex: 1,
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .admin-button {
            position: relative;
          }
          
          .admin-button::before {
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
            border-radius: 12px;
          }
          
          .admin-button:hover::before {
            left: 100%;
          }
          
          .admin-button:hover {
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4) !important;
          }
          
          .admin-button:active {
            transform: translateY(-1px) scale(0.98) !important;
          }
          
          .logout-btn:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 0 10px 30px rgba(239, 68, 68, 0.5) !important;
          }
          
          .approve-btn:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5) !important;
          }
          
          .reject-btn:hover {
            transform: translateY(-2px) scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5) !important;
          }
          
          .stats-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          }
          
          .stats-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            background: rgba(255, 255, 255, 1);
          }
          
          .pending-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }
          
          .pending-card:hover {
            transform: translateX(5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            background: rgba(255, 255, 255, 1);
          }
          
          .sidebar-container {
            background: rgba(31, 41, 55, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        height: "100vh",
        width: "100%",
        overflowX: "hidden",
        padding: 0,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
      }}>
        {/* Main content */}
        <div style={{
          padding: "40px",
          borderRadius: "0",
          width: "100%",
          height: "100vh",
          boxSizing: "border-box",
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "30px",
          overflowY: "auto",
        }}>
          {/* Sidebar */}
          <div className="sidebar-container" style={{
            width: "220px",
            color: "#F9FAFB",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            borderRadius: "20px",
            height: "fit-content",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}>
            <h3 style={{
              color: "#f0f9ff",
              marginBottom: "20px",
              fontSize: "1.2rem",
              fontWeight: "700",
              textAlign: "center",
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              🚀 Admin Panel
            </h3>
            
            <button
              className="admin-button"
              onClick={() => onNavigate("view-students")}
              style={sidebarButtonStyle}
            >
              🎓 View Students
            </button>
            
            <button
              className="admin-button"
              onClick={() => onNavigate("view-alumni")}
              style={sidebarButtonStyle}
            >
              👥 View Alumni
            </button>
            
            <button
              className="admin-button"
              onClick={() => onNavigate("add-event")}
              style={sidebarButtonStyle}
            >
              📅 Add Event
            </button>
            
            <button
              className="admin-button"
              onClick={() => onNavigate("add-job")}
              style={sidebarButtonStyle}
            >
              💼 Add Job
            </button>
            
            <button
              className="admin-button"
              onClick={() => onNavigate("add-internship")}
              style={sidebarButtonStyle}
            >
              🎯 Add Internship
            </button>
            
            <button
              className="admin-button"
              onClick={() => onNavigate("add-placeholder")}
              style={sidebarButtonStyle}
            >
              📋 View All Events
            </button>
          </div>

          {/* Main content area */}
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}>
              <button
                className="logout-btn"
                onClick={() => onNavigate("home")}
                style={logoutButtonStyle}
              >
                🚪 Logout
              </button>
            </div>

            <div style={{
              textAlign: "center",
              marginBottom: "40px",
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}>
              <h2 style={{
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "15px",
                fontSize: "2.5rem",
                fontWeight: "800",
              }}>
                Welcome back, Admin! 👋
              </h2>
              <p style={{
                color: "#64748b",
                fontSize: "1.1rem",
                fontWeight: "500",
              }}>
                Here's what's happening with your alumni community today.
              </p>
            </div>
            
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}>
              <div className="stats-card" style={{
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "200px",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📈</div>
                <h3 style={{ 
                  color: "#1e40af", 
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px"
                }}>
                  Total Alumni
                </h3>
                <p style={{ fontSize: "2.5rem", color: "#059669", fontWeight: "800", margin: "10px 0" }}>
                  {totalAlumni}
                </p>
                <p style={{ color: "#10B981", fontWeight: "600" }}>+12.5%</p>
              </div>
              
              <div className="stats-card" style={{
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "200px",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🎓</div>
                <h3 style={{ 
                  color: "#1e40af", 
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px"
                }}>
                  Total Students
                </h3>
                <p style={{ fontSize: "2.5rem", color: "#3b82f6", fontWeight: "800", margin: "10px 0" }}>
                  {totalStudents}
                </p>
                <p style={{ color: "#2563EB", fontWeight: "600" }}>+8.2%</p>
              </div>
              
              <div className="stats-card" style={{
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                textAlign: "center",
                minWidth: "200px",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🔔</div>
                <h3 style={{ 
                  color: "#1e40af", 
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px"
                }}>
                  Pending Approvals
                </h3>
                <p style={{ fontSize: "2.5rem", color: "#dc2626", fontWeight: "800", margin: "10px 0" }}>
                  {pendingApprovals}
                </p>
                <p style={{ color: "#EF4444", fontWeight: "600" }}>Need Review</p>
              </div>
            </div>

            {pendingAlumni.length === 0 ? (
              <div style={{
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "40px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                backdropFilter: "blur(15px)"
              }}>
                <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✅</div>
                <p style={{ color: "#059669", fontSize: "1.2rem", fontWeight: "600" }}>
                  No pending alumni requests. Great work! 🎉
                </p>
              </div>
            ) : (
              <div style={{ marginTop: "30px" }}>
                <h3 style={{
                  background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "25px",
                  textAlign: "center",
                  fontSize: "1.8rem",
                  fontWeight: "700"
                }}>
                  📋 Pending Alumni Requests
                </h3>
                
                {pendingAlumni.map((alumni) => (
                  <div
                    key={alumni.id}
                    className="pending-card"
                    style={{
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                      borderRadius: "16px",
                      padding: "25px",
                      marginBottom: "20px",
                      textAlign: "left",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Name:</strong> {alumni.fullName}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Regd No:</strong> {alumni.regdNo}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Email:</strong> {alumni.email}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Grad Year:</strong> {alumni.gradYear}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Department:</strong> {alumni.department}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Phone:</strong> {alumni.phone}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>DOB:</strong> {alumni.dob}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500" }}>
                        <strong style={{ color: "#1e293b" }}>Degree:</strong> {alumni.degree}
                      </p>
                      <p style={{ margin: "5px 0", color: "#1e40af", fontWeight: "500", gridColumn: "span 2" }}>
                        <strong style={{ color: "#1e293b" }}>Current Job:</strong> {alumni.currentJob || "N/A"}
                      </p>
                    </div>
                    
                    <div style={{ borderTop: "1px solid rgba(59, 130, 246, 0.1)", paddingTop: "15px" }}>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(alumni.id, alumni)}
                        style={approveButtonStyle}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(alumni.id)}
                        style={rejectButtonStyle}
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
    </div>
  );
}

export default AdminDashboard;