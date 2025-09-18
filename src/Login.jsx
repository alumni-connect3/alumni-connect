import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "./firebaseConfig";

function Login({ onNavigate, role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!role) {
      setError("Please select a role before logging in.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      let collectionName;
      switch (role) {
        case "admin":
          collectionName = "admins";
          break;
        case "student":
          collectionName = "students";
          break;
        case "alumni":
          collectionName = "alumni"; // Approved alumni only
          break;
        default:
          throw new Error("Invalid role");
      }

      const q = query(collection(db, collectionName), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User found in the role-specific collection, redirect to dashboard
        onNavigate(`${role}-dashboard`);
      } else {
        // Logout if user exists in Auth but not in the role collection
        await auth.signOut();
        setError(`No ${role} account found with this email.`);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message.includes("wrong-password") ? "Invalid email or password." : error.message);
      if (error.code === "auth/user-not-found") await auth.signOut();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        overflow: "hidden", // Prevents scrolling on the page
      }}
    >
      <div
        style={{
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
          overflow: "auto", // Allows internal scrolling only if content overflows the card
          maxHeight: "calc(100vh - 40px)", // Limits card height to viewport minus padding
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
          Login as {role || "Select Role"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px",
                border: error ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "12px",
                border: error ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              placeholder="Enter your password"
            />
          </div>
          {error && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{error}</span>}
          <button
            type="submit"
            disabled={isSubmitting || !role}
            style={{
              padding: "12px",
              backgroundColor: isSubmitting || !role ? "#ccc" : "#FF9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isSubmitting || !role ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => !isSubmitting && role && (e.target.style.backgroundColor = "#f57c00")}
            onMouseOut={(e) => !isSubmitting && role && (e.target.style.backgroundColor = "#FF9800")}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#666", textAlign: "center" }}>
          <span
            onClick={() => onNavigate("role-selection-login")}
            style={{ color: "#666", cursor: "pointer", textDecoration: "underline" }}
          >
            ← Change Role
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;