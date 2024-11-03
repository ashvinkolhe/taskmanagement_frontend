/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, moveTask, deleteTask, openEditModal }) => {
    const [subTasks, setSubTasks] = useState(task.subTasks || []);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChecklistExpanded, setIsChecklistExpanded] = useState(false);
    const menuRef = useRef(null);

    const addSubTask = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            const newSubTasks = [...subTasks, { name: event.target.value, isChecked: false }];
            setSubTasks(newSubTasks);
            task.subTasks = newSubTasks;
            event.target.value = ''; 
        }
    };

    const toggleSubTask = (index) => {
        const updatedSubTasks = subTasks.map((subTask, i) =>
            i === index ? { ...subTask, isChecked: !subTask.isChecked } : subTask
        );
        setSubTasks(updatedSubTasks);
    };

    const shareTask = () => {
        const link = `${window.location.origin}/task/${task.id}`;
        navigator.clipboard.writeText(link).then(() => alert("Link copied to clipboard"));
        setIsMenuOpen(false); 
    };

    const renderMoveButtons = () => {
        const states = ['Backlog', 'ToDo', 'InProgress', 'Done'];
        const buttons = states
            .filter((state) => state !== task.state)
            .map((state) => (
                <button
                    key={state}
                    className={`move-btn ${state.toLowerCase()}-btn`}
                    onClick={() => moveTask(task.id, state)}
                >
                    {state}
                </button>
            ));
        return buttons;
    };

    const getPriorityDot = () => {
        switch (task.priority) {
            case 'High':
                return <span className="priority-dot red"></span>;
            case 'Medium':
                return <span className="priority-dot blue"></span>;
            case 'Low':
                return <span className="priority-dot green"></span>;
            default:
                return null;
        }
    };

    const getDueDateClass = () => {
        if (task.priority === 'High' && task.dueDate) {
            return 'red';
        }
        return '';
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const toggleChecklist = () => {
        setIsChecklistExpanded(!isChecklistExpanded);
    };

    const formatDate = (date) => {
        const options = { month: 'short', day: 'numeric' };
        return date ? new Date(date).toLocaleDateString('en-US', options) : '';
    };

    return (
        <div className="task" style={{ borderRadius: '12px' }}>
            <div className="task-card-content" style={{ borderRadius: '12px' }}>
                <div className="task-header">
                    <h4>
                        {getPriorityDot()} {task.priority}
                    </h4>
                    <span className="menu-icon" onClick={toggleMenu} style={{ float: 'right' }}>
                        &#x22EE;
                    </span>

                    {isMenuOpen && (
                        <div className="dropdown-menu" ref={menuRef}>
                            <button className="edit-btn" onClick={() => { openEditModal(task); setIsMenuOpen(false); }}>Edit</button>
                            <button className="delete-btn" onClick={() => { deleteTask(task.id); setIsMenuOpen(false); }}>Delete</button>
                            <button className="share-btn" onClick={shareTask}>Share</button>
                        </div>
                    )}
                </div>

                <div className="checklist-header">
                    <p>Checklist({subTasks.filter(st => st.isChecked).length}/{subTasks.length})
                        <button className="toggle-checklist" onClick={toggleChecklist}>
                            {isChecklistExpanded ? '▲' : '▼'}
                        </button>
                    </p>
                </div>

                {isChecklistExpanded && (
                    <div className="checklist">
                        {subTasks.map((subTask, index) => (
                            <div key={index}>
                                <input type="checkbox" checked={subTask.isChecked} onChange={() => toggleSubTask(index)} />
                                <span>{subTask.name}</span>
                            </div>
                        ))}
                        <input
                            type="text"
                            placeholder="Add sub-task"
                            onKeyDown={addSubTask}
                            className="add-subtask"
                        />
                    </div>
                )}

                <div className="task-due-date">
                    {formatDate(task.dueDate)}
                </div>

                <div className="task-actions">
                    {renderMoveButtons()}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
