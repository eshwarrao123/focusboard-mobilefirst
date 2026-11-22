import React from 'react';
import { LayoutGrid, List, Calendar, Settings } from 'lucide-react';

export default function BottomNav({ activeNav = 'overview', onNavClick }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'tasks', label: 'Tasks', icon: List },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick && onNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="bottom-nav-icon">
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              </span>
              <span className="bottom-nav-label">{item.label}</span>
              {isActive && <span className="bottom-nav-active-bar" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
