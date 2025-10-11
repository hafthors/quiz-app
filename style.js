
 let currentQuestion = 0;

    function startQuiz() {
      document.querySelector('.start-btn').style.display = 'none';
      showQuestion(1);
    }

    function showQuestion(num) {
      const question = document.getElementById(`question${num}`);
      if (question) {
        question.style.display = 'block';
        currentQuestion = num;
      }
    }

    function hideQuestion(num) {
      const question = document.getElementById(`question${num}`);
      if (question) question.style.display = 'none';
    }

    function submitAnswer(event, questionNumber) {
      event.preventDefault();
      alert(`Answer submitted for Question ${questionNumber}!`);
      
      // Hide current question
      hideQuestion(questionNumber);
      
      // Show next question or finish message
      const nextQuestion = document.getElementById(`question${questionNumber + 1}`);
      if (nextQuestion) {
        showQuestion(questionNumber + 1);
      } else {
        document.getElementById("completion-message").style.display = "block";
      }

      return false;
    }

    function toggleBookmark(index) {
      alert(`Question ${index + 1} bookmarked!`);
    }
