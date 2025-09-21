import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const App = ({ onNavigate, role }) => {
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
    <div style={{
      display: 'flex',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      borderRadius: '1.5rem',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      backgroundColor: '#f9fafb',
      fontFamily: "'Inter', sans-serif",
      height: '100vh',
      alignItems: 'center',
    }}>
      {/* Left Section: Illustration and description */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <img src="https://res.cloudinary.com/doxqjlztu/image/upload/v1758173256/WhatsApp_Image_2025-09-18_at_10.20.36_5bfc8d07_jopwmm.jpg" alt="Alumni Portal Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#1e40af' }}>Alumni Portal</h2>
          <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: '#1d4ed8' }}>Connect with your college alumni network</p>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '0 1.5rem 1.5rem 0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            backgroundColor: '#2563eb',
            borderRadius: '1rem',
            color: 'white',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            🎓
          </div>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', textAlign: 'center', marginBottom: '0.5rem' }}>
          Login as {role || "Select Role"}
        </h1>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '2rem' }}>Connect with your college alumni network</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              ...inputStyle,
              border: error ? '1px solid #e53e3e' : '1px solid #d1d5db'
            }}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...inputStyle,
              border: error ? '1px solid #e53e3e' : '1px solid #d1d5db'
            }}
            required
          />
          
          {error && (
            <div style={{ 
              color: '#e53e3e', 
              fontSize: '0.875rem', 
              padding: '0.5rem', 
              backgroundColor: '#fef2f2',
              borderRadius: '0.375rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isSubmitting || !role}
            style={{
              ...buttonStyle,
              backgroundColor: isSubmitting || !role ? '#9ca3af' : '#2563eb',
              cursor: isSubmitting || !role ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting && role) {
                e.target.style.backgroundColor = '#1d4ed8';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting && role) {
                e.target.style.backgroundColor = '#2563eb';
              }
            }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        
        <p style={{ marginTop: '1.5rem', color: '#6b7280', textAlign: 'center' }}>
          <span
            onClick={() => onNavigate("role-selection-login")}
            style={{ 
              color: '#3b82f6', 
              cursor: 'pointer', 
              textDecoration: 'underline',
              fontSize: '0.875rem'
            }}
          >
            ← Change Role
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.5rem',
  outline: 'none',
  fontSize: '1rem',
  transition: 'border-color 0.2s ease-in-out',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '0.75rem 0',
  borderRadius: '0.5rem',
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
  fontSize: '1rem'
};

export default App;