document.addEventListener('DOMContentLoaded', () => {

    // --- Selectors ---
    const allAnswerButtons = document.querySelectorAll('.card__button-answer');
    const allBookmarkButtons = document.querySelectorAll('.bookmark');
    const toggleAllButton = document.getElementById('toggle-all-answers-button');
    const allAnswerElements = document.querySelectorAll('.card__answer');


    // --- Bookmark Storage Functions ---

    /**
     * Loads bookmark IDs from localStorage.
     * @returns {Set<string>} A Set of bookmarked card IDs.
     */
    function loadBookmarkIds() {
        try {
            const storedIds = localStorage.getItem('bookmarkedCardIds');
            // If nothing is stored, return an empty Set, otherwise return parsed JSON as a Set for quick lookups
            return storedIds ? new Set(JSON.parse(storedIds)) : new Set();
        } catch (error) {
            console.error('Error loading bookmarks from localStorage:', error);
            return new Set();
        }
    }

    /**
     * Saves bookmark IDs back to localStorage.
     * @param {Set<string>} bookmarkedIds The set of current bookmarked IDs.
     */
    function saveBookmarkIds(bookmarkedIds) {
        try {
            // Convert Set to Array before stringifying for storage
            localStorage.setItem('bookmarkedCardIds', JSON.stringify(Array.from(bookmarkedIds)));
        } catch (error) {
            console.error('Error saving bookmarks to localStorage:', error);
        }
    }

    // --- Answer Visibility Functions ---
    // Function to set the state of a single answer card button and answer
    function setAnswerVisibility(button, answerElement, isVisible) {
        if (isVisible) {
            answerElement.classList.add('card__answer--active');
            button.textContent = 'Hide answer';
        } else {
            answerElement.classList.remove('card__answer--active');
            button.textContent = 'Show answer';
        }
    }

    // --- 1. Individual Card Answer Button Logic ---
    allAnswerButtons.forEach(button => {
        // Find the corresponding answer element (immediate next sibling)
        const answerElement = button.nextElementSibling;

        button.addEventListener('click', (event) => {
            // Check current visibility state and toggle it
            const isCurrentlyVisible = answerElement.classList.contains('card__answer--active');
            setAnswerVisibility(event.currentTarget, answerElement, !isCurrentlyVisible);
        });
        
        // Initial setup check for button text (assuming all answers start hidden)
        // If the HTML were to start with answers visible, this would need to change.
        button.textContent = 'Show answer';
    });

    // --- 2. Global Toggle All Button Logic ---
    if (toggleAllButton) {
        // Initial state is "Show All Answers", meaning they are currently hidden.
        toggleAllButton.textContent = 'Show All Answers'; 

        toggleAllButton.addEventListener('click', () => {
            // Determine the next state based on the current text of the global button
            // If it says 'Hide All Answers', the intention is to HIDE everything (make them invisible)
            const shouldHide = toggleAllButton.textContent === 'Hide All Answers';

            // Iterate over all card buttons
            allAnswerButtons.forEach(button => {
                const answerElement = button.nextElementSibling;
                // Set visibility: if shouldHide is true, we want visibility to be false (hidden).
                setAnswerVisibility(button, answerElement, !shouldHide);
            });

            // Update the global button text for the next action
            toggleAllButton.textContent = shouldHide ? 'Show All Answers' : 'Hide All Answers';
        });
    }

    // --- 3. Bookmark Button Logic with Storage ---
    let bookmarkedIds = loadBookmarkIds();

    allBookmarkButtons.forEach(button => {
        const cardItem = button.closest('.card-list__item');
        if (!cardItem) return; // Must be inside a list item

        // Get the unique ID from the card element
        const cardId = cardItem.dataset.id;
        if (!cardId) {
            console.error('Bookmark button found, but no data-id on parent list item.');
            return; // Must have a data-id
        }

        // A. Load initial state: Apply 'bookmark--active' if ID is in storage
        if (bookmarkedIds.has(cardId)) {
            button.classList.add('bookmark--active');
        }

        // B. Add click listener to handle storage update
        button.addEventListener('click', (event) => {
            // Toggle the 'bookmark--active' class
            event.currentTarget.classList.toggle('bookmark--active');
            
            if (event.currentTarget.classList.contains('bookmark--active')) {
                // Card is now bookmarked, add to set
                bookmarkedIds.add(cardId);
            } else {
                // Card is now unbookmarked, remove from set
                bookmarkedIds.delete(cardId);
            }
            // Save the updated set of IDs back to storage
            saveBookmarkIds(bookmarkedIds);
            
            // Special logic for the bookmarks.html page: hide unbookmarked items immediately
            // We check the document title to determine if we are on the bookmarks page
            if (document.title.includes('Bookmarks') && !event.currentTarget.classList.contains('bookmark--active')) {
                 // Remove the card from the DOM immediately
                 cardItem.remove();
            }
        });
    });
    
    // --- 4. Page-Specific Filtering Logic (For bookmarks.html) ---
    // If the page title includes 'Bookmarks', filter the cards
    if (document.title.includes('Bookmarks')) {
        const allCards = document.querySelectorAll('.card-list__item');
        
        allCards.forEach(card => {
            const cardId = card.dataset.id;
            // If the card ID is NOT in the bookmarked set, hide it.
            if (!bookmarkedIds.has(cardId)) {
                card.style.display = 'none'; // Hide the element
            }
        });
    }


    console.log('Quiz application interactivity and persistent bookmarks loaded!');
});
