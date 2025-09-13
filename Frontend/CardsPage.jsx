import React from "react";
import { useNavigate } from "react-router-dom";
import ChatbotUI from "./chatbot";

// Simple icon components to match your main page
const Flower2 = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5c0 .5 0 3.5-2 5l-2.5-1.5L9.5 17c-2-1.5-2-4.5-2-5a4.5 4.5 0 1 1 4.5-4.5z"/>
    <path d="M8.5 12.5a4.5 4.5 0 1 0 7 0"/>
    <path d="M12 7.5V9"/>
  </svg>
);

const Heart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Calendar = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const MapPin = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CardsPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fed7aa 100%)",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box"
    },
    
    header: {
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #fecaca",
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "1rem 0"
    },
    
    headerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer"
    },
    
    logoIcon: {
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    },
    
    logoText: {
      color: "#be185d",
      fontSize: "0.875rem"
    },
    
    backButton: {
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      color: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "25px",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },

    mainContent: {
      flex: 1,
      padding: "3rem 2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },

    title: {
      fontSize: "3rem",
      fontWeight: "300",
      color: "#881337",
      marginBottom: "1rem",
      textAlign: "center",
      background: "linear-gradient(135deg, #e11d48, #ec4899, #be185d)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },

    subtitle: {
      fontSize: "1.2rem",
      color: "#be185d",
      marginBottom: "3rem",
      textAlign: "center",
      maxWidth: "600px"
    },

    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gap: "2rem",
      maxWidth: "800px",
      width: "100%",
      margin: "0 auto"
    },

    card: {
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(10px)",
      borderRadius: "1.5rem",
      padding: "2.5rem 2rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
      minHeight: "200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
    },

    cardIcon: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem auto",
      color: "white",
      transition: "transform 0.3s ease"
    },

    cardTitle: {
      color: "#be185d",
      fontWeight: "600",
      marginBottom: "0.8rem",
      fontSize: "1.5rem"
    },

    cardDescription: {
      color: "#e11d48",
      fontSize: "1rem",
      lineHeight: "1.5",
      opacity: 0.8
    }
  };

  const cards = [
    {
      title: "Period Tracker",
      description: "Track your cycle with smart predictions and personalized insights",
      icon: <Calendar />,
      gradient: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      route: "/tracker"
    },
    {
      title: "Find Nearby",
      description: "Locate doctors and affordable pad stores in your area",
      icon: <MapPin />,
      gradient: "linear-gradient(135deg, #fbb6ce, #f9a8d4)",
      route: "/nearby"
    },
    {
      title: "Health Guide",
      description: "Exercise, nutrition and wellness tips for your cycle",
      icon: <Heart />,
      gradient: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      route: "/health"
    },
    {
      title: "Safe Space",
      description: "Anonymous Q&A and supportive community discussions",
      icon: <Flower2 />,
      gradient: "linear-gradient(135deg, #fbb6ce, #f9a8d4)",
      route: "/support"
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo} onClick={() => navigate("/")}>
            <div style={styles.logoIcon}>
              <Flower2 />
            </div>
            <span style={styles.logoText}>HerBlossomDays</span>
          </div>
          <button 
            style={styles.backButton}
            onClick={() => navigate("/")}
            className="back-button"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h1 style={styles.title}>Choose Your Journey</h1>
        <p style={styles.subtitle}>
          Explore our comprehensive tools and resources designed to support you through every step of your menstrual health journey
        </p>

        {/* 2x2 Cards Grid */}
        <div style={styles.cardsGrid}>
          {cards.map((card, index) => (
            <div
              key={index}
              style={styles.card}
              className="card"
              onClick={() => handleCardClick(card.route)}
            >
              <div
                style={{
                  ...styles.cardIcon,
                  background: card.gradient
                }}
                className="card-icon"
              >
                {card.icon}
              </div>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Global Styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .card:hover {
          background: rgba(255, 255, 255, 0.8) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
          transform: translateY(-8px) !important;
        }

        .card:hover .card-icon {
          transform: scale(1.1) !important;
        }

        .back-button:hover {
          background: linear-gradient(135deg, #e11d48, #ec4899) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2) !important;
        }

        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          
          .card {
            min-height: 160px !important;
            padding: 2rem 1.5rem !important;
          }
          
          .card-title {
            font-size: 1.25rem !important;
          }
          
          .main-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CardsPage;