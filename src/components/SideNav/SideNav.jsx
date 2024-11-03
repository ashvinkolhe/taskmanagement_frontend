/* eslint-disable no-unused-vars */
// src/components/SideNav.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SideNav.css'; 
import Logo from '../../assets/images/logo.svg'; 
import Board from '../../assets/images/Board.svg'; 
import Analytics from '../../assets/images/Analytics.svg'; 
import Settings from '../../assets/images/settings.svg'; 
import Logout from '../../assets/images/Logout.svg'; 
import LogoutModal from "../Logout/LogoutModal"; 

const SideNav = ({ activeTab, setActiveTab }) => {
  const [openModal, setOpenModal] = useState(false); // State to manage visibility of the logout modal

  return (
    <aside className="sidebar"> {/* Sidebar container */}
      <h2>
        <img src={Logo} alt="Logo" className="logo" /> Pro Manage {/* Logo and title */}
      </h2>
      <ul> {/* Navigation list */}
        <li
          onClick={() => setActiveTab('dashboard')} // Set active tab to 'dashboard' on click
          className={activeTab === 'dashboard' ? 'active' : ''} // Apply 'active' class if this tab is selected
        >
          <div className="nav-item"> {/* Container for nav item */}
            <img src={Board} alt="Board" className="nav-icon" /> {/* Board icon */}
            <span>Board</span> {/* Label for the Board tab */}
          </div>
        </li>
        <li
          onClick={() => setActiveTab('analytics')} // Set active tab to 'analytics' on click
          className={activeTab === 'analytics' ? 'active' : ''} // Apply 'active' class if this tab is selected
        >
          <div className="nav-item"> {/* Container for nav item */}
            <img src={Analytics} alt="Analytics" className="nav-icon" /> {/* Analytics icon */}
            <span>Analytics</span> {/* Label for the Analytics tab */}
          </div>
        </li>
        <li
          onClick={() => setActiveTab('settings')} // Set active tab to 'settings' on click
          className={activeTab === 'settings' ? 'active' : ''} // Apply 'active' class if this tab is selected
        >
          <div className="nav-item"> {/* Container for nav item */}
            <img src={Settings} alt="Settings" className="nav-icon" /> {/* Settings icon */}
            <span>Settings</span> {/* Label for the Settings tab */}
          </div>
        </li>
      </ul>
      <button
        type="button" // Button type
        className="logout" // Use the correct class for styling the logout button
        onClick={() => setOpenModal(true)} // Open the logout modal on click
      >
        <img src={Logout} alt="Logout" className="logout-icon" /> {/* Logout icon */}
        <span className="logout-text">Log out</span> {/* Text for the logout button */}
      </button>
      {openModal && <LogoutModal closeModal={setOpenModal} />} {/* Conditionally render LogoutModal if openModal is true */}
    </aside>
  );
};

// PropTypes for type checking of props
SideNav.propTypes = {
  activeTab: PropTypes.string.isRequired, // activeTab prop is required and must be a string
  setActiveTab: PropTypes.func.isRequired, // setActiveTab prop is required and must be a function
};

export default SideNav; // Export the SideNav component for use in other parts of the application
