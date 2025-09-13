import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icon components
const Flower2 = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5c0 .5 0 3.5-2 5l-2.5-1.5L9.5 17c-2-1.5-2-4.5-2-5a4.5 4.5 0 1 1 4.5-4.5z"/>
    <path d="M8.5 12.5a4.5 4.5 0 1 0 7 0"/>
    <path d="M12 7.5V9"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,18 9,12 15,6"/>
  </svg>
);

const Activity = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);

const Apple = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
    <path d="M10 2c1 .5 2 2 2 5"/>
  </svg>
);

const Moon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Heart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const HealthGuide = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    preSymptoms: [],
    duringSymptoms: [],
    lifestyle: {
      exerciseFrequency: '',
      sleepHours: '',
      stressLevel: '',
      dietType: ''
    },
    customPreSymptoms: '',
    customDuringSymptoms: ''
  });
  const [showReport, setShowReport] = useState(false);

  const preSymptomOptions = [
    'Mood swings or irritability',
    'Breast tenderness',
    'Bloating or water retention',
    'Headaches or migraines',
    'Food cravings',
    'Fatigue or low energy',
    'Acne or skin changes',
    'Lower back pain',
    'Joint or muscle aches',
    'Difficulty concentrating'
  ];

  const duringSymptomOptions = [
    'Severe cramps or pain',
    'Heavy bleeding',
    'Light or irregular flow',
    'Nausea or vomiting',
    'Diarrhea or digestive issues',
    'Dizziness or fainting',
    'Extreme fatigue',
    'Mood changes or depression',
    'Hot flashes or chills',
    'Sleep disturbances'
  ];

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
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "800px",
      margin: "0 auto"
    },

    formCard: {
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "1.5rem",
      padding: "3rem 2.5rem",
      width: "100%",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      marginTop: "2rem"
    },

    progressBar: {
      width: "100%",
      height: "8px",
      background: "rgba(190, 24, 93, 0.2)",
      borderRadius: "4px",
      marginBottom: "2rem",
      overflow: "hidden"
    },

    progressFill: {
      height: "100%",
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      borderRadius: "4px",
      transition: "width 0.5s ease"
    },

    title: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#881337",
      marginBottom: "1rem",
      textAlign: "center"
    },

    subtitle: {
      fontSize: "1.1rem",
      color: "#be185d",
      marginBottom: "2rem",
      textAlign: "center",
      lineHeight: "1.6"
    },

    question: {
      fontSize: "1.3rem",
      fontWeight: "500",
      color: "#881337",
      marginBottom: "1.5rem"
    },

    checkboxGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "0.8rem",
      marginBottom: "2rem"
    },

    checkboxItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      padding: "0.8rem 1rem",
      background: "rgba(249, 168, 212, 0.1)",
      borderRadius: "0.8rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "2px solid transparent"
    },

    checkboxItemSelected: {
      background: "rgba(249, 168, 212, 0.3)",
      border: "2px solid #f9a8d4"
    },

    checkbox: {
      width: "20px",
      height: "20px",
      borderRadius: "4px",
      border: "2px solid #be185d",
      position: "relative",
      flexShrink: 0
    },

    checkboxChecked: {
      background: "#be185d",
      border: "2px solid #be185d"
    },

    checkboxLabel: {
      color: "#881337",
      fontSize: "1rem",
      fontWeight: "400"
    },

    textArea: {
      width: "100%",
      minHeight: "120px",
      padding: "1rem",
      borderRadius: "0.8rem",
      border: "2px solid #fbb6ce",
      background: "rgba(255, 255, 255, 0.8)",
      fontSize: "1rem",
      color: "#881337",
      resize: "vertical",
      marginBottom: "2rem",
      fontFamily: "inherit"
    },

    selectGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem"
    },

    selectGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    },

    selectLabel: {
      color: "#881337",
      fontWeight: "500",
      fontSize: "0.9rem"
    },

    select: {
      padding: "0.8rem",
      borderRadius: "0.8rem",
      border: "2px solid #fbb6ce",
      background: "rgba(255, 255, 255, 0.8)",
      fontSize: "1rem",
      color: "#881337",
      fontFamily: "inherit"
    },

    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "2rem"
    },

    button: {
      padding: "0.8rem 2rem",
      borderRadius: "25px",
      fontSize: "1rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },

    primaryButton: {
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      color: "white"
    },

    secondaryButton: {
      background: "rgba(190, 24, 93, 0.1)",
      color: "#be185d",
      border: "2px solid #fbb6ce"
    },

    reportContainer: {
      width: "100%",
      marginTop: "2rem"
    },

    reportSection: {
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "1.2rem",
      padding: "2rem",
      marginBottom: "1.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
    },

    reportSectionTitle: {
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#881337",
      marginBottom: "1.5rem"
    },

    reportSectionIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    },

    reportContent: {
      color: "#be185d",
      lineHeight: "1.7",
      fontSize: "1rem"
    },

    recommendationList: {
      listStyle: "none",
      padding: 0,
      margin: "1rem 0"
    },

    recommendationItem: {
      padding: "0.8rem",
      background: "rgba(249, 168, 212, 0.1)",
      borderRadius: "0.8rem",
      marginBottom: "0.8rem",
      borderLeft: "4px solid #f9a8d4"
    }
  };

  const handleSymptomChange = (type, symptom) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(symptom) 
        ? prev[type].filter(s => s !== symptom)
        : [...prev[type], symptom]
    }));
  };

  const handleLifestyleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      generateReport();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Placeholder function for LLM API integration
  const generateReport = async () => {
    // This is where you would integrate with your LLM API
    // For now, we'll show a mock report based on the collected data
    console.log('Form data collected:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setShowReport(true);
    }, 1000);
  };

  const renderStep1 = () => (
    <>
      <h2 style={styles.question}>What symptoms do you typically experience BEFORE your period starts?</h2>
      <p style={{ color: "#be185d", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        Select all that apply. These are symptoms that usually occur 3-7 days before your period begins.
      </p>
      
      <div style={styles.checkboxGrid}>
        {preSymptomOptions.map((symptom, index) => (
          <div
            key={index}
            style={{
              ...styles.checkboxItem,
              ...(formData.preSymptoms.includes(symptom) ? styles.checkboxItemSelected : {})
            }}
            onClick={() => handleSymptomChange('preSymptoms', symptom)}
          >
            <div style={{
              ...styles.checkbox,
              ...(formData.preSymptoms.includes(symptom) ? styles.checkboxChecked : {})
            }}>
              {formData.preSymptoms.includes(symptom) && (
                <div style={{
                  position: "absolute",
                  top: "2px",
                  left: "5px",
                  color: "white",
                  fontSize: "12px"
                }}>✓</div>
              )}
            </div>
            <span style={styles.checkboxLabel}>{symptom}</span>
          </div>
        ))}
      </div>

      <textarea
        style={styles.textArea}
        placeholder="Any other pre-menstrual symptoms you'd like to mention?"
        value={formData.customPreSymptoms}
        onChange={(e) => setFormData(prev => ({ ...prev, customPreSymptoms: e.target.value }))}
      />
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 style={styles.question}>What symptoms do you experience DURING your period?</h2>
      <p style={{ color: "#be185d", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        Select all symptoms you experience while menstruating.
      </p>
      
      <div style={styles.checkboxGrid}>
        {duringSymptomOptions.map((symptom, index) => (
          <div
            key={index}
            style={{
              ...styles.checkboxItem,
              ...(formData.duringSymptoms.includes(symptom) ? styles.checkboxItemSelected : {})
            }}
            onClick={() => handleSymptomChange('duringSymptoms', symptom)}
          >
            <div style={{
              ...styles.checkbox,
              ...(formData.duringSymptoms.includes(symptom) ? styles.checkboxChecked : {})
            }}>
              {formData.duringSymptoms.includes(symptom) && (
                <div style={{
                  position: "absolute",
                  top: "2px",
                  left: "5px",
                  color: "white",
                  fontSize: "12px"
                }}>✓</div>
              )}
            </div>
            <span style={styles.checkboxLabel}>{symptom}</span>
          </div>
        ))}
      </div>

      <textarea
        style={styles.textArea}
        placeholder="Any other symptoms during your period you'd like to mention?"
        value={formData.customDuringSymptoms}
        onChange={(e) => setFormData(prev => ({ ...prev, customDuringSymptoms: e.target.value }))}
      />
    </>
  );

  const renderStep3 = () => (
    <>
      <h2 style={styles.question}>Tell us about your lifestyle</h2>
      <p style={{ color: "#be185d", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        This helps us create more personalized recommendations for you.
      </p>
      
      <div style={styles.selectGrid}>
        <div style={styles.selectGroup}>
          <label style={styles.selectLabel}>How often do you exercise?</label>
          <select
            style={styles.select}
            value={formData.lifestyle.exerciseFrequency}
            onChange={(e) => handleLifestyleChange('exerciseFrequency', e.target.value)}
          >
            <option value="">Select frequency</option>
            <option value="never">Never</option>
            <option value="rarely">Rarely (less than once a week)</option>
            <option value="sometimes">Sometimes (1-2 times a week)</option>
            <option value="regularly">Regularly (3-4 times a week)</option>
            <option value="daily">Daily or almost daily</option>
          </select>
        </div>

        <div style={styles.selectGroup}>
          <label style={styles.selectLabel}>Average hours of sleep per night</label>
          <select
            style={styles.select}
            value={formData.lifestyle.sleepHours}
            onChange={(e) => handleLifestyleChange('sleepHours', e.target.value)}
          >
            <option value="">Select hours</option>
            <option value="less-than-5">Less than 5 hours</option>
            <option value="5-6">5-6 hours</option>
            <option value="7-8">7-8 hours</option>
            <option value="9-plus">9+ hours</option>
          </select>
        </div>

        <div style={styles.selectGroup}>
          <label style={styles.selectLabel}>Current stress level</label>
          <select
            style={styles.select}
            value={formData.lifestyle.stressLevel}
            onChange={(e) => handleLifestyleChange('stressLevel', e.target.value)}
          >
            <option value="">Select level</option>
            <option value="low">Low stress</option>
            <option value="moderate">Moderate stress</option>
            <option value="high">High stress</option>
            <option value="very-high">Very high stress</option>
          </select>
        </div>

        <div style={styles.selectGroup}>
          <label style={styles.selectLabel}>Diet type</label>
          <select
            style={styles.select}
            value={formData.lifestyle.dietType}
            onChange={(e) => handleLifestyleChange('dietType', e.target.value)}
          >
            <option value="">Select diet type</option>
            <option value="balanced">Balanced/Mixed diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="low-carb">Low-carb</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderReport = () => {
    // This would typically be generated by your LLM API
    // For demo purposes, creating a comprehensive mock report
    return (
      <div style={styles.reportContainer}>
        <h1 style={styles.title}>Your Personalized Health Guide</h1>
        <p style={{ ...styles.subtitle, textAlign: "left", marginBottom: "2rem" }}>
          Based on your symptoms and lifestyle, here's your customized wellness plan to help manage your menstrual health.
        </p>

        {/* Exercise Recommendations */}
        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>
            <div style={styles.reportSectionIcon}>
              <Activity />
            </div>
            Exercise & Movement
          </div>
          <div style={styles.reportContent}>
            <p><strong>For Pre-Menstrual Symptoms:</strong></p>
            <ul style={styles.recommendationList}>
              {formData.preSymptoms.includes('Mood swings or irritability') && (
                <li style={styles.recommendationItem}>
                  <strong>Mood Support:</strong> Try 20-30 minutes of light cardio like walking or swimming to boost endorphins and improve mood.
                </li>
              )}
              {formData.preSymptoms.includes('Bloating or water retention') && (
                <li style={styles.recommendationItem}>
                  <strong>Reduce Bloating:</strong> Gentle yoga poses like child's pose, cat-cow, and spinal twists can help with digestion and reduce bloating.
                </li>
              )}
              {formData.preSymptoms.includes('Lower back pain') && (
                <li style={styles.recommendationItem}>
                  <strong>Back Pain Relief:</strong> Try pelvic tilts, gentle back stretches, and hip flexor stretches to alleviate lower back discomfort.
                </li>
              )}
              <li style={styles.recommendationItem}>
                <strong>General PMS Relief:</strong> Regular moderate exercise like brisk walking, cycling, or dancing can significantly reduce PMS symptoms.
              </li>
            </ul>

            <p><strong>During Your Period:</strong></p>
            <ul style={styles.recommendationList}>
              {formData.duringSymptoms.includes('Severe cramps or pain') && (
                <li style={styles.recommendationItem}>
                  <strong>Cramp Relief:</strong> Gentle yoga, especially poses like child's pose and supine spinal twist, can help ease menstrual cramps.
                </li>
              )}
              {formData.duringSymptoms.includes('Extreme fatigue') && (
                <li style={styles.recommendationItem}>
                  <strong>Energy Boost:</strong> Light stretching or a short, gentle walk can help combat fatigue without overexertion.
                </li>
              )}
              <li style={styles.recommendationItem}>
                <strong>Gentle Movement:</strong> Focus on restorative yoga, light stretching, or short walks rather than intense workouts.
              </li>
            </ul>
          </div>
        </div>

        {/* Nutrition Recommendations */}
        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>
            <div style={styles.reportSectionIcon}>
              <Apple />
            </div>
            Nutrition & Diet
          </div>
          <div style={styles.reportContent}>
            <p><strong>Foods to Include:</strong></p>
            <ul style={styles.recommendationList}>
              <li style={styles.recommendationItem}>
                <strong>Iron-Rich Foods:</strong> Spinach, lentils, quinoa, and lean meats to combat fatigue and replenish iron lost during menstruation.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Anti-Inflammatory Foods:</strong> Fatty fish, walnuts, berries, and leafy greens to help reduce inflammation and pain.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Magnesium Sources:</strong> Dark chocolate, almonds, and avocados to help with muscle relaxation and mood stabilization.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Complex Carbs:</strong> Whole grains, sweet potatoes, and oats to maintain stable blood sugar levels.
              </li>
            </ul>

            <p><strong>Foods to Limit:</strong></p>
            <ul style={styles.recommendationList}>
              <li style={styles.recommendationItem}>Reduce caffeine and alcohol, which can worsen PMS symptoms</li>
              <li style={styles.recommendationItem}>Limit processed foods high in sodium to reduce bloating</li>
              <li style={styles.recommendationItem}>Cut back on refined sugars that can cause energy crashes</li>
            </ul>

            <p><strong>Hydration:</strong> Aim for 8-10 glasses of water daily, and consider herbal teas like chamomile or ginger for added benefits.</p>
          </div>
        </div>

        {/* Rest & Recovery */}
        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>
            <div style={styles.reportSectionIcon}>
              <Moon />
            </div>
            Rest & Recovery
          </div>
          <div style={styles.reportContent}>
            <p><strong>Sleep Optimization:</strong></p>
            <ul style={styles.recommendationList}>
              <li style={styles.recommendationItem}>
                <strong>Sleep Schedule:</strong> Aim for 7-9 hours of quality sleep, especially during your period when your body needs extra rest.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Evening Routine:</strong> Create a calming bedtime routine with warm baths, reading, or gentle stretching.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Sleep Environment:</strong> Keep your bedroom cool, dark, and comfortable. Consider using a heating pad for cramps.
              </li>
            </ul>

            <p><strong>Stress Management:</strong></p>
            <ul style={styles.recommendationList}>
              <li style={styles.recommendationItem}>
                <strong>Relaxation Techniques:</strong> Practice deep breathing, meditation, or progressive muscle relaxation.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Self-Care Activities:</strong> Take warm baths, listen to calming music, or engage in hobbies you enjoy.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Support System:</strong> Don't hesitate to ask for help or talk to friends and family about how you're feeling.
              </li>
            </ul>
          </div>
        </div>

        {/* General Wellness */}
        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>
            <div style={styles.reportSectionIcon}>
              <Heart />
            </div>
            General Wellness Tips
          </div>
          <div style={styles.reportContent}>
            <ul style={styles.recommendationList}>
              <li style={styles.recommendationItem}>
                <strong>Track Your Symptoms:</strong> Keep a menstrual diary to identify patterns and triggers.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Heat Therapy:</strong> Use heating pads or warm baths to relieve cramps and muscle tension.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Stay Connected:</strong> Maintain social connections and don't isolate yourself during difficult days.
              </li>
              <li style={styles.recommendationItem}>
                <strong>Professional Support:</strong> Consult a healthcare provider if symptoms significantly impact your daily life.
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={() => setShowReport(false)}
          >
            <ChevronLeft />
            Edit Responses
          </button>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={() => navigate('/CardsPage')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  };

  const getProgress = () => {
    if (showReport) return 100;
    return (currentStep / 3) * 100;
  };

  if (showReport) {
    return (
      <div style={styles.container}>
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
              onClick={() => navigate("/CardsPage")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>
        <main style={styles.mainContent}>
          {renderReport()}
        </main>
      </div>
    );
  }

  return (
    <div style={styles.container}>
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
            onClick={() => navigate("/CardsPage")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${getProgress()}%` }} />
        </div>

        <div style={styles.formCard}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <div style={styles.buttonContainer}>
            {currentStep > 1 && (
              <button
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={handlePrevious}
              >
                <ChevronLeft />
                Previous
              </button>
            )}
            <button
              style={{ ...styles.button, ...styles.primaryButton }}
              onClick={handleNext}
            >
              {currentStep < 3 ? "Next" : "Generate Report"}
              <ChevronRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthGuide;
