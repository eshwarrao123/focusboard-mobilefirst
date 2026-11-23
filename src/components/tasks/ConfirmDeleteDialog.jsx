import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';

export default function ConfirmDeleteDialog({
  isOpen,
  task = null,
  onClose,
  onConfirm,
}) {
  const dialogRef = useRef(null);
  const cancelBtnRef = useRef(null);
  const prevFocusedEl = useRef(null);

  useEffect(() => {
    if (isOpen) {
      prevFocusedEl.current = document.activeElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        cancelBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        prevFocusedEl.current?.focus?.();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleBackdropClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
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
        className="delete-dialog-container"
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="delete-dialog-icon-wrapper" aria-hidden="true">
          <Trash2 size={24} className="delete-dialog-icon" />
        </div>

        <div className="delete-dialog-content">
          <h3 id="delete-dialog-title" className="delete-dialog-title">
            Delete task
          </h3>
          <p id="delete-dialog-desc" className="delete-dialog-desc">
            Are you sure you want to delete <span className="delete-task-target">"{task.title}"</span>? This action cannot be undone.
          </p>
        </div>

        <div className="delete-dialog-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="btn-dialog-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-dialog-delete"
            onClick={() => onConfirm(task.id)}
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
