import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // Adjust the import path if needed
import { collection, getDocs } from "firebase/firestore";

function ViewStoriesPage({ onNavigate }) {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const storiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStories(storiesData);
      } catch (err) {
        console.error("Error fetching stories:", err.message);
        setError("Failed to load stories. Please try again.");
      }
    };
    fetchStories();
  }, []);

  const handleView = (story) => {
    setSelectedStory(story);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>View Stories</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>Explore inspiring stories from alumni and students here.</p>
      {error ? (
        <p style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</p>
      ) : (
        <>
          {stories.length === 0 ? (
            <p style={{ color: "#7f8c8d" }}>Loading stories...</p>
          ) : (
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {stories.map((story) => (
                <div
                  key={story.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "left",
                  }}
                >
                  <h3 style={{ color: "#2c3e50", marginBottom: "5px" }}>{story.alumniName}</h3>
                  <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Job Role:</strong> {story.alumniJobRole || "N/A"}</p>
                  <p style={{ color: "#7f8c8d", marginBottom: "5px" }}><strong>Story Preview:</strong> {story.alumniStory ? `${story.alumniStory.substring(0, 50)}...` : "N/A"}</p>
                  <p style={{ color: "#7f8c8d", marginBottom: "10px" }}><strong>Created At:</strong> {story.createdAt || "N/A"}</p>
                  <button
                    onClick={() => handleView(story)}
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
                </div>
              ))}
            </div>
          )}
          {selectedStory && (
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
              <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Full Story</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "10px" }}>{selectedStory.alumniStory || "No story available"}</p>
              <button
                onClick={() => setSelectedStory(null)}
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

export default ViewStoriesPage;