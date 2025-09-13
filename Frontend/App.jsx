import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HerBlossomDays from "./title";
import CardsPage from "./CardsPage";
import ChatbotUI from "./chatbot"; 
import PeriodTracker from "./tracker";
import NearbyPage from "./map";
import HealthGuide from "./guide";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HerBlossomDays />} />
        <Route path="/CardsPage" element={<CardsPage />} />

        {/* Add placeholder pages for now */}
        <Route path="/tracker" element={<PeriodTracker />} />
        <Route path="/nearby" element={<NearbyPage />} />
        <Route path="/health" element={<HealthGuide />} />
        <Route path="/support" element={<ChatbotUI />} />
      </Routes>
    </Router>
  );
}

export default App;
