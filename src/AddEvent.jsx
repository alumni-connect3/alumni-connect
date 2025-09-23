import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the import path if needed

function AddEvent({ onNavigate }) {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [googleFormLink, setGoogleFormLink] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate mandatory fields
    if (!eventName || !eventLocation || !eventDateTime || !eventOrganizer || !googleFormLink) {
      setError("All mandatory fields (Event Name, Location, Date & Time, Organizer, Google Form Link) must be filled.");
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        eventName,
        eventLocation,
        eventDateTime,
        eventOrganizer,
        googleFormLink,
        eventUrl: eventUrl || "", // Optional field, defaults to empty string if not provided
        createdAt: new Date().toISOString(),
      });
      setSuccess("🎉 Event added successfully!");
      // Reset form
      setEventName("");
      setEventLocation("");
      setEventDateTime("");
      setEventOrganizer("");
      setGoogleFormLink("");
      setEventUrl("");
    } catch (err) {
      console.error("Error adding event:", err.message, err.code);
      setError(`❌ Failed to add event: ${err.message}. Please try again or contact support.`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 20px",
    marginTop: "10px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    boxSizing: "border-box",
    fontSize: "16px",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    outline: "none",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    position: "relative",
    fontWeight: "500",
  };

  const labelStyle = {
    marginBottom: "20px",
    textAlign: "left",
    color: "#1e293b",
    fontSize: "15px",
    fontWeight: "700",
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto"
      }}
    >
      {/* Enhanced Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape" style={{
          width: "120px",
          height: "120px",
          top: "15%",
          left: "8%",
          background: "rgba(255, 255, 255, 0.12)",
          animationDelay: "-2s",
          animationDuration: "8s"
        }}></div>
        <div className="shape" style={{
          width: "80px",
          height: "80px",
          top: "65%",
          right: "12%",
          background: "rgba(255, 255, 255, 0.15)",
          animationDelay: "-4s",
          animationDuration: "6s"
        }}></div>
        <div className="shape" style={{
          width: "60px",
          height: "60px",
          bottom: "25%",
          left: "15%",
          background: "rgba(255, 255, 255, 0.1)",
          animationDelay: "-1s",
          animationDuration: "7s"
        }}></div>
        <div className="shape" style={{
          width: "40px",
          height: "40px",
          top: "30%",
          right: "25%",
          background: "rgba(255, 255, 255, 0.08)",
          animationDelay: "-3s",
          animationDuration: "5s"
        }}></div>
        <div className="shape" style={{
          width: "90px",
          height: "90px",
          bottom: "10%",
          right: "30%",
          background: "rgba(255, 255, 255, 0.11)",
          animationDelay: "-5s",
          animationDuration: "9s"
        }}></div>
      </div>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(120deg); }
            66% { transform: translateY(-8px) rotate(240deg); }
          }
          
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-50px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          .form-container {
            animation: slideInFromTop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }
          
          .shape {
            position: absolute;
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
            backdrop-filter: blur(2px);
          }
          
          .input-field {
            position: relative;
          }
          
          .input-field:hover {
            border-color: #8b5cf6 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2) !important;
          }
          
          .input-field:focus {
            border-color: #4f46e5 !important;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15), 0 8px 25px rgba(79, 70, 229, 0.2) !important;
            transform: translateY(-3px) !important;
            background: #fefefe !important;
          }
          
          .success-message {
            animation: bounce 0.6s ease-out;
          }
          
          .error-message {
            animation: bounce 0.6s ease-out;
          }
          
          .submit-button {
            position: relative;
            overflow: hidden;
          }
          
          .submit-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
            transition: left 0.6s;
          }
          
          .submit-button:hover::before {
            left: 100%;
          }
          
          .submit-button:hover {
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 10px 30px rgba(79, 70, 229, 0.6) !important;
          }
          
          .submit-button:active {
            transform: translateY(-1px) scale(0.98) !important;
          }
          
          .back-button {
            position: relative;
            overflow: hidden;
          }
          
          .back-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.5s;
          }
          
          .back-button:hover::before {
            left: 100%;
          }
          
          .back-button:hover {
            background: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3) !important;
            border-color: rgba(255, 255, 255, 0.5) !important;
          }
          
          .form-card {
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.95);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .form-card:hover {
            background: rgba(255, 255, 255, 0.98);
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            border-color: rgba(255, 255, 255, 0.4);
          }
          
          .label-enhanced {
            transition: all 0.3s ease;
          }
          
          .label-enhanced:hover {
            color: #4f46e5;
            transform: translateX(5px);
          }
          
          .loading-spinner {
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div
        className="form-container"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "650px",
          margin: "40px auto",
          padding: "0 20px",
          boxSizing: "border-box",
          flex: 1
        }}
      >
        <h2 
          style={{ 
            color: "#ffffff", 
            marginBottom: "35px", 
            fontSize: "3rem", 
            fontWeight: "800",
            textAlign: "center",
            textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
            letterSpacing: "2px",
            background: "linear-gradient(45deg, #ffffff, #f8fafc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "pulse 3s ease-in-out infinite",
          }}
        >
          ✨ Add Event
        </h2>
        
        {error && (
          <div className="error-message" style={{ 
            color: "#ffffff", 
            marginBottom: "25px", 
            padding: "18px 24px",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "2px solid rgba(239, 68, 68, 0.4)",
            borderRadius: "15px",
            textAlign: "center",
            fontSize: "15px",
            fontWeight: "600",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {success && (
          <div 
            className="success-message"
            style={{ 
              color: "#ffffff", 
              marginBottom: "25px", 
              padding: "18px 24px",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "2px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "600",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
            }}
          >
            🎊 {success}
          </div>
        )}
        
        <div
          className="form-card"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "45px",
            borderRadius: "25px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          <label className="label-enhanced" style={labelStyle}>
            📝 Event Name *
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Enter an amazing event name"
              required
            />
          </label>

          <label className="label-enhanced" style={labelStyle}>
            📍 Event Location *
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Where will the magic happen?"
              required
            />
          </label>

          <label className="label-enhanced" style={labelStyle}>
            📅 Event Date & Time *
            <p style={{ 
              fontSize: "13px", 
              color: "#64748b", 
              margin: "6px 0", 
              fontStyle: "italic",
              fontWeight: "500",
            }}>
              Choose the perfect moment for your event ✨
            </p>
            <input
              type="datetime-local"
              value={eventDateTime}
              onChange={(e) => setEventDateTime(e.target.value)}
              className="input-field"
              style={inputStyle}
              required
            />
          </label>

          <label className="label-enhanced" style={labelStyle}>
            👤 Event Organizer *
            <input
              type="text"
              value={eventOrganizer}
              onChange={(e) => setEventOrganizer(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="Who's behind this awesome event?"
              required
            />
          </label>

          <label className="label-enhanced" style={labelStyle}>
            📋 Google Form Registration Link *
            <input
              type="url"
              value={googleFormLink}
              onChange={(e) => setGoogleFormLink(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="https://forms.google.com/..."
              required
            />
          </label>

          <label className="label-enhanced" style={labelStyle}>
            🔗 Event URL (Optional)
            <input
              type="url"
              value={eventUrl}
              onChange={(e) => setEventUrl(e.target.value)}
              className="input-field"
              style={inputStyle}
              placeholder="https://example.com/event-details"
            />
          </label>

          <button
            type="button"
            disabled={isLoading}
            className="submit-button"
            onClick={handleSubmit}
            style={{
              padding: "18px 36px",
              background: isLoading 
                ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)" 
                : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: isLoading ? "not-allowed" : "pointer",
              marginTop: "35px",
              fontWeight: "700",
              fontSize: "17px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: isLoading 
                ? "0 6px 20px rgba(156, 163, 175, 0.4)" 
                : "0 8px 25px rgba(79, 70, 229, 0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner" style={{ 
                  display: "inline-block", 
                  marginRight: "8px" 
                }}>
                  🔄
                </span>
                Adding Event...
              </>
            ) : (
              "🎉 Create Event"
            )}
          </button>
        </div>

        <button
          onClick={() => onNavigate("admin-dashboard")}
          className="back-button"
          style={{
            padding: "16px 32px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "15px",
            cursor: "pointer",
            marginTop: "30px",
            fontWeight: "600",
            fontSize: "15px",
            letterSpacing: "0.5px",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            backdropFilter: "blur(15px)",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            textTransform: "uppercase",
            boxShadow: "0 6px 20px rgba(255, 255, 255, 0.1)",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AddEvent;