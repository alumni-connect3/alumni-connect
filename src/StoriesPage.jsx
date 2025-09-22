import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore"; // Removed deleteDoc and doc
import { db } from "./firebaseConfig"; // Adjust the import path if needed

function StoriesPage({ onNavigate }) {
  const [alumniName, setAlumniName] = useState("");
  const [alumniJobRole, setAlumniJobRole] = useState("");
  const [alumniStory, setAlumniStory] = useState("");
  const [stories, setStories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Fetch stories from Firestore and check if the current alumni has a story
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const storiesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setStories(storiesData);

        // Check if the current alumni has a story
        const alumniStoryExists = storiesData.some((story) => story.alumniName === alumniName);
        if (alumniStoryExists) {
          setShowForm(false);
        } else if (alumniName && !alumniStoryExists) {
          setShowForm(true); // Show form only if no story exists for this alumni
        }
      } catch (err) {
        console.error("Error fetching stories:", err.message);
        setError("Failed to load stories. Please try again.");
      }
    };
    fetchStories();
  }, [alumniName]);

  // Handle form submission to add a story
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!alumniName || !alumniJobRole || !alumniStory) {
      setError("All fields (Alumni Name, Alumni Job Role, Alumni Story) must be filled.");
      setIsLoading(false);
      return;
    }

    // Check if this alumni already has a story
    const hasExistingStory = stories.some((story) => story.alumniName === alumniName);
    if (hasExistingStory) {
      setError("You can only add one story per alumni.");
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "stories"), {
        alumniName,
        alumniJobRole,
        alumniStory,
        createdAt: new Date().toISOString(),
      });
      setSuccess("🎉 Story added successfully!");
      setAlumniName("");
      setAlumniJobRole("");
      setAlumniStory("");
      setShowForm(false); // Hide form after adding
      // Refresh stories list
      const querySnapshot = await getDocs(collection(db, "stories"));
      const storiesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStories(storiesData);
    } catch (err) {
      console.error("Error adding story:", err.message);
      setError(`❌ Failed to add story: ${err.message}. Please try again or contact support.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>Stories Page</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>Share and read alumni success stories here.</p>

      {/* Form to Add Story */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto 20px",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {error && <p style={{ color: "#e74c3c", marginBottom: "10px" }}>{error}</p>}
          {success && <p style={{ color: "#2ecc71", marginBottom: "10px" }}>{success}</p>}
          
          <label style={{ display: "block", textAlign: "left", marginBottom: "10px", color: "#34495e" }}>
            Alumni Name *
            <input
              type="text"
              value={alumniName}
              onChange={(e) => setAlumniName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
              placeholder="Enter alumni name"
              required
            />
          </label>

          <label style={{ display: "block", textAlign: "left", marginBottom: "10px", color: "#34495e" }}>
            Alumni Job Role *
            <input
              type="text"
              value={alumniJobRole}
              onChange={(e) => setAlumniJobRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
              }}
              placeholder="Enter job role"
              required
            />
          </label>

          <label style={{ display: "block", textAlign: "left", marginBottom: "10px", color: "#34495e" }}>
            Alumni Story *
            <textarea
              value={alumniStory}
              onChange={(e) => setAlumniStory(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                minHeight: "100px",
              }}
              placeholder="Share your success story"
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              backgroundColor: isLoading ? "#95a5a6" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#1976D2")}
            onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#2196F3")}
          >
            {isLoading ? "Adding Story..." : "Add Story"}
          </button>
        </form>
      )}

      {/* View Stories */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Alumni Stories</h2>
        {stories.length === 0 ? (
          <p style={{ color: "#7f8c8d" }}>No stories available yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {stories.map((story) => (
              <li
                key={story.id}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  textAlign: "left",
                }}
              >
                <h3 style={{ color: "#2c3e50", margin: "5px 0" }}>{story.alumniName}</h3>
                <p style={{ color: "#34495e", margin: "5px 0" }}><strong>Job Role:</strong> {story.alumniJobRole}</p>
                <p style={{ color: "#7f8c8d", margin: "5px 0" }}>{story.alumniStory}</p>
                <p style={{ color: "#7f8c8d", fontSize: "12px" }}>
                  Added on: {new Date(story.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

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

export default StoriesPage;