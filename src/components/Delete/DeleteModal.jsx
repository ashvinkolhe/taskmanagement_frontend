/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './DeleteModal.module.css'; 
import axios from 'axios'; 

// DeleteModal component receives props: closeModal (function to close the modal) and taskId (ID of the task to delete)
const DeleteModal = ({ closeModal, taskId }) => {
  // Config for axios request, including headers for content type and authorization
  const config = {
    headers: {
      'Content-Type': 'application/json', // Setting the content type for the request
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adding Bearer token for authentication
    },
  };

  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      await axios // Making a DELETE request to the backend API
        .delete(
          `https://taskmanagement-backend-9ztm.onrender.com/api/tasks//${taskId}`, // Endpoint to delete the task using taskId
          config // Config object for headers
        )
        .then((response) => {
          console.log('task deleted successfully'); // Log success message
          console.log(response.data); // Log response data for debugging
        });
      closeModal(false); // Close the modal after deletion
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('An error occurred while deleting the task:', error); // Log any errors that occur during deletion
    }
  };

  return (
    <div className={styles.modalBackground}> {/* Background overlay for the modal */}
      <div className={styles.modalContainer}> {/* Container for the modal content */}
        <div className={styles.title}>
          <h1>Are you sure you want to Delete?</h1> {/* Confirmation message */}
        </div>
        <div className={styles.footer}>
          <button className={styles.logoutButton} onClick={handleDelete}> {/* Button to confirm deletion */}
            Yes, Delete
          </button>

          <button
            onClick={() => {
              closeModal(false); // Close the modal on cancel
            }}
            id={styles.cancelBtn} // Styling for the cancel button
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal; // Exporting the DeleteModal component for use in other parts of the application
