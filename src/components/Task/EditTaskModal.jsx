/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/EditTaskModal.js
import React, { useState } from 'react';
import './Modal.css';

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
        <div className="modal">
            <div className="modal-content">
                <h3>Edit Task</h3>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Priority:
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <label>
                    Due Date:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <label>
                    Assign to User:
                    <input 
                        type="text" 
                        placeholder="Search for a user..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </label>
                <ul>
                    {filteredUsers.map((user) => (
                        <li key={user.id}>
                            <button onClick={() => setAssignedUser(user.name)}>
                                {user.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleUpdateTask}>Update Task</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};

export default EditTaskModal;
