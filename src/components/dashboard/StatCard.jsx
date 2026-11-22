import React from 'react';

export default function StatCard({ 
  icon: Icon, 
  iconVariant = 'purple', 
  title, 
  value, 
  subtext 
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon-container variant-${iconVariant}`}>
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-body">
        <span className="stat-value">{value}</span>
        <span className="stat-subtext">{subtext}</span>
      </div>
    </div>
  );
}
