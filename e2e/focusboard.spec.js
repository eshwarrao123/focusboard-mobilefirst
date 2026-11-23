import { test, expect } from '@playwright/test';

test.describe('FocusBoard — Comprehensive Trainee Assessment QA Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate and reset localStorage to pristine clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('focusboard_tasks'));
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  // ========================================================
  // A. DASHBOARD ACCEPTANCE
  // ========================================================
  test('A. Dashboard loads with sample tasks, dynamic stats, and interactive carousel', async ({ page }) => {
    // 1. Application brand and header load
    await expect(page.locator('.sidebar .brand-logo .logo-text')).toHaveText('FocusBoard');
    await expect(page.locator('.heading-title')).toHaveText('Your work, in focus.');

    // 2. At least six sample tasks visible initially
    const taskRows = page.locator('.task-row');
    const taskCount = await taskRows.count();
    expect(taskCount).toBeGreaterThanOrEqual(6);
    expect(taskCount).toBe(12);

    // 3. Statistics derive from task state
    const totalStat = page.locator('.stat-card').filter({ hasText: 'Total tasks' }).locator('.stat-value');
    const inProgressStat = page.locator('.stat-card').filter({ hasText: 'In progress' }).locator('.stat-value');
    const completedStat = page.locator('.stat-card').filter({ hasText: 'Completed' }).locator('.stat-value');

    await expect(totalStat).toHaveText('12');
    await expect(inProgressStat).toHaveText('4');
    await expect(completedStat).toHaveText('5');

    // 4. Focus Notes 3-slide carousel accessibility and navigation
    const carouselHeadline = page.locator('.carousel-headline');
    await expect(carouselHeadline).toHaveText('Make today count.');

    // Click Next
    await page.locator('.carousel-nav-btn.next-btn').click();
    await expect(carouselHeadline).toHaveText('Small steps, big progress.');

    // Click Next again
    await page.locator('.carousel-nav-btn.next-btn').click();
    await expect(carouselHeadline).toHaveText('Celebrate the wins.');

    // Click Previous (loops back)
    await page.locator('.carousel-nav-btn.prev-btn').click();
    await expect(carouselHeadline).toHaveText('Small steps, big progress.');
  });

  // ========================================================
  // B. TASK CREATION & VALIDATION
  // ========================================================
  test('B. Task creation validates inputs, rejects invalid submissions, and adds task immediately', async ({ page }) => {
    // 1. Open Create Task modal
    await page.locator('.btn-new-task').click();
    const modal = page.locator('.modal-container');
    await expect(modal).toBeVisible();
    await expect(page.locator('#task-modal-title')).toHaveText('Create new task');

    // 2. Reject empty title submission
    await page.locator('.btn-modal-submit').click();
    await expect(page.locator('#title-error')).toHaveText('Task title is required.');

    // 3. Reject whitespace-only title submission
    await page.locator('#task-title').fill('     ');
    await page.locator('.btn-modal-submit').click();
    await expect(page.locator('#title-error')).toHaveText('Task title is required.');

    // 4. Successfully create valid task
    await page.locator('#task-title').fill('Playwright Test Task');
    await page.locator('#task-description').fill('End-to-end automated test validation');
    await page.locator('#task-status').selectOption('in_progress');
    await page.locator('#task-priority').selectOption('high');
    await page.locator('#task-due-date').fill('2026-11-30');

    await page.locator('.btn-modal-submit').click();
    await expect(modal).not.toBeVisible();

    // 5. Verify new task appears immediately in UI
    const firstTaskTitle = page.locator('.task-row').first().locator('.task-title');
    await expect(firstTaskTitle).toHaveText('Playwright Test Task');

    // 6. Verify total tasks count incremented to 13
    const totalStat = page.locator('.stat-card').filter({ hasText: 'Total tasks' }).locator('.stat-value');
    await expect(totalStat).toHaveText('13');

    // 7. Verify localStorage updated
    const storedCount = await page.evaluate(() => JSON.parse(localStorage.getItem('focusboard_tasks')).length);
    expect(storedCount).toBe(13);
  });

  // ========================================================
  // C. TASK EDITING
  // ========================================================
  test('C. Task editing updates title, status, priority in-place without duplicates', async ({ page }) => {
    // Open action menu on first task
    const firstRow = page.locator('.task-row').first();
    await firstRow.locator('.desktop-only .btn-task-menu').click();
    await page.locator('.task-actions-cell.desktop-only .task-menu-item:not(.item-danger)').click();

    const modal = page.locator('.modal-container');
    await expect(modal).toBeVisible();
    await expect(page.locator('#task-modal-title')).toHaveText('Edit task');

    // Edit fields
    await page.locator('#task-title').fill('Design landing page (Phase 5 QA)');
    await page.locator('#task-priority').selectOption('low');
    await page.locator('#task-status').selectOption('completed');
    await page.locator('.btn-modal-submit').click();

    await expect(modal).not.toBeVisible();

    // Verify task updated in-place without duplicate
    await expect(firstRow.locator('.task-title')).toHaveText('Design landing page (Phase 5 QA)');
    const totalCount = await page.locator('.task-row').count();
    expect(totalCount).toBe(12);

    // Completed stat incremented from 5 to 6
    const completedStat = page.locator('.stat-card').filter({ hasText: 'Completed' }).locator('.stat-value');
    await expect(completedStat).toHaveText('6');
  });

  // ========================================================
  // D. TASK DELETION & CONFIRMATION
  // ========================================================
  test('D. Delete dialog cancels safely, confirms deletion, and updates statistics', async ({ page }) => {
    const firstRow = page.locator('.task-row').first();
    const taskTitle = await firstRow.locator('.task-title').textContent();

    // Open delete dialog
    await firstRow.locator('.desktop-only .btn-task-menu').click();
    await page.locator('.task-actions-cell.desktop-only .task-menu-item.item-danger').click();

    const dialog = page.locator('.delete-dialog-container');
    await expect(dialog).toBeVisible();
    await expect(page.locator('.delete-task-target')).toContainText(taskTitle);

    // 1. Cancel deletion -> task remains
    await page.locator('.btn-dialog-cancel').click();
    await expect(dialog).not.toBeVisible();
    await expect(page.locator('.task-row').first().locator('.task-title')).toHaveText(taskTitle);
    expect(await page.locator('.task-row').count()).toBe(12);

    // 2. Reopen and Confirm deletion -> task disappears
    await firstRow.locator('.desktop-only .btn-task-menu').click();
    await page.locator('.task-actions-cell.desktop-only .task-menu-item.item-danger').click();
    await page.locator('.btn-dialog-delete').click();
    await expect(dialog).not.toBeVisible();

    // Verify task is removed
    expect(await page.locator('.task-row').count()).toBe(11);
    await expect(page.locator('.task-row').first().locator('.task-title')).not.toHaveText(taskTitle);

    // Verify statistics updated
    const totalStat = page.locator('.stat-card').filter({ hasText: 'Total tasks' }).locator('.stat-value');
    await expect(totalStat).toHaveText('11');
  });

  // ========================================================
  // E. SEARCH AND COMPOUND FILTERS
  // ========================================================
  test('E. Search and filters work independently, in combination, and display empty state', async ({ page }) => {
    // 1. Case-insensitive title search
    const desktopSearch = page.locator('.filter-controls-group .search-input');
    await desktopSearch.fill('mobile');
    await expect(page.locator('.task-row')).toHaveCount(1);
    await expect(page.locator('.task-row .task-title')).toHaveText('Fix mobile navigation');

    // Case insensitivity
    await desktopSearch.fill('MOBILE');
    await expect(page.locator('.task-row')).toHaveCount(1);

    // Clear search
    await page.locator('.filter-controls-group .search-clear-btn').click();
    await expect(page.locator('.task-row')).toHaveCount(12);

    // 2. Status filter: In progress
    const inProgressTab = page.locator('.status-tab-btn').filter({ hasText: 'In progress' });
    await inProgressTab.click();
    await expect(page.locator('.task-row')).toHaveCount(4);

    // Status filter: Completed
    const completedTab = page.locator('.status-tab-btn').filter({ hasText: 'Completed' });
    await completedTab.click();
    await expect(page.locator('.task-row')).toHaveCount(5);

    // Status filter: All
    const allTab = page.locator('.status-tab-btn').filter({ hasText: 'All tasks' });
    await allTab.click();
    await expect(page.locator('.task-row')).toHaveCount(12);

    // 3. Priority filter: High (3 tasks in sampleTasks: task-1, task-5, task-9)
    const prioritySelect = page.locator('.priority-select');
    await prioritySelect.selectOption('high');
    await expect(page.locator('.task-row')).toHaveCount(3);

    // 4. Combined Filter: Priority High + Status In progress
    await inProgressTab.click();
    await expect(page.locator('.task-row')).toHaveCount(1);
    await expect(page.locator('.task-row .task-title')).toHaveText('Design landing page');

    // 5. Empty State when no tasks match
    await desktopSearch.fill('Nonexistent task query string');
    await expect(page.locator('.task-row')).toHaveCount(0);
    await expect(page.locator('.task-table-empty')).toBeVisible();
    await expect(page.locator('.empty-title')).toHaveText('No tasks found');

    // Reset filters button
    await page.locator('.btn-reset-filters').click();
    await expect(page.locator('.task-row')).toHaveCount(12);
  });

  // ========================================================
  // F. LOCALSTORAGE PERSISTENCE
  // ========================================================
  test('F. Full persistence across page reloads including intentionally empty list', async ({ page }) => {
    // 1. Create a task and reload
    await page.locator('.btn-new-task').click();
    await page.locator('#task-title').fill('Persistence Check Task');
    await page.locator('#task-due-date').fill('2026-12-01');
    await page.locator('.btn-modal-submit').click();
    await expect(page.locator('.modal-container')).not.toBeVisible();

    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.task-row').first().locator('.task-title')).toHaveText('Persistence Check Task');
    expect(await page.locator('.task-row').count()).toBe(13);

    // 2. Checkbox status toggle persistence
    const firstCheckbox = page.locator('.task-row').first().locator('.task-checkbox');
    await firstCheckbox.click(); // Toggle to completed
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.task-row').first().locator('.task-checkbox')).toHaveClass(/checked/);

    // 3. Intentionally empty task list persistence (Specification requirement 9 & 10)
    await page.evaluate(() => localStorage.setItem('focusboard_tasks', '[]'));
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Must show empty state and NOT overwrite with sample tasks
    expect(await page.locator('.task-row').count()).toBe(0);
    await expect(page.locator('.task-table-empty')).toBeVisible();
    const storedCount = await page.evaluate(() => JSON.parse(localStorage.getItem('focusboard_tasks')).length);
    expect(storedCount).toBe(0);
  });

  // ========================================================
  // G. RESPONSIVE BEHAVIOUR (Desktop, Tablet, Mobile)
  // ========================================================
  test('G. Responsive adaptation across 1440px desktop, 768px tablet, and 390px mobile', async ({ page }) => {
    // 1. Desktop: 1440 × 1000
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.mobile-bottom-nav')).toBeHidden();
    // Verify no horizontal overflow
    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(desktopOverflow).toBe(false);

    // 2. Tablet: 768 × 1024
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.sidebar')).toBeVisible();
    // Logo text hidden on tablet compact sidebar
    await expect(page.locator('.sidebar .logo-text')).toBeHidden();
    const tabletOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(tabletOverflow).toBe(false);

    // 3. Mobile: 390 × 1128
    await page.setViewportSize({ width: 390, height: 1128 });
    await expect(page.locator('.sidebar')).toBeHidden();
    await expect(page.locator('.mobile-bottom-nav')).toBeVisible();
    await expect(page.locator('.app-header .brand-logo')).toBeVisible();

    // Verify task table transforms into mobile cards (action menu button visible on cards)
    await expect(page.locator('.task-row-main .btn-task-menu').first()).toBeVisible();

    // Open mobile task modal
    await page.locator('.btn-mobile-add-task').click();
    const mobileModal = page.locator('.modal-container');
    await expect(mobileModal).toBeVisible();

    // Check modal fits viewport width (no horizontal overflow)
    const modalBox = await mobileModal.boundingBox();
    expect(modalBox.width).toBeLessThanOrEqual(390);

    // Cancel modal
    await page.locator('.btn-modal-cancel').click();
    await expect(mobileModal).not.toBeVisible();

    // Mobile horizontal overflow check
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(mobileOverflow).toBe(false);
  });

  // ========================================================
  // H. ACCESSIBILITY & FOCUS TRAPPING
  // ========================================================
  test('H. WAI-ARIA compliance, focus trapping in modal, and escape handling', async ({ page }) => {
    // 1. Open modal
    await page.locator('.btn-new-task').click();
    const modal = page.locator('.modal-container');
    await expect(modal).toBeVisible();

    // Check initial focus is on title input
    await expect(page.locator('#task-title')).toBeFocused();

    // Test focus trapping: Tab through all elements
    // Close button is first element, Submit button is last
    await page.locator('.modal-close-btn').focus();
    // Shift+Tab should cycle to last element (.btn-modal-submit)
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await expect(page.locator('.btn-modal-submit')).toBeFocused();

    // Tab from last element should wrap to first element (.modal-close-btn)
    await page.keyboard.press('Tab');
    await expect(page.locator('.modal-close-btn')).toBeFocused();

    // Escape closes modal and restores focus
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
    await expect(page.locator('.btn-new-task')).toBeFocused();

    // 2. Delete dialog focus safety: Cancel button initially focused
    await page.locator('.task-row').first().locator('.desktop-only .btn-task-menu').click();
    await page.locator('.task-actions-cell.desktop-only .task-menu-item.item-danger').click();

    const dialog = page.locator('.delete-dialog-container');
    await expect(dialog).toBeVisible();
    await expect(page.locator('.btn-dialog-cancel')).toBeFocused();

    // Escape closes dialog
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
