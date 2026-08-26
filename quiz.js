/**
 * quiz.js - Interactive Self-Grading Quiz Engine
 * Offline, standalone quiz runner for Basic Computer Skills portal
 */

// Question bank covering all basic computer modules
const QUIZ_DATA = [
  {
    question: "1. Which part of the computer is known as the 'Brain of the Computer'?",
    options: ["Monitor", "CPU (Central Processing Unit)", "Mouse", "Keyboard"],
    correct: 1,
    explanation: "The CPU processes all instructions and does the main computing work."
  },
  {
    question: "2. Which mouse button is used to open a program or file on the desktop?",
    options: ["Single Left Click", "Double Left Click", "Right Click", "Scroll Wheel"],
    correct: 1,
    explanation: "A fast Double Left-Click is used to open applications and folders."
  },
  {
    question: "3. Which key on the keyboard is the longest and adds a space between words?",
    options: ["Enter Key", "Backspace Key", "Spacebar", "Shift Key"],
    correct: 2,
    explanation: "The Spacebar is the long horizontal bar at the bottom used to make spaces."
  },
  {
    question: "4. What should you do before switching off the main electricity power button?",
    options: [
      "Unplug the monitor directly",
      "Click 'Shut Down' in the computer menu",
      "Press the power button 5 times",
      "Close the laptop lid only"
    ],
    correct: 1,
    explanation: "Always click 'Shut Down' first so the computer can save files and close properly."
  },
  {
    question: "5. Why should you NEVER share your passwords with strangers online?",
    options: [
      "To keep your personal information and computer safe",
      "Because passwords expire every hour",
      "Because the keyboard will stop working",
      "It slows down the internet"
    ],
    correct: 0,
    explanation: "Keeping passwords secret protects your private data and prevents unauthorized access."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

/**
 * Initialize Quiz UI Container
 */
function initQuiz(containerId = 'quiz-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  renderQuestion(container);
}

/**
 * Render the current question and option buttons
 */
function renderQuestion(container) {
  const currentQ = QUIZ_DATA[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / QUIZ_DATA.length) * 100;

  container.innerHTML = `
    <div style="background:#ffffff; border:2px solid #e2e8f0; border-radius:12px; padding:24px; max-width:650px; margin:0 auto; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-size:0.85rem; font-weight:700; color:#2563eb; background:#dbeafe; padding:4px 10px; border-radius:9999px;">
          Question ${currentQuestionIndex + 1} of ${QUIZ_DATA.length}
        </span>
        <span style="font-size:0.9rem; color:#64748b; font-weight:600;">Score: ${score}</span>
      </div>

      <div style="width:100%; background:#e2e8f0; height:6px; border-radius:3px; margin-bottom:20px; overflow:hidden;">
        <div style="width:${progressPercent}%; background:#2563eb; height:100%; transition:width 0.3s ease;"></div>
      </div>

      <h3 style="color:#0f172a; font-size:1.2rem; margin-bottom:18px; line-height:1.4;">${currentQ.question}</h3>

      <div id="options-list" style="display:flex; flex-direction:column; gap:10px;">
        ${currentQ.options.map((opt, idx) => `
          <button 
            type="button" 
            onclick="handleAnswerSelect(${idx})"
            class="quiz-option-btn"
            style="text-align:left; background:#f8fafc; border:2px solid #cbd5e1; border-radius:8px; padding:12px 16px; font-size:1rem; color:#334155; cursor:pointer; transition:all 0.2s ease;"
          >
            ${String.fromCharCode(65 + idx)}. ${opt}
          </button>
        `).join('')}
      </div>

      <div id="feedback-box" style="margin-top:16px; display:none; padding:12px; border-radius:8px; font-size:0.95rem;"></div>

      <button 
        id="next-btn" 
        onclick="handleNextQuestion()" 
        style="display:none; margin-top:16px; width:100%; background:#2563eb; color:#fff; padding:12px; font-size:1rem; font-weight:600; border:none; border-radius:8px; cursor:pointer;"
      >
        ${currentQuestionIndex === QUIZ_DATA.length - 1 ? 'See Final Score 📊' : 'Next Question ➜'}
      </button>
    </div>
  `;
}

/**
 * Process the selected option with visual feedback
 */
function handleAnswerSelect(selectedIndex) {
  const currentQ = QUIZ_DATA[currentQuestionIndex];
  const optionButtons = document.querySelectorAll('.quiz-option-btn');
  const feedbackBox = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');

  // Disable all option buttons after first choice
  optionButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'default';
  });

  const isCorrect = selectedIndex === currentQ.correct;
  userAnswers.push({ question: currentQ.question, selected: selectedIndex, isCorrect });

  if (isCorrect) {
    score++;
    optionButtons[selectedIndex].style.background = '#dcfce7';
    optionButtons[selectedIndex].style.borderColor = '#16a34a';
    optionButtons[selectedIndex].style.color = '#166534';
    
    feedbackBox.style.display = 'block';
    feedbackBox.style.background = '#f0fdf4';
    feedbackBox.style.border = '1px solid #bbf7d0';
    feedbackBox.style.color = '#15803d';
    feedbackBox.innerHTML = `<strong>✓ Correct!</strong> ${currentQ.explanation}`;
  } else {
    optionButtons[selectedIndex].style.background = '#fee2e2';
    optionButtons[selectedIndex].style.borderColor = '#dc2626';
    optionButtons[selectedIndex].style.color = '#991b1b';

    // Highlight correct answer in green
    optionButtons[currentQ.correct].style.background = '#dcfce7';
    optionButtons[currentQ.correct].style.borderColor = '#16a34a';
    optionButtons[currentQ.correct].style.color = '#166534';

    feedbackBox.style.display = 'block';
    feedbackBox.style.background = '#fef2f2';
    feedbackBox.style.border = '1px solid #fecaca';
    feedbackBox.style.color = '#b91c1c';
    feedbackBox.innerHTML = `<strong>✗ Not quite.</strong> ${currentQ.explanation}`;
  }

  nextBtn.style.display = 'block';
}

