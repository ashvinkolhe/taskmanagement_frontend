/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/EditTaskModal.js
import React, { useState } from 'react';
import './EditTaskModal.css';

const EditTaskModal = ({ closeModal, updateTask, task, users = [] }) => {
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [assignedUser, setAssignedUser] = useState(task.assignedUser || '');
    const [searchQuery, setSearchQuery] = useState('');

    const handleUpdateTask = () => {
        const updatedTask = { ...task, title, priority, dueDate, assignedUser };
        updateTask(updatedTask);
        closeModal();
    };

    // Filtering users based on the search query
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="modal-overlay">
            <div className="task-card-modal">
                <h2>Edit Task</h2>
                <label>
                    Title *
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Select Priority *
                    <div className="priority-selection">
                        <button
                            className={`priority-btn ${priority === 'High' ? 'active' : ''}`}
                            onClick={() => setPriority('High')}
                        >
                            HIGH PRIORITY
                        </button>
                        <button
                            className={`priority-btn ${priority === 'Medium' ? 'active' : ''}`}
                            onClick={() => setPriority('Medium')}
                        >
                            MEDIUM PRIORITY
                        </button>
                        <button
                            className={`priority-btn ${priority === 'Low' ? 'active' : ''}`}
                            onClick={() => setPriority('Low')}
                        >
                            LOW PRIORITY
                        </button>
                    </div>
                </label>
                <label>
                    Due Date *
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Assign to User
                    <input 
                        type="text" 
                        placeholder="Search for a user..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </label>
                <ul className="user-list">
                    {filteredUsers.map((user) => (
                        <li key={user.id}>
                            <button onClick={() => setAssignedUser(user.name)}>
                                {user.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="modal-footer">
                    <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                    <button className="save-btn" onClick={handleUpdateTask}>Update Task</button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
