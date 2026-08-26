/**
 * main.js - Core UI Interactions & Accessibility
 * Lightweight, offline-ready script for Basic Computer Skills portal
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initProgressIndicators();
  initKeyboardAccessibility();
});

/**
 * 1. Smooth scrolling for anchor links (e.g., jumping down to the Quiz section)
 */
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/**
 * 2. Visual Lesson Progress Indicators
 * Reads completed module records saved in localStorage and updates card badges
 */
function initProgressIndicators() {
  const moduleCards = document.querySelectorAll('.module-card');
  if (!moduleCards.length) return;

  // Retrieve array of completed page filenames e.g. ['module-1-hardware.html']
  const completedLessons = JSON.parse(localStorage.getItem('completed_modules') || '[]');

  moduleCards.forEach(card => {
    const actionBtn = card.querySelector('.module-btn');
    if (!actionBtn) return;

    const href = actionBtn.getAttribute('href');
    
    // Check if the current card's page URL is in the completed list
    const isCompleted = completedLessons.some(path => href && href.includes(path));

    if (isCompleted) {
      card.style.borderColor = '#16a34a';
      
      // Update button text and styling for completed modules
      actionBtn.textContent = 'Review Lesson ✓';
      actionBtn.style.backgroundColor = '#16a34a';
      
      // Add a subtle completion badge to the card
      const title = card.querySelector('.module-title');
      if (title && !card.querySelector('.completed-tag')) {
        const tag = document.createElement('span');
        tag.className = 'completed-tag';
        tag.textContent = ' Completed';
        tag.style.fontSize = '0.75rem';
        tag.style.color = '#16a34a';
        tag.style.fontWeight = 'bold';
        title.appendChild(tag);
      }
    }
  });
}

/**
 * 3. Keyboard accessibility helper for students learning navigation via keyboard
 */
function initKeyboardAccessibility() {
  const interactiveElements = document.querySelectorAll('.module-btn, .quiz-btn, .nav-link');
  
  interactiveElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '3px solid #f59e0b';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = 'none';
    });
  });
}