


const answerButtons = document.querySelectorAll('.card__button-answer');

answerButtons.forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.card');
    const answer = card.querySelector('.card__answer');
    
 
    answer.classList.toggle('card__answer--active');
    
    // Change button text
    if (answer.classList.contains('card__answer--active')) {
      this.textContent = 'Hide answer';
    } else {
      this.textContent = 'Show answer';
    }
  });
});


const bookmarkButtons = document.querySelectorAll('.bookmark');

bookmarkButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Toggle the bookmark active state
    this.classList.toggle('bookmark--active');
    
    // Optional: Save to localStorage
    const card = this.closest('.card');
    const questionText = card.querySelector('.card__question').textContent;
    
    if (this.classList.contains('bookmark--active')) {
      console.log('Bookmarked:', questionText);
      // You can add logic here to save bookmarked questions
    } else {
      console.log('Unbookmarked:', questionText);
      // You can add logic here to remove bookmarked questions
    }
  });
});
