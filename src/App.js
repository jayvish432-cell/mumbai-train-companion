import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CrowdPredictor from './pages/CrowdPredictor';
import LiveStatus from './pages/LiveStatus';
import AiChat from './pages/AiChat';
import SOS from './pages/SOS';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crowd" element={<CrowdPredictor />} />
          <Route path="/status" element={<LiveStatus />} />
          <Route path="/chat" element={<AiChat />} />
          <Route path="/sos" element={<SOS />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;