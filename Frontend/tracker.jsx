import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, X, MessageCircle, Heart, Zap, AlertCircle, BookOpen, Plane, Coffee } from 'lucide-react';

const PeriodTracker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState({
    firstDay: '',
    lastDay: '',
    symptoms: [],
    events: [],
    dailyLogs: {} // New: daily mood/symptom logs
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showDayLog, setShowDayLog] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [conversationStep, setConversationStep] = useState(0);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'exam' });
  const [dayLogData, setDayLogData] = useState({ mood: '', symptoms: [], notes: '' });
  const [showInsights, setShowInsights] = useState(false);

  // Enhanced symptom options with emojis
  const symptomOptions = [
    { name: 'Cramps', emoji: '😣' },
    { name: 'Bloating', emoji: '🎈' },
    { name: 'Headaches', emoji: '🤕' },
    { name: 'Mood swings', emoji: '🎭' },
    { name: 'Fatigue', emoji: '😴' },
    { name: 'Back pain', emoji: '🦴' },
    { name: 'Breast tenderness', emoji: '💔' },
    { name: 'Nausea', emoji: '🤢' },
    { name: 'Food cravings', emoji: '🍫' },
    { name: 'Acne', emoji: '🔴' }
  ];

  const moods = [
    { name: 'Great', emoji: '😊', color: '#10b981' },
    { name: 'Good', emoji: '🙂', color: '#3b82f6' },
    { name: 'Okay', emoji: '😐', color: '#f59e0b' },
    { name: 'Low', emoji: '😔', color: '#ef4444' },
    { name: 'Awful', emoji: '😭', color: '#7c2d12' }
  ];

  const eventIcons = {
    exam: '📚',
    function: '🎉',
    travel: '✈️',
    work: '💼',
    other: '📅'
  };

  // Conversation prompts for setup
  const conversationPrompts = [
    "Hey there! 👋 Let's get to know your cycle better. When was the first day of your last period?",
    "Perfect! And when did it end?",
    "Got it! Did you experience any symptoms during your last period? Tap all that apply:",  ];

  // Prediction functions
  const predictNextCycle = (lastPeriodStart) => {
    if (!lastPeriodStart) return null;
    const lastDate = new Date(lastPeriodStart);
    const nextCycle = new Date(lastDate);
    nextCycle.setDate(lastDate.getDate() + 28);
    return nextCycle;
  };

  const getPredictedPeriodDays = () => {
    const nextCycle = predictNextCycle(surveyData.firstDay);
    if (!nextCycle) return [];
    
    const days = [];
    for (let i = 0; i < 5; i++) { // Assume 5-day period
      const day = new Date(nextCycle);
      day.setDate(nextCycle.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const isPredictedPeriodDay = (day) => {
    const predictedDays = getPredictedPeriodDays();
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return predictedDays.some(pDay => 
      pDay.toDateString() === checkDate.toDateString()
    );
  };

  // Enhanced day checking functions
  const isPeriodDay = (day) => {
    if (!surveyData.firstDay || !surveyData.lastDay) return false;
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const firstDay = new Date(surveyData.firstDay);
    const lastDay = new Date(surveyData.lastDay);
    return checkDate >= firstDay && checkDate <= lastDay;
  };

  const isEventDay = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = checkDate.toISOString().split('T')[0];
    return surveyData.events.some(event => event.date === dateStr);
  };

  const getEventForDay = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = checkDate.toISOString().split('T')[0];
    return surveyData.events.find(event => event.date === dateStr);
  };

  const getDayLogForDay = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = checkDate.toISOString().split('T')[0];
    return surveyData.dailyLogs[dateStr];
  };

  // Insights generation
  const generateInsights = () => {
    const nextPeriod = predictNextCycle(surveyData.firstDay);
    const upcomingEvents = surveyData.events.filter(event => {
      const eventDate = new Date(event.date);
      const today = new Date();
      return eventDate > today;
    });

    const insights = [];

    if (nextPeriod) {
      const daysUntil = Math.ceil((nextPeriod - new Date()) / (1000 * 60 * 60 * 24));
      insights.push({
        type: 'prediction',
        icon: '🔮',
        title: 'Next Period Prediction',
        message: `Your next period is predicted for ${nextPeriod.toLocaleDateString()} (in ${daysUntil} days)`
      });

      // Check for events near predicted period
      upcomingEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const daysDiff = Math.abs((eventDate - nextPeriod) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 3) {
          insights.push({
            type: 'warning',
            icon: '⚠️',
            title: 'Event Alert',
            message: `Your ${event.title} is close to your predicted period. Consider preparing for potential symptoms.`
          });
        }
      });
    }

    // Symptom pattern insights
    if (surveyData.symptoms.length > 0) {
      insights.push({
        type: 'pattern',
        icon: '📊',
        title: 'Your Common Symptoms',
        message: `You typically experience: ${surveyData.symptoms.slice(0, 3).join(', ')}`
      });
    }

    return insights;
  };

  // Event handlers
