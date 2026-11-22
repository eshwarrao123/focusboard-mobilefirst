/**
 * Date formatting utilities for FocusBoard tasks
 */

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format any date string (ISO YYYY-MM-DD or standard Date) into clean display format (e.g. "Nov 25")
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return 'No date';
  const str = String(dateStr).trim();

  // If already in short format like "Nov 22" or "Nov 22, 2026"
  if (/^[A-Za-z]{3}\s+\d{1,2}(?:,\s*\d{4})?$/.test(str)) {
    return str.split(',')[0];
  }

  // Parse YYYY-MM-DD
  const ymdParts = str.split('-');
  if (ymdParts.length === 3) {
    const year = parseInt(ymdParts[0], 10);
    const month = parseInt(ymdParts[1], 10) - 1;
    const day = parseInt(ymdParts[2], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
      }
    }
  }

  // Fallback Date parse
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return `${MONTH_NAMES[parsed.getMonth()]} ${parsed.getDate()}`;
  }

  return str;
}

/**
 * Format any stored date string into HTML5 input date format (YYYY-MM-DD)
 */
export function formatInputDate(dateStr) {
  if (!dateStr) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const str = String(dateStr).trim();

  // If already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // Match "Nov 22" or "Nov 22, 2026"
  const match = str.match(/^([A-Za-z]{3})\s+(\d{1,2})(?:,?\s*(\d{4}))?$/);
  if (match) {
    const mIdx = MONTH_NAMES.findIndex(m => m.toLowerCase() === match[1].toLowerCase());
    if (mIdx !== -1) {
      const yyyy = match[3] || new Date().getFullYear();
      const mm = String(mIdx + 1).padStart(2, '0');
      const dd = String(match[2]).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, '0');
    const dd = String(parsed.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  return '';
}
