import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";  

const Flower2 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5c0 .5 0 3.5-2 5l-2.5-1.5L9.5 17c-2-1.5-2-4.5-2-5a4.5 4.5 0 1 1 4.5-4.5z"/>
    <path d="M8.5 12.5a4.5 4.5 0 1 0 7 0"/>
    <path d="M12 7.5V9"/>
  </svg>
);

const Send = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
  </svg>
);

const Bot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
    <circle cx="12" cy="5" r="2"></circle>
    <path d="M12 7v4"></path>
    <line x1="8" y1="16" x2="8" y2="16"></line>
    <line x1="16" y1="16" x2="16" y2="16"></line>
  </svg>
);

const User = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ChatbotUI = () => {
    const navigate = useNavigate();  
   const onBack = () => navigate("/CardsPage"); 

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Roselle, your safe space companion. I'm here to answer any questions you have about periods, health, or anything else on your mind. Feel free to ask me anything - this conversation is completely anonymous and private.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // AI bot
    if (lowerMessage.includes('period') || lowerMessage.includes('menstruation')) {
      return "Periods are a normal part of growing up! They typically last 3-7 days and happen about once a month. It's completely normal to have questions. Would you like to know about managing cramps, tracking your cycle, or something else specific?";
    } else if (lowerMessage.includes('cramp') || lowerMessage.includes('pain')) {
      return "Period cramps are common and there are ways to manage them! Try gentle exercise, a warm heating pad, staying hydrated, and getting enough rest. If pain is severe, it's always good to talk to a trusted adult or healthcare provider.";
    } else if (lowerMessage.includes('pad') || lowerMessage.includes('tampon')) {
      return "Both pads and tampons are safe options! Pads sit outside your body and tampons go inside. Start with what feels most comfortable to you. Change them regularly (every 3-4 hours) and always wash your hands before and after.";
    } else if (lowerMessage.includes('scared') || lowerMessage.includes('worried') || lowerMessage.includes('afraid')) {
      return "It's completely normal to feel nervous or worried about periods - you're not alone in feeling this way! Many people feel uncertain at first. Remember, this is a natural part of growing up, and there are always trusted adults and resources to help you.";
    } else if (lowerMessage.includes('first') || lowerMessage.includes('started')) {
      return "Getting your first period can feel overwhelming, but you're doing great by seeking information! Keep some supplies with you, track when it happens, and don't hesitate to talk to a trusted adult. Every person's experience is different, and that's perfectly normal.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm so glad you're here. This is your safe space to ask any questions about periods, health, or growing up. What would you like to know about today?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're so welcome! I'm here whenever you need support or have questions. Remember, you're doing amazing by taking care of your health and seeking information!";
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition')) {
      return "Good nutrition can really help during your period! Try eating iron-rich foods like spinach and lean meats, stay hydrated, and consider foods with magnesium like dark chocolate (yes, really!). Avoid too much caffeine or salty foods as they might make you feel more bloated.";
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
      return "Light exercise during your period can actually help with cramps and mood! Try gentle yoga, walking, or stretching. Listen to your body - some days you might feel energetic, other days you might want to rest, and both are perfectly okay.";
    } else if (lowerMessage.includes('mood') || lowerMessage.includes('emotional') || lowerMessage.includes('feelings')) {
      return "It's totally normal to feel more emotional during your period due to hormone changes. Be kind to yourself, get enough sleep, do activities you enjoy, and remember that these feelings will pass. If you're feeling very overwhelmed, talking to someone you trust can really help.";
    } else {
      return "That's a great question! While I try to help with period and health-related questions, for specific medical concerns, it's always best to speak with a healthcare provider or trusted adult. Is there something specific about periods or your health I can help you with?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fed7aa 100%)",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column"
    },
    
    header: {
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #fecaca",
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
      fontSize: "0.875rem",
      fontWeight: "500"
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

    chatContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      width: "100%"
    },

    chatTitle: {
      textAlign: "center",
      marginBottom: "2rem"
    },

    titleText: {
      fontSize: "2rem",
      fontWeight: "300",
      color: "#881337",
      marginBottom: "0.5rem",
      background: "linear-gradient(135deg, #e11d48, #ec4899, #be185d)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },

    titleSubtext: {
      color: "#be185d",
      fontSize: "1rem",
      opacity: 0.8
    },

    messagesContainer: {
      flex: 1,
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(10px)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginBottom: "1rem",
      maxHeight: "500px",
      overflowY: "auto",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
    },

    message: {
      display: "flex",
      marginBottom: "1rem",
      alignItems: "flex-start",
      gap: "0.75rem"
    },

    messageBot: {
      justifyContent: "flex-start"
    },

    messageUser: {
      justifyContent: "flex-end"
    },

    messageAvatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      color: "white"
    },

    messageBubble: {
      padding: "0.75rem 1rem",
      borderRadius: "1rem",
      maxWidth: "70%",
      fontSize: "0.95rem",
      lineHeight: "1.4",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    },

    messageBubbleBot: {
      background: "white",
      color: "#374151",
      borderTopLeftRadius: "0.25rem"
    },

    messageBubbleUser: {
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      color: "white",
      borderTopRightRadius: "0.25rem"
    },

    typingIndicator: {
      fontStyle: "italic",
      fontSize: "0.85rem",
      color: "#6b7280",
      marginLeft: "2.5rem",
      marginBottom: "1rem"
    },

    inputContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "white",
      borderRadius: "2rem",
      padding: "0.5rem 1rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    },

    input: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "0.95rem",
      padding: "0.5rem",
      fontFamily: "inherit",
      background: "transparent"
    },

    sendButton: {
      background: "linear-gradient(135deg, #f9a8d4, #fbb6ce)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      cursor: "pointer",
      transition: "transform 0.2s ease"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo} onClick={onBack}>
            <div style={styles.logoIcon}><Flower2 /></div>
            <span style={styles.logoText}>HerBlossomDays</span>
          </div>
          <button style={styles.backButton} onClick={onBack}>Back</button>
        </div>
      </header>

      {/* Chat Area */}
      <main style={styles.chatContainer}>
        <div style={styles.chatTitle}>
          <h1 style={styles.titleText}> Roselle here!</h1>
          <p style={styles.titleSubtext}>
            Your safe space for period and health questions 
          </p>
        </div>

        <div style={styles.messagesContainer}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.message,
                ...(msg.isBot ? styles.messageBot : styles.messageUser)
              }}
            >
              {msg.isBot && (
                <div style={styles.messageAvatar}><Bot /></div>
              )}
              {!msg.isBot && (
                <div style={styles.messageAvatar}><User /></div>
              )}
              <div
                style={{
                  ...styles.messageBubble,
                  ...(msg.isBot ? styles.messageBubbleBot : styles.messageBubbleUser)
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && <div style={styles.typingIndicator}>Roselle is typing...</div>}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Box */}
        <div style={styles.inputContainer}>
          <textarea
            ref={inputRef}
            style={styles.input}
            rows={1}
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button style={styles.sendButton} onClick={handleSendMessage}>
            <Send />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatbotUI;
