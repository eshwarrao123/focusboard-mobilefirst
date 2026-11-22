import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

export default function AppLayout({ activeNav = 'overview', onNavClick, children }) {
  return (
    <div className="app-container">
      <Sidebar activeNav={activeNav} onNavClick={onNavClick} />
      <div className="main-wrapper">
        <Header />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
      <BottomNav activeNav={activeNav} onNavClick={onNavClick} />
    </div>
  );
}
