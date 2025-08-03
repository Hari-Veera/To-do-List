import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      reminder: reminderTime,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    setTaskText('');
    setReminderTime('');
    if (reminderTime) scheduleReminder(taskText, new Date(reminderTime));
  };

  const scheduleReminder = (task, time) => {
    const delay = time - new Date();
    if (delay > 0) {
      setTimeout(() => alert(`Reminder: ${task}`), delay);
    }
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      {/* Theme Toggle */}
      <div className="theme-toggle">
  <input
    id="theme-toggle"
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
  />
  <label htmlFor="theme-toggle">
    <div></div>
  </label>
</div>


      <h1>To-Do List</h1>

      {/* Input Section */}
      <div className="input-container">
  <input
    type="text"
    placeholder="Add a task..."
    value={taskText}
    onChange={(e) => setTaskText(e.target.value)}
  />
  <input
    type="datetime-local"
    value={reminderTime}
    onChange={(e) => setReminderTime(e.target.value)}
  />
  <button onClick={addTask}>Add Task</button>
</div>

      {/* Task List */}
      <ul>
  {tasks.map(task => (
    <li key={task.id}>
      <div className="task-content">
        <span className={task.completed ? 'completed' : ''}>
          {task.text}
        </span>
        {task.reminder && (
          <span className="reminder-info">
            {task.reminder?.split('T')[0]}
          </span>
        )}
      </div>
      <div className="action-buttons">
        <button
          className="save-btn"
          title={task.completed ? "Undo" : "Mark as done"}
          onClick={() => toggleComplete(task.id)}
        >
          ✔
        </button>
        <button
          className="delete-btn"
          title="Delete task"
          onClick={() => deleteTask(task.id)}
        >
          🗑
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
