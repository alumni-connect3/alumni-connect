import React, { useEffect, useState, useRef } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, onSnapshot, orderBy, query, where, serverTimestamp, limit } from "firebase/firestore";

// --- Style Definitions ---
const colorMap = {
  blue: { header: '#3b82f6', bg: '#eff6ff', text: '#1e40af' },
  green: { header: '#22c55e', bg: '#f0fdf4', text: '#166534' },
  orange: { header: '#f97316', bg: '#fff7ed', text: '#9a3412' },
  purple: { header: '#8b5cf6', bg: '#f5f3ff', text: '#5b21b6' },
  red: { header: '#ef4444', bg: '#fef2f2', text: '#991b1b' },
  pink: { header: '#ec4899', bg: '#fdf2f8', text: '#9d174d' },
  indigo: { header: '#6366f1', bg: '#eef2ff', text: '#312e81' },
};

const styles = {
  appContainer: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#1f2937',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: '0',
    zIndex: '10',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  navTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#4b5563',
    transition: 'color 0.2s, background-color 0.3s',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
  },
  navButtonActive: {
    backgroundColor: '#e5e7eb',
    color: '#2563eb',
    fontWeight: '600',
  },
  navButtonHover: {
    backgroundColor: '#d1d5db',
  },
  main: {
    flexGrow: '1',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  welcomeBanner: {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  welcomeTextContainer: {
    flex: '1',
  },
  welcomeTitle: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  welcomeSubtitle: {
    fontSize: '1rem',
    color: '#4b5563',
  },
  profileButton: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    flexShrink: '0',
    marginTop: '1rem',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  statCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
  },
  statCardIcon: {
    marginBottom: '0.5rem',
  },
  statCardCount: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
  },
  statCardLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.25rem',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  jobsContainer: {
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  jobsTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.875rem',
    fontWeight: '700',
  },
  jobsError: {
    color: '#e74c3c',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  jobsList: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  jobCardTitle: {
    color: '#2c3e50',
    marginBottom: '5px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  jobCardText: {
    color: '#7f8c8d',
    marginBottom: '10px',
    fontSize: '0.875rem',
  },
  jobDetails: {
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  jobDetailsTitle: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  jobDetailsText: {
    color: '#7f8c8d',
    marginBottom: '5px',
    fontSize: '0.875rem',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  eventCardTitle: {
    color: '#2c3e50',
    marginBottom: '5px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  eventCardText: {
    color: '#7f8c8d',
    marginBottom: '10px',
    fontSize: '0.875rem',
  },
  eventDetails: {
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  eventDetailsTitle: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  eventDetailsText: {
    color: '#7f8c8d',
    marginBottom: '5px',
    fontSize: '0.875rem',
  },
  eventsContainer: {
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  eventsTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.875rem',
    fontWeight: '700',
  },
  eventsError: {
    color: '#e74c3c',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  eventsList: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  actionButton: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  actionButtonHover: {
    backgroundColor: '#1976D2',
  },
  profileBackButton: {
    backgroundColor: '#2196F3',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '5px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  jobRegisterButton: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  jobRegisterButtonHover: {
    backgroundColor: '#45a049',
  },
  registerButton: {
    backgroundColor: '#9b59b6',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  registerButtonHover: {
    backgroundColor: '#8e44ad',
  },
  knowMoreButton: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  knowMoreButtonHover: {
    backgroundColor: '#45a049',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  showMoreButtonContainer: {
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  showMoreButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  tabsContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #e5e7eb',
  },
  tabButton: {
    background: 'none',
    border: 'none',
    padding: '0.5rem 0',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#6b7280',
    transition: 'color 0.2s',
  },
  tabButtonActive: {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb',
    fontWeight: '600',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  listItemInitial: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: '600',
    flexShrink: '0',
  },
  listItemContent: {
    flexGrow: '1',
  },
  listItemTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  listItemSubtitle: {
    fontSize: '0.875rem',
    color: '#4b5563',
  },
  listItemSalary: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563',
    flexShrink: '0',
  },
  listItemSalarySmall: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
  },
  mentorActions: {
    flexShrink: '0',
  },
  notificationCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  notificationCardRead: {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
  },
  notificationActions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
  },
  notificationActionButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
  },
  storiesContainer: {
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  storiesTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.875rem',
    fontWeight: '700',
  },
  storiesSubtitle: {
    color: '#7f8c8d',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  storiesError: {
    color: '#e74c3c',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  storiesList: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  storyCard: {
    backgroundColor: '#ffffff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  storyCardTitle: {
    color: '#2c3e50',
    marginBottom: '5px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  storyCardText: {
    color: '#7f8c8d',
    marginBottom: '5px',
    fontSize: '0.875rem',
  },
  storyCardDate: {
    color: '#7f8c8d',
    marginBottom: '10px',
    fontSize: '0.875rem',
  },
  storyFullView: {
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  storyFullViewTitle: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  storyFullViewText: {
    color: '#7f8c8d',
    marginBottom: '10px',
    fontSize: '0.875rem',
  },
  chatContainer: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    width: '100%',
    boxSizing: 'border-box',
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  chatButton: {
    padding: '10px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  chatButtonHome: {
    backgroundColor: '#6B7280',
  },
  chatButtonHomeHover: {
    backgroundColor: '#4B5563',
  },
  chatButtonExit: {
    backgroundColor: '#ef4444',
  },
  chatButtonExitHover: {
    backgroundColor: '#dc2626',
  },
  verifyForm: {
    maxWidth: '640px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  verifyLabel: {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '6px',
  },
  verifyInput: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '12px',
  },
  chatMessages: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flex: 1,
  },
  messageCard: {
    padding: '8px 12px',
    margin: '6px 8px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  messageHeader: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
  },
  messageText: {
    fontSize: '15px',
    color: '#111827',
    whiteSpace: 'pre-wrap',
  },
  chatForm: {
    display: 'flex',
    gap: '8px',
  },
  chatInput: {
    flex: 1,
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  internshipsContainer: {
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  internshipsTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.875rem',
    fontWeight: '700',
  },
  internshipsError: {
    color: '#e74c3c',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  internshipsList: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  internshipCard: {
    backgroundColor: '#ffffff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  internshipCardTitle: {
    color: '#2c3e50',
    marginBottom: '5px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  internshipCardText: {
    color: '#7f8c8d',
    marginBottom: '10px',
    fontSize: '0.875rem',
  },
  internshipDetails: {
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  internshipDetailsTitle: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  internshipDetailsText: {
    color: '#7f8c8d',
    marginBottom: '5px',
    fontSize: '0.875rem',
  },
  profileContainer: {
    padding: '20px',
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  profileTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '1.875rem',
    fontWeight: '700',
  },
  profileText: {
    color: '#7f8c8d',
    marginBottom: '10px',
    fontSize: '0.875rem',
  },
};

// --- Initial Data ---
const initialMentorshipRequestsData = [
  { name: "Emma Wilson", field: "Computer Science", initial: "EW", color: "green" },
  { name: "David Park", field: "Business", initial: "DP", color: "orange" },
  { name: "Sophia Lee", field: "Engineering", initial: "SL", color: "indigo" },
  { name: "Ravi Sharma", field: "Data Science", initial: "RS", color: "purple" },
  { name: "Priya Singh", field: "UI/UX Design", initial: "PS", color: "pink" },
];

const initialNotificationsData = [
  { id: 1, text: "New event: Alumni Networking Night", source: "Events Team", time: "1h ago", icon: "[Calendar Icon]", read: false },
  { id: 2, text: "Your mentorship request was accepted!", source: "Dr. Emily Carter", time: "3h ago", icon: "[Users Icon]", read: false },
  { id: 3, text: "New internship posted by Microsoft", source: "Career Services", time: "1d ago", icon: "[Briefcase Icon]", read: false },
  { id: 4, text: "Reminder: Career workshop is tomorrow", source: "Events Team", time: "2d ago", icon: "[Calendar Icon]", read: true },
  { id: 5, text: "Job alert: New jobs in Bengaluru", source: "Job Board", time: "3d ago", icon: "[Briefcase Icon]", read: false },
  { id: 6, text: "New success story: Cracking UPSC", source: "Alumni Team", time: "4d ago", icon: "[BookOpen Icon]", read: true },
];

// --- Reusable Components ---
const StatCard = ({ icon, label, count, color }) => (
  <div style={styles.statCard}>
    <div style={{ ...styles.statCardIcon, color: colorMap[color]?.header || '#6b7280' }}>{icon}</div>
    <p style={styles.statCardCount}>{count.toLocaleString()}</p>
    <p style={styles.statCardLabel}>{label}</p>
  </div>
);

const SectionHeader = ({ title, buttonLabel, buttonIcon, onButtonClick }) => (
  <div style={styles.sectionHeader}>
    <h2 style={styles.sectionTitle}>{title}</h2>
    {buttonLabel && (
      <button onClick={onButtonClick} style={styles.actionButton}>
        {buttonIcon} {buttonLabel}
      </button>
    )}
  </div>
);

const ShowMoreButton = ({ onClick }) => (
  <div style={styles.showMoreButtonContainer}>
    <button onClick={onClick} style={styles.showMoreButton}>
      Show More &rarr;
    </button>
  </div>
);

// --- View Components ---
const EventsView = ({ setCurrentView }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
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
    window.open(googleFormLink || "https://www.google.com", "_blank");
  };

  const handleRegister = (eventUrl, eventName) => {
    window.open(eventUrl || "https://www.google.com", "_blank");
  alert(`Registering for: ${eventName}`);
  };

  return (
    <div style={styles.eventsContainer}>
      <h1 style={styles.eventsTitle}>Register for Events</h1>
      {error ? (
        <p style={styles.eventsError}>{error}</p>
      ) : (
        <>
          {events.length === 0 ? (
            <p style={styles.storiesSubtitle}>Loading events...</p>
          ) : (
            <div style={styles.eventsList}>
              {events.map((event) => (
                <div key={event.id} style={styles.eventCard}>
                  <h3 style={styles.eventCardTitle}>{event.eventName}</h3>
                  <p style={styles.eventCardText}>Location: {event.eventLocation || "N/A"}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleView(event)}
                      style={styles.actionButton}
                      onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                      onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRegister(event.eventUrl, event.eventName)}
                      style={styles.registerButton}
                      onMouseOver={(e) => (e.target.style.backgroundColor = styles.registerButtonHover.backgroundColor)}
                      onMouseOut={(e) => (e.target.style.backgroundColor = styles.registerButton.backgroundColor)}
                    >
                      Register
                    </button>
                    <button
                      onClick={() => handleKnowMore(event.googleFormLink)}
                      style={styles.knowMoreButton}
                      onMouseOver={(e) => (e.target.style.backgroundColor = styles.knowMoreButtonHover.backgroundColor)}
                      onMouseOut={(e) => (e.target.style.backgroundColor = styles.knowMoreButton.backgroundColor)}
                    >
                      Know More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedEvent && (
            <div style={styles.eventDetails}>
              <h3 style={styles.eventDetailsTitle}>Event Details</h3>
              <p style={styles.eventDetailsText}><strong>Name:</strong> {selectedEvent.eventName}</p>
              <p style={styles.eventDetailsText}><strong>Created At:</strong> {selectedEvent.createdAt || "N/A"}</p>
              <p style={styles.eventDetailsText}><strong>Date & Time:</strong> {selectedEvent.eventDateTime || "N/A"}</p>
              <p style={styles.eventDetailsText}><strong>Location:</strong> {selectedEvent.eventLocation || "N/A"}</p>
              <p style={styles.eventDetailsText}><strong>Organizer:</strong> {selectedEvent.eventOrganizer || "N/A"}</p>
              <button
                onClick={() => setSelectedEvent(null)}
                style={styles.actionButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setCurrentView('Dashboard')}
        style={{ ...styles.actionButton, padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

const JobsInternshipsView = ({ initialTab, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (activeTab === 'Jobs') {
      const fetchJobs = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "jobs"));
          const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setJobs(jobsData);
        } catch (err) {
          console.error("Error fetching jobs:", err.message);
          setError("Failed to load jobs. Please try again.");
        }
      };
      fetchJobs();
    } else if (activeTab === 'Internships') {
      const fetchInternships = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "internships"));
          const internshipsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setInternships(internshipsData);
        } catch (err) {
          console.error("Error fetching internships:", err.message);
          setError("Failed to load internships. Please try again.");
        }
      };
      fetchInternships();
    }
  }, [activeTab]);

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const handleRegisterJob = (jobUrl, jobRole) => {
    window.open(jobUrl || "https://www.google.com", "_blank");
  alert(`Registering for: ${jobRole}`);
  };

  const handleViewInternship = (internship) => {
    setSelectedInternship(internship);
  };

  const handleRegisterInternship = (internshipUrl, internshipRole) => {
    window.open(internshipUrl || "https://www.google.com", "_blank");
  alert(`Registering for: ${internshipRole}`);
  };

  return (
    <section style={styles.section}>
      <div style={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('Jobs')}
          style={activeTab === 'Jobs' ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('Internships')}
          style={activeTab === 'Internships' ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
        >
          Internships
        </button>
      </div>
      {activeTab === 'Jobs' && (
        <div style={styles.jobsContainer}>
          <h1 style={styles.jobsTitle}>Apply for Jobs</h1>
          {error ? (
            <p style={styles.jobsError}>{error}</p>
          ) : (
            <>
              {jobs.length === 0 ? (
                <p style={styles.storiesSubtitle}>Loading jobs...</p>
              ) : (
                <div style={styles.jobsList}>
                  {jobs.map((job) => (
                    <div key={job.id} style={styles.jobCard}>
                      <h3 style={styles.jobCardTitle}>{job.jobRole}</h3>
                      <p style={styles.jobCardText}>Location: {job.location || "N/A"}</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleViewJob(job)}
                          style={styles.actionButton}
                          onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                          onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleRegisterJob(job.jobUrl, job.jobRole)}
                          style={styles.jobRegisterButton}
                          onMouseOver={(e) => (e.target.style.backgroundColor = styles.jobRegisterButtonHover.backgroundColor)}
                          onMouseOut={(e) => (e.target.style.backgroundColor = styles.jobRegisterButton.backgroundColor)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedJob && (
                <div style={styles.jobDetails}>
                  <h3 style={styles.jobDetailsTitle}>Job Details</h3>
                  <p style={styles.jobDetailsText}><strong>Role:</strong> {selectedJob.jobRole}</p>
                  <p style={styles.jobDetailsText}><strong>Company:</strong> {selectedJob.companyName || "N/A"}</p>
                  <p style={styles.jobDetailsText}><strong>Location:</strong> {selectedJob.location || "N/A"}</p>
                  <p style={styles.jobDetailsText}><strong>Description:</strong> {selectedJob.description || "No description available"}</p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    style={styles.actionButton}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
                  >
                    Close
                  </button>
                </div>
              )}
            </>
          )}
          <button
            onClick={() => setCurrentView('Dashboard')}
            style={{ ...styles.actionButton, padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
          >
            Back to Dashboard
          </button>
        </div>
      )}
      {activeTab === 'Internships' && (
        <div style={styles.internshipsContainer}>
          <h1 style={styles.internshipsTitle}>Apply for Internships</h1>
          {error ? (
            <p style={styles.internshipsError}>{error}</p>
          ) : (
            <>
              {internships.length === 0 ? (
                <p style={styles.storiesSubtitle}>Loading internships...</p>
              ) : (
                <div style={styles.internshipsList}>
                  {internships.map((internship) => (
                    <div key={internship.id} style={styles.internshipCard}>
                      <h3 style={styles.internshipCardTitle}>{internship.internshipRole}</h3>
                      <p style={styles.internshipCardText}>remote: {internship.onlineOffline || "N/A"}</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleViewInternship(internship)}
                          style={styles.actionButton}
                          onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                          onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleRegisterInternship(internship.internshipUrl, internship.internshipRole)}
                          style={styles.jobRegisterButton}
                          onMouseOver={(e) => (e.target.style.backgroundColor = styles.jobRegisterButtonHover.backgroundColor)}
                          onMouseOut={(e) => (e.target.style.backgroundColor = styles.jobRegisterButton.backgroundColor)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedInternship && (
                <div style={styles.internshipDetails}>
                  <h3 style={styles.internshipDetailsTitle}>Internship Details</h3>
                  <p style={styles.internshipDetailsText}><strong>Role:</strong> {selectedInternship.internshipRole}</p>
                  <p style={styles.internshipDetailsText}><strong>Created At:</strong> {selectedInternship.createdAt || "N/A"}</p>
                  <p style={styles.internshipDetailsText}><strong>Duration:</strong> {selectedInternship.duration || "N/A"}</p>
                  <p style={styles.internshipDetailsText}><strong>Description:</strong> {selectedInternship.internshipDescription || "N/A"}</p>
                  <p style={styles.internshipDetailsText}><strong>Online/Offline:</strong> {selectedInternship.onlineOffline || "N/A"}</p>
                  <p style={styles.internshipDetailsText}><strong>Required Skills:</strong> {selectedInternship.requiredSkills || "N/A"}</p>
                  <p style={styles.internshipDetailsText}><strong>Stipend:</strong> {selectedInternship.stifund || "N/A"}</p>
                  <button
                    onClick={() => setSelectedInternship(null)}
                    style={styles.actionButton}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
                  >
                    Close
                  </button>
                </div>
              )}
            </>
          )}
          <button
            onClick={() => setCurrentView('Dashboard')}
            style={{ ...styles.actionButton, padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </section>
  );
};

const MentorshipView = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const showMore = () => setVisibleCount(prev => prev + 3);
  const hasMore = visibleCount < initialMentorshipRequestsData.length;

  return (
    <section style={styles.section}>
      <SectionHeader
        title="Find a Mentor"
        buttonLabel="Request a Mentor"
        buttonIcon="[Users Icon]"
        onButtonClick={() => console.log('Requesting a Mentor')}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {initialMentorshipRequestsData.slice(0, visibleCount).map((req, idx) => (
          <div key={idx} style={styles.listItem}>
            <div style={{ ...styles.listItemInitial, backgroundColor: colorMap[req.color]?.bg, color: colorMap[req.color]?.text }}>
              {req.initial}
            </div>
            <div style={styles.listItemContent}>
              <h4 style={styles.listItemTitle}>{req.name}</h4>
              <p style={styles.listItemSubtitle}>{req.field}</p>
            </div>
            <div style={styles.mentorActions}>
              <button
                onClick={() => console.log('Connecting with mentor:', req.name)}
                style={{ ...styles.actionButton, padding: '0.375rem 1rem' }}
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <ShowMoreButton onClick={showMore} />}
    </section>
  );
};

const NotificationsView = ({ notifications, setNotifications }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const showMore = () => setVisibleCount(prev => prev + 3);
  const hasMore = visibleCount < notifications.length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    console.log('Marking as read:', id);
  };

  return (
    <section style={styles.section}>
      <SectionHeader title="Notifications" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.slice(0, visibleCount).map((note) => (
          <div key={note.id} style={{ ...styles.notificationCard, ...(note.read && styles.notificationCardRead) }}>
            {note.icon}
            <div style={styles.listItemContent}>
              <p style={{ fontSize: '0.875rem' }}>{note.text}</p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{note.source} · {note.time}</p>
              <div style={styles.notificationActions}>
                {!note.read && (
                  <button onClick={() => handleMarkAsRead(note.id)} style={styles.notificationActionButton}>Mark as Read</button>
                )}
                <button onClick={() => console.log('Viewing notification:', note.text)} style={styles.notificationActionButton}>View</button>
                <button onClick={() => console.log('Replying to notification:', note.text)} style={styles.notificationActionButton}>Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <ShowMoreButton onClick={showMore} />}
    </section>
  );
};

const StoriesView = ({ setCurrentView }) => {
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
    <div style={styles.storiesContainer}>
      <h1 style={styles.storiesTitle}>View Stories</h1>
      <p style={styles.storiesSubtitle}>Explore inspiring stories from alumni and students here.</p>
      {error ? (
        <p style={styles.storiesError}>{error}</p>
      ) : (
        <>
          {stories.length === 0 ? (
            <p style={styles.storiesSubtitle}>Loading stories...</p>
          ) : (
            <div style={styles.storiesList}>
              {stories.map((story) => (
                <div key={story.id} style={styles.storyCard}>
                  <h3 style={styles.storyCardTitle}>{story.alumniName}</h3>
                  <p style={styles.storyCardText}><strong>Job Role:</strong> {story.alumniJobRole || "N/A"}</p>
                  <p style={styles.storyCardText}>
                    <strong>Story Preview:</strong> {story.alumniStory ? `${story.alumniStory.substring(0, 50)}...` : "N/A"}
                  </p>
                  <p style={styles.storyCardDate}><strong>Created At:</strong> {story.createdAt || "N/A"}</p>
                  <button
                    onClick={() => handleView(story)}
                    style={styles.actionButton}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
          {selectedStory && (
            <div style={styles.storyFullView}>
              <h3 style={styles.storyFullViewTitle}>Full Story</h3>
              <p style={styles.storyFullViewText}>{selectedStory.alumniStory || "No story available"}</p>
              <button
                onClick={() => setSelectedStory(null)}
                style={styles.actionButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setCurrentView('Dashboard')}
        style={{ ...styles.actionButton, padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

const LiveChatView = ({ setCurrentView }) => {
  const [fullName, setFullName] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [role, setRole] = useState("student");
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  async function handleVerify(e) {
    e.preventDefault();
    setError("");
    const trimmedName = fullName.trim();
    const trimmedRegd = regdNo.trim();
    if (!trimmedName || !trimmedRegd) {
      setError("Full name and registration number are required");
      return;
    }
    try {
      const targetCollection = role === "alumni" ? "alumni" : "students";
      const q = query(
        collection(db, targetCollection),
        where("fullName", "==", trimmedName),
        where("regdNo", "==", trimmedRegd)
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        setError("No matching record found in Firebase. Check details and role.");
        return;
      }
      const userData = { fullName: trimmedName, regdNo: trimmedRegd, role };
      setVerifiedUser(userData);
      startMessagesListener();
    } catch (err) {
      console.error("Verification error:", err);
      setError("Verification failed. Please try again.");
    }
  }

  function startMessagesListener() {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    setLoadingMessages(true);
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(200)
    );
    unsubscribeRef.current = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(items);
        setLoadingMessages(false);
      },
      (err) => {
        console.error("onSnapshot error:", err);
        setLoadingMessages(false);
        setError("Failed to load messages. Please try again.");
      }
    );
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!verifiedUser) return;
    const text = newMessage.trim();
    if (!text) return;
    try {
      await addDoc(collection(db, "messages"), {
        text,
        senderName: verifiedUser.fullName,
        regdNo: verifiedUser.regdNo,
        role: verifiedUser.role,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Send message error:", err);
      setError("Failed to send message. Try again.");
    }
  }

  function handleExit() {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    setVerifiedUser(null);
    setMessages([]);
    setError("");
  }

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <h1 style={styles.sectionTitle}>Live Chat</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentView('Dashboard')}
            style={{ ...styles.chatButton, ...styles.chatButtonHome }}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.chatButtonHomeHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.chatButtonHome.backgroundColor)}
          >
            Home
          </button>
          {verifiedUser && (
            <button
              onClick={handleExit}
              style={{ ...styles.chatButton, ...styles.chatButtonExit }}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.chatButtonExitHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.chatButtonExit.backgroundColor)}
            >
              Exit Chat
            </button>
          )}
        </div>
      </div>
      {!verifiedUser ? (
        <div style={styles.verifyForm}>
          <p style={styles.storiesSubtitle}>Enter your details to join the chat. We will verify them against Firebase.</p>
          {error && (
            <div style={styles.errorMessage}>{error}</div>
          )}
          <form onSubmit={handleVerify} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <label style={styles.verifyLabel}>Role:</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#374151' }}>
                <input type="radio" name="role" value="student" checked={role === "student"} onChange={(e) => setRole(e.target.value)} /> Student
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#374151' }}>
                <input type="radio" name="role" value="alumni" checked={role === "alumni"} onChange={(e) => setRole(e.target.value)} /> Alumni
              </label>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
              <label style={styles.verifyLabel}>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                style={styles.verifyInput}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={styles.verifyLabel}>Registration Number</label>
              <input
                value={regdNo}
                onChange={(e) => setRegdNo(e.target.value)}
                placeholder="Enter your regd no"
                style={styles.verifyInput}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button
                type="submit"
                style={{ ...styles.actionButton, width: '100%', padding: '12px 16px', fontSize: '16px', fontWeight: '600' }}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.actionButton.backgroundColor)}
              >
                Join Chat
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateRows: '1fr auto', gap: '12px', height: 'calc(100vh - 140px)' }}>
          <div style={styles.chatMessages}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', color: '#374151' }}>
                Signed in as <strong>{verifiedUser.fullName}</strong> ({verifiedUser.role}, {verifiedUser.regdNo})
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 4px' }}>
              {loadingMessages ? (
                <div style={{ textAlign: 'center', color: '#6b7280', padding: '16px' }}>Loading messages…</div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} style={styles.messageCard}>
                    <div style={styles.messageHeader}>
                      <strong style={{ color: '#111827' }}>{m.senderName || "Unknown"}</strong> • {m.role || "user"} • {m.regdNo || "-"}
                    </div>
                    <div style={styles.messageText}>{m.text}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSendMessage} style={styles.chatForm}>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message…"
              style={styles.chatInput}
            />
            <button
              type="submit"
              style={{ ...styles.actionButton, padding: '12px 16px', fontSize: '16px', fontWeight: '600', minWidth: '120px', backgroundColor: '#10B981' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#10B981')}
            >
              Send
            </button>
          </form>
          {error && (
            <div style={styles.errorMessage}>{error}</div>
          )}
        </div>
      )}
    </div>
  );
};

const ProfileView = ({ setCurrentView }) => (
  <div style={styles.profileContainer}>
    <h1 style={styles.profileTitle}>Student Profile</h1>
    <p style={styles.profileText}>Name: [Student Name]</p>
    <p style={styles.profileText}>Enrollment Year: [Year]</p>
    <p style={styles.profileText}>Department: [Department]</p>
    <p style={styles.profileText}>Email: [Student Email]</p>
    <p style={styles.profileText}>Location: [Location]</p>
    <button
      onClick={() => setCurrentView('Dashboard')}
      style={styles.profileBackButton}
      onMouseOver={(e) => (e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
      onMouseOut={(e) => (e.target.style.backgroundColor = styles.profileBackButton.backgroundColor)}
    >
      Back to Dashboard
    </button>
  </div>
);

const HomeView = () => (
  <section style={styles.section}>
    <h2 style={styles.sectionTitle}>Logout</h2>
    <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>You have been logged out.</p>
    <button
      onClick={() => console.log('Logging back in')}
      style={{ ...styles.actionButton, width: '100%', justifyContent: 'center', backgroundColor: '#4CAF50' }}
    >
      Log Back In
    </button>
  </section>
);

// --- Main App Component ---
export default function App() {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [notifications, setNotifications] = useState(initialNotificationsData);

  const navItems = [
    { label: 'Dashboard', view: 'Dashboard' },
    { label: 'Events', view: 'Events' },
    { label: 'Jobs', view: 'Jobs' },
    { label: 'Internships', view: 'Internships' },
    { label: 'Mentorship', view: 'Mentorship' },
    { label: 'Notifications', view: 'Notifications' },
    { label: 'Stories', view: 'Stories' },
    { label: 'Live Chat', view: 'LiveChat', icon: '[MessageSquare Icon]' },
    { label: 'Profile', view: 'Profile', icon: '[User Icon]' },
    { label: 'Logout', view: 'Home', icon: '[LogOut Icon]' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'Events':
        return <EventsView setCurrentView={setCurrentView} />;
      case 'Jobs':
        return <JobsInternshipsView initialTab="Jobs" setCurrentView={setCurrentView} />;
      case 'Internships':
        return <JobsInternshipsView initialTab="Internships" setCurrentView={setCurrentView} />;
      case 'Mentorship':
        return <MentorshipView />;
      case 'Notifications':
        return <NotificationsView notifications={notifications} setNotifications={setNotifications} />;
      case 'Stories':
        return <StoriesView setCurrentView={setCurrentView} />;
      case 'LiveChat':
        return <LiveChatView setCurrentView={setCurrentView} />;
      case 'Profile':
        return <ProfileView setCurrentView={setCurrentView} />;
      case 'Home':
        return <HomeView />;
      case 'Dashboard':
      default:
        return (
          <>
            <section style={styles.welcomeBanner}>
              <div style={styles.welcomeTextContainer}>
                <h2 style={styles.welcomeTitle}>Welcome back, Student!</h2>
                <p style={styles.welcomeSubtitle}>Here's what's new for you.</p>
              </div>
              <button onClick={() => setCurrentView('Profile')} style={styles.profileButton}>
                My Profile
              </button>
            </section>
            <section style={styles.section}>
              <div style={styles.statsGrid}>
                <StatCard icon="[Users Icon]" label="Alumni Network" count={1250} color="blue" />
                <StatCard icon="[Calendar Icon]" label="Upcoming Events" count={10} color="green" />
                <StatCard icon="[Briefcase Icon]" label="Open Jobs" count={85} color="red" />
                <StatCard icon="[GraduationCap Icon]" label="Available Mentors" count={40} color="purple" />
                <StatCard icon="[BookOpen Icon]" label="Success Stories" count={25} color="orange" />
              </div>
            </section>
            <EventsView setCurrentView={setCurrentView} />
            <JobsInternshipsView initialTab="Jobs" setCurrentView={setCurrentView} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <MentorshipView />
              <NotificationsView notifications={notifications} setNotifications={setNotifications} />
            </div>
            <StoriesView setCurrentView={setCurrentView} />
          </>
        );
    }
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <h1 style={styles.navTitle}>Student Portal</h1>
          <div style={styles.navLinks}>
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                style={currentView === item.view ? { ...styles.navButton, ...styles.navButtonActive } : styles.navButton}
              >
                {item.icon && <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <main style={styles.main}>
        {renderContent()}
      </main>
    </div>
  );
}