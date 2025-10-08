 const allAnswerButtons = document.querySelectorAll('.card__button-answer');
    const allBookmarkButtons = document.querySelectorAll('.bookmark');
    const toggleAllButton = document.getElementById('toggle-all-answers-button');
    const allAnswerElements = document.querySelectorAll('.card__answer');


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
        
        // Initial setup check for cards that start visible
        if (answerElement.classList.contains('card__answer--active')) {
             button.textContent = 'Hide answer';
        } else {
             button.textContent = 'Show answer';
        }
    });

    // --- 2. Global Toggle All Button Logic (NEW) ---
    if (toggleAllButton) {
        toggleAllButton.addEventListener('click', () => {
            // Determine the next state based on the current text of the global button
            // If it says 'Hide All Answers', the intention is to HIDE everything (make them invisible)
            const shouldHide = toggleAllButton.textContent === 'Hide All Answers';

            // Iterate over all card answers and buttons
            allAnswerButtons.forEach(button => {
                const answerElement = button.nextElementSibling;
                // Set visibility: if shouldHide is true, we want visibility to be false (hidden).
                setAnswerVisibility(button, answerElement, !shouldHide);
            });

            // Update the global button text for the next action
            toggleAllButton.textContent = shouldHide ? 'Show All Answers' : 'Hide All Answers';
        });
    }

    // --- 3. Bookmark Button Logic ---
    allBookmarkButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Toggle the 'bookmark--active' class on the clicked button
            event.currentTarget.classList.toggle('bookmark--active');
        });
    });

    console.log('Quiz application interactivity loaded!');
});
