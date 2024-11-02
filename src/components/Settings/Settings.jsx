/* eslint-disable no-unused-vars */  
// src/components/Settings.js
import React, { useState } from 'react';
import './Settings.css';
import EmailIcon from "../../assets/images/EmailIcon.svg"; 
import PasswordIcon from "../../assets/images/Password.svg"; 
import UserIcon from '../../assets/images/ProfileFrame.svg';

const Settings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSaveSettings = () => {
        // Save settings to local storage or send to backend
        localStorage.setItem('userSettings', JSON.stringify({ name, email, oldPassword, newPassword }));
        alert('Settings saved!');
        // Clear the input fields after saving
        setName('');
        setEmail('');
        setOldPassword('');
        setNewPassword('');
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <div className="settings-field">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
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
                    type="password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    placeholder="Old Password" 
                    style={{ backgroundImage: `url(${PasswordIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }} 
                    required 
                />
            </div>
            <div className="settings-field">
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="New Password" 
                    style={{ backgroundImage: `url(${PasswordIcon})`, backgroundRepeat: 'no-repeat', backgroundPosition: '10px center' }} 
                    required 
                />
            </div>
            <button className = "settings-btn" onClick={handleSaveSettings}>Update</button>
        </div>
    );
};

export default Settings;
