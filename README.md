# FocusBoard — Task Management Dashboard

FocusBoard is a responsive, mobile-first task-management dashboard engineered for a frontend trainee assessment. The application translates Figma design references into an accessible, high-performance React application with browser `localStorage` persistence.

---

## Technology Stack

- **Framework:** React.js (v18)
- **Bundler & Dev Server:** Vite (v6)
- **Language:** JavaScript (ES6+)
- **Styling:** Modular CSS3 with Design Tokens & CSS Custom Properties
- **Icons:** Lucide React
- **Persistence:** Browser `localStorage` (zero backend dependencies)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended; tested with v26.13.1)
- npm (v9+ recommended; tested with v11.20.0)

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd focusboard-mobilefirst
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Project Structure

```
focusboard-mobilefirst/
├── docs/
│   ├── FIGMA_AUDIT.md           # In-depth Figma frame specifications & tokens
│   ├── IMPLEMENTATION_PLAN.md   # Component architecture & state management plan
│   └── design-references/       # Captured high-res Figma frames
├── src/
│   ├── assets/                  # Logos and SVG assets
│   ├── components/
│   │   ├── layout/              # Sidebar, Header, BottomNav, AppLayout
│   │   ├── dashboard/           # StatsGrid, StatCard
│   │   ├── carousel/            # FocusNotesCarousel, FocusNotesSlide
│   │   └── tasks/               # TaskList, TaskRow, TaskCard, TaskModal
│   ├── data/                    # Initial seed tasks & carousel slide content
│   ├── hooks/                   # useTasks, useCarousel, useMediaQuery
│   ├── styles/                  # variables.css (design tokens), index.css
│   ├── utils/                   # storage.js, formatDate.js
│   ├── App.jsx                  # Root dashboard component
│   └── main.jsx                 # Entry point
├── AI_USAGE.md                  # AI tool disclosure & audit log
└── README.md                    # Project overview & instructions
```

---

## Current Status

- **Phase 1 (Complete):** Figma audit completed for all 6 frames; repository initialized and audited; foundation files, stylesheets, and documentation created; production build and dev server verified.
- **Phase 2 (Upcoming):** Implementation of core layout shell, desktop sidebar, mobile bottom navigation, and header.