const handleNextConversation = () => {
  if (conversationStep < 2) {
    setConversationStep(prev => prev + 1); // go to next chat step
  } else {
    setCurrentStep(1); // jump directly to the calendar
  }
};

  const handlePrevConversation = () => {
    if (conversationStep > 0) setConversationStep(conversationStep - 1);
  };

  const handleSymptomToggle = (symptom) => {
    setSurveyData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom.name)
        ? prev.symptoms.filter(s => s !== symptom.name)
        : [...prev.symptoms, symptom.name]
    }));
  };

  const openDayLog = (day) => {
    setSelectedDay(day);
    const existingLog = getDayLogForDay(day);
    if (existingLog) {
      setDayLogData(existingLog);
    } else {
      setDayLogData({ mood: '', symptoms: [], notes: '' });
    }
    setShowDayLog(true);
  };

  const saveDayLog = () => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
    const dateStr = checkDate.toISOString().split('T')[0];
    
    setSurveyData(prev => ({
      ...prev,
      dailyLogs: {
        ...prev.dailyLogs,
        [dateStr]: dayLogData
      }
    }));
    
    setShowDayLog(false);
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setSurveyData(prev => ({
        ...prev,
        events: [...prev.events, { ...newEvent, id: Date.now() }]
      }));
      setNewEvent({ title: '', date: '', type: 'exam' });
      setShowAddEvent(false);
    }
  };

  const removeEvent = (id) => {
    setSurveyData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id)
    }));
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fed7aa 100%)',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden'
    },

    surveyWrapper: {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #fce7f3, #fbcfe8, #fecdd3)',
  padding: '1rem',
},

surveyCard: {
  background: 'white',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  maxWidth: '600px',
  width: '100%',
},

chatSetup: {
  minHeight: '100vh',   
  width: '100vw',
  display: 'flex',
  alignItems: 'flex-start', 
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #fce7f3, #fbcfe8, #fecdd3)',
  padding: '2rem',
  overflowY: 'auto' 
},


chatCard: {
  background: 'white',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  maxWidth: '420px',
  width: '100%',
},

chatBubble: {
  background: '#fce7f3',
  padding: '1rem',
  borderRadius: '0.75rem',
  marginBottom: '1.5rem',
  fontSize: '1rem',
  color: '#374151',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
},

symptomCard: {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '1rem',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  maxWidth: '5000px',   
  width: '100%',
  marginTop: '1rem'
},


    mainLayout: {
      display: 'flex',
      width: '100%',
      height: '100%',
      gap: '1rem',
      padding: '1rem'
    },
    calendarSection: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    insightsPanel: {
      width: '320px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      overflowY: 'auto'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#be185d',
      textAlign: 'center',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '1rem',
      borderRadius: '1rem',
      border: '2px solid #fbb6ce',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      background: 'rgba(255, 255, 255, 0.8)'
    },
