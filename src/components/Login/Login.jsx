/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
            autoComplete="email"
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
            autoComplete={showPassword ? "new-password" : "current-password"}
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
            const { data } = await axios.post('https://taskmanagement-backend-9ztm.onrender.com/api/users/login', {
                email: userDetails.email,
                password: userDetails.password
            });

            if (data?.status === "success") {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('Name', data.user.email);
                localStorage.setItem('id', data.user.id);

                toast.success('Login Successful');
                navigate('/dashboard');
            } else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            console.error('Login Error:', error);
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
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
                <div className={styles.bottomtext}>
                    <p>Have no account yet?</p>
                    <span>
                        <a href="/register" className={styles.registerbtn}>Register</a>
                    </span>
                </div>
            </div>
            <ToastContainer position="top-left" autoClose={3000} hideProgressBar={false} />
        </>
    );
};

export default Login;