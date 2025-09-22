import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AlumniDashboard from "./AlumniDashboard";
import Home from "./Home";
import Login from "./Login";
import RoleSelection from "./RoleSelection";
import RoleSelectionLogin from "./RoleSelectionLogin";
import Signup from "./Signup";
import SignupAlumni from "./SignupAlumni";
import StudentDashboard from "./StudentDashboard";
import ViewStudents from "./ViewStudents";
import ViewAlumni from "./ViewAlumni";
import AddEvent from "./AddEvent";
import AddJob from "./AddJob";
import AddInternship from "./AddInternship";
import AddPlaceholder from "./AddPlaceholder";
import StoriesPage from "./StoriesPage";
import LiveChatPage from "./LiveChatPage";
import ViewProfilePage from "./ViewProfilePage"; // For alumni profile
import ApplyJob from "./ApplyJob";
import ApplyInternship from "./ApplyInternship";
import RegisterEvent from "./RegisterEvent";
import StudentProfilePage from "./StudentProfilePage"; // For student profile
import ViewStoriesPage from "./ViewStoriesPage";
import AlumniJob from "./AlumniJob";
import AlumniInternship from "./AlumniInternship";
import AlumniEvent from "./AlumniEvent";
import Announcement from "./Announcement";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // Default to home page
  const [role, setRole] = useState(null); // Track selected role for login

  const navigate = (page, params = {}) => {
    if (params.role) {
      setRole(params.role);
    } else {
      setRole(null); // Reset role if not a login navigation
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={navigate} />;
      case "login":
        return <Login onNavigate={navigate} role={role} />;
      case "role-selection":
        return <RoleSelection onNavigate={navigate} />;
      case "role-selection-login":
        return <RoleSelectionLogin onNavigate={navigate} />;
      case "signup":
        return <Signup onNavigate={navigate} />;
      case "signup-alumni":
        return <SignupAlumni onNavigate={navigate} />;
      case "admin-dashboard":
        return <AdminDashboard onNavigate={navigate} />;
      case "student-dashboard":
        return <StudentDashboard onNavigate={navigate} />;
      case "alumni-dashboard":
        return <AlumniDashboard onNavigate={navigate} />;
      case "view-students":
        return <ViewStudents onNavigate={navigate} />;
      case "view-alumni":
        return <ViewAlumni onNavigate={navigate} />;
      case "add-event":
        return <AddEvent onNavigate={navigate} />;
      case "announcement":
        return <Announcement onNavigate={navigate} />;
      case "add-job":
        return <AddJob onNavigate={navigate} />;
      case "add-internship":
        return <AddInternship onNavigate={navigate} />;
      case "add-placeholder":
        return <AddPlaceholder onNavigate={navigate} />;
      case "stories":
        return <StoriesPage onNavigate={navigate} />;
      case "live-chat":
        return <LiveChatPage onNavigate={navigate} />;
      case "profile":
        return <StudentProfilePage onNavigate={navigate} />; // Student profile
      case "view-stories":
        return <ViewStoriesPage onNavigate={navigate} />;
      case "apply-job":
        return <ApplyJob onNavigate={navigate} />;
      case "apply-internship":
        return <ApplyInternship onNavigate={navigate} />;
      case "register-event":
        return <RegisterEvent onNavigate={navigate} />;
      case "alumni-job":
        return <AlumniJob onNavigate={navigate} />;
      case "alumni-internship":
        return <AlumniInternship onNavigate={navigate} />;
      case "alumni-event":
        return <AlumniEvent onNavigate={navigate} />;
      case "view-profile":
        return <ViewProfilePage onNavigate={navigate} />; // Alumni profile
      default:
        return <Home onNavigate={navigate} />; // Fallback to home if route is invalid
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {renderPage()}
    </div>
  );
}

export default App;