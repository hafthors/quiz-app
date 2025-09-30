// 1. Question Data
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false },
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "What chemical element has the symbol 'O'?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Oxygen", correct: true },
            { text: "Osmium", correct: false },
            { text: "Iron", correct: false },
        ]
    }
];

// 2. DOM Elements and State Variables
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// 3. Core Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    // Reset the previous question state
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Display answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        // Attach the correct status to the button for easy checking later
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all other buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight the correct answer
        }
        button.disabled = true;
    });

    nextButton.style.display = "block"; // Show the Next button
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// 4. Event Listener for Next Button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // Restart the quiz
    }
});

// 5. Initial Call to Start the Quiz
startQuiz();
