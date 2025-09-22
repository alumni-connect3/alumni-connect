import React, { useState, useEffect } from "react";
import { db, auth } from "./firebaseConfig"; // Adjust the import path if needed
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function ViewProfilePage({ onNavigate }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(collection(db, "profiles"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const profileData = querySnapshot.docs[0].data();
            setProfile(profileData);
          } else {
            setError("No profile found for this user.");
          }
        } catch (err) {
          console.error("Error fetching profile:", err.message);
          setError("Failed to load profile. Please try again.");
        }
      } else {
        setError("No user is currently logged in.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>View Profile</h1>
      {loading ? (
        <p style={{ color: "#7f8c8d" }}>Loading profile...</p>
      ) : error ? (
        <p style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</p>
      ) : profile ? (
        <>
          <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Name: {profile.alumniName || "N/A"}</p>
          <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Graduation Year: {profile.graduationYear || "N/A"}</p>
          <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Occupation: {profile.occupation || "N/A"}</p>
          <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Location: {profile.location || "N/A"}</p>
          <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Email: {profile.email || "N/A"}</p>
          <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Phone Number: {profile.phoneNumber || "N/A"}</p>
          {profile.additionalDetails && (
            <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>
              Additional Details: {profile.additionalDetails}
            </p>
          )}
        </>
      ) : null}
      <button
        onClick={() => onNavigate("alumni-dashboard")}
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

export default ViewProfilePage;