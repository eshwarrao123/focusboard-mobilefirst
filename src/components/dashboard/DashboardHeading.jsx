import React from 'react';

export default function DashboardHeading({ onNewTask }) {
  return (
    <div className="dashboard-heading-row">
      <div className="heading-text-block">
        <h1 className="heading-title">Your work, in focus.</h1>
        <p className="heading-subtitle desktop-only">Plan your day, stay organized, and celebrate small wins.</p>
        <p className="heading-subtitle mobile-only">Stay organized and keep moving forward.</p>
      </div>
      <button 
        type="button" 
        className="btn-new-task desktop-only" 
        onClick={onNewTask}
        aria-label="Create a new task"
      >
        New task
      </button>
    </div>
  );
}
