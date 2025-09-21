import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust the import path if needed

function AddPlaceholder({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item to view details

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [jobsSnapshot, internshipsSnapshot, eventsSnapshot] = await Promise.all([
          getDocs(collection(db, "jobs")),
          getDocs(collection(db, "internships")),
          getDocs(collection(db, "events")),
        ]);

        const jobs = jobsSnapshot.docs.map((doc) => ({ id: doc.id, type: "job", ...doc.data() }));
        const internships = internshipsSnapshot.docs.map((doc) => ({ id: doc.id, type: "internship", ...doc.data() }));
        const events = eventsSnapshot.docs.map((doc) => ({ id: doc.id, type: "event", ...doc.data() }));
        setItems([...jobs, ...internships, ...events]);
      } catch (err) {
        console.error("Error fetching data:", err.message, err.code);
        setError(`Failed to fetch data: ${err.message}. Please try again or contact support.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, type === "job" ? "jobs" : type === "internship" ? "internships" : "events", id));
        setItems(items.filter((item) => item.id !== id));
        if (selectedItem && selectedItem.id === id) setSelectedItem(null); // Close modal if deleted item was selected
        alert("Item deleted successfully!");
      } catch (err) {
        console.error("Error deleting item:", err.message, err.code);
        setError(`Failed to delete item: ${err.message}. Please try again or contact support.`);
      }
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const filteredItems = filter === "all" 
    ? items 
    : items.filter((item) => item.type === filter);

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "20px", textAlign: "center", color: "#e53e3e" }}>{error}</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f7fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#2d3748", marginBottom: "20px", fontSize: "2rem", fontWeight: "600" }}>View All Items</h2>
      
      {/* Filter Section */}
      <div style={{ marginBottom: "20px", width: "100%", maxWidth: "600px" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            fontSize: "16px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#edf2f7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffffff")}
        >
          <option value="all">All</option>
          <option value="job">Jobs</option>
          <option value="internship">Internships</option>
          <option value="event">Events</option>
        </select>
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <p style={{ color: "#4a5568", textAlign: "center" }}>No items found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ color: "#2d3748", fontSize: "1.2rem", fontWeight: "600", marginBottom: "10px" }}>
                {item.type === "job" ? item.jobRole : item.type === "internship" ? item.internshipRole : item.eventName}
              </h3>
              <p style={{ color: "#4a5568", marginBottom: "5px" }}>
                Type: <span style={{ fontWeight: "500" }}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
              </p>
              {item.type === "job" && (
                <>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Company: {item.companyName}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Salary: {item.salary}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Location: {item.location}</p>
                </>
              )}
              {item.type === "internship" && (
                <>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Description: {item.internshipDescription}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Stifund: {item.stifund}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Duration: {item.duration}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Mode: {item.onlineOffline}</p>
                </>
              )}
              {item.type === "event" && (
                <>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Location: {item.eventLocation}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Date: {item.eventDateTime}</p>
                  <p style={{ color: "#4a5568", marginBottom: "5px" }}>Organizer: {item.eventOrganizer}</p>
                </>
              )}
              <p style={{ color: "#4a5568", marginBottom: "10px" }}>Created: {new Date(item.createdAt).toLocaleDateString()}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleViewDetails(item)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4a5568",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#2d3748")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#4a5568")}
                >
                  View Full Details
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.type)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Full Details */}
      {selectedItem && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3 style={{ color: "#2d3748", fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px" }}>
              {selectedItem.type === "job" ? selectedItem.jobRole : selectedItem.type === "internship" ? selectedItem.internshipRole : selectedItem.eventName}
              Details
            </h3>
            <p style={{ color: "#4a5568", marginBottom: "10px" }}>
              Type: <span style={{ fontWeight: "500" }}>{selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}</span>
            </p>
            {selectedItem.type === "job" && (
              <>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Company: {selectedItem.companyName}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Salary: {selectedItem.salary}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Location: {selectedItem.location}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>URL: {selectedItem.jobUrl}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Description: {selectedItem.jobDescription}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Skills: {selectedItem.requiredSkills}</p>
              </>
            )}
            {selectedItem.type === "internship" && (
              <>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Description: {selectedItem.internshipDescription}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Role: {selectedItem.internshipRole}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>URL: {selectedItem.internshipUrl}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Mode: {selectedItem.onlineOffline}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Stifund: {selectedItem.stifund}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Duration: {selectedItem.duration}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Skills: {selectedItem.requiredSkills}</p>
              </>
            )}
            {selectedItem.type === "event" && (
              <>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Location: {selectedItem.eventLocation}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Date: {selectedItem.eventDateTime}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Organizer: {selectedItem.eventOrganizer}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>Form Link: {selectedItem.googleFormLink}</p>
                <p style={{ color: "#4a5568", marginBottom: "10px" }}>URL: {selectedItem.eventUrl || "N/A"}</p>
              </>
            )}
            <p style={{ color: "#4a5568", marginBottom: "15px" }}>Created: {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
            <button
              onClick={handleCloseDetails}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4a5568",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2d3748")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4a5568")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => onNavigate("admin-dashboard")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4a5568",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2d3748")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4a5568")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
export default AddPlaceholder;