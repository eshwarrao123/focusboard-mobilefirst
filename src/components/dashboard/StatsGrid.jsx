import React from 'react';
import { List, Clock, Check } from 'lucide-react';
import StatCard from './StatCard';

export default function StatsGrid({ tasks = [] }) {
  // Dynamically calculate metrics strictly from the canonical status field
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;

  return (
    <section className="stats-section" aria-label="Dashboard Statistics">
      <h2 className="stats-section-heading mobile-only">Overview</h2>
      <div className="stats-grid">
        <StatCard
          icon={List}
          iconVariant="purple"
          title="Total tasks"
          value={totalTasks}
          subtext="Across all projects"
        />
        <div className="stat-card-inprogress-wrapper">
          <StatCard
            icon={Clock}
            iconVariant="cyan"
            title="In progress"
            value={inProgressTasks}
            subtext="Keep the momentum"
          />
        </div>
        <StatCard
          icon={Check}
          iconVariant="green"
          title="Completed"
          value={completedTasks}
          subtext="Great work this week"
        />
      </div>
    </section>
  );
}
