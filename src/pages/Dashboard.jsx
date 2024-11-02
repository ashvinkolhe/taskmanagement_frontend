/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from "react";
import "../pages/Dashboard.css"; // Keep your existing CSS
import TaskCard from "../components/Task/TaskCard";
import AddTaskModal from "../components/Task/AddTaskModal";
import EditTaskModal from "../components/Task/EditTaskModal";
import SideNav from "../components/SideNav/SideNav";
import Analytics from "../components/Analytics/Analytics";
import Settings from "../components/Settings/Settings";
import plus from "../assets/images/plus.svg";
import AddPeople from "../assets/images/AddPeople.svg";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState("This Day");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [username, setUsername] = useState("User"); // Set the username here

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const addTask = (newTask) => {
    const taskWithDefaults = {
      ...newTask,
      state: "ToDo",
    };
    const updatedTasks = [...tasks, taskWithDefaults];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const moveTask = (taskId, newState) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, state: newState };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const filterTasks = (tasks, filter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter((task) => {
      if (!task.dueDate) return true;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      switch (filter) {
        case "This Day":
          return taskDate.getTime() === today.getTime();
        case "This Week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        case "This Month":
          return (
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  const renderTasks = (state) => {
    const filteredTasks = filterTasks(tasks, filter);
    return filteredTasks
      .filter((task) => task.state === state)
      .map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
          openEditModal={openEditModal}
        />
      ));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
    // Example to set username from localStorage or any source
    const storedUsername = localStorage.getItem("username") || "User"; // Default username
    setUsername(storedUsername);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="column-container">
            <div className="board-container">
              <div className="column">
                <h3>Backlog</h3>
                <div className="tasks">{renderTasks("Backlog")}</div>
              </div>
            </div>
            <div className="board-container">
              <div className="column">
                <h3>To Do <img src={plus} alt="+" className="plus-icon" onClick={openModal} /></h3>
                <div className="tasks">{renderTasks("ToDo")}</div>
              </div>
            </div>
            <div className="board-container">
              <div className="column">
                <h3>Progress</h3>
                <div className="tasks">{renderTasks("InProgress")}</div>
              </div>
            </div>
            <div className="board-container">
              <div className="column">
                <h3>Done</h3>
                <div className="tasks">{renderTasks("Done")}</div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };
  
  const formatDate = (date) => {
    const day = date.getDate();
    const monthOptions = { month: 'short' }; // Get abbreviated month name
    const formattedMonth = date.toLocaleDateString('en-GB', monthOptions);
    const year = date.getFullYear();
  
    // Determine the appropriate suffix for the day
    let suffix = 'th';
    if (day % 10 === 1 && day !== 11) suffix = 'st';
    else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    else if (day % 10 === 3 && day !== 13) suffix = 'rd';
  
    return `${day}${suffix} ${formattedMonth} ${year}`; // Return formatted date
  };
  


  return (
  <div className="dashboard">
    <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />

    {activeTab === 'dashboard' && (
      <>
        <div className="welcome-message">
          <h2>Welcome, {username}!</h2> {/* Display username */}
          <p className="header-date">{formatDate(new Date())}</p>
        </div>

        <div className="header">
          <div className="header-titles">
            <h1>Boards</h1>
            <p className="add-people"> 
              <img src={AddPeople} alt="Add People" /> Add People
            </p>
          </div>

          <div className="filter">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="This Day">This Day</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
        </div>
      </>
    )}

    {renderActiveTab()}

    {isModalOpen && (
      <AddTaskModal closeModal={closeModal} addTask={addTask} />
    )}

    {isEditModalOpen && (
      <EditTaskModal
        closeModal={closeEditModal}
        updateTask={updateTask}
        task={currentTask}
      />
    )}
  </div>
);
};

export default Dashboard;
