import React from 'react';
import { Check, Calendar, MoreHorizontal } from 'lucide-react';

export default function TaskRow({ task, onToggleComplete }) {
  // Canonical status check
  const isCompleted = task.status === 'completed';

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'development':
        return 'tag-dev';
      case 'content':
        return 'tag-content';
      case 'design':
      default:
        return 'tag-design';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
      default:
        return 'priority-low';
    }
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={`task-row ${isCompleted ? 'is-completed' : ''}`}>
      {/* Main Top / Left Section (Checkbox, Title, Subtitle, and Mobile Action menu) */}
      <div className="task-row-main">
        <button
          type="button"
          role="checkbox"
          aria-checked={isCompleted}
          className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleComplete && onToggleComplete(task.id)}
          aria-label={`Mark "${task.title}" as ${isCompleted ? 'incomplete' : 'completed'}`}
        >
          {isCompleted && <Check size={12} strokeWidth={3} />}
        </button>

        <div className="task-title-group">
          <h4 className="task-title">{task.title}</h4>
          <span className="task-project-subtitle">{task.project || task.description}</span>
        </div>

        {/* Mobile-only action button positioned top-right */}
        <div className="task-actions-cell mobile-only">
          <button
            type="button"
            className="btn-task-menu"
            aria-label={`Actions for ${task.title}`}
          >
            <MoreHorizontal size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Meta Section (Category Badge, Priority Badge, Due Date, and Desktop Action menu) */}
      <div className="task-row-meta">
        <div className="task-meta-cell task-category-cell">
          <span className={`task-badge ${getCategoryClass(task.category)}`}>
            {task.category || 'General'}
          </span>
        </div>

        <div className="task-meta-cell task-priority-cell">
          <span className={`task-badge ${getPriorityClass(task.priority)}`}>
            {capitalize(task.priority)}
          </span>
        </div>

        <div className="task-meta-cell task-date-cell">
          <Calendar size={14} className="date-icon" aria-hidden="true" />
          <span className="date-text">{task.dueDate}</span>
        </div>

        {/* Desktop-only action button */}
        <div className="task-actions-cell desktop-only">
          <button
            type="button"
            className="btn-task-menu"
            aria-label={`Actions for ${task.title}`}
          >
            <MoreHorizontal size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
