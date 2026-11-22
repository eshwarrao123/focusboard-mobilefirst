import React from 'react';

/**
 * FocusBoard Canonical Brand Logo
 * 
 * Accurately reproduces the Figma design reference:
 * - Purple rounded square container (#5850EC, rx=10)
 * - 2x2 grid of four SOLID rounded squares (rx=2.5)
 *   - Top-Left: Solid White (#FFFFFF)
 *   - Top-Right: Solid White (#FFFFFF)
 *   - Bottom-Left: Solid White (#FFFFFF)
 *   - Bottom-Right: Light Lavender / Purple (#B9B4FF)
 * - Flat rendering with no harsh dark drop shadow
 * - Bold wordmark in dark navy (#0F172A)
 */
export default function BrandLogo({ size = 'md', showWordmark = true, className = '' }) {
  const pixelSize = size === 'sm' ? 34 : 38;

  return (
    <div className={`brand-logo brand-logo-${size} ${className}`.trim()} aria-label="FocusBoard Home">
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-logo-icon"
        aria-hidden="true"
      >
        <rect width="38" height="38" rx="10" fill="#5850EC" />
        <rect x="9.5" y="9.5" width="8" height="8" rx="2.5" fill="#FFFFFF" />
        <rect x="20.5" y="9.5" width="8" height="8" rx="2.5" fill="#FFFFFF" />
        <rect x="9.5" y="20.5" width="8" height="8" rx="2.5" fill="#FFFFFF" />
        <rect x="20.5" y="20.5" width="8" height="8" rx="2.5" fill="#B9B4FF" />
      </svg>
      {showWordmark && <span className="logo-text">FocusBoard</span>}
    </div>
  );
}
