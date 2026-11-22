# AI Usage Disclosure — FocusBoard

This document records the use of Artificial Intelligence assistance in the development of the **FocusBoard** project, in compliance with academic and professional integrity standards.

---

## Phase 1 — Project Foundation & Figma Audit
- **Tool / Assistant:** Gemini 3.8 Flash (High) via Google Antigravity
- **Date:** November 22, 2026
- **Scope:**
  - Analyzed official Figma reference frames (`1:2`, `1:167`, `1:279`, `15:2`, `15:30`, `15:58`).
  - Scaffolding of React + Vite foundation.
  - Repository environment audit and initial documentation.

---

## Phase 2 — Desktop Dashboard Visual Implementation
- **Tool / Assistant:** Gemini 3.8 Flash (High) via Google Antigravity
- **Date:** November 22, 2026
- **Scope:**
  - Conducted pixel-level color sampling of `desktop.png` and `mobile.png` using .NET bitmap analysis in PowerShell to resolve Phase 1 audit inconsistencies for Medium (`#0D9488` / `#E6FFFA`) vs Low (`#059669` / `#ECFDF5`) priority badge tokens.
  - Implemented application shell: `AppLayout`, `Sidebar`, `Header`.
  - Built `FocusNotesCarousel` and `FocusNotesSlide` with all 3 Figma slides, interactive indicator dashes, and cyclical `<` and `>` controls.
  - Built `StatsGrid` and `StatCard` dynamically computing metrics.
  - Built `TaskSection`, `TaskFilters`, `TaskTable`, and `TaskRow`.
  - Captured full 1440 × 1000 px headless Chrome browser screenshot for visual comparison against Figma Frame `1:2`.

---

## Phase 3 — Mobile-First Responsive Implementation
- **Tool / Assistant:** Gemini 3.8 Flash (High) via Google Antigravity
- **Date:** November 22, 2026
- **Scope:**
  - Refactored task data model to strictly use one canonical `status` field (`'todo' | 'in_progress' | 'completed'`), removing competing boolean flags.
  - Corrected task toggle behavior: checking sets status to `completed`, unchecking sets status to `todo`.
  - Refactored task search to be strictly title-based and case-insensitive.
  - Built `BottomNav` fixed navigation bar for mobile (`< 768px`) with active indicators and safe-area insets.
  - Transformed desktop task table into mobile stacked card pattern matching Figma Frame `1:167`.
  - Adapted mobile statistics grid to 2 columns (visually omitting In progress while maintaining calculated state).
  - Built compact mobile Focus Notes banner with inline progress bar and accessible controls.
  - Implemented compact 72px icon sidebar and reflowed toolbars for tablet width (768px - 1023px).
  - Verified layout across all 3 viewports via Chrome DevTools Protocol device metrics overrides, capturing:
    - `rendered_mobile_390x1128.png`
    - `rendered_tablet_768x1024.png`
    - `rendered_desktop_regression_1440x1000.png`
  - Verified 100% desktop regression-free parity.
