import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "./firebaseConfig";

function SignupAlumni({ onNavigate }) {
  const [form, setForm] = useState({
    fullName: "",
    regdNo: "",
    department: "",
    phone: "",
    dob: "",
    gradYear: "",
    degree: "",
    currentJob: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [backendOtp, setBackendOtp] = useState(""); // Store OTP from backend
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSendOtp = async () => {
    if (!form.email.trim()) {
      setErrors({ ...errors, email: "Email is required to send OTP" });
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setErrors({ ...errors, email: "Enter a valid email" });
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await response.json();

      if (data.success) {
        setBackendOtp(data.otp.toString()); // Store OTP from backend
        setShowOtpField(true);
        alert("OTP sent successfully! Check your email.");
      } else {
        alert(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Server error. Try again later.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setErrors({ ...errors, otp: "OTP is required" });
      alert("❌ OTP is required.");
      return;
    }

    if (otp === backendOtp) {
      setIsOtpVerified(true);
      setErrors({ ...errors, otp: undefined }); // Clear OTP error
      alert("✅ OTP verified! Continue signup.");
    } else {
      setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
      alert("❌ Invalid OTP. Try again.");
    }
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    const err = {};
    if (!form.fullName.trim()) err.fullName = "Full name is required";
    if (!form.regdNo.trim()) err.regdNo = "Registration number is required";
    if (!form.department.trim()) err.department = "Department/Branch is required";

    if (!form.phone.trim()) err.phone = "Phone number is required";
    else if (!/^\+?\d{7,15}$/.test(form.phone))
      err.phone = "Enter a valid phone (digits, optional +, 7-15 chars)";

    if (!form.dob) err.dob = "Date of birth is required";

    if (!form.gradYear) err.gradYear = "Graduation year is required";
    else if (Number(form.gradYear) < 1900 || Number(form.gradYear) > currentYear)
      err.gradYear = "Enter a realistic graduation year";

    if (!form.degree) err.degree = "Degree is required";

    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      err.email = "Enter a valid email";

    if (!otp.trim()) err.otp = "OTP is required";
    else if (!isOtpVerified) err.otp = "Please verify your OTP";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) err.confirmPassword = "Confirm password is required";
    else if (form.confirmPassword !== form.password)
      err.confirmPassword = "Passwords do not match";

    if (!form.agree) err.agree = "You must agree to the terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || !isOtpVerified) return;

    setIsSubmitting(true);

    try {
      // Set persistence to keep the user logged in
      await setPersistence(auth, browserSessionPersistence);

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Store alumni data in Firestore
      const alumniData = {
        fullName: form.fullName,
        regdNo: form.regdNo,
        department: form.department,
        phone: form.phone,
        dob: form.dob,
        gradYear: form.gradYear,
        degree: form.degree,
        currentJob: form.currentJob || "",
        email: form.email,
        submittedAt: serverTimestamp(),
        status: "pending",
        notified: false,
        uid: user.uid, // Link to Authentication UID
      };

      console.log("Submitting data:", alumniData); // Debug log
      const docRef = await addDoc(collection(db, "alumni_pending"), alumniData);
      if (!docRef.id) {
        throw new Error("Document ID not received. Write may have failed.");
      }
      console.log("Document written with ID:", docRef.id); // Debug log

      alert("✅ Your request has been submitted and is awaiting admin approval.");

      setForm({
        fullName: "",
        regdNo: "",
        department: "",
        phone: "",
        dob: "",
        gradYear: "",
        degree: "",
        currentJob: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });
      setErrors({});
      setOtp("");
      setBackendOtp("");
      setShowOtpField(false);
      setIsOtpVerified(false);
    } catch (error) {
      console.error("Registration Error:", error.message, error.code, error.stack); // Enhanced error logging
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please use a different email or log in.");
      } else if (error.code === "permission-denied" || error.message.includes("missing or insufficient permissions")) {
        alert("Signup failed: Insufficient permissions to write to Firestore. Contact support.");
      } else {
        alert(`Signup failed: ${error.message}. Please try again or contact support.`);
      }
      // Optionally delete the Auth user if Firestore write failed
      if (error.code !== "auth/email-already-in-use" && userCredential?.user) {
        await deleteUser(userCredential.user);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              height: "60px",
              width: "60px",
              margin: "0 auto 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff3e0",
              borderRadius: "50%",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ height: "30px", width: "30px", color: "#FF9800" }}
            >
              <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 7.75L4.21 7 12 4.25 19.79 7 12 9.75zm-7 6.56V13l7 3 7-3v3.31c0 2.63-4.67 4.69-7 4.69s-7-2.06-7-4.69z" />
            </svg>
          </div>
          <h2 style={{ color: "#333", margin: "0 0 5px 0", fontSize: "24px" }}>
            Alumni Registration
          </h2>
          <p style={{ color: "#666", margin: 0 }}>
            Create your alumni account to join the network
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                padding: "12px",
                border: errors.fullName ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.fullName && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.fullName}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Registration / Roll Number
            </label>
            <input
              name="regdNo"
              value={form.regdNo}
              onChange={handleChange}
              placeholder="Enter your registration number"
              style={{
                padding: "12px",
                border: errors.regdNo ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.regdNo && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.regdNo}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Department / Branch
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Enter your department"
              style={{
                padding: "12px",
                border: errors.department ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.department && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.department}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +1234567890"
              inputMode="tel"
              style={{
                padding: "12px",
                border: errors.phone ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.phone && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.phone}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Date of Birth
            </label>
            <input
              name="dob"
              value={form.dob}
              onChange={handleChange}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              style={{
                padding: "12px",
                border: errors.dob ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.dob && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.dob}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Graduation Year
            </label>
            <input
              name="gradYear"
              value={form.gradYear}
              onChange={handleChange}
              type="number"
              placeholder="e.g. 2023"
              min="1900"
              max={currentYear}
              style={{
                padding: "12px",
                border: errors.gradYear ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.gradYear && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.gradYear}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Degree
            </label>
            <select
              name="degree"
              value={form.degree}
              onChange={handleChange}
              style={{
                padding: "12px",
                border: errors.degree ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
                backgroundColor: "white",
              }}
            >
              <option value="">Select Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
            {errors.degree && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.degree}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Current Job (optional)
            </label>
            <input
              name="currentJob"
              value={form.currentJob}
              onChange={handleChange}
              placeholder="Enter your current job"
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Email Address
            </label>
            <div style={{ display: "flex" }}>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                type="email"
                style={{
                  padding: "12px",
                  border: errors.email ? "1px solid #e53e3e" : "1px solid #ddd",
                  borderRadius: "5px 0 0 5px",
                  fontSize: "16px",
                  flex: "1",
                }}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp}
                style={{
                  padding: "12px",
                  backgroundColor: isSendingOtp ? "#ccc" : "#FF9800",
                  color: "white",
                  border: "none",
                  borderRadius: "0 5px 5px 0",
                  cursor: isSendingOtp ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                {isSendingOtp ? "Sending..." : "Get OTP"}
              </button>
            </div>
            {errors.email && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.email}
              </span>
            )}
          </div>

          {showOtpField && (
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
                OTP Verification
              </label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    padding: "12px",
                    border: errors.otp ? "1px solid #e53e3e" : "1px solid #ddd",
                    borderRadius: "5px 0 0 5px",
                    fontSize: "16px",
                    flex: "1",
                  }}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  style={{
                    padding: "12px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "0 5px 5px 0",
                    cursor: "pointer",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Verify OTP
                </button>
              </div>
              {errors.otp && (
                <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                  {errors.otp}
                </span>
              )}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              type="password"
              style={{
                padding: "12px",
                border: errors.password ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.password && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.password}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", color: "#555", fontSize: "14px" }}>
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              type="password"
              style={{
                padding: "12px",
                border: errors.confirmPassword ? "1px solid #e53e3e" : "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            />
            {errors.confirmPassword && (
              <span style={{ color: "#e53e3e", fontSize: "14px", marginTop: "5px" }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center" }}>
            <input
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <span style={{ color: "#555", fontSize: "14px" }}>
              Agree to Terms & Privacy Policy
            </span>
          </div>
          {errors.agree && (
            <span
              style={{
                gridColumn: "1 / -1",
                color: "#e53e3e",
                fontSize: "14px",
                marginTop: "-15px",
              }}
            >
              {errors.agree}
            </span>
          )}

          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: isSubmitting ? "#ccc" : "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = "#f57c00")}
              onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = "#FF9800")}
            >
              {isSubmitting ? "Processing..." : "Register as Alumni"}
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666", margin: "0 0 10px 0" }}>
            Already have an account?{" "}
            <span
              onClick={() => onNavigate("role-selection-login")}
              style={{ color: "#4CAF50", cursor: "pointer", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>
          <p style={{ margin: 0 }}>
            <span
              onClick={() => onNavigate("role-selection")}
              style={{ color: "#666", cursor: "pointer", textDecoration: "underline" }}
            >
              ← Back to Role Selection
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupAlumni;