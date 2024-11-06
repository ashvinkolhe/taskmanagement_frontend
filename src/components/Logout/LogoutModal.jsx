/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from './Logout.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogoutModal({ closeModal, setIsAuthenticated }) {
  const nav = useNavigate();

  const logout = async () => {
    try {
      // Call the logout API
      const response = await axios.post(
        'https://taskmanagement-backend-9ztm.onrender.com/api/users/logout',
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`
          }
        }
      );

      // Check if logout was successful
      if (response.data.status === 'success') {
        // Clear local storage
        localStorage.removeItem('authtoken');
        localStorage.removeItem('Name');

        // Update authentication state
        if (typeof setIsAuthenticated === 'function') {
          setIsAuthenticated(false);
        }

        // Close the modal before redirecting
        closeModal(false);

        // Redirect to login page
        nav('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>
          <h1>Are You Sure You Want to Logout?</h1>
        </div>
        <div className={styles.footer}>
          <button onClick={logout} className={styles.logoutButton}>
            Yes, Logout
          </button>
          <button
            onClick={() => {
              closeModal(false);
            }}
            id={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;

