/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import SideNav from './components/SideNav/SideNav';
import './pages/Dashboard.css';

const AppContent = ({ isAuthenticated }) => {
    const [activeTab, setActiveTab] = useState("dashboard");

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
            <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="content">
                {isAuthenticated ? renderActiveTab() : <Navigate to="/login" />}
            </main>
        </div>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={isAuthenticated ? <AppContent isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
