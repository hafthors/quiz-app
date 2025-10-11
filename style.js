// Bookmarks Page JavaScript - Add before </body> tag

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SHOW/HIDE ANSWER FUNCTIONALITY =====
    const answerButtons = document.querySelectorAll('.card__button-answer');
    
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const answer = card.querySelector('.card__answer');
            
            // Toggle the answer visibility
            answer.classList.toggle('card__answer--active');
            
            // Change button text based on state
            if (answer.classList.contains('card__answer--active')) {
                this.textContent = 'Hide answer';
            } else {
                this.textContent = 'Show answer';
            }
        });
    });

    // ===== BOOKMARK TOGGLE FUNCTIONALITY =====
    const bookmarkButtons = document.querySelectorAll('.bookmark-toggle-button');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const cardItem = this.closest('.card-list__item');
            const questionText = card.querySelector('.card__question').textContent.trim();
            
            // Toggle bookmark state
            this.classList.toggle('bookmarked-icon');
            card.classList.toggle('bookmarked');
            
            if (this.classList.contains('bookmarked-icon')) {
                // Item is bookmarked
                console.log('Bookmarked:', questionText);
                this.setAttribute('aria-label', 'Remove bookmark');
            } else {
                // Item is unbookmarked - remove from bookmarks page with animation
                console.log('Removed bookmark:', questionText);
                this.setAttribute('aria-label', 'Add bookmark');
                
                // Animate removal
                cardItem.style.opacity = '0';
                cardItem.style.transform = 'translateX(-100%)';
                cardItem.style.transition = 'all 0.3s ease-out';
                
                // Remove from DOM after animation
                setTimeout(() => {
                    cardItem.remove();
                    
                    // Check if there are no more bookmarked items
                    const remainingCards = document.querySelectorAll('.card-list__item');
                    if (remainingCards.length === 0) {
                        showEmptyState();
                    }
                }, 300);
            }
        });
    });

    // ===== EMPTY STATE DISPLAY =====
    function showEmptyState() {
        const cardList = document.querySelector('.card-list');
        cardList.innerHTML = `
            <li style="text-align: center; padding: 3rem 1rem; color: #6b7280;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                <h2 style="font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">
                    No Bookmarks Yet
                </h2>
                <p style="margin-bottom: 1.5rem;">
                    Start bookmarking questions from the home page!
                </p>
                <a href="index.html" 
                   style="display: inline-block; padding: 0.75rem 1.5rem; background-color: #4f46e5; 
                          color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                    Go to Home
                </a>
            </li>
        `;
    }

    // Check on page load if there are no bookmarked items
    const initialCards = document.querySelectorAll('.card-list__item');
    if (initialCards.length === 0) {
        showEmptyState();
    }
});
