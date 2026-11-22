import React from 'react';
import { Check } from 'lucide-react';

export default function FocusNotesSlide({ slide }) {
  return (
    <div className="carousel-slide-content">
      {/* Left text pane */}
      <div className="carousel-left-pane">
        <div className="carousel-tag-row">
          <span className="carousel-tag desktop-only">{slide.tag}</span>
          <span className="carousel-tag mobile-only">GOOD AFTERNOON</span>
          <span className="carousel-counter desktop-only">{slide.counter}</span>
        </div>
        <h2 className="carousel-headline">{slide.headline}</h2>
        <p className="carousel-subtitle desktop-only">{slide.subtitle}</p>
        <p className="carousel-subtitle mobile-only">3 tasks waiting for your attention.</p>
        
        {/* Mobile inline progress bar matching Figma 1:167 */}
        <div className="mobile-banner-progress mobile-only" aria-hidden="true">
          <div className="mobile-progress-track">
            <div 
              className="mobile-progress-fill" 
              style={{ width: `${slide.progress}%` }} 
            />
          </div>
          <span className="mobile-progress-text">{slide.progress}%</span>
        </div>
      </div>

      {/* Desktop floating preview card */}
      <div className="carousel-card-wrapper desktop-only" aria-hidden="true">
        <div className="floating-preview-card">
          <div className="preview-card-header">
            <div className="preview-check-icon">
              <Check size={14} strokeWidth={3} />
            </div>
            <div className="preview-header-meta">
              <span className="preview-category-label">{slide.cardCategory}</span>
              <h3 className="preview-task-title">{slide.cardTask}</h3>
            </div>
          </div>
          
          <div className="preview-progress-row">
            <div className="preview-progress-track">
              <div 
                className="preview-progress-fill" 
                style={{ width: `${slide.progress}%` }}
              />
            </div>
            <span className="preview-progress-text">{slide.progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
