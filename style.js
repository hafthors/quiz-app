document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Answer Button Logic ---
    // Select all 'Show answer' buttons
    const answerButtons = document.querySelectorAll('.card__button-answer');

    answerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // The answer is the immediate next sibling element of the button
            const answerElement = event.currentTarget.nextElementSibling;

            // Toggle the visibility class on the answer element
            // We assume 'card__answer--active' is the class that makes the answer visible
            answerElement.classList.toggle('card__answer--active');

            // Update the button text based on the new state
            if (answerElement.classList.contains('card__answer--active')) {
                event.currentTarget.textContent = 'Hide answer';
            } else {
                event.currentTarget.textContent = 'Show answer';
            }
        });
    });


    // --- 2. Bookmark Button Logic ---
    // Select all bookmark buttons
    const bookmarkButtons = document.querySelectorAll('.bookmark');

    bookmarkButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Toggle the 'bookmark--active' class on the clicked button
            // This class should change the appearance (e.g., color or icon) of the bookmark
            event.currentTarget.classList.toggle('bookmark--active');
        });
    });

    console.log('Quiz application interactivity loaded!');
});
