/**
 * progress.js - Local Storage Progress Tracker
 * Manages lesson completion state without databases or user logins.
 */

const TOTAL_MODULES = [
  'module-1-hardware.html',
  'module-2-mouse-keys.html',
  'module-3-os-files.html',
  'module-4-typing.html',
  'module-5-internet.html',
  'practice-lab.html'
];

const STORAGE_KEY = 'completed_modules';

/**
 * 1. Retrieve the list of completed module IDs/filenames
 * @returns {string[]} Array of completed file names
 */
function getCompletedModules() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return [];
  }
}

/**
 * 2. Mark a module as complete and save to localStorage
 * Call this function inside each individual module page (e.g., markModuleComplete('module-1-hardware.html'))
 * @param {string} moduleName - File name of the module (e.g. 'module-1-hardware.html')
 */
function markModuleComplete(moduleName) {
  let completed = getCompletedModules();

  if (!completed.includes(moduleName)) {
    completed.push(moduleName);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }

  updateProgressUI();
}

/**
 * 3. Calculate completion percentage (0 - 100%)
 * @returns {number} Percentage of completed modules
 */
function calculateProgress() {
  const completed = getCompletedModules();
  const validCompleted = completed.filter(mod => TOTAL_MODULES.includes(mod));
  return Math.round((validCompleted.length / TOTAL_MODULES.length) * 100);
}

/**
 * 4. Update the visual progress bar and counter on the page (if elements exist)
 */
function updateProgressUI() {
  const percent = calculateProgress();
  const completed = getCompletedModules();

  // Update progress bar element width if present on page
  const progressBar = document.getElementById('progress-bar-fill');
  if (progressBar) {
    progressBar.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', percent);
  }

  // Update progress text counter if present on page
  const progressText = document.getElementById('progress-text');
  if (progressText) {
    progressText.textContent = `${completed.length} of ${TOTAL_MODULES.length} Lessons Completed (${percent}%)`;
  }
}

/**
 * 5. Reset all student progress (Useful for teachers resetting a shared computer)
 */
function resetAllProgress() {
  if (confirm('Are you sure you want to reset all lesson progress on this computer?')) {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
}

// Automatically update progress UI elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
});