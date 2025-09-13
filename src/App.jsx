import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import SignupAlumni from "./SignupAlumni";
import RoleSelection from "./RoleSelection";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />;
      case "login":
        return <Login onNavigate={setCurrentPage} />;
      case "role-selection":
        return <RoleSelection onNavigate={setCurrentPage} />;
      case "signup":
        return <Signup onNavigate={setCurrentPage} />;
      case "signup-alumni":
        return <SignupAlumni onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
      flexDirection: "column",
      padding: "20px"
    }}>
      {renderPage()}
    </div>
  );
}

export default App;