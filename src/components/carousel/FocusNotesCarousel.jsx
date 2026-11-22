import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FocusNotesSlide from './FocusNotesSlide';
import { carouselSlides } from '../../data/carouselSlides';

export default function FocusNotesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = carouselSlides.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (index) => {
    setActiveIndex(index);
  };

  const currentSlide = carouselSlides[activeIndex];

  return (
    <section 
      className="focus-notes-carousel" 
      aria-label="Focus Notes"
      aria-roledescription="carousel"
    >
      <div className="carousel-main-row">
        <FocusNotesSlide slide={currentSlide} />

        <div className="carousel-nav-controls">
          <button
            type="button"
            className="carousel-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="carousel-nav-btn next-btn"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div 
        className="carousel-indicator-dashes" 
        role="tablist" 
        aria-label="Slide indicators"
      >
        {carouselSlides.map((slide, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
              className={`indicator-dash ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectSlide(index)}
            />
          );
        })}
      </div>
    </section>
  );
}
