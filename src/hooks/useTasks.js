import { useState, useEffect } from 'react';
import { initialSampleTasks } from '../data/sampleTasks';
import { formatDisplayDate } from '../utils/dateUtils';

export const STORAGE_KEY = 'focusboard_tasks';

/**
 * Safely load tasks from localStorage
 */
function getInitialTasks() {
  if (typeof window === 'undefined') {
    return initialSampleTasks;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    // Key not present in localStorage: first visit
    if (raw === null) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleTasks));
      } catch (e) {
        console.warn('Unable to seed initial tasks in localStorage:', e);
      }
      return initialSampleTasks;
    }

    // Key exists: parse stored JSON
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed; // Intentionally empty array [] is preserved
    }

    console.warn('Corrupted tasks in localStorage (not an array), falling back to defaults.');
    return initialSampleTasks;
  } catch (error) {
    console.warn('Failed to read tasks from localStorage:', error);
    return initialSampleTasks;
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(getInitialTasks);

  // Sync state changes directly to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn('Failed to persist tasks to localStorage:', error);
    }
  }, [tasks]);

  /**
   * Create a new task with unique ID and default category
   */
  const addTask = ({ title, description = '', status = 'todo', priority = 'medium', dueDate }) => {
    const trimmedTitle = title.trim();
    const formattedDate = formatDisplayDate(dueDate);

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      description: description.trim(),
      project: description.trim() || 'General task',
      category: 'General', // Sensible default as required by specification
      status,
      priority,
      dueDate: formattedDate,
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  /**
   * Edit an existing task in place, preserving ID and category
   */
  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const formattedDate = updates.dueDate !== undefined ? formatDisplayDate(updates.dueDate) : t.dueDate;
          const updatedTitle = updates.title !== undefined ? updates.title.trim() : t.title;
          const updatedDesc = updates.description !== undefined ? updates.description.trim() : t.description;

          return {
            ...t,
            ...updates,
            id: t.id, // Immutable ID
            category: t.category || 'General', // Preserve existing category
            title: updatedTitle,
            description: updatedDesc,
            project: updatedDesc || t.project || 'General task',
            dueDate: formattedDate,
          };
        }
        return t;
      })
    );
  };

  /**
   * Delete a task by ID
   */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * Toggle task completion checkbox (canonical status switch between completed and todo)
   */
  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'todo' : 'completed';
          return {
            ...t,
            status: nextStatus,
          };
        }
        return t;
      })
    );
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
}
