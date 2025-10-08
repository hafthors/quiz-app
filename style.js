document.addEventListener('DOMContentLoaded', () => {
  // --- Global Dark Mode Logic (applied across all pages) ---
  const darkModeToggle = document.querySelector('.dark-mode-toggle input[type="checkbox"]');
  const appContainer = document.querySelector('.app') || document.body;

  function setDarkMode(isDark) {
    if (isDark) {
      appContainer.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      appContainer.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  }

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    setDarkMode(true);
    if (darkModeToggle) {
      darkModeToggle.checked = true;
    }
  }

  // Event listener for dark mode switch on profile page
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', (e) => {
      setDarkMode(e.target.checked);
    });
  }

  // --- Quiz Card Interactivity (for index.html and bookmarks.html) ---
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const answerButton = card.querySelector('.card__button-answer');
    const answerText = card.querySelector('.card__answer');
    const bookmarkButton = card.querySelector('.bookmark');

    // 1. Toggle Answer
    if (answerButton && answerText) {
      // Initialize button text based on answer state (if a card is marked 'active' in HTML)
      if (answerText.classList.contains('card__answer--active')) {
        answerButton.textContent = 'Hide answer';
      } else {
        answerButton.textContent = 'Show answer';
      }

      answerButton.addEventListener('click', () => {
        const isActive = answerText.classList.toggle('card__answer--active');
        answerButton.textContent = isActive ? 'Hide answer' : 'Show answer';
      });
    }

    // 2. Toggle Bookmark
    if (bookmarkButton) {
      // Note: In a real app, you'd save bookmark status to localStorage or a database.
      // Here, we just toggle the visual class.
      bookmarkButton.addEventListener('click', () => {
        bookmarkButton.classList.toggle('bookmark--active');
        // You would typically update the counter on the profile page here as well
      });
    }
  });

  // --- Navigation Highlighting (Bonus: make sure the correct nav item is active) ---
  const navIcons = document.querySelectorAll('.navigation .nav-icon');
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html'; // default to index.html

  navIcons.forEach(icon => {
    icon.classList.remove('active');
    // Check which icon corresponds to the current file
    if (currentPage.includes('index.html') && icon.textContent.includes('🏠')) {
        icon.classList.add('active');
    } else if (currentPage.includes('bookmarks.html') && icon.textContent.includes('🔖')) {
        icon.classList.add('active');
    } else if (currentPage.includes('profile.html') && icon.textContent.includes('👤')) {
        icon.classList.add('active');
    }
    // Make the icons clickable/functional links
    if (icon.textContent.includes('🏠')) {
        icon.onclick = () => window.location.href = 'index.html';
    } else if (icon.textContent.includes('🔖')) {
        icon.onclick = () => window.location.href = 'bookmarks.html';
    } else if (icon.textContent.includes('👤')) {
        icon.onclick = () => window.location.href = 'profile.html';
    }
  });
});
