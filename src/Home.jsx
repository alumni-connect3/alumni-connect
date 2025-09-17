
function Home({ onNavigate }) {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        left: 0,
        top: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e0e0e0",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#2196F3",
            margin: 0,
          }}
        >
          AlumniConnect
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => onNavigate("role-selection-login")}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#2196F3",
              border: "2px solid #2196F3",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#2196F3";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#2196F3";
            }}
          >
            Login
          </button>
          <button
            onClick={() => onNavigate("role-selection")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#1976d2";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#2196F3";
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
          backgroundColor: "#fff",
          background: "linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(255, 255, 255, 1) 100%)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Stay Connected with Your Alma Mater
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#666",
            marginBottom: "40px",
            maxWidth: "800px",
            margin: "0 auto 40px auto",
            lineHeight: "1.6",
          }}
        >
          Join our alumni network to connect, collaborate, and contribute. Discover events,
          mentorship opportunities, and career growth — all in one place.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <button
            onClick={() => onNavigate("role-selection")}
            style={{
              padding: "15px 30px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(33, 150, 243, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(33, 150, 243, 0.3)";
            }}
          >
            Get Started
          </button>
          <button
            style={{
              padding: "15px 30px",
              backgroundColor: "transparent",
              color: "#2196F3",
              border: "2px solid #2196F3",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f5f5f5";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 40px", backgroundColor: "#f8f9fa", width: "100%", boxSizing: "border-box" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              marginBottom: "60px",
            }}
          >
            {/* Alumni in your city */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                border: "1px solid #e0e0e0",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#333", marginBottom: "15px" }}>
                Alumni in your city
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                Find alumni living in your city & connect with them
              </p>
              <button
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1976d2";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#2196F3";
                }}
              >
                Alumni In My City
              </button>
            </div>

            {/* Your Batchmates */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                border: "1px solid #e0e0e0",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#333", marginBottom: "15px" }}>
                Your Batchmates
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                View our exclusive batchmates directory to know whereabouts of your batchmates
              </p>
              <button
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1976d2";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#2196F3";
                }}
              >
                My Batchmates
              </button>
            </div>

            {/* Alumni Directory */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                border: "1px solid #e0e0e0",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#333", marginBottom: "15px" }}>
                Alumni Directory
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                Explore complete alumni directory & connect with alumni based on interests & domain
              </p>
              <button
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1976d2";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#2196F3";
                }}
              >
                View Directory
              </button>
            </div>

            {/* Your Alumni Profile */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                border: "1px solid #e0e0e0",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#333", marginBottom: "15px" }}>
                Your Alumni Profile
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                Create & complete your alumni profile and remain connected with all opportunities
              </p>
              <button
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1976d2";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#2196F3";
                }}
              >
                My Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: "80px 40px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "600", color: "#333", margin: 0 }}>Gallery</h2>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#2196F3",
                border: "1px solid #2196F3",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#2196F3";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#2196F3";
              }}
            >
              View All
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
            }}
          >
            {[
              {
                title: "Bridging Generations: Alumni Interaction MBA Batch 25-27 at Vishnu Institute",
                items: "4 Items"
              },
              {
                title: "Confluence: 1st Alumni Meet at Vishnu Institute (March 2025)",
                items: "33 Items"
              },
              {
                title: "AU- IQM Hackathon 2023 | Season 2",
                items: "4 Items"
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    fontSize: "16px",
                  }}
                >
                  Gallery Image
                </div>
                <div style={{ padding: "25px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", marginBottom: "10px", lineHeight: "1.4" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
                    {item.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section style={{ padding: "80px 40px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "600", color: "#333", margin: 0 }}>Events</h2>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#2196F3",
                border: "1px solid #2196F3",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#2196F3";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#2196F3";
              }}
            >
              View All
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
              marginBottom: "60px",
            }}
          >
            {[
              {
                title: "Janmashtami Celebrations",
                date: "Aug 14, 2025 - 05:00 PM - 07:00 PM",
                status: "Past Event",
                statusColor: "#9c27b0"
              },
              {
                title: "International Yoga Day Celebration",
                date: "Jun 21, 2025",
                status: "Past Event",
                statusColor: "#9c27b0"
              },
              {
                title: "Vishnu Institute 1st Alumni Meet 2025",
                date: "Mar 08, 2025 - 12:45 PM",
                status: "Past Event",
                statusColor: "#9c27b0"
              }
            ].map((event, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    fontSize: "16px",
                  }}
                >
                  Event Image
                </div>
                <div style={{ padding: "25px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      backgroundColor: event.statusColor,
                      color: "white",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    {event.status}
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                    {event.title}
                  </h4>
                  <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                    {event.date}
                  </p>
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "transparent",
                      color: "#2196F3",
                      border: "1px solid #2196F3",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#2196F3";
                      e.target.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#2196F3";
                    }}
                  >
                    View Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Action Sections */}
      <section style={{ padding: "60px 40px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "40px",
            }}
          >
            {/* Networking */}
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <h3 style={{ fontSize: "28px", fontWeight: "600", color: "#2196F3", marginBottom: "15px" }}>
                Networking
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                Connect with alumni across industries and locations.
              </p>
            </div>

            {/* Events */}
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <h3 style={{ fontSize: "28px", fontWeight: "600", color: "#2196F3", marginBottom: "15px" }}>
                Events
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                Stay updated on reunions, webinars, and career fairs.
              </p>
            </div>

            {/* Mentorship */}
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <h3 style={{ fontSize: "28px", fontWeight: "600", color: "#2196F3", marginBottom: "15px" }}>
                Mentorship
              </h3>
              <p style={{ color: "#666", marginBottom: "25px", lineHeight: "1.6" }}>
                Get guidance from experienced professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship CTA Section */}
      <section
        style={{
          padding: "80px 40px",
          background: "linear-gradient(135deg, #2196F3 0%, #1976d2 100%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "600", marginBottom: "20px" }}>
            Mentorship: Empowering Through Experience
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.9 }}>
            Explore Mentorship: Sharing Wisdom, Shaping Futures
          </p>
          <button
            style={{
              padding: "15px 30px",
              backgroundColor: "white",
              color: "#2196F3",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            View Yearbook
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "40px",
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
          © 2025 AlumniConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;