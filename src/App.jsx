import React, { useState, useMemo } from 'react';
import AppLayout from './components/layout/AppLayout';
import DashboardHeading from './components/dashboard/DashboardHeading';
import FocusNotesCarousel from './components/carousel/FocusNotesCarousel';
import StatsGrid from './components/dashboard/StatsGrid';
import TaskSection from './components/tasks/TaskSection';
import { initialSampleTasks } from './data/sampleTasks';

export default function App() {
  const [tasks, setTasks] = useState(initialSampleTasks);
  const [activeNav, setActiveNav] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Toggle task completion strictly via canonical status field
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const isCurrentlyCompleted = task.status === 'completed';
          return {
            ...task,
            status: isCurrentlyCompleted ? 'todo' : 'completed',
          };
        }
        return task;
      })
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setStatusFilter('all');
    setSearchQuery('');
    setPriorityFilter('all');
  };

  // Title-based, case-insensitive search and compound filtering logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Status Filter
      if (statusFilter === 'in_progress' && task.status !== 'in_progress') {
        return false;
      }
      if (statusFilter === 'completed' && task.status !== 'completed') {
        return false;
      }
      if (statusFilter === 'todo' && task.status !== 'todo') {
        return false;
      }

      // 2. Priority Filter
      if (priorityFilter !== 'all' && task.priority?.toLowerCase() !== priorityFilter.toLowerCase()) {
        return false;
      }

      // 3. Title-based Search (Case-insensitive)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        if (!task.title?.toLowerCase().includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  return (
    <AppLayout activeNav={activeNav} onNavClick={setActiveNav}>
      {/* 1. Dashboard Heading Row */}
      <DashboardHeading onNewTask={() => console.log('New task triggered')} />

      {/* 2. Focus Notes 3-Slide Carousel */}
      <FocusNotesCarousel />

      {/* 3. Dynamically Computed Statistics Grid */}
      <StatsGrid tasks={tasks} />

      {/* 4. Complete Tasks Section with Compound Filters & Interactive Table */}
      <TaskSection
        tasks={filteredTasks}
        totalTasksCount={tasks.length}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        onToggleComplete={handleToggleComplete}
        onResetFilters={handleResetFilters}
        onViewAllTasks={() => setStatusFilter('all')}
        onNewTask={() => console.log('Mobile add task triggered')}
      />
    </AppLayout>
  );
}
