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
import Announcement from "./Announcement";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
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
      default:
        return <Home onNavigate={navigate} />;
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