import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Adjust the import path if needed
import { collection, getDocs } from "firebase/firestore";

function RegisterEvent({ onNavigate }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events")); // Updated to "events"
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsData);
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError("Failed to load events. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  const handleView = (event) => {
    setSelectedEvent(event);
  };

  const handleKnowMore = (googleFormLink) => {
    window.open(googleFormLink, "_blank"); // Opens the googleFormLink in a new tab
  };

  const handleRegister = (eventUrl, eventName) => {
    window.open(eventUrl, "_blank"); // Opens the eventUrl in a new tab
    alert(`Registering for: ${eventName}`); // Optional feedback
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>Register for Events</h1>
      {error ? (
        <p style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</p>
      ) : (
        <>
          {events.length === 0 ? (
            <p style={{ color: "#7f8c8d" }}>Loading events...</p>
          ) : (
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {events.map((event) => (
                <div
                  key={event.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "left",
                  }}
                >
                  <h3 style={{ color: "#2c3e50", marginBottom: "5px" }}>{event.eventName}</h3>
                  <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>Location: {event.eventLocation || "N/A"}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => handleView(event)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRegister(event.eventUrl || "https://www.google.com", event.eventName)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#9b59b6",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#8e44ad")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#9b59b6")}
                    >
                      Register
                    </button>
                    <button
                      onClick={() => handleKnowMore(event.googleFormLink || "https://www.google.com")}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Know More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedEvent && (
            <div
              style={{
                maxWidth: "600px",
                margin: "20px auto",
                backgroundColor: "#ffffff",
                padding: "15px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Event Details</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Name:</strong> {selectedEvent.eventName}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Created At:</strong> {selectedEvent.createdAt || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Date & Time:</strong> {selectedEvent.eventDateTime || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Location:</strong> {selectedEvent.eventLocation || "N/A"}</p>
              <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Organizer:</strong> {selectedEvent.eventOrganizer || "N/A"}</p>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1976D2")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2196F3")}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
      <button
        onClick={() => onNavigate("student-dashboard")}
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

export default RegisterEvent;