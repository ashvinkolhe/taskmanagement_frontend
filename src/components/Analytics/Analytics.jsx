/* eslint-disable no-unused-vars */
// src/components/Analytics.js
import React, { useState, useEffect } from 'react';
import './Analytics.css';

const Analytics = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const calculateCounts = () => {
        const counts = {
            total: tasks.length,
            backlog: tasks.filter(task => task.state === 'Backlog').length,
            todo: tasks.filter(task => task.state === 'ToDo').length,
            inProgress: tasks.filter(task => task.state === 'InProgress').length,
            done: tasks.filter(task => task.state === 'Done').length,
            lowPriority: tasks.filter(task => task.priority === 'Low').length,
            moderatePriority: tasks.filter(task => task.priority === 'Moderate').length,
            highPriority: tasks.filter(task => task.priority === 'High').length,
            dueDateTasks: tasks.filter(task => task.dueDate).length,
        };
        return counts;
    };

    const counts = calculateCounts();

    return (
        <div className="analytics">
            <h2>Analytics</h2>
            <div className="analytics-container">
                <div className="left-column">
                    <div className="analytics-stats">
                        <div>Backlog Tasks: {counts.backlog}</div>
                        <div>To-do Tasks: {counts.todo}</div>
                        <div>In-Progress Tasks: {counts.inProgress}</div>
                        <div>Completed Tasks: {counts.done}</div>
                    </div>
                </div>
                <div className="right-column">
                    <div className="priority-section">
                        <div>Low Priority: {counts.lowPriority}</div>
                        <div>Moderate Priority: {counts.moderatePriority}</div>
                        <div>High Priority: {counts.highPriority}</div>
                        <div>Due Date Tasks: {counts.dueDateTasks}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
