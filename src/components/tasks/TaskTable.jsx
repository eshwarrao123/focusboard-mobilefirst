import React from 'react';
import TaskRow from './TaskRow';
import { Search } from 'lucide-react';

export default function TaskTable({
  tasks = [],
  onToggleComplete,
  onResetFilters,
  onEdit,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <div className="task-table-empty">
        <div className="empty-icon-circle">
          <Search size={24} strokeWidth={2} />
        </div>
        <h4 className="empty-title">No tasks found</h4>
        <p className="empty-description">
          We couldn't find any tasks matching your active search and filter criteria.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
          >
            Reset filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-table-container">
      <div className="task-rows-list">
        {tasks.map((task) => (
          <TaskRow 
            key={task.id} 
            task={task} 
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
