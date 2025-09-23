import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


/* ---------- Inline Icons ---------- */
const IconCalendar = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Calendar icon">
    <title>Calendar</title><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconBriefcase = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Briefcase icon">
    <title>Briefcase</title><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const IconMail = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Mail icon">
    <title>Mail</title><path d="M4 4h16v16H4z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconBook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Book icon">
    <title>Book</title><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20" /><path d="M20 22V2" />
  </svg>
);
const IconBell = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Bell icon">
    <title>Notifications</title><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconDashboard = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Dashboard icon">
    <title>Dashboard</title><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const IconUser = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="User icon">
      <title>User Profile</title><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);
const IconMessage = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Live Chat icon">
        <title>Live Chat</title><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);
const IconSend = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Send Message icon">
     <title>Send</title><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);


/* ---------- Mock Data ---------- */
const genArray = (arr, n) => Array.from({ length: n }, (_, i) => ({ ...arr[i % arr.length], id: i + 1 }));

const eventsSample = [{ title: "Alumni Networking Night", date: "Oct 10, 2025 · 6:30 PM IST", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", id: 1 }, { title: "Career Development Workshop", date: "Nov 15, 2025 · 3:00 PM IST", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", id: 2 }, { title: "Tech Innovation Panel", date: "Dec 5, 2025 · 11:00 AM IST", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80", id: 3 }];
const jobsSample = [{ title: "Senior Software Engineer", company: "TechCorp", location: "Bengaluru", salary: "₹12–15 LPA", logo: "https://placehold.co/64x64/6366F1/FFF?text=TC", link: "#", id: 1 }, { title: "Marketing Manager", company: "StartupX", location: "Remote", salary: "₹8–10 LPA", logo: "https://placehold.co/64x64/F43F5E/FFF?text=SX", link: "#", id: 2 }, { title: "UI/UX Designer", company: "DesignPro", location: "Hyderabad", salary: "₹9–11 LPA", logo: "https://placehold.co/64x64/F59E0B/FFF?text=DP", link: "#", id: 3 }, { title: "Data Analyst", company: "DataWorks", location: "Mumbai", salary: "₹10–12 LPA", logo: "https://placehold.co/64x64/10B981/FFF?text=DW", link: "#", id: 4 }];
const internsSample = [{ title: "Data Science Intern", company: "DataInc", location: "Hyderabad", stipend: "₹20k/month", logo: "https://placehold.co/64x64/10B981/FFF?text=DI", link: "#", id: 1 }, { title: "Web Dev Intern", company: "CodeBase", location: "Remote", stipend: "₹15k/month", logo: "https://placehold.co/64x64/6366F1/FFF?text=CB", link: "#", id: 2 }, { title: "Marketing Intern", company: "Brandify", location: "Delhi", stipend: "₹12k/month", logo: "https://placehold.co/64x64/F43F5E/FFF?text=BF", link: "#", id: 3 }];
const mentorsSample = [{ name: "Emma Wilson", field: "Computer Science", photo: "https://placehold.co/60x60/34D399/FFF?text=EW", id: 1 }, { name: "David Park", field: "Business", photo: "https://placehold.co/60x60/F59E0B/FFF?text=DP", id: 2 }, { name: "Sophia Lee", field: "Engineering", photo: "https://placehold.co/60x60/6366F1/FFF?text=SL", id: 3 }];
const notifsSample = [{ text: "📅 New event: Alumni Networking Night", time: "1h ago", from: "Alumni Office", }, { text: "👩‍🎓 You have 2 new mentorship requests", time: "3h ago", from: "Mentorship Center", }, { text: "📈 Your job posting got 15 applications", time: "1d ago", from: "Career Services", }];
const storiesSample = [{ title: "From Campus to CEO", contributor: "Sarah", image: "https://placehold.co/200x120/F59E0B/FFF?text=CEO", id: 1 }, { title: "Cracked UPSC with Alumni Help", contributor: "Sarah", image: "https://placehold.co/200x120/34D399/FFF?text=UPSC", id: 2 }, { title: "Built a Startup from Scratch", contributor: "Alex", image: "https://placehold.co/200x120/6366F1/FFF?text=Startup", id: 3 }];

const mentorshipData = genArray(mentorsSample, 10);
const notificationsData = genArray(notifsSample, 10);

/* ---------- Main App Component ---------- */
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Mock Firebase Config - Replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};


export default function App() {
  const user = { name: "Sarah", photo: "https://placehold.co/32x32/2563EB/FFF?text=S", uid: "sarah123" };
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [currentView, setCurrentView] = useState('main'); // 'main', 'createEvent', 'createJob', 'createInternship', 'createStory'

  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  
  const [events, setEvents] = useState(genArray(eventsSample, 10));
  const [mentorships, setMentorships] = useState(mentorshipData);
  const [notifications, setNotifications] = useState(notificationsData);
  const [replyOpen, setReplyOpen] = useState({});
  const [replies, setReplies] = useState({});
  const [stories, setStories] = useState(storiesSample);
  const [showMore, setShowMore] = useState({ events: false, jobs: false, internships: false, mentorship: false, notifications: false, stories: false });
  const [jobs, setJobs] = useState(genArray(jobsSample, 10));
  const [internships, setInternships] = useState(genArray(internsSample, 10));
  const [userPhoto, setUserPhoto] = useState(user.photo);
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' });
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Firebase Initialization
  useEffect(() => {
    try {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);
        setAuth(authInstance);
        setDb(dbInstance);

        signInAnonymously(authInstance).catch(error => {
            console.error("Anonymous sign-in failed:", error);
        });

    } catch (e) {
        console.error("Firebase initialization error:", e);
    }
  }, []);

  const mockProfileData = { name: "Sarah Alumni", email: "sarah.alumni@example.com", graduationYear: 2018, degree: "Bachelor of Science in Computer Science", currentCompany: "Tech Innovations Inc.", position: "Senior Software Engineer", skills: ["JavaScript", "React", "Node.js", "Python", "GraphQL"], location: "San Francisco, CA", linkedIn: "linkedin.com/in/sarahalumni" };
  
  React.useEffect(() => {
    if (selectedSection === 'profile' && !profileData) {
      setLoadingProfile(true);
      setTimeout(() => { setProfileData(mockProfileData); setLoadingProfile(false); }, 800);
    }
    if (selectedSection !== 'profile' && profileData) { setProfileData(null); }
  }, [selectedSection, profileData]);

  const showModal = (title, message) => setModal({ isOpen: true, title, message });
  const closeModal = () => setModal({ isOpen: false, title: '', message: '' });

  /* ---- Handlers ---- */
  const sliceOrAll = (arr, key) => (showMore[key] ? arr : arr.slice(0, 3));
  const handleMentorship = (id, status) => setMentorships(mentorships.map((m) => (m.id === id ? { ...m, status } : m)));
  const handleMarkAsRead = (text) => setNotifications(notifications.filter((n) => n.text !== text));
  const toggleReply = (text) => setReplyOpen({ ...replyOpen, [text]: !replyOpen[text] });
  const handleReplySubmit = (text) => { const replyText = replies[text] || ""; if (!replyText.trim()) return; showModal("Reply Sent", `Your reply to "${text}" has been sent: "${replyText}"`); setReplies({ ...replies, [text]: "" }); setReplyOpen({ ...replyOpen, [text]: false }); };
  const handleEventCreate = (newEventData) => { const formattedDate = new Date(newEventData.eventDateTime).toLocaleString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).replace(',', ' ·'); const finalEvent = { ...newEventData, id: Date.now(), date: formattedDate, title: newEventData.eventName, image: newEventData.eventUrl || `https://placehold.co/400x250/94A3B8/FFF?text=${newEventData.eventName.substring(0,10)}` }; setEvents(prevEvents => [finalEvent, ...prevEvents]); showModal("Success", "🎉 Event added successfully!"); setCurrentView('main'); };
  const handleJobCreate = (newJobData) => { const newJob = { id: Date.now(), title: newJobData.jobRole, company: newJobData.companyName, location: newJobData.location, salary: newJobData.salary, logo: `https://placehold.co/64x64/2563EB/FFF?text=${newJobData.companyName.substring(0,2).toUpperCase()}`, link: newJobData.jobUrl }; setJobs(prevJobs => [newJob, ...prevJobs]); showModal("Success", "🎉 Job added successfully!"); setCurrentView('main'); };
  const handleInternshipCreate = (newInternshipData) => { const newInternship = { id: Date.now(), title: newInternshipData.internshipRole, company: "N/A", location: newInternshipData.onlineOffline, stipend: newInternshipData.stipend, logo: `https://placehold.co/64x64/059669/FFF?text=INTRN`, link: newInternshipData.internshipUrl }; setInternships(prevInternships => [newInternship, ...prevInternships]); showModal("Success", "🎉 Internship added successfully!"); setCurrentView('main'); };
  const handleStoryCreate = (newStoryData) => { const newStory = { id: Date.now(), title: newStoryData.alumniStory.substring(0, 30) + '...', contributor: newStoryData.alumniName, image: `https://placehold.co/200x120/34D399/FFF?text=${newStoryData.alumniName.substring(0,2).toUpperCase()}` }; setStories(prevStories => [newStory, ...prevStories]); showModal("Success", "🎉 Story added successfully!"); setCurrentView('main'); };
  const handleCloseInternship = (id) => setInternships(internships.filter((intern) => intern.id !== id));
  const handleCloseJob = (id) => setJobs(jobs.filter((job) => job.id !== id));
  const handlePhotoChange = (e) => { e.preventDefault(); const newPhoto = e.target.photoUrl.value || user.photo; setUserPhoto(newPhoto); setShowPhotoInput(false); };
  
  /* ---- Section Components ---- */
  const Section = ({ children, className = '' }) => <div className={`section-container ${className}`}>{children}</div>;
  const SectionTitle = ({ children }) => <h2 className="section-title">{children}</h2>;
  const Card = ({ children, className = '' }) => <div className={`card ${className}`}>{children}</div>;
  const WelcomeHeader = () => (<Section> <div className="flex-container"> <div> <h1 className="section-title">Welcome back, {user.name}!</h1> <p className="text-muted">Manage all your alumni activities in one place.</p> </div> </div> </Section>);
  const SummaryCard = ({ icon, value, label, colorClass }) => ( <div className="summary-card"> {icon} <div className={`summary-value ${colorClass}`}>{value}</div> <div className="summary-label">{label}</div> </div> );
  const Summary = () => ( <section className="summary-grid"> <SummaryCard icon={<IconCalendar className="icon"/>} value={events.length} label="Events" colorClass="text-success" /> <SummaryCard icon={<IconBriefcase className="icon"/>} value={jobs.length} label="Jobs" colorClass="text-danger" /> <SummaryCard icon={<IconBriefcase className="icon"/>} value={internships.length} label="Internships" colorClass="text-warning" /> <SummaryCard icon={<IconBell className="icon"/>} value={notifications.length} label="Notifications" colorClass="text-primary" /> <SummaryCard icon={<IconMail className="icon"/>} value={mentorships.filter((m) => m.status !== "rejected").length} label="Mentors" colorClass="text-purple" /> <SummaryCard icon={<IconBook className="icon"/>} value={stories.length} label="Stories" colorClass="text-warning" /> </section> );
  const Opportunities = () => ( <section className="jobs-internships-grid"> <Section> <div className="flex-container"> <SectionTitle>Jobs</SectionTitle> <button onClick={() => setCurrentView('createJob')} className="btn btn-primary">Post Job</button> </div> {sliceOrAll(jobs, "jobs").map((job) => ( <Card key={job.id} className="card-flex"> <img src={job.logo} alt={`${job.company} logo`} className="logo-image" /> <div className="card-content"> <h3 className="card-title">{job.title}</h3> <p className="text-muted">{job.company} · {job.location}</p> <p className="text-success">{job.salary}</p> <a href={job.link} className="card-link" target="_blank" rel="noopener noreferrer">Apply Now</a> </div> <button onClick={() => handleCloseJob(job.id)} className="btn btn-danger btn-small">Close</button> </Card> ))} <button onClick={() => setShowMore({ ...showMore, jobs: !showMore.jobs })} className="btn btn-secondary mt-4">{showMore.jobs ? "Show Less" : "Show More"}</button> </Section> <Section> <div className="flex-container"> <SectionTitle>Internships</SectionTitle> <button onClick={() => setCurrentView('createInternship')} className="btn btn-primary">Post Internship</button> </div> {sliceOrAll(internships, "internships").map((intern) => ( <Card key={intern.id} className="card-flex"> <img src={intern.logo} alt={`${intern.company} logo`} className="logo-image" /> <div className="card-content"> <h3 className="card-title">{intern.title}</h3> <p className="text-muted">{intern.company} · {intern.location}</p> <p className="text-success">{intern.stipend}</p> <a href={intern.link} className="card-link" target="_blank" rel="noopener noreferrer">Apply Now</a> </div> <button onClick={() => handleCloseInternship(intern.id)} className="btn btn-danger btn-small">Close</button> </Card> ))} <button onClick={() => setShowMore({ ...showMore, internships: !showMore.internships })} className="btn btn-secondary mt-4">{showMore.internships ? "Show Less" : "Show More"}</button> </Section> </section> );
  const Inbox = () => ( <section className="mentorship-notifications-grid"> <Section> <SectionTitle>Mentorship Requests</SectionTitle> {sliceOrAll(mentorships, "mentorship").map((m) => ( <Card key={m.id} className="card-flex"> <img src={m.photo} alt={`${m.name} photo`} className="logo-image" /> <div className="card-content"> <h3 className="card-title">{m.name}</h3> <p className="text-muted">{m.field}</p> {!m.status ? ( <div className="button-group"> <button onClick={() => handleMentorship(m.id, "accepted")} className="btn btn-success">Accept</button> <button onClick={() => handleMentorship(m.id, "rejected")} className="btn btn-danger">Reject</button> </div> ) : ( <span className={`font-semibold ${m.status === 'accepted' ? 'text-success' : 'text-danger'}`}>{capitalize(m.status)}</span>)} </div> <button onClick={() => showModal("View Profile", `Displaying profile for ${m.name}.`)} className="btn btn-primary btn-small">Profile</button> </Card> ))} <button onClick={() => setShowMore({ ...showMore, mentorship: !showMore.mentorship })} className="btn btn-secondary mt-4">{showMore.mentorship ? "Show Less" : "Show More"}</button> </Section> <Section> <SectionTitle>Notifications</SectionTitle> {sliceOrAll(notifications, "notifications").map((n, i) => ( <Card key={i}> <p>{n.text}</p> <p className="text-muted text-small">From: {n.from} · {n.time}</p> <div className="button-group"> <button onClick={() => handleMarkAsRead(n.text)} className="btn btn-secondary btn-small">Mark as Read</button> <button onClick={() => toggleReply(n.text)} className="btn btn-primary btn-small">Reply</button> </div> {replyOpen[n.text] && ( <div className="reply-container"> <textarea className="form-input" rows="2" value={replies[n.text] || ""} onChange={(e) => setReplies({ ...replies, [n.text]: e.target.value })} placeholder="Type your reply..." /> <button onClick={() => handleReplySubmit(n.text)} className="btn btn-success btn-small">Send</button> </div> )} </Card> ))} <button onClick={() => setShowMore({ ...showMore, notifications: !showMore.notifications })} className="btn btn-secondary mt-4">{showMore.notifications ? "Show Less" : "Show More"}</button> </Section> </section> );
  const AllStories = () => ( <Section> <div className="flex-container"> <SectionTitle>Success Stories</SectionTitle> <button onClick={() => setCurrentView('createStory')} className="btn btn-primary">Write a Story</button> </div> <div className="stories-grid"> {sliceOrAll(stories, "stories").map((s) => ( <Card key={s.id} className="text-center"> <img src={s.image} alt={s.title} className="card-image" /> <h3 className="card-title">{s.title}</h3> <p className="text-muted">by {s.contributor}</p> </Card> ))} </div> <button onClick={() => setShowMore({ ...showMore, stories: !showMore.stories })} className="btn btn-secondary mt-4">{showMore.stories ? "Show Less" : "Show More"}</button> </Section> );
  const AllEvents = () => ( <Section> <div className="flex-container"> <SectionTitle>Upcoming Events</SectionTitle> <button onClick={() => setCurrentView('createEvent')} className="btn btn-primary">Create Event</button> </div> <div className="events-grid"> {sliceOrAll(events, "events").map((ev) => ( <Card key={ev.id}> <img src={ev.image} alt={ev.title} className="card-image" /> <h3 className="card-title">{ev.title}</h3> <p className="text-muted">{ev.date}</p> </Card> ))} </div> <button onClick={() => setShowMore({ ...showMore, events: !showMore.events })} className="btn btn-secondary mt-4">{showMore.events ? "Show Less" : "Show More"}</button> </Section> );
  const AlumniEventForm = ({ onEventCreate, onBack }) => { const [eventName, setEventName] = useState(""); const [eventLocation, setEventLocation] = useState(""); const [eventDateTime, setEventDateTime] = useState(""); const [eventOrganizer, setEventOrganizer] = useState(""); const [googleFormLink, setGoogleFormLink] = useState(""); const [eventUrl, setEventUrl] = useState(""); const [error, setError] = useState(""); const [isLoading, setIsLoading] = useState(false); const handleSubmit = async (e) => { e.preventDefault(); setError(""); if (!eventName || !eventLocation || !eventDateTime || !eventOrganizer || !googleFormLink) { setError("All mandatory fields must be filled."); return; } setIsLoading(true); setTimeout(() => { onEventCreate({ eventName, eventLocation, eventDateTime, eventOrganizer, googleFormLink, eventUrl }); setIsLoading(false); }, 1000); }; return ( <div className="event-form-wrapper"> <div className="form-container-event"> <h2 className="event-form-title"> Add Alumni Event </h2> {error && <div className="event-form-error">{error}</div>} <form onSubmit={handleSubmit} className="event-form-body"> <label className="event-form-label">📝 Event Name * <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="input-field" placeholder="Enter event name" required/> </label> <label className="event-form-label">📍 Event Location * <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="input-field" placeholder="Enter venue or location" required/> </label> <label className="event-form-label">📅 Event Date & Time * <p>Please select the date and time for your event</p> <input type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} className="input-field" required/> </label> <label className="event-form-label">👤 Event Organizer * <input type="text" value={eventOrganizer} onChange={(e) => setEventOrganizer(e.target.value)} className="input-field" placeholder="Enter organizer name" required/> </label> <label className="event-form-label">📋 Google Form Registration Link * <input type="url" value={googleFormLink} onChange={(e) => setGoogleFormLink(e.target.value)} className="input-field" placeholder="https://forms.google.com/..." required/> </label> <label className="event-form-label">🔗 Event URL (Optional) <input type="url" value={eventUrl} onChange={(e) => setEventUrl(e.target.value)} className="input-field" placeholder="https://example.com/event-details"/> </label> <button type="submit" disabled={isLoading} className="btn-event-submit"> {isLoading ? "🔄 Adding Event..." : "🎉 Add Event"} </button> </form> <button onClick={onBack} className="btn-back"> ← Back to Alumni Dashboard </button> </div> <div className="floating-shapes"> <div className="shape"></div> <div className="shape"></div> <div className="shape"></div> </div> </div> ); };
  const AlumniJobForm = ({ onJobCreate, onBack }) => { const [jobRole, setJobRole] = useState(""); const [companyName, setCompanyName] = useState(""); const [salary, setSalary] = useState(""); const [location, setLocation] = useState(""); const [jobUrl, setJobUrl] = useState(""); const [jobDescription, setJobDescription] = useState(""); const [requiredSkills, setRequiredSkills] = useState(""); const [error, setError] = useState(""); const [isLoading, setIsLoading] = useState(false); const handleSubmit = async (e) => { e.preventDefault(); setError(""); if (!jobRole || !companyName || !salary || !location || !jobUrl || !jobDescription || !requiredSkills) { setError("All fields must be filled."); return; } setIsLoading(true); setTimeout(() => { onJobCreate({ jobRole, companyName, salary, location, jobUrl, jobDescription, requiredSkills }); setIsLoading(false); }, 1000); }; return ( <div className="event-form-wrapper"> <div className="form-container-event"> <h2 className="event-form-title"> Add Alumni Job </h2> {error && <div className="event-form-error">{error}</div>} <form onSubmit={handleSubmit} className="event-form-body"> <label className="event-form-label">💼 Job Role * <input type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} className="input-field" placeholder="Enter job role" required/> </label> <label className="event-form-label">🏢 Company Name * <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input-field" placeholder="Enter company name" required/> </label> <label className="event-form-label">💰 Salary (in ₹) * <p>Enter amount in Rupees (e.g., ₹50,000 per annum)</p> <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} className="input-field" placeholder="₹60,0000 per annum" required/> </label> <label className="event-form-label">📍 Location * <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field" placeholder="Enter location" required/> </label> <label className="event-form-label">🔗 Job URL * <input type="url" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} className="input-field" placeholder="https://example.com/job-details" required/> </label> <label className="event-form-label">📝 Job Description * <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="input-field" style={{ minHeight: "100px" }} placeholder="Enter job description" required/> </label> <label className="event-form-label">🎯 Required Skills * <textarea value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} className="input-field" style={{ minHeight: "100px" }} placeholder="Enter required skills (e.g., Java, Python)" required/> </label> <button type="submit" disabled={isLoading} className="btn-event-submit"> {isLoading ? "🔄 Adding Job..." : "🎉 Add Job"} </button> </form> <button onClick={onBack} className="btn-back"> ← Back to Alumni Dashboard </button> </div> <div className="floating-shapes"> <div className="shape"></div> <div className="shape"></div> <div className="shape"></div> </div> </div> ); };
  const AlumniInternshipForm = ({ onInternshipCreate, onBack }) => { const [internshipDescription, setInternshipDescription] = useState(""); const [internshipRole, setInternshipRole] = useState(""); const [internshipUrl, setInternshipUrl] = useState(""); const [onlineOffline, setOnlineOffline] = useState("online"); const [requiredSkills, setRequiredSkills] = useState(""); const [duration, setDuration] = useState(""); const [stipend, setStipend] = useState(""); const [error, setError] = useState(""); const [isLoading, setIsLoading] = useState(false); const handleSubmit = async (e) => { e.preventDefault(); setError(""); if (!internshipDescription || !internshipRole || !internshipUrl || !requiredSkills || !duration || !stipend) { setError("All fields must be filled."); return; } setIsLoading(true); setTimeout(() => { onInternshipCreate({ internshipDescription, internshipRole, internshipUrl, onlineOffline, requiredSkills, duration, stipend }); setIsLoading(false); }, 1000); }; return ( <div className="event-form-wrapper"> <div className="form-container-event"> <h2 className="event-form-title"> Add Alumni Internship </h2> {error && <div className="event-form-error">{error}</div>} <form onSubmit={handleSubmit} className="event-form-body"> <label className="event-form-label">📝 Internship Description * <textarea value={internshipDescription} onChange={(e) => setInternshipDescription(e.target.value)} className="input-field" style={{ minHeight: "100px" }} placeholder="Enter internship description" required/> </label> <label className="event-form-label">💼 Internship Role * <input type="text" value={internshipRole} onChange={(e) => setInternshipRole(e.target.value)} className="input-field" placeholder="Enter internship role" required/> </label> <label className="event-form-label">🔗 Internship URL * <input type="url" value={internshipUrl} onChange={(e) => setInternshipUrl(e.target.value)} className="input-field" placeholder="https://example.com/internship-details" required/> </label> <label className="event-form-label">🌐 Online/Offline * <select value={onlineOffline} onChange={(e) => setOnlineOffline(e.target.value)} className="input-field" required> <option value="online">Online</option> <option value="offline">Offline</option> </select> </label> <label className="event-form-label">💰 Stipend (in ₹) * <p>Enter amount in Rupees (e.g., ₹10,000 per month)</p> <input type="text" value={stipend} onChange={(e) => setStipend(e.target.value)} className="input-field" placeholder="₹10,000 per month" required/> </label> <label className="event-form-label">⏳ Duration * <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="input-field" placeholder="Enter duration (e.g., 3 months)" required/> </label> <label className="event-form-label">🎯 Required Skills * <textarea value={requiredSkills} onChange={(e) => setRequiredSkills(e.target.value)} className="input-field" style={{ minHeight: "100px" }} placeholder="Enter required skills (e.g., HTML, CSS)" required/> </label> <button type="submit" disabled={isLoading} className="btn-event-submit"> {isLoading ? "🔄 Adding Internship..." : "🎉 Add Internship"} </button> </form> <button onClick={onBack} className="btn-back"> ← Back to Alumni Dashboard </button> </div> <div className="floating-shapes"> <div className="shape"></div> <div className="shape"></div> <div className="shape"></div> </div> </div> ); };
  const AlumniStoryForm = ({ onStoryCreate, onBack }) => { const [alumniName, setAlumniName] = useState(""); const [alumniJobRole, setAlumniJobRole] = useState(""); const [alumniStory, setAlumniStory] = useState(""); const [error, setError] = useState(""); const [isLoading, setIsLoading] = useState(false); const handleSubmit = async (e) => { e.preventDefault(); setError(""); if (!alumniName || !alumniJobRole || !alumniStory) { setError("All fields must be filled."); return; } setIsLoading(true); setTimeout(() => { onStoryCreate({ alumniName, alumniJobRole, alumniStory }); setIsLoading(false); }, 1000); }; return ( <div className="event-form-wrapper"> <div className="form-container-event"> <h2 className="event-form-title"> Share Your Story </h2> {error && <div className="event-form-error">{error}</div>} <form onSubmit={handleSubmit} className="event-form-body"> <label className="event-form-label">👤 Alumni Name * <input type="text" value={alumniName} onChange={(e) => setAlumniName(e.target.value)} className="input-field" placeholder="Enter your name" required /> </label> <label className="event-form-label">💼 Alumni Job Role * <input type="text" value={alumniJobRole} onChange={(e) => setAlumniJobRole(e.target.value)} className="input-field" placeholder="Enter your job role" required /> </label> <label className="event-form-label">📖 Alumni Story * <textarea value={alumniStory} onChange={(e) => setAlumniStory(e.target.value)} className="input-field" style={{ minHeight: "120px" }} placeholder="Share your success story" required /> </label> <button type="submit" disabled={isLoading} className="btn-event-submit"> {isLoading ? "🔄 Sharing Story..." : "🎉 Share Story"} </button> </form> <button onClick={onBack} className="btn-back"> ← Back to Alumni Dashboard </button> </div> <div className="floating-shapes"> <div className="shape"></div> <div className="shape"></div> <div className="shape"></div> </div> </div> ); };
  const ProfilePage = () => { if (loadingProfile) return <Section><p className="text-center">Loading profile data...</p></Section>; if (!profileData) return <Section><p className="text-center">Could not load profile data.</p></Section>; return ( <Section> <h2 className="section-title" style={{ marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Profile</h2> <div className="profile-grid"> <div> <h3 className="profile-label">Full Name</h3> <p className="profile-data">{profileData.name}</p> </div> <div> <h3 className="profile-label">Email</h3> <p className="profile-data">{profileData.email}</p> </div> <div> <h3 className="profile-label">Graduation Year</h3> <p className="profile-data">{profileData.graduationYear}</p> </div> <div> <h3 className="profile-label">Degree</h3> <p className="profile-data">{profileData.degree}</p> </div> <div> <h3 className="profile-label">Current Company</h3> <p className="profile-data">{profileData.currentCompany}</p> </div> <div> <h3 className="profile-label">Position</h3> <p className="profile-data">{profileData.position}</p> </div> <div className="profile-grid-span-2"> <h3 className="profile-label">Skills</h3> <div className="skills-container"> {profileData.skills.map((skill, index) => ( <span key={index} className="skill-tag">{skill}</span> ))} </div> </div> <div> <h3 className="profile-label">Location</h3> <p className="profile-data">{profileData.location}</p> </div> <div> <h3 className="profile-label">LinkedIn</h3> <p className="profile-data"> <a href={`https://${profileData.linkedIn}`} target="_blank" rel="noopener noreferrer" className="card-link">{profileData.linkedIn}</a> </p> </div> </div> </Section> ); };
  
  const LiveChatPage = ({ db, onNavigate }) => {
    const [fullName, setFullName] = useState("");
    const [regdNo, setRegdNo] = useState("");
    const [role, setRole] = useState("student"); // "student" | "alumni"
    const [verifiedUser, setVerifiedUser] = useState(null); // { fullName, regdNo, role }
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

        if (!db) {
            setError("Database connection not available.");
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
            }
        );
    }

    async function handleSendMessage(e) {
        e.preventDefault();
        if (!verifiedUser || !db) return;
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
    }
    
    return(
        <Section>
            <div className="flex-container">
                 <SectionTitle>Live Chat</SectionTitle>
                 <div>
                    <button onClick={() => onNavigate("dashboard")} className="btn btn-secondary">Home</button>
                    {verifiedUser && <button onClick={handleExit} className="btn btn-danger" style={{marginLeft: '8px'}}>Exit Chat</button>}
                 </div>
            </div>

            {!verifiedUser ? (
                <div className="chat-login-container">
                    <p className="text-muted">Enter your details to join the chat. We will verify them against our records.</p>
                    {error && <div className="chat-error-box">{error}</div>}
                    <form onSubmit={handleVerify} className="chat-login-form">
                        <div className="chat-role-selector">
                            <label>Role:</label>
                            <label><input type="radio" name="role" value="student" checked={role === "student"} onChange={(e) => setRole(e.target.value)} /> Student</label>
                            <label><input type="radio" name="role" value="alumni" checked={role === "alumni"} onChange={(e) => setRole(e.target.value)} /> Alumni</label>
                        </div>
                        <div className="form-input-group">
                            <label>Full Name</label>
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="form-input" />
                        </div>
                        <div className="form-input-group">
                            <label>Registration Number</label>
                            <input value={regdNo} onChange={(e) => setRegdNo(e.target.value)} placeholder="Enter your regd no" className="form-input" />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Join Chat</button>
                    </form>
                </div>
            ) : (
                <div className="chat-container">
                    <div className="chat-header">
                        Signed in as <strong>{verifiedUser.fullName}</strong> ({verifiedUser.role}, {verifiedUser.regdNo})
                    </div>
                    <div className="chat-window">
                        {loadingMessages ? (
                            <div style={{ textAlign: "center", color: "#6b7280", padding: "16px" }}>Loading messages…</div>
                        ) : (
                            messages.map((m) => (
                                <div key={m.id} className="chat-message-item">
                                    <div className="message-header">
                                        <strong>{m.senderName || "Unknown"}</strong> • {m.role || "user"} • {m.regdNo || "-"}
                                    </div>
                                    <div className="message-body">{m.text}</div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="chat-input-form">
                         <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message…" className="chat-input" />
                         <button type="submit" className="send-btn"><IconSend className="send-icon" /></button>
                    </form>
                    {error && <div className="chat-error-box" style={{marginTop: '8px'}}>{error}</div>}
                </div>
            )}
        </Section>
    );
};


  const Modal = ({ isOpen, title, message, onClose }) => { if (!isOpen) return null; return ( <div className="modal-overlay"> <div className="modal-content"> <h2 className="modal-title">{title}</h2> <p className="modal-message">{message}</p> <button className="btn btn-primary" onClick={onClose}>Close</button> </div> </div> ); };
  const renderSection = () => { switch (selectedSection) { case "dashboard": return <><WelcomeHeader /><Summary /><AllEvents /><Opportunities /><Inbox /><AllStories/></>; case "events": return <AllEvents />; case "opportunities": return <Opportunities />; case "inbox": return <Inbox />; case "stories": return <AllStories />; case "profile": return <ProfilePage />; case "live-chat": return <LiveChatPage db={db} onNavigate={setSelectedSection}/>; default: return <WelcomeHeader />; } };
  const renderContent = () => {
    if (currentView === 'createEvent') { return <AlumniEventForm onEventCreate={handleEventCreate} onBack={() => setCurrentView('main')} />; }
    if (currentView === 'createJob') { return <AlumniJobForm onJobCreate={handleJobCreate} onBack={() => setCurrentView('main')} />; }
    if (currentView === 'createInternship') { return <AlumniInternshipForm onInternshipCreate={handleInternshipCreate} onBack={() => setCurrentView('main')} />; }
    if (currentView === 'createStory') { return <AlumniStoryForm onStoryCreate={handleStoryCreate} onBack={() => setCurrentView('main')} />; }
    
    return (
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">Alumni Connect</div>
          <div className="navbar-links">
            {[ { name: "dashboard", icon: IconDashboard }, { name: "events", icon: IconCalendar }, { name: "opportunities", icon: IconBriefcase }, { name: "inbox", icon: IconMail }, { name: "stories", icon: IconBook }, { name: "live-chat", icon: IconMessage}, { name: "profile", icon: IconUser } ].map(({ name, icon: Icon }) => (
              <button key={name} onClick={() => {setSelectedSection(name); setCurrentView('main');}} className={`nav-link ${selectedSection === name ? "active" : ""}`} aria-label={`Go to ${name} section`}>
                <Icon className="nav-link-icon" /> {capitalize(name)}
              </button>
            ))}
          </div>
          <div className="navbar-user">
            <img src={userPhoto} alt={`${user.name}'s profile`} className="navbar-photo" />
            <span>{user.name}</span>
            <button onClick={() => setShowPhotoInput(!showPhotoInput)} className="navbar-photo-toggle" aria-label="Toggle profile photo update"> {showPhotoInput ? 'Cancel' : 'Edit'} </button>
            {showPhotoInput && (
              <form onSubmit={handlePhotoChange} className="navbar-photo-form">
                <input type="url" name="photoUrl" placeholder="New photo URL" className="navbar-photo-input" aria-label="Update profile photo URL"/>
                <button type="submit" className="btn btn-primary btn-small">Save</button>
              </form>
            )}
          </div>
        </nav>
        <main className="main-content">
          {renderSection()}
        </main>
        <button onClick={() => {setSelectedSection("dashboard"); setCurrentView('main');}} className="btn logout-btn">Logout</button>
      </div>
    );
  };

  return (
    <>
      <style>{`
        :root { --primary-color: #2563EB; --primary-hover: #1E40AF; --text-muted: #6B7280; }
        html, body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #F3F4F6; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .container { min-height: 100vh; width: 100%; box-sizing: border-box; }
        .main-content { max-width: 1280px; margin: 0 auto; padding: 24px; }
        .navbar { background-color: var(--primary-hover); color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .navbar-brand { font-weight: bold; font-size: 1.25rem; }
        .navbar-links { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .navbar-user { display: flex; align-items: center; gap: 0.5rem; }
        .navbar-photo { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .navbar-photo-toggle { background: none; border: none; color: #E5E7EB; font-size: 0.75rem; cursor: pointer; }
        .navbar-photo-form { display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem; }
        .navbar-photo-input { padding: 6px; font-size: 12px; border: 1px solid #D1D5DB; border-radius: 6px; }
        .nav-link { color: #D1D5DB; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 6px; transition: background-color 0.2s, color 0.2s; }
        .nav-link:hover { background-color: rgba(255,255,255,0.1); color: white; }
        .nav-link.active { background-color: var(--primary-color); color: white; font-weight: 600; }
        .nav-link-icon { width: 20px; height: 20px; }
        .section-container { background-color: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px; }
        .flex-container { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 1rem; }
        .section-title { font-size: 1.5rem; font-weight: 600; color: #111827; }
        .text-muted { color: var(--text-muted); } .text-small { font-size: 0.75rem; }
        .text-primary { color: #2563EB; } .text-success { color: #059669; } .text-danger { color: #DC2626; } .text-purple { color: #7C3AED; } .text-warning { color: #F59E0B; }
        .font-semibold { font-weight: 600; }
        .btn { padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; font-weight: 500; transition: background-color 0.2s; }
        .btn-primary { background-color: var(--primary-color); color: white; } .btn-primary:hover { background-color: var(--primary-hover); }
        .btn-success { background-color: #059669; color: white; } .btn-success:hover { background-color: #047857; }
        .btn-danger { background-color: #DC2626; color: white; } .btn-danger:hover { background-color: #B91C1C; }
        .btn-secondary { background-color: #E5E7EB; color: #374151; } .btn-secondary:hover { background-color: #D1D5DB; }
        .btn-small { padding: 6px 12px; font-size: 12px; } .mt-4 { margin-top: 1rem; }
        .card-link { color: var(--primary-color); text-decoration: none; font-weight: 500; } .card-link:hover { text-decoration: underline; color: var(--primary-hover); }
        .summary-grid, .events-grid, .stories-grid { display: grid; gap: 24px; }
        .summary-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
        .events-grid, .stories-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        .jobs-internships-grid, .mentorship-notifications-grid { display: grid; gap: 24px; }
        @media (min-width: 1024px) { .jobs-internships-grid, .mentorship-notifications-grid { grid-template-columns: 1fr 1fr; } }
        .summary-card { display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; border-radius: 12px; padding: 20px; min-height: 120px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; }
        .summary-card:hover { transform: translateY(-4px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .summary-value { font-size: 2rem; font-weight: 700; margin: 8px 0; }
        .summary-label { font-size: 1rem; font-weight: 500; color: #374151; }
        .card { border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; margin-bottom: 1rem; background-color: #FAFAFA; }
        .card-flex { display: flex; align-items: center; gap: 12px; justify-content: space-between; }
        .card-content { flex: 1; } .logo-image { width: 48px; height: 48px; border-radius: 50%; }
        .card-image { width: 100%; height: 150px; object-fit: cover; border-radius: 6px; margin-bottom: 1rem;}
        .card-title { font-weight: 600; margin: 0 0 4px 0; color: #111827; } .text-center { text-align: center; }
        .form-container { margin: 16px 0; display: flex; flex-direction: column; gap: 8px; }
        .form-input { width: 100%; border: 1px solid #D1D5DB; padding: 10px; border-radius: 6px; box-sizing: border-box; }
        .icon { width: 32px; height: 32px; color: var(--text-muted); }
        .button-group { display: flex; gap: 8px; margin-top: 8px; }
        .reply-container { margin-top: 8px; display: flex; flex-direction: column; gap: 8px; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 24px; border-radius: 8px; max-width: 400px; width: 90%; text-align: center; }
        .modal-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem; }
        .modal-message { margin-bottom: 1.5rem; color: var(--text-muted); }
        .profile-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 768px) { .profile-grid { grid-template-columns: 1fr 1fr; } }
        .profile-grid-span-2 { grid-column: span 1; }
        @media (min-width: 768px) { .profile-grid-span-2 { grid-column: span 2; } }
        .profile-label { color: #7f8c8d; margin: 0 0 5px 0; font-size: 14px; font-weight: 500; }
        .profile-data { margin: 0 0 15px 0; font-weight: 600; color: #111827; }
        .skills-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
        .skill-tag { background-color: #e0e0e0; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
        .logout-btn { position: fixed; bottom: 20px; left: 20px; background-color: #e74c3c; color: white; transition: background-color 0.3s; z-index: 100; }
        .logout-btn:hover { background-color: #c0392b; }
        
        /* Event Form Specific Styles */
        .event-form-wrapper { display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); background-size: 400% 400%; animation: gradientShift 15s ease infinite; position: relative; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .form-container-event { position: relative; z-index: 1; width: 100%; max-width: 600px; animation: slideInFromTop 0.8s ease-out; }
        @keyframes slideInFromTop { from { opacity: 0; transform: translateY(-50px); } to { opacity: 1; transform: translateY(0); } }
        .event-form-title { color: #ffffff; margin-bottom: 30px; font-size: 2.5rem; font-weight: 700; text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 1px; }
        .event-form-error { color: #ef4444; margin-bottom: 20px; padding: 15px; background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; text-align: center; font-size: 14px; font-weight: 500; }
        .event-form-body { display: flex; flex-direction: column; background-color: #ffffff; padding: 40px; border-radius: 20px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; }
        .event-form-label { margin-bottom: 15px; text-align: left; color: #374151; font-size: 14px; font-weight: 600; display: block; }
        .event-form-label p { font-size: 12px; color: #6b7280; margin: 4px 0; font-style: italic; }
        .input-field { width: 100%; padding: 12px; margin-top: 8px; border: 2px solid #e2e8f0; border-radius: 8px; box-sizing: border-box; font-size: 16px; transition: all 0.3s ease; outline: none; background-color: #ffffff; }
        .input-field:focus { border-color: #4f46e5 !important; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important; transform: translateY(-1px) !important; }
        .btn-event-submit { padding: 16px 32px; background-color: #4f46e5; color: white; border: none; border-radius: 12px; cursor: pointer; margin-top: 30px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4); }
        .btn-event-submit:disabled { background-color: #9ca3af; cursor: not-allowed; }
        .btn-event-submit:hover:not(:disabled) { background-color: #4338ca; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5); }
        .btn-back { padding: 14px 28px; background-color: rgba(255, 255, 255, 0.2); color: white; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 12px; cursor: pointer; margin-top: 25px; font-weight: 500; font-size: 14px; letter-spacing: 0.5px; transition: all 0.3s ease; backdrop-filter: blur(10px); text-shadow: 1px 1px 2px rgba(0,0,0,0.3); }
        .btn-back:hover { background-color: rgba(255, 255, 255, 0.3); transform: translateY(-2px); box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2); }
        .floating-shapes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 0; }
        .shape { position: absolute; background: rgba(255, 255, 255, 0.1); border-radius: 50%; animation: float 6s ease-in-out infinite; }
        .shape:nth-child(1) { width: 80px; height: 80px; top: 20%; left: 10%; animation-delay: -2s; }
        .shape:nth-child(2) { width: 60px; height: 60px; top: 60%; right: 15%; animation-delay: -4s; }
        .shape:nth-child(3) { width: 40px; height: 40px; bottom: 20%; left: 20%; animation-delay: -1s; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }

        /* Live Chat Styles v2 */
        .chat-login-container { max-width: 640px; margin: 0 auto; background-color: white; padding: 24px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .chat-error-box { background-color: #fee2e2; color: #991b1b; padding: 10px 12px; border-radius: 6px; margin-bottom: 12px; }
        .chat-login-form { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .chat-role-selector { display: flex; gap: 12px; align-items: center; }
        .chat-role-selector label { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #374151; }
        .form-input-group { display: flex; flex-direction: column; }
        .form-input-group label { margin-bottom: 6px; color: #555; font-size: 14px; }
        .chat-container { max-width: 900px; margin: 0 auto; display: grid; grid-template-rows: auto 1fr auto; gap: 12px; height: calc(100vh - 220px); }
        .chat-header { padding: 8px 12px; border-bottom: 1px solid #eee; color: #374151; font-size: 14px; background: white; border-radius: 10px 10px 0 0; }
        .chat-window { flex: 1; overflow-y: auto; padding: 8px 4px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .chat-message-item { padding: 8px 12px; margin: 6px 8px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #eee; }
        .message-header { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        .message-header strong { color: #111827; }
        .message-body { font-size: 15px; color: #111827; white-space: pre-wrap; }
        .chat-input-form { display: flex; gap: 8px; }
        .chat-input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; background-color: white; }
        .send-btn { padding: 12px 16px; background-color: #10B981; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
        .send-icon { width: 20px; height: 20px; }


      `}</style>
      
      <Modal isOpen={modal.isOpen} title={modal.title} message={modal.message} onClose={closeModal} />
      {renderContent()}
    </>
  );
}

