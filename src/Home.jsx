import React, { useEffect, useRef, useState, useCallback } from "react";

function Home({ onNavigate }) {
  const galleryRef = useRef(null);
  const intervalRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false); // Prevent multiple rapid clicks
  const [isResetting, setIsResetting] = useState(false); // Track reset for transform
  const originalImages = [
    {
      title: "Bridging Generations: Alumni Interaction MBA Batch 25-27 at Vishnu Institute",
      imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758270244/background1_emses5.jpg",
    },
    {
      title: "Confluence: 1st Alumni Meet at Vishnu Institute (March 2025)",
      imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758270265/background4_f7vawg.jpg",
    },
    {
      title: "AU- IQM Hackathon 2023 | Season 2",
      imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758270266/background6_fuvun2.jpg",
    },
    {
      title: "Campus Reunion 2024",
      imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758270265/background3_imlh2j.jpg",
    },
    {
      title: "Campus Gathering 2025",
      imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758270264/background2_xwndlt.jpg",
    },
  ];
  const totalImages = originalImages.length; // 5 original images
  const images = [...originalImages, ...originalImages]; // Duplicate images for seamless loop

  const startAutoScroll = useCallback(() => {
    const scrollContainer = galleryRef.current;
    if (!scrollContainer) return;

    const sectionWidth = scrollContainer.clientWidth; // Width of the Hero Section
    let currentIndex = 0;

    intervalRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % (totalImages * 2); // Move through all images
      setIsResetting(currentIndex === totalImages); // Apply transform during reset
      scrollContainer.scrollTo({
        left: currentIndex * sectionWidth,
        behavior: "smooth",
      });

      // When reaching the duplicated first image, reset to the original first image
      if (currentIndex === totalImages) {
        setTimeout(() => {
          scrollContainer.scrollTo({
            left: 0,
            behavior: "auto", // Instant reset
          });
          currentIndex = 0;
          setIsResetting(false); // End transform
        }, 200); // Match CSS transition duration
      }
    }, 3000); // Change image every 3 seconds
  }, [totalImages]); // Add totalImages as dependency

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Cleanup on unmount
  }, [startAutoScroll, stopAutoScroll]);

  const scrollLeft = () => {
    if (isScrolling) return; // Prevent action if already scrolling
    setIsScrolling(true);
    stopAutoScroll();
    const scrollContainer = galleryRef.current;
    if (scrollContainer) {
      const sectionWidth = scrollContainer.clientWidth;
      let currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
      currentIndex = (currentIndex - 1 + totalImages * 2) % (totalImages * 2); // Move to previous image
      setIsResetting(currentIndex === totalImages - 1 && scrollContainer.scrollLeft >= totalImages * sectionWidth);
      scrollContainer.scrollTo({
        left: currentIndex * sectionWidth,
        behavior: "smooth",
      });
      // If moving to the last original image from the first duplicate, reset to the last original
      if (currentIndex === totalImages - 1 && scrollContainer.scrollLeft >= totalImages * sectionWidth) {
        setTimeout(() => {
          scrollContainer.scrollTo({
            left: (totalImages - 1) * sectionWidth,
            behavior: "auto",
          });
          setIsResetting(false);
        }, 200);
      }
      setTimeout(() => {
        setIsScrolling(false);
        startAutoScroll(); // Resume auto-scroll
      }, 1000);
    }
  };

  const scrollRight = () => {
    if (isScrolling) return; // Prevent action if already scrolling
    setIsScrolling(true);
    stopAutoScroll();
    const scrollContainer = galleryRef.current;
    if (scrollContainer) {
      const sectionWidth = scrollContainer.clientWidth;
      let currentIndex = Math.round(scrollContainer.scrollLeft / sectionWidth);
      currentIndex = (currentIndex + 1) % (totalImages * 2); // Move to next image
      setIsResetting(currentIndex === totalImages);
      scrollContainer.scrollTo({
        left: currentIndex * sectionWidth,
        behavior: "smooth",
      });
      // If moving to the duplicated first image, reset to the original first image
      if (currentIndex === totalImages) {
        setTimeout(() => {
          scrollContainer.scrollTo({
            left: 0,
            behavior: "auto",
          });
          setIsResetting(false);
        }, 200);
      }
      setTimeout(() => {
        setIsScrolling(false);
        startAutoScroll(); // Resume auto-scroll
      }, 1000);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', 'Arial', sans-serif",
        position: "relative",
        left: 0,
        top: 0,
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          width: "100%",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          zIndex: 1000,
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

      {/* Hero Section with Auto-Scrolling Gallery Background */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "80px 20px",
          width: "100%",
          boxSizing: "border-box",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        {/* Auto-Scrolling Gallery as Background */}
        <div
          ref={galleryRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%", // Full width of Hero Section
            height: "100%",
            display: "flex",
            overflowX: "hidden", // Hide other images
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            zIndex: 1,
            pointerEvents: "none",
            transition: "scroll-left 0.2s ease-in-out, transform 0.2s ease", // Smooth scroll and transform
            transform: isResetting ? "translateX(-5px)" : "translateX(0)", // Simulate forward motion
            willChange: "transform", // Optimize rendering
          }}
        >
          {images.map((item, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 100%", // Each image takes full width of Hero Section
                scrollSnapAlign: "start",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x600?text=Image+Not+Found";
                }}
              />
            </div>
          ))}
        </div>

        {/* Dark Overlay for Text Readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 2,
          }}
        ></div>

        {/* Arrow Buttons */}
        <button
          onClick={scrollLeft}
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "#333",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 3,
            transition: "all 0.3s ease",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#2196F3";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            e.target.style.color = "#333";
          }}
        >
          &larr;
        </button>
        <button
          onClick={scrollRight}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "#333",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 3,
            transition: "all 0.3s ease",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#2196F3";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            e.target.style.color = "#333";
          }}
        >
          &rarr;
        </button>

        {/* Foreground Content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "20px",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Stay Connected with Your Alumni
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#fff",
              marginBottom: "40px",
              lineHeight: "1.6",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
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
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#333",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#fff";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              Get Started
            </button>
            <button
              style={{
                padding: "15px 30px",
                backgroundColor: "transparent",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
          padding: "80px 40px", 
          background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(236,239,241,0.9) 100%)",
          width: "100%", 
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
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
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
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
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
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
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
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
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
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

      {/* Events Section */}
      <section style={{ 
          padding: "80px 40px", 
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,239,241,0.95) 100%)",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.05)"
        }}>
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
                title: "Spark Tank",
                date: "Aug 14, 2025 - 05:00 PM - 07:00 PM",
                status: "Past Event",
                statusColor: "#9c27b0",
                imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758276132/Screenshot_2025-09-19_152715_qsx707.png"
              },
              {
                title: "Amaravathi Quantum Valley",
                date: "Jun 21, 2025",
                status: "Past Event",
                statusColor: "#9c27b0",
                imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758276132/Screenshot_2025-09-19_152652_zdu7i9.png"
              },
              {
                title: "Vishnu Institute 1st year students Meet 2025",
                date: "Sep 13, 2025 - 12:45 PM",
                status: "Past Event",
                statusColor: "#9c27b0",
                imageUrl: "https://res.cloudinary.com/doxqjlztu/image/upload/v1758276132/Screenshot_2025-09-19_152622_fi4vnw.png"
              },
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
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    height: "200px",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Event+Image";
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                      height: "50%",
                      pointerEvents: "none"
                    }}
                  />
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
          padding: "100px 40px",
          background: "linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
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
          background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 1,
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