/**
 * Transition to next question or final summary
 */
function handleNextQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  currentQuestionIndex++;
  if (currentQuestionIndex < QUIZ_DATA.length) {
    renderQuestion(container);
  } else {
    renderQuizResults(container);
  }
}

/**
 * Render final score screen and auto-update progress
 */
function renderQuizResults(container) {
  const percentage = Math.round((score / QUIZ_DATA.length) * 100);
  const passed = percentage >= 60;

  // Auto-mark practice/quiz complete if passed and helper is present
  if (passed && typeof markModuleComplete === 'function') {
    markModuleComplete('practice-lab.html');
  }

  container.innerHTML = `
    <div style="background:#ffffff; border:3px solid ${passed ? '#16a34a' : '#f59e0b'}; border-radius:16px; padding:32px 24px; max-width:600px; margin:0 auto; text-align:center; box-shadow:0 10px 20px rgba(0,0,0,0.08);">
      <div style="font-size:3rem; margin-bottom:12px;">${passed ? '🎉' : '📚'}</div>
      <h2 style="color:#0f172a; font-size:1.8rem; margin-bottom:8px;">${passed ? 'Great Job!' : 'Keep Practicing!'}</h2>
      <p style="color:#64748b; font-size:1.1rem; margin-bottom:20px;">
        You answered <strong>${score}</strong> out of <strong>${QUIZ_DATA.length}</strong> questions correctly (${percentage}%).
      </p>

      <div style="background:#f8fafc; border-radius:8px; padding:16px; margin-bottom:24px; text-align:left; font-size:0.95rem; color:#334155;">
        ${passed 
          ? '🌟 You have understood the fundamentals of computer hardware, mouse controls, and internet safety well!' 
          : '💡 Review the lessons you found tricky and try again. Practice makes perfect!'}
      </div>

      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        <button 
          onclick="initQuiz('quiz-container')" 
          style="background:#2563eb; color:#ffffff; padding:12px 24px; font-size:1rem; font-weight:600; border:none; border-radius:8px; cursor:pointer;"
        >
          🔄 Retake Quiz
        </button>
        <a 
          href="../index.html" 
          style="display:inline-block; background:#64748b; color:#ffffff; padding:12px 24px; font-size:1rem; font-weight:600; text-decoration:none; border-radius:8px;"
        >
          🏠 Return Home
        </a>
      </div>
    </div>
  `;
}

// Auto-run if a dedicated quiz-container exists on the page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quiz-container')) {
    initQuiz('quiz-container');
  }
});