symptomGridExpanded: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '1rem',
  marginTop: '1rem'
},

    symptomButton: {
      padding: '1rem',
      borderRadius: '1rem',
      border: '2px solid transparent',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      transform: 'scale(1)'
    },
    symptomActive: {
      background: 'linear-gradient(135deg, #f9a8d4, #fbb6ce)',
      color: 'white',
      borderColor: '#e11d48',
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(249, 168, 212, 0.4)'
    },
    symptomInactive: {
      background: 'rgba(255, 255, 255, 0.8)',
      color: '#be185d',
      borderColor: '#fbb6ce'
    },
    button: {
      padding: '1rem 2rem',
      borderRadius: '1.5rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      justifyContent: 'center'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #fb7185, #f472b6)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(251, 113, 133, 0.3)'
    },
    secondaryButton: {
      background: 'rgba(255, 255, 255, 0.8)',
      color: '#be185d',
      border: '2px solid #fbb6ce'
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridTemplateRows: 'auto repeat(6, 1fr)',
      gap: '2px',
      background: '#fbb6ce',
      borderRadius: '1rem',
      overflow: 'hidden',
      flex: 1,
      minHeight: 0
    },
    dayHeader: {
      background: 'linear-gradient(135deg, #f9a8d4, #fbb6ce)',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '0.9rem'
    },
    dayCell: {
      background: 'white',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      cursor: 'pointer',
      minHeight: '80px',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease'
    },
    periodDay: {
      background: 'linear-gradient(135deg, #fce7f3, #fbb6ce)',
      color: '#be185d',
      fontWeight: '600'
    },
    predictedPeriodDay: {
      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      color: '#d97706',
      fontWeight: '500',
      border: '2px dashed #f59e0b'
    },
    eventDay: {
      background: 'linear-gradient(135deg, #ddd6fe, #c4b5fd)',
      color: '#7c3aed',
      fontWeight: '500'
    },
    dayWithLog: {
      boxShadow: 'inset 0 0 0 2px #10b981'
    },
    tooltip: {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '0.8rem',
      zIndex: 1000,
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      maxWidth: '400px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    moodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    moodButton: {
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '2px solid transparent',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      fontSize: '1.5rem'
    },
    insightCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '1rem',
      padding: '1rem',
      border: '1px solid #fbb6ce',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start'
    },
    insightIcon: {
      fontSize: '1.5rem',
      flexShrink: 0
    },
    insightContent: {
      flex: 1
    },
    insightTitle: {
      fontWeight: '600',
      color: '#be185d',
      marginBottom: '0.5rem'
    },
    insightMessage: {
      fontSize: '0.9rem',
      color: '#374151',
      lineHeight: '1.4'
    }
  };

const renderConversationalSetup = () => {
  const currentPrompt = conversationPrompts[conversationStep];

  return (
    <div style={styles.chatSetup}>
      <div style={styles.chatCard}>
        <div style={styles.chatBubble}>
          {currentPrompt}
        </div>

        {/* First Day Input */}
        {conversationStep === 0 && (
          <input
            type="date"
            style={styles.input}
            value={surveyData.firstDay}
            onChange={(e) => setSurveyData(prev => ({ ...prev, firstDay: e.target.value }))}
            placeholder="Select date"
          />
        )}

        {/* Last Day Input */}
        {conversationStep === 1 && (
          <input
            type="date"
            style={styles.input}
            value={surveyData.lastDay}
            onChange={(e) => setSurveyData(prev => ({ ...prev, lastDay: e.target.value }))}
            placeholder="Select date"
          />
        )}

        {/* Symptoms Grid */}
        {conversationStep === 2 && (
          <div style={styles.symptomGridExpanded}>
            {symptomOptions.map(symptom => (
              <div
                key={symptom.name}
                style={{
                  ...styles.symptomButton,
                  ...(surveyData.symptoms.includes(symptom.name)
                    ? styles.symptomActive
                    : styles.symptomInactive)
                }}
                onClick={() => handleSymptomToggle(symptom)}
              >
                <span style={{ fontSize: '1.8rem' }}>{symptom.emoji}</span>
                <span>{symptom.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          {conversationStep > 0 && (
            <button
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handlePrevConversation}
            >
              Back
            </button>
          )}

          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleNextConversation}
          >
            {conversationStep === 2 ? "Let's Go! 🎉" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    const prevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={prevMonth}>
            <ChevronLeft style={{width: '24px', height: '24px', color: '#be185d'}} />
          </button>
          <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#be185d', margin: 0}}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={nextMonth}>
            <ChevronRight style={{width: '24px', height: '24px', color: '#be185d'}} />
          </button>
        </div>

        <div style={styles.calendarGrid}>
          {days.map(day => (
            <div key={day} style={styles.dayHeader}>{day}</div>
          ))}
          
          {Array.from({length: firstDay}, (_, i) => (
            <div key={`empty-${i}`} style={styles.dayCell}></div>
          ))}
          
          {Array.from({length: daysInMonth}, (_, i) => {
            const day = i + 1;
            const isPeriod = isPeriodDay(day);
            const isPredicted = isPredictedPeriodDay(day);
            const hasEvent = isEventDay(day);
            const event = getEventForDay(day);
            const dayLog = getDayLogForDay(day);
            
            return (
              <div
                key={day}
                style={{
                  ...styles.dayCell,
                  ...(isPeriod ? styles.periodDay : {}),
                  ...(isPredicted && !isPeriod ? styles.predictedPeriodDay : {}),
                  ...(hasEvent ? styles.eventDay : {}),
                  ...(dayLog ? styles.dayWithLog : {}),
                  transform: hoveredDay === day ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                onClick={() => openDayLog(day)}
              >
                <span style={{fontSize: '1rem', fontWeight: '600'}}>{day}</span>
                
                {hasEvent && (
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <span style={{fontSize: '1rem'}}>{eventIcons[event.type]}</span>
                    <span style={{fontSize: '0.7rem', textAlign: 'center'}}>
                      {event.title.substring(0, 6)}
                    </span>
                  </div>
                )}
                
                {dayLog && (
                  <div style={{display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {dayLog.mood && (
                      <span style={{fontSize: '0.8rem'}}>
                        {moods.find(m => m.name === dayLog.mood)?.emoji}
                      </span>
                    )}
                    {dayLog.symptoms.slice(0, 2).map(symptom => {
                      const symptomData = symptomOptions.find(s => s.name === symptom);
                      return symptomData ? (
                        <span key={symptom} style={{fontSize: '0.7rem'}}>{symptomData.emoji}</span>
                      ) : null;
                    })}
                  </div>
                )}
                
                {isPredicted && !isPeriod && (
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    fontSize: '0.6rem',
                    background: '#f59e0b',
                    color: 'white',
                    padding: '2px 4px',
                    borderRadius: '4px'
                  }}>
                    ?
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{marginTop: '1rem', display: 'flex', gap: '2rem', justifyContent: 'center', fontSize: '0.9rem', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(135deg, #fce7f3, #fbb6ce)'}}></div>
            <span>Period Days</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px dashed #f59e0b'}}></div>
            <span>Predicted</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(135deg, #ddd6fe, #c4b5fd)'}}></div>
            <span>Events</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <div style={{width: '16px', height: '16px', borderRadius: '4px', background: 'white', border: '2px solid #10b981'}}></div>
            <span>Logged Days</span>
          </div>
        </div>
      </div>
    );
  };

  const renderInsightsPanel = () => {
    const insights = generateInsights();
    
    return (
      <div style={styles.insightsPanel}>
        <h3 style={{...styles.title, fontSize: '1.2rem'}}>
          <Zap style={{width: '20px', height: '20px'}} />
          Insights
        </h3>
        
        {insights.map((insight, index) => (
          <div key={index} style={styles.insightCard}>
            <div style={styles.insightIcon}>{insight.icon}</div>
            <div style={styles.insightContent}>
              <div style={styles.insightTitle}>{insight.title}</div>
              <div style={styles.insightMessage}>{insight.message}</div>
            </div>
          </div>
        ))}
        
        {surveyData.firstDay && (
          <div style={styles.insightCard}>
            <div style={styles.insightIcon}>📊</div>
            <div style={styles.insightContent}>
              <div style={styles.insightTitle}>Cycle Summary</div>
              <div style={styles.insightMessage}>
                Last period: {new Date(surveyData.firstDay).toLocaleDateString()}<br/>
                Duration: {surveyData.lastDay ? Math.ceil((new Date(surveyData.lastDay) - new Date(surveyData.firstDay)) / (1000 * 60 * 60 * 24)) + 1 : '?'} days<br/>
                Symptoms tracked: {surveyData.symptoms.length}
              </div>
            </div>
          </div>
        )}
        
        <button
          style={{...styles.button, ...styles.primaryButton, marginTop: '1rem'}}
          onClick={() => setShowAddEvent(true)}
        >
          <Plus style={{width: '16px', height: '16px'}} />
          Add Event
        </button>
        
        <button
          style={{...styles.button, ...styles.secondaryButton}}
          onClick={() => setCurrentStep(0)}
        >
          Update Info
        </button>
      </div>
    );
  };

  if (currentStep === 0) {
    return renderConversationalSetup();
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainLayout}>
        <div style={styles.calendarSection}>
          <h1 style={styles.title}>
            <Calendar style={{width: '24px', height: '24px'}} />
            Your Period Calendar
          </h1>
          {renderCalendar()}
        </div>
        
        {renderInsightsPanel()}
      </div>

      {/* Day Log Modal */}
      {showDayLog && (
        <div style={styles.modal} onClick={() => setShowDayLog(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{color: '#be185d', marginBottom: '1rem'}}>
              Log for {currentDate.getMonth() + 1}/{selectedDay}/{currentDate.getFullYear()}
            </h3>
            
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#be185d'}}>
                How are you feeling?
              </label>
              <div style={styles.moodGrid}>
                {moods.map(mood => (
                  <div
                    key={mood.name}
                    style={{
                      ...styles.moodButton,
                      background: dayLogData.mood === mood.name ? mood.color : 'rgba(255, 255, 255, 0.5)',
                      borderColor: dayLogData.mood === mood.name ? mood.color : '#fbb6ce',
                      color: dayLogData.mood === mood.name ? 'white' : mood.color
                    }}
                    onClick={() => setDayLogData(prev => ({...prev, mood: mood.name}))}
                  >
                    {mood.emoji}
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#be185d'}}>
                Any symptoms?
              </label>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem'}}>
                {symptomOptions.map(symptom => (
                  <div
                    key={symptom.name}
                    style={{
                      ...styles.symptomButton,
                      padding: '0.5rem',
                      fontSize: '0.8rem',
                      ...(dayLogData.symptoms.includes(symptom.name) ? styles.symptomActive : styles.symptomInactive)
                    }}
                    onClick={() => {
                      setDayLogData(prev => ({
                        ...prev,
                        symptoms: prev.symptoms.includes(symptom.name)
                          ? prev.symptoms.filter(s => s !== symptom.name)
                          : [...prev.symptoms, symptom.name]
                      }));
                    }}
                  >
                    <span style={{fontSize: '1rem'}}>{symptom.emoji}</span>
                    <span>{symptom.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#be185d'}}>
                Notes
              </label>
              <textarea
                style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                value={dayLogData.notes}
                onChange={(e) => setDayLogData(prev => ({...prev, notes: e.target.value}))}
                placeholder="How was your day? Any thoughts or observations..."
              />
            </div>
            
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button
                style={{...styles.button, ...styles.secondaryButton}}
                onClick={() => setShowDayLog(false)}
              >
                Cancel
              </button>
              <button
                style={{...styles.button, ...styles.primaryButton}}
                onClick={saveDayLog}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && (
        <div style={styles.modal} onClick={() => setShowAddEvent(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{color: '#be185d', marginBottom: '1rem'}}>Add New Event</h3>
            
            <div style={{marginBottom: '1rem'}}>
              <input
                type="text"
                placeholder="Event title (e.g., Math Exam, Wedding)"
                style={styles.input}
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
              />
            </div>
            
            <div style={{marginBottom: '1rem'}}>
              <input
                type="date"
                style={styles.input}
                value={newEvent.date}
                onChange={(e) => setNewEvent(prev => ({...prev, date: e.target.value}))}
              />
            </div>
            
            <div style={{marginBottom: '1rem'}}>
              <select
                style={styles.input}
                value={newEvent.type}
                onChange={(e) => setNewEvent(prev => ({...prev, type: e.target.value}))}
              >
                <option value="exam">📚 Exam</option>
                <option value="function">🎉 Function/Event</option>
                <option value="travel">✈️ Travel</option>
                <option value="work">💼 Work</option>
                <option value="other">📅 Other</option>
              </select>
            </div>
            
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button
                style={{...styles.button, ...styles.secondaryButton}}
                onClick={() => setShowAddEvent(false)}
              >
                Cancel
              </button>
              <button
                style={{...styles.button, ...styles.primaryButton}}
                onClick={addEvent}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodTracker;