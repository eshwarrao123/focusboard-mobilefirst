import React, { useState, useMemo } from 'react';
import AppLayout from './components/layout/AppLayout';
import DashboardHeading from './components/dashboard/DashboardHeading';
import FocusNotesCarousel from './components/carousel/FocusNotesCarousel';
import StatsGrid from './components/dashboard/StatsGrid';
import TaskSection from './components/tasks/TaskSection';
import TaskModal from './components/tasks/TaskModal';
import ConfirmDeleteDialog from './components/tasks/ConfirmDeleteDialog';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();

  const [activeNav, setActiveNav] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Modal State for Create & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Delete Confirmation Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (task) => {
    setModalMode('edit');
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  // Handle Create or Edit submission
  const handleModalSubmit = (taskData) => {
    if (modalMode === 'edit' && taskToEdit) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask(taskData);
    }
    handleCloseModal();
  };

  // Open Delete Confirmation
  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Close Delete Confirmation
  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  // Confirm Delete
  const handleConfirmDelete = (taskId) => {
    deleteTask(taskId);
    handleCloseDelete();
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
      <DashboardHeading onNewTask={handleOpenCreateModal} />

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
        onToggleComplete={toggleTaskStatus}
        onResetFilters={handleResetFilters}
        onViewAllTasks={() => setStatusFilter('all')}
        onNewTask={handleOpenCreateModal}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDelete}
      />

      {/* 5. Reusable Task Create / Edit Modal (Figma Frame 1:279) */}
      <TaskModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialTask={taskToEdit}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
      />

      {/* 6. Accessible Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        task={taskToDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </AppLayout>
  );
}
