import React from 'react';
import { ChevronDown } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

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
      <div className="mobile-only">
        <BrandLogo size="sm" showWordmark={true} />
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
