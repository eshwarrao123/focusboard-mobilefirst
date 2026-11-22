import React from 'react';
import { LayoutGrid, ChevronDown } from 'lucide-react';

export default function Header({ userInitials = 'JD' }) {
  return (
    <header className="app-header">
      {/* Desktop / Tablet Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="breadcrumbs desktop-only">
        <span className="breadcrumb-root">Workspace</span>
        <span className="breadcrumb-separator" aria-hidden="true">/</span>
        <span className="breadcrumb-current" aria-current="page">Overview</span>
      </nav>

      {/* Mobile Brand Logo */}
      <div className="mobile-header-brand mobile-only" aria-label="FocusBoard Home">
        <div className="mobile-logo-icon" aria-hidden="true">
          <LayoutGrid size={18} strokeWidth={2.5} />
        </div>
        <span className="mobile-brand-name">FocusBoard</span>
      </div>

      {/* User Profile Avatar */}
      <div className="header-user-profile" role="button" tabIndex={0} aria-label="User profile menu">
        <div className="user-avatar" aria-hidden="true">
          {userInitials}
        </div>
        <span className="user-dropdown-arrow desktop-only" aria-hidden="true">
          <ChevronDown size={16} strokeWidth={2} />
        </span>
      </div>
    </header>
  );
}
