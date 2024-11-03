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

// Register component
const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [userDetails, setUserDetails] = useState({ // State to hold user details
    Name: '',
    email: '',
    Password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({}); // State to hold error messages for specific fields
  const [passwordType, setPasswordType] = useState('password'); // State for password visibility
  const [passwordIcon, setPasswordIcon] = useState(ViewEye); // State for password icon
  const [confirmPasswordType, setConfirmPasswordType] = useState('password'); // State for confirm password visibility
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(ViewEye); // State for confirm password icon

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setUserDetails({ ...userDetails, [name]: value }); // Update user details state

    // Clear specific error messages on change
    if (name === 'confirmPassword') {
      if (value !== userDetails.Password) {
        setError((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' })); // Set error if passwords don't match
      } else {
        setError((prev) => ({ ...prev, confirmPassword: '' })); // Clear error if they match
      }
    } else {
      setError((prev) => ({ ...prev, [name]: value ? '' : `${name} is required` })); // Clear error if input is filled
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check for empty fields
    const validationErrors = {};
    if (!userDetails.Name) validationErrors.Name = 'Name is required';
    if (!userDetails.email) validationErrors.email = 'Email is required';
    if (!userDetails.Password) validationErrors.Password = 'Password is required';
    if (userDetails.confirmPassword !== userDetails.Password) validationErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(validationErrors).length) {
      setError(validationErrors); // Set validation errors if any
      return; // Stop submission if errors exist
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json', // Set content type for request
        },
      };

      // Make POST request to register user
      const response = await axios.post(
        'https://taskmanagement-backend-9ztm.onrender.com/api/users/register',
        userDetails,
        config
      );

      // Store authentication token and user name in local storage
      localStorage.setItem('authtoken', response.data.jwttoken);
      localStorage.setItem('Name', response.data.Name);

      // Notify user of successful registration
      toast.success('Registered Successfully ✅', { position: 'top-left' });
      setTimeout(() => navigate('/login'), 2000); // Redirect after a slight delay
    } catch (error) {
      // Check if error message matches "User already exists"
      if (error.response && error.response.data.message === "User already exists") {
        toast.error('User with this email already exists', { position: 'top-left' });
      } else {
        console.error('Registration error:', error); // Log any other registration errors
        toast.error('Registration failed. Please try again.', { position: 'top-left' }); // Notify user of failure
      }
   }
  };

  // Toggle password visibility for password input
  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password'); // Switch between text and password type
    setPasswordIcon(passwordType === 'password' ? HideEye : ViewEye); // Change icon based on visibility
  };

  // Toggle password visibility for confirm password input
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password'); // Switch between text and password type
    setConfirmPasswordIcon(confirmPasswordType === 'password' ? HideEye : ViewEye); // Change icon based on visibility
  };

  return (
    <>
      <div className={styles.RegisterContainer}> {/* Main container for the registration form */}
        <h1 className={styles.RegisterHeader}>Register</h1> {/* Registration header */}
        <form className={styles.RegisterForm} onSubmit={handleSubmit}> {/* Registration form */}
          <div className={styles.userInput}>
            <img src={UserIcon} alt="User Icon" className={styles.inputIcon} /> {/* User icon */}
            <input
              className={styles.nameInput}
              type="text"
              placeholder="Name"
              name="Name"
              value={userDetails.Name}
              onChange={handleChange} // Update user details on change
              autoComplete="name"
            />
          </div>
          {error.Name && <label className={styles.errormessage}>{error.Name}</label>} {/* Display error for Name */}

          <div className={styles.userInput}>
            <img src={EmailIcon} alt="Email Icon" className={styles.inputIcon} /> {/* Email icon */}
            <input
              className={styles.nameInput}
              type="email"
              placeholder="Email"
              name="email"
              value={userDetails.email}
              onChange={handleChange} // Update user details on change
              autoComplete="email"
            />
          </div>
          {error.email && <label className={styles.errormessage}>{error.email}</label>} {/* Display error for Email */}

          <div className={styles.userInput}>
            <img src={PasswordIcon} alt="Password Icon" className={styles.inputIcon} /> {/* Password icon */}
            <input
              className={styles.nameInput}
              type={passwordType} // Password input type based on visibility
              placeholder="Password"
              name="Password"
              value={userDetails.Password}
              onChange={handleChange} // Update user details on change
              autoComplete="new-password"
            />
            <img
              src={passwordIcon} // Toggle password visibility icon
              className={styles.toggleIcon}
              onClick={togglePasswordVisibility} // Toggle function on click
              alt="Toggle Password Visibility"
            />
          </div>
          {error.Password && <label className={styles.errormessage}>{error.Password}</label>} {/* Display error for Password */}

          <div className={styles.userInput}>
            <img src={PasswordIcon} alt="Confirm Password Icon" className={styles.inputIcon} /> {/* Confirm password icon */}
            <input
              className={styles.nameInput}
              type={confirmPasswordType} // Confirm password input type based on visibility
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleChange} // Update user details on change
              autoComplete="new-password"
            />
            <img
              src={confirmPasswordIcon} // Toggle confirm password visibility icon
              className={styles.toggleIcon}
              onClick={toggleConfirmPasswordVisibility} // Toggle function on click
              alt="Toggle Confirm Password Visibility"
            />
          </div>
          {error.confirmPassword && <label className={styles.errormessage}>{error.confirmPassword}</label>} {/* Display error for Confirm Password */}

          <button className={styles.registerbtn} type="submit">Register</button> {/* Submit button for registration */}
        </form>
        <p className={styles.bottomtext}> {/* Bottom text for navigation */}
          <p>Already have an account?</p>
          <a href="/login" className={styles.Loginbtn}>Login</a> {/* Link to login page */}
        </p>
      </div>
      <ToastContainer /> {/* Container for toast notifications */}
    </>
  );
};

export default Register; // Exporting the Register component for use in other parts of the application