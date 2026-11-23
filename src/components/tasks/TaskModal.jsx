import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { formatInputDate } from '../../utils/dateUtils';

export default function TaskModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  initialTask = null,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === 'edit';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const titleInputRef = useRef(null);
  const modalCardRef = useRef(null);
  const prevFocusedEl = useRef(null);

  // Sync form state when modal opens or initialTask changes
  useEffect(() => {
    if (isOpen) {
      prevFocusedEl.current = document.activeElement;

      if (isEdit && initialTask) {
        setTitle(initialTask.title || '');
        setDescription(initialTask.description || '');
        setStatus(initialTask.status || 'todo');
        setPriority(initialTask.priority || 'medium');
        setDueDate(formatInputDate(initialTask.dueDate));
      } else {
        // Create mode defaults
        setTitle('');
        setDescription('');
        setStatus('todo');
        setPriority('medium');
        setDueDate(formatInputDate(''));
      }
      setErrors({});

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first input
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
        prevFocusedEl.current?.focus?.();
      };
    }
  }, [isOpen, isEdit, initialTask]);

  // Handle ESC key and focus trapping inside modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalCardRef.current) {
        const focusable = modalCardRef.current.querySelectorAll(
          'button, [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required.';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required.';
    } else {
      const parsedDate = new Date(dueDate);
      if (isNaN(parsedDate.getTime())) {
        newErrors.dueDate = 'Please enter a valid date.';
      }
    }

    if (!['todo', 'in_progress', 'completed'].includes(status)) {
      newErrors.status = 'Please select a valid status.';
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
      newErrors.priority = 'Please select a valid priority.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
    });
  };

  const handleBackdropClick = (e) => {
    if (modalCardRef.current && !modalCardRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="modal-container"
        ref={modalCardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 id="task-modal-title" className="modal-title">
              {isEdit ? 'Edit task' : 'Create new task'}
            </h3>
            <p className="modal-subtitle">
              {isEdit
                ? 'Update your task details to stay on top of your work.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* Task Title */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task title <span className="label-required">*</span>
            </label>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="e.g. Design landing page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              aria-invalid={errors.title ? 'true' : 'false'}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span id="title-error" className="form-error-text" role="alert">
                {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              rows={3}
              placeholder="Add any additional details or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Two-Column Grid: Status and Priority */}
          <div className="form-row-two-col">
            <div className="form-group">
              <label htmlFor="task-status" className="form-label">
                Status <span className="label-required">*</span>
              </label>
              <select
                id="task-status"
                className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (errors.status) setErrors((prev) => ({ ...prev, status: undefined }));
                }}
              >
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <span className="form-error-text" role="alert">
                  {errors.status}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority <span className="label-required">*</span>
              </label>
              <select
                id="task-priority"
                className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  if (errors.priority) setErrors((prev) => ({ ...prev, priority: undefined }));
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <span className="form-error-text" role="alert">
                  {errors.priority}
                </span>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label htmlFor="task-due-date" className="form-label">
              Due date <span className="label-required">*</span>
            </label>
            <input
              id="task-due-date"
              type="date"
              className={`form-input date-input ${errors.dueDate ? 'is-invalid' : ''}`}
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: undefined }));
              }}
              aria-invalid={errors.dueDate ? 'true' : 'false'}
              aria-describedby={errors.dueDate ? 'due-date-error' : undefined}
            />
            {errors.dueDate && (
              <span id="due-date-error" className="form-error-text" role="alert">
                {errors.dueDate}
              </span>
            )}
          </div>

          <p className="form-required-hint">* Required field</p>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-submit"
            >
              {isEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
