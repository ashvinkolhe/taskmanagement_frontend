/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailIcon from "../../assets/images/EmailIcon.svg"; 
import PasswordIcon from "../../assets/images/Password.svg"; 
import UserIcon from '../../assets/images/ProfileFrame.svg';
import ViewEye from '../../assets/images/eye-password-view.svg'; 
import HideEye from '../../assets/images/eye-password-hide.svg';

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    Name: '',
    email: '',
    Password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({}); // Change to an object to store errors for specific fields
  const [passwordType, setPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState(ViewEye);
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(ViewEye);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    
    // Clear specific error messages on change
    if (name === 'confirmPassword') {
      if (value !== userDetails.Password) {
        setError((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setError((prev) => ({ ...prev, confirmPassword: '' })); // Clear error
      }
    } else {
      setError((prev) => ({ ...prev, [name]: value ? '' : `${name} is required` }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    const validationErrors = {};
    if (!userDetails.Name) validationErrors.Name = 'Name is required';
    if (!userDetails.email) validationErrors.email = 'Email is required';
    if (!userDetails.Password) validationErrors.Password = 'Password is required';
    if (userDetails.confirmPassword !== userDetails.Password) validationErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(validationErrors).length) {
      setError(validationErrors);
      return; // Stop submission if errors exist
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(
        'https://taskmanagement-backend-9ztm.onrender.com/api/users/register',
        userDetails,
        config
      );

      localStorage.setItem('authtoken', response.data.jwttoken);
      localStorage.setItem('Name', response.data.Name);

      toast.success('Registered Successfully ✅', { position: 'top-left' });
      setTimeout(() => navigate('/login'), 2000); // Redirect after a slight delay
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.', { position: 'top-left' });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
    setPasswordIcon(passwordType === 'password' ? HideEye : ViewEye);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
    setConfirmPasswordIcon(confirmPasswordType === 'password' ? HideEye : ViewEye);
  };

  return (
    <>
      <div className={styles.RegisterContainer}>
        <h1 className={styles.RegisterHeader}>Register</h1>
        <form className={styles.RegisterForm} onSubmit={handleSubmit}>
          <div className={styles.userInput}>
            <img src={UserIcon} alt="User Icon" className={styles.inputIcon} />
            <input
              className={styles.nameInput}
              type="text"
              placeholder="Name"
              name="Name"
              value={userDetails.Name}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          {error.Name && <label className={styles.errormessage}>{error.Name}</label>}

          <div className={styles.userInput}>
            <img src={EmailIcon} alt="Email Icon" className={styles.inputIcon} />
            <input
              className={styles.nameInput}
              type="email"
              placeholder="Email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
          {error.email && <label className={styles.errormessage}>{error.email}</label>}

          <div className={styles.userInput}>
            <img src={PasswordIcon} alt="Password Icon" className={styles.inputIcon} />
            <input
              className={styles.nameInput}
              type={passwordType}
              placeholder="Password"
              name="Password"
              value={userDetails.Password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <img
              src={passwordIcon}
              className={styles.toggleIcon}
              onClick={togglePasswordVisibility}
              alt="Toggle Password Visibility"
            />
          </div>
          {error.Password && <label className={styles.errormessage}>{error.Password}</label>}

          <div className={styles.userInput}>
            <img src={PasswordIcon} alt="Confirm Password Icon" className={styles.inputIcon} />
            <input
              className={styles.nameInput}
              type={confirmPasswordType}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <img
              src={confirmPasswordIcon}
              className={styles.toggleIcon}
              onClick={toggleConfirmPasswordVisibility}
              alt="Toggle Confirm Password Visibility"
            />
          </div>
          {error.confirmPassword && <label className={styles.errormessage}>{error.confirmPassword}</label>}

          <button className={styles.registerbtn} type="submit">Register</button>
        </form>
        <p className={styles.bottomtext}>
          <span>Already have an account?</span>
          <a href="/login" className={styles.Loginbtn}>Login</a>
        </p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
