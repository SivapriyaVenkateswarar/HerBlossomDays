import React from 'react';
import { useNavigate } from "react-router-dom";

// Simple icon components since we don't have lucide-react
const Flower2 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5c0 .5 0 3.5-2 5l-2.5-1.5L9.5 17c-2-1.5-2-4.5-2-5a4.5 4.5 0 1 1 4.5-4.5z"/>
    <path d="M8.5 12.5a4.5 4.5 0 1 0 7 0"/>
    <path d="M12 7.5V9"/>
  </svg>
);

const HerBlossomDays = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    },

    header: {
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #fecaca",
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "1rem 0",
    },

    headerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },

    logoIcon: {
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "1.25rem",
    },

    logoText: {
      color: "#be185d",
      fontSize: "0.875rem",
    },

    nav: {
      display: "flex",
      gap: "2rem",
      color: "#e11d48",
    },

    navLink: {
      textDecoration: "none",
      color: "#e11d48",
      transition: "color 0.3s ease",
      cursor: "pointer",
    },

    heroSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      padding: "5rem 2rem",
    },

    heroContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 10,
    },

    subtitle: {
      fontSize: "2.5rem",
      fontWeight: "500",
      color: "#e11d48",
      marginBottom: "1rem",
      fontStyle: "italic",
      fontFamily: "Georgia, serif",
    },

    title: {
      fontSize: "4rem",
      fontFamily: "Times New Roman",
      fontWeight: "300",
      color: "#881337",
      marginBottom: "1.5rem",
      lineHeight: "1.2",
      background: "linear-gradient(135deg, #e11d48, #ec4899, #be185d)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },

    divider: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "2rem",
    },

    dividerLine: {
      width: "96px",
      height: "4px",
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      borderRadius: "2px",
    },

    description: {
      fontSize: "1.25rem",
      color: "#be185d",
      marginBottom: "3rem",
      maxWidth: "48rem",
      margin: "0 auto 3rem auto",
      lineHeight: "1.6",
    },

    ctaButton: {
      background: "linear-gradient(135deg, #fb7185, #f472b6)",
      color: "white",
      padding: "1rem 3rem",
      borderRadius: "50px",
      fontSize: "1.125rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },

    decorativeElement: {
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.2,
      zIndex: 1,
    },

    decorativeElement1: {
      top: "2.5rem",
      left: "2.5rem",
      width: "120px",
      height: "120px",
      background: "linear-gradient(135deg, #fbb6ce, #f9a8d4)",
      animation: "pulse 4s infinite",
    },

    decorativeElement2: {
      top: "8rem",
      right: "5rem",
      width: "100px",
      height: "100px",
      background: "linear-gradient(135deg, #f9a8d4, #fbcfe8)",
      animation: "bounce 5s infinite",
    },

    decorativeElement3: {
      bottom: "5rem",
      left: "5rem",
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #fbb6ce, #fce7f3)",
      animation: "pulse 6s infinite",
    },

    decorativeElement4: {
      top: "15rem",
      left: "20%",
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #fce7f3, #fbb6ce)",
      animation: "bounce 3s infinite",
    },

    decorativeElement5: {
      bottom: "10rem",
      right: "15%",
      width: "100px",
      height: "100px",
      background: "linear-gradient(135deg, #f9a8d4, #fecaca)",
      animation: "pulse 5s infinite",
    },
  };

  return (
    <div style={styles.container}>
      {/* Decorative Circles */}
      <div style={{...styles.decorativeElement, ...styles.decorativeElement1}}></div>
      <div style={{...styles.decorativeElement, ...styles.decorativeElement2}}></div>
      <div style={{...styles.decorativeElement, ...styles.decorativeElement3}}></div>
      <div style={{...styles.decorativeElement, ...styles.decorativeElement4}}></div>
      <div style={{...styles.decorativeElement, ...styles.decorativeElement5}}></div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Flower2 />
            </div>
            <span style={styles.logoText}>Supporting every girl's journey</span>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>Health</a>
            <a href="#" style={styles.navLink}>Support</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.subtitle}>She's on her</div>
          <h1 style={styles.title}>Her Blossom Days</h1>

          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
          </div>

          <p style={styles.description}>
            Your trusted companion for navigating periods with confidence, knowledge, and care
          </p>

          <button style={styles.ctaButton} onClick={() => navigate("/CardsPage")}>
            START YOUR JOURNEY
          </button>
        </div>
      </section>

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

        body {
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fed7aa 100%);
          font-family: 'Poppins', sans-serif;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #e11d48, #ec4899);
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HerBlossomDays;
