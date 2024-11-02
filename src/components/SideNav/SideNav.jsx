/* eslint-disable no-unused-vars */
// src/components/SideNav.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SideNav.css'; // Import the CSS file
import Logo from '../../assets/images/logo.svg';
import Board from '../../assets/images/Board.svg';
import Analytics from '../../assets/images/Analytics.svg';
import Settings from '../../assets/images/settings.svg';
import Logout from '../../assets/images/Logout.svg';
import LogoutModal from "../Logout/LogoutModal";

const SideNav = ({ activeTab, setActiveTab }) => {
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility

  return (
    <aside className="sidebar">
      <h2>
        <img src={Logo} alt="Logo" className="logo" /> Pro Manage
      </h2>
      <ul>
        <li
          onClick={() => setActiveTab('dashboard')}
          className={activeTab === 'dashboard' ? 'active' : ''}
        >
          <div className="nav-item">
            <img src={Board} alt="Board" className="nav-icon" />
            <span>Board</span>
          </div>
        </li>
        <li
          onClick={() => setActiveTab('analytics')}
          className={activeTab === 'analytics' ? 'active' : ''}
        >
          <div className="nav-item">
            <img src={Analytics} alt="Analytics" className="nav-icon" />
            <span>Analytics</span>
          </div>
        </li>
        <li
          onClick={() => setActiveTab('settings')}
          className={activeTab === 'settings' ? 'active' : ''}
        >
          <div className="nav-item">
            <img src={Settings} alt="Settings" className="nav-icon" />
            <span>Settings</span>
          </div>
        </li>
      </ul>
      <button
        type="button"
        className="logout" // Use the correct class for logout button
        onClick={() => setOpenModal(true)}
      >
        <img src={Logout} alt="Logout" className="logout-icon" />
        <span className="logout-text">Log out</span>
      </button>
      {openModal && <LogoutModal closeModal={setOpenModal} />} {/* Modal component */}
    </aside>
  );
};

// PropTypes for type checking
SideNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default SideNav;
