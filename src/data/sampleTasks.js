/**
 * Canonical Sample Task Dataset
 * Status is strictly one of: 'todo' | 'in_progress' | 'completed'
 * No competing boolean fields.
 */
export const initialSampleTasks = [
  {
    id: 'task-1',
    title: 'Design landing page',
    description: 'Create high-fidelity responsive UI mockups and design token specs.',
    project: 'Website redesign · Due soon',
    category: 'Design',
    status: 'in_progress',
    priority: 'high',
    dueDate: 'Nov 22'
  },
  {
    id: 'task-2',
    title: 'Fix mobile navigation',
    description: 'Resolve touch target tap delays and navigation drawer transitions.',
    project: 'Frontend sprint · UI polish',
    category: 'Development',
    status: 'in_progress',
    priority: 'medium',
    dueDate: 'Nov 24'
  },
  {
    id: 'task-3',
    title: 'Review onboarding copy',
    description: 'Verify welcoming microcopy, tooltips, and empty state guides.',
    project: 'Content updates · Approved',
    category: 'Content',
    status: 'completed',
    priority: 'low',
    dueDate: 'Nov 18'
  },
  {
    id: 'task-4',
    title: 'Setup analytics tracking',
    description: 'Integrate event tracking for task creation, filters, and retention.',
    project: 'Product metrics · Sprint 2',
    category: 'Development',
    status: 'todo',
    priority: 'medium',
    dueDate: 'Nov 26'
  },
  {
    id: 'task-5',
    title: 'Prepare client presentation',
    description: 'Assemble slide deck highlighting Q4 deliverables and trainee progress.',
    project: 'Client pitch · Due soon',
    category: 'Design',
    status: 'todo',
    priority: 'high',
    dueDate: 'Nov 28'
  },
  {
    id: 'task-6',
    title: 'User testing interviews',
    description: 'Conduct qualitative feedback sessions with five trainees on task flows.',
    project: 'User research · Cohort A',
    category: 'Content',
    status: 'completed',
    priority: 'medium',
    dueDate: 'Nov 15'
  },
  {
    id: 'task-7',
    title: 'Optimize asset loading',
    description: 'Convert PNG graphics to WebP and verify lazy loading behavior.',
    project: 'Performance sprint · Core Web Vitals',
    category: 'Development',
    status: 'in_progress',
    priority: 'low',
    dueDate: 'Nov 30'
  },
  {
    id: 'task-8',
    title: 'Audit accessibility contrast',
    description: 'Ensure all badges, form labels, and focus rings meet WCAG AA standards.',
    project: 'A11y compliance · QA passed',
    category: 'Design',
    status: 'completed',
    priority: 'high',
    dueDate: 'Nov 12'
  },
  {
    id: 'task-9',
    title: 'Refactor state hooks',
    description: 'Consolidate compound filtering logic and memoized statistic queries.',
    project: 'Frontend sprint · Refactor',
    category: 'Development',
    status: 'in_progress',
    priority: 'medium',
    dueDate: 'Nov 25'
  },
  {
    id: 'task-10',
    title: 'Draft release notes',
    description: 'Summarize Phase 3 deliverables and responsive layout highlights.',
    project: 'Content updates · Documentation',
    category: 'Content',
    status: 'completed',
    priority: 'low',
    dueDate: 'Nov 19'
  },
  {
    id: 'task-11',
    title: 'Build search query index',
    description: 'Implement fast tokenized filtering for title-based task lookups.',
    project: 'Core architecture · Search',
    category: 'Development',
    status: 'todo',
    priority: 'medium',
    dueDate: 'Dec 02'
  },
  {
    id: 'task-12',
    title: 'Cross-browser smoke testing',
    description: 'Verify layout stability across modern desktop, tablet, and mobile engines.',
    project: 'QA verification · Sign-off',
    category: 'Development',
    status: 'completed',
    priority: 'low',
    dueDate: 'Nov 20'
  }
];
