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
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(135deg, #e6f3ff 0%, #f0f9ff 50%, #e6f3ff 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "40px",
          background: "linear-gradient(145deg, #ffffff 0%, #f8faff 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ 
          color: "#1a365d",
          marginBottom: "30px", 
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "1px",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Login as {role || "Select Role"}
        </h2>
        <form onSubmit={handleSubmit} style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px",
                border: error ? "1px solid #e53e3e" : "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "#f8faff",
                transition: "all 0.3s ease",
                outline: "none",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
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
                border: error ? "1px solid #e53e3e" : "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                backgroundColor: "#f8faff",
                transition: "all 0.3s ease",
                outline: "none",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              }}
              placeholder="Enter your password"
            />
          </div>
          {error && <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>{error}</span>}
          <button
            type="submit"
            disabled={isSubmitting || !role}
            style={{
              padding: "14px",
              background: isSubmitting || !role 
                ? "#ccc" 
                : "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isSubmitting || !role ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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