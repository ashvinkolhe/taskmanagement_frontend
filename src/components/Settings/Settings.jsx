/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Settings.css';
import EmailIcon from "../../assets/images/EmailIcon.svg"; 
import PasswordIcon from "../../assets/images/Password.svg"; 
import UserIcon from '../../assets/images/ProfileFrame.svg';
import ViewEye from '../../assets/images/eye-password-view.svg';
import HideEye from '../../assets/images/eye-password-hide.svg';

const Settings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState(null); // State for error messages

    const handleSaveSettings = async () => {
        try {
            // Assuming you have an API endpoint for updating settings
            const response = await fetch('https://taskmanagement-backend-9ztm.onrender.com/api/users/update-password', {
                method: 'PUT', // Use POST or PUT based on your API
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers here if required
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Example for Bearer token
                },
                body: JSON.stringify({
                    name,
                    email,
                    oldPassword,
                    newPassword
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update settings');
            }

            alert('Settings updated successfully!');
            // Reset fields after successful update
            setName('');
            setEmail('');
            setOldPassword('');
            setNewPassword('');
            setError(null); // Clear error if any
        } catch (err) {
            console.error(err);
            setError(err.message); // Set error message to display to user
        }
    };

    const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
    const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

    return (
        <div className="settings">
            <h2>Settings</h2>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <div className="settings-field">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} // Fixing onChange for name input
                    placeholder="Name" 
                    style={{ backgroundImage: `url(${UserIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }} 
                    required 
                />
            </div>
            <div className="settings-field">
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Update Email" 
                    style={{ backgroundImage: `url(${EmailIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }} 
                    required 
                />
            </div>
            <div className="settings-field">
                <input 
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    placeholder="Old Password" 
                    style={{ backgroundImage: `url(${PasswordIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }} 
                    required 
                />
                <img
                    src={showOldPassword ? HideEye : ViewEye}
                    alt="Toggle Password Visibility"
                    onClick={toggleOldPasswordVisibility}
                    className="toggle-password-icon"
                />
            </div>
            <div className="settings-field">
                <input 
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="New Password" 
                    style={{ backgroundImage: `url(${PasswordIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }} 
                    required 
                />
                <img
                    src={showNewPassword ? HideEye : ViewEye}
                    alt="Toggle Password Visibility"
                    onClick={toggleNewPasswordVisibility}
                    className="toggle-password-icon"
                />
            </div>
            <button className="settings-btn" onClick={handleSaveSettings}>Update</button>
        </div>
    );
};

export default Settings;
