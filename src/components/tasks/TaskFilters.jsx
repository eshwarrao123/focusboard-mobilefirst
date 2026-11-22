import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

export default function TaskFilters({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  totalCount,
}) {
  const tabs = [
    { id: 'all', labelDesktop: `All tasks ${totalCount}`, labelMobile: `All ${totalCount}` },
    { id: 'in_progress', labelDesktop: 'In progress', labelMobile: 'In progress' },
    { id: 'completed', labelDesktop: 'Completed', labelMobile: 'Completed' },
  ];

  return (
    <div className="task-filters-bar">
      {/* Search Input (On Mobile: Top Full-Width row; On Desktop: Right controls group) */}
      <div className="search-input-wrapper mobile-only">
        <span className="search-icon" aria-hidden="true">
          <Search size={16} strokeWidth={2} />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search tasks by title"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Status Segmented Tabs */}
      <div className="status-tabs" role="tablist" aria-label="Task Status Filters">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onStatusChange(tab.id)}
            >
              <span className="desktop-only">{tab.labelDesktop}</span>
              <span className="mobile-only">{tab.labelMobile}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Search and Priority Dropdown */}
      <div className="filter-controls-group">
        <div className="search-input-wrapper desktop-only">
          <span className="search-icon" aria-hidden="true">
            <Search size={16} strokeWidth={2} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Find a task..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tasks by title"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="priority-select-wrapper">
          <select
            className="priority-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter tasks by priority"
          >
            <option value="all">Priority: All</option>
            <option value="high">Priority: High</option>
            <option value="medium">Priority: Medium</option>
            <option value="low">Priority: Low</option>
          </select>
          <span className="priority-select-chevron" aria-hidden="true">
            <ChevronDown size={14} strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}
