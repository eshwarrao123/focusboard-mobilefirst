# AI Usage Disclosure — FocusBoard

This document records the transparent and ethical use of Artificial Intelligence assistance in the development of the **FocusBoard** project, adhering to professional and academic integrity standards.

---

## 1. AI Tools & Models Used

1. **Google Antigravity AI Assistant**
   - **Model:** Gemini 3.8 Flash (High)
   - **Environment:** Google Antigravity Agentic Desktop IDE
   - **Role:** Primary development assistant for codebase scaffolding, Figma token extraction, component implementation, responsive styling, Playwright testing, and documentation.
2. **OpenAI ChatGPT (GPT-4o)**
   - **Role:** Secondary reference consultation during initial requirement analysis and prompt clarification.

---

## 2. AI-Assisted Development Areas

- **Project Scaffolding & Setup:** Vite + React 18 configuration, folder organization, script setup.
- **Figma Design Analysis:** Automated high-resolution frame inspection (`1:2`, `1:167`, `1:279`, `15:2`, `15:30`, `15:58`), color token extraction via .NET bitmap pixel sampling.
- **Responsive Component Architecture:** Desktop sidebar, tablet compact navigation, mobile fixed bottom bar, 3-slide Focus Notes carousel.
- **Task Management CRUD & State:** Canonical `useTasks` hook, compound filtering, accessible modal dialogs, and `localStorage` synchronization.
- **Quality Assurance & Verification:** Headless Chrome CDP screenshot captures and Playwright end-to-end automated test suites.
- **Documentation:** Architectural specifications (`FIGMA_AUDIT.md`, `IMPLEMENTATION_PLAN.md`, `README.md`).

---

## 3. Representative Prompts Used

### Prompt 1: Initial Figma Audit & Foundation Scaffolding
> *"Inspect the six target Figma frames (Desktop 1:2, Mobile 1:167, Create-task 1:279, and Focus Notes slides 15:2, 15:30, 15:58). Extract exact dimensions, typography tokens, status colors, and responsive layout decisions into a technical audit document before writing code."*

### Prompt 2: Resolving Token Discrepancies via Pixel Sampling
> *"The Phase 1 audit shows potential color collisions between Medium and Low priority badges. Write a PowerShell .NET bitmap pixel-sampling script to measure the exact hexadecimal values from `desktop.png` and update `variables.css` with authoritative tokens."*

### Prompt 3: Canonical Status Model & Mobile-First Adaptation
> *"Refactor the task data model to strictly use one canonical `status` field ('todo' | 'in_progress' | 'completed'). Ensure checking a task sets status to 'completed' and unchecking sets status to 'todo'. Adapt the layout for 390 × 1128 mobile with fixed bottom navigation and stacked cards."*

### Prompt 4: Brand Logo Fidelity & Ponytail Refinement
> *"Inspect the brand logo in Figma versus localhost. The current implementation uses a hollow Lucide grid icon, whereas Figma uses a solid 2×2 square emblem with white and light lavender accents on a purple squircle. Build a reusable `BrandLogo` component matching the exact vector geometry, eliminate the artificial drop shadow, and remove duplicate markup."*

### Prompt 5: End-to-End Playwright QA Suite
> *"Install Playwright using the local Google Chrome binary channel. Create a maintainable test suite covering dashboard loading, task creation validation, editing in-place, delete confirmation safety, compound filters, reload persistence, and responsive viewport integrity."*

---

## 4. Verified, Corrected or Rejected AI Suggestions

Throughout the multi-phase implementation, all AI-generated code and suggestions were rigorously audited against the authoritative Figma references. Several suggestions were rejected or corrected:

### Case 1: Correction of Priority Badge Tokens (Phase 2)
- **Initial AI Output:** An early inspection suggested that Low and Medium priority tags might share a common green hue.
- **Human/Agent Audit:** Pixel-level color sampling of the original Figma desktop capture revealed distinct color identities:
  - **Medium Priority:** Teal text (`#0D9488`) on light cyan/teal background (`#E6FFFA`).
  - **Low Priority:** Mint text (`#059669`) on light mint background (`#ECFDF5`).
- **Correction Applied:** Token definitions in `variables.css` were updated to reflect the true Figma design values.

### Case 2: Replacing Generic Outlined Icon with Exact Brand Logo (Phase 3.1)
- **Initial AI Output:** The initial scaffolding used Lucide's `LayoutGrid` outlined icon for both the brand emblem and the sidebar navigation.
- **Human/Agent Audit:** Detailed inspection of the Figma header crop (`media_1795370194387_0d374a69.png`) revealed that the brand logo is a distinct solid vector emblem: four filled rounded squares where Top-Left, Top-Right, and Bottom-Left are solid white (`#FFFFFF`) and Bottom-Right is a translucent lavender/light purple (`#B9B4FF`), without any harsh drop shadow.
- **Correction Applied:** Replaced the Lucide icon with a dedicated, zero-runtime inline SVG `BrandLogo` component, establishing exact visual parity.

### Case 3: Resolving Duplicate Calendar Picker Icons (Phase 4.1)
- **Initial AI Output:** The date input rendered both the browser's native `::-webkit-calendar-picker-indicator` and an overlaid Lucide `<Calendar />` icon.
- **Human/Agent Audit:** Visual inspection of `rendered_modal_desktop_1440x1000.png` caught the double-icon glitch.
- **Correction Applied:** Pruned the redundant Lucide icon and wrapper div, applying CSS styling directly to the native indicator to keep 100% native picker functionality with a single, clean calendar icon.

### Case 4: Rejection of Competing Boolean Status Flags (Phase 3)
- **Initial AI Output:** Early drafts included both a `status: 'completed'` string and a `completed: true` boolean property.
- **Human/Agent Audit:** Identified as an architectural liability that could cause state drift.
- **Correction Applied:** Enforced a single canonical `status` field (`'todo' | 'in_progress' | 'completed'`) as the sole source of truth across state, badges, filters, and metrics.

---

## 5. Phase-by-Phase Development Chronology

- **Phase 1 (Nov 22, 2026):** Figma design analysis across all 6 target frames; repository setup with Vite + React 18; establishment of design token variables; architectural plan authoring.
- **Phase 2 (Nov 22, 2026):** Desktop dashboard implementation (1440 × 1000 px); 3-slide Focus Notes carousel; dynamic statistics grid; full task table with priority badges.
- **Phase 3 (Nov 22, 2026):** Mobile-first responsive implementation (390 × 1128 px mobile, 768 × 1024 px tablet); canonical task status model refactor; fixed mobile bottom navigation.
- **Phase 3.1 (Nov 23, 2026):** Pixel-perfect brand logo recreation; Ponytail code audit; dead CSS elimination; removal of artificial logo shadow.
- **Phase 4 (Nov 23, 2026):** Complete task CRUD operations; reusable `TaskModal` matching Figma Frame `1:279`; accessible `ConfirmDeleteDialog`; `localStorage` synchronization under `focusboard_tasks`.
- **Phase 4.1 (Nov 23, 2026):** Visual audit of modal card bounds (597 × 714 px); calendar icon duplication resolution; delete dialog focus restoration.
- **Phase 5 (Nov 23, 2026):** Final engineering audit; Playwright end-to-end test suite implementation (8/8 passing); final 1440px and 390px submission screenshot generation; compliance matrix verification.
