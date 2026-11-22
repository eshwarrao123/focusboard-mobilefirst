import React from 'react';
import { Plus } from 'lucide-react';
import TaskFilters from './TaskFilters';
import TaskTable from './TaskTable';

export default function TaskSection({
  tasks = [],
  totalTasksCount,
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  onToggleComplete,
  onResetFilters,
  onViewAllTasks,
  onNewTask,
  onEdit,
  onDelete,
}) {
  return (
    <section className="my-tasks-section" aria-label="My tasks">
      {/* Header Row */}
      <div className="section-header-row">
        <div className="section-title-group">
          <h2 className="section-title">My tasks</h2>
          <p className="section-subtitle desktop-only">Manage and track everything in one place.</p>
          <p className="section-subtitle mobile-only">Your priorities for this week</p>
        </div>

        {/* Desktop "View all tasks" button */}
        <button
          type="button"
          className="btn-view-all desktop-only"
          onClick={onViewAllTasks}
          aria-label="View all tasks"
        >
          View all tasks
        </button>

        {/* Mobile square plus button */}
        <button
          type="button"
          className="btn-mobile-add-task mobile-only"
          onClick={onNewTask}
          aria-label="Add new task"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Search and Filters Bar */}
      <TaskFilters
        statusFilter={statusFilter}
        onStatusChange={onStatusChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        priorityFilter={priorityFilter}
        onPriorityChange={onPriorityChange}
        totalCount={totalTasksCount}
      />

      {/* Task Rows / Stacked Cards */}
      <TaskTable
        tasks={tasks}
        onToggleComplete={onToggleComplete}
        onResetFilters={onResetFilters}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
  );
}
