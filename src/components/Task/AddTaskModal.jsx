// src/components/AddTaskModal.js
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Modal.css';

const AddTaskModal = ({ closeModal, addTask, fetchUsers }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [assignedUser, setAssignedUser] = useState(null);
    const [userQuery, setUserQuery] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    // Fetch users from the database on component mount
    useEffect(() => {
        const loadUsers = async () => {
            const users = await fetchUsers();
            setSuggestedUsers(users);
        };
        loadUsers();
    }, [fetchUsers]);

    // Filter user suggestions based on input
    const handleUserSearch = (query) => {
        setUserQuery(query);
        if (query.length > 0) {
            const filteredUsers = suggestedUsers.filter(user =>
                user.name.toLowerCase().startsWith(query.toLowerCase())
            );
            setSuggestedUsers(filteredUsers);
        } else {
            setSuggestedUsers([]); // Clear suggestions if query is empty
        }
    };

    // Handle task submission
    const handleAddTask = () => {
        const newTask = {
            id: Date.now(),
            title,
            priority,
            dueDate,
            assignedUser,
            state: 'ToDo',
            subTasks: [],
        };
        addTask(newTask);
        closeModal();
    };

    // Select a user from suggestions
    const selectUser = (user) => {
        setAssignedUser(user);
        setUserQuery(user.name);
        setSuggestedUsers([]);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Add Task</h3>
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
                    Assign User:
                    <input
                        type="text"
                        placeholder="Search for a user..."
                        value={userQuery}
                        onChange={(e) => handleUserSearch(e.target.value)}
                    />
                    {/* User suggestions */}
                    {userQuery && suggestedUsers.length > 0 && (
                        <ul className="user-suggestions">
                            {suggestedUsers.map(user => (
                                <li key={user.id} onClick={() => selectUser(user)}>
                                    <div className="user-avatar">
                                        {user.name.charAt(0)} {/* User Initial */}
                                    </div>
                                    <span>{user.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </label>
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};

export default AddTaskModal;
