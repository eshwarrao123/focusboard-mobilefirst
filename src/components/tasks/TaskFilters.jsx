import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

function SearchInput({ className = '', placeholder, value, onChange }) {
  return (
    <div className={`search-input-wrapper ${className}`.trim()}>
      <span className="search-icon" aria-hidden="true">
        <Search size={16} strokeWidth={2} />
      </span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks by title"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

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
      {/* Mobile Search: Full-width top row */}
      <SearchInput
        className="mobile-only"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={onSearchChange}
      />

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
        <SearchInput
          className="desktop-only"
          placeholder="Find a task..."
          value={searchQuery}
          onChange={onSearchChange}
        />

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
