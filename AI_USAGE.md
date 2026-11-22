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


---

## Phase 3.1 — Logo Fidelity & Ponytail Code Quality Refinement
- **Tool / Assistant:** Gemini 3.8 Flash (High) via Google Antigravity
- **Date:** November 22-23, 2026
- **Scope:**
  - Pixel-accurate Figma logo extraction and recreation: Replaced generic Lucide `LayoutGrid` outlined icon with canonical `BrandLogo` component featuring the exact 2×2 grid of four solid rounded squares (Top-Left, Top-Right, Bottom-Left in `#FFFFFF`, Bottom-Right in light lavender `#B9B4FF` inside `#5850EC` squircle).
  - Eliminated artificial drop shadow on the brand symbol to reflect Figma's clean flat aesthetic.
  - Ponytail engineering-discipline audit:
    - Unified brand logo presentation across Desktop, Tablet, and Mobile into a single reusable component (`BrandLogo.jsx`).
    - Extracted reusable `SearchInput` component inside `TaskFilters.jsx`, eliminating 40+ lines of duplicated search markup.
    - Pruned dead CSS rules (`.logo-icon-box`, `.mobile-header-brand`, `.mobile-logo-icon`, `.mobile-brand-name`).
  - Successfully verified zero-error production build (`npm run build`).
  - Recaptured and verified responsive rendering across Mobile (390×1128), Tablet (768×1024), and Desktop (1440×1000).
