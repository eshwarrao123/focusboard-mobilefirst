import React from 'react';
import { LayoutGrid, List, Calendar, Settings } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

export default function Sidebar({ activeNav = 'overview', onNavClick }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'My tasks', icon: List },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar" aria-label="Main Navigation">
      <div className="sidebar-logo">
        <BrandLogo size="md" showWordmark={true} />
      </div>

      <div className="sidebar-section-title">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="nav-item-icon">
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
