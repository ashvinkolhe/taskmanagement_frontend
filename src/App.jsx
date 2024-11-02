/* eslint-disable no-unused-vars */
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import SideNav from './components/SideNav/SideNav'; // Import the new SideNav component
import './pages/Dashboard.css';


const AppContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      {/* Conditionally render the SideNav component only on the dashboard route */}
      {location.pathname === "/dashboard" && (
        <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Render the selected tab content if on the dashboard route */}
          <Route path="/dashboard" element={renderActiveTab()} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
