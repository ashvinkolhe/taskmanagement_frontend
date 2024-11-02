/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EmailIcon from '../../assets/images/EmailIcon.svg';
import PasswordIcon from '../../assets/images/Password.svg';
import ViewEye from '../../assets/images/eye-password-view.svg';
import HideEye from '../../assets/images/eye-password-hide.svg';

const EmailInput = ({ value, onChange, error }) => (
  <div className={styles.userInput}>
    <img src={EmailIcon} alt="Email Icon" className={styles.inputIcon} />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={value}
      onChange={onChange}
    />
    {error && <label className={styles.errorMessage}>{error}</label>}
  </div>
);

const PasswordInput = ({ value, onChange, showPassword, togglePasswordVisibility, error }) => (
  <div className={styles.userInput}>
    <img src={PasswordIcon} alt="Password Icon" className={styles.inputIcon} />
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="Password"
      value={value}
      onChange={onChange}
    />
    <img
      src={showPassword ? HideEye : ViewEye}
      alt="Toggle Password Visibility"
      onClick={togglePasswordVisibility}
      className={styles.toggleIcon}
    />
    {error && <label className={styles.errorMessage}>{error}</label>}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newError = {
      email: userDetails.email ? '' : 'Email is required',
      password: userDetails.password ? '' : 'Password is required',
    };
    setError(newError);
    return !newError.email && !newError.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const { data } = await axios.post('https://taskmanagement-backend-9ztm.onrender.com/api/users/login', userDetails);
      if (data.jwttoken) {
        localStorage.setItem('authToken', data.jwttoken);
        localStorage.setItem('Name', data.Name);
        localStorage.setItem('id', data.id);
        toast.success('Login Successful ✅');
        navigate('/dashboard');
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <EmailInput
            value={userDetails.email}
            onChange={handleChange}
            error={error.email}
          />
          <PasswordInput
            value={userDetails.password}
            onChange={handleChange}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            error={error.password}
          />
          <button type="submit" className={styles.loginbtn}>Log In</button>
        </form>
        <p className={styles.bottomtext}>
          <p>Have no account yet?</p> <a href="/register" className={styles.registerbtn}>Register</a>
        </p>
      </div>
      <ToastContainer position="top-left" autoClose={3000} hideProgressBar />
    </>
  );
};

export default Login;
