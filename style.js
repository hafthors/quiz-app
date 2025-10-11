  let questions = [
            { text: "What is the name of the school that Harry Potter attends?", bookmarked: false, answer: "" },
            { text: "Who is Harry Potter's best friend throughout the series?", bookmarked: false, answer: "" },
            { text: "What is the name of the lightning bolt-shaped scar on Harry Potter's forehead??", bookmarked: false, answer: "" },
            { text: "Which magical creature guards the entrance to the Gryffindor common room?", bookmarked: false, answer: "" },
            { text: "What is the name of the game played on flying broomsticks in the wizarding world?", bookmarked: false, answer: "" }
        ];

        function toggleBookmark(index) {
            questions[index].bookmarked = !questions[index].bookmarked;
            updateDisplay();
        }

        function removeBookmark(index) {
            questions[index].bookmarked = false;
            updateDisplay();
        }

        function addQuestion() {
            const input = document.getElementById('newQuestion');
            const text = input.value.trim();
            
            if (text) {
                questions.push({ text: text, bookmarked: false, answer: "" });
                input.value = '';
                updateDisplay();
            }
        }

        function submitAnswer(index, answer) {
            questions[index].answer = answer;
            updateDisplay();
        }

        function editAnswer(index) {
            questions[index].answer = "";
            updateDisplay();
        }

        function clearAllBookmarks() {
            if (confirm('Are you sure you want to clear all bookmarks?')) {
                questions.forEach(q => q.bookmarked = false);
                updateDisplay();
            }
        }

        function updateDisplay() {
            const allQuestionsDiv = document.getElementById('allQuestions');
            const bookmarkedDiv = document.getElementById('bookmarkedQuestions');
            const clearBtn = document.getElementById('clearBtn');
            
            allQuestionsDiv.innerHTML = questions.map((q, i) => `
                <div class="question-item">
                    <div class="question-content">
                        <span class="question-text">${q.text}</span>
                        <div class="question-actions">
                            <button class="btn btn-bookmark ${q.bookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${i})">
                                ${q.bookmarked ? '★ Bookmarked' : '★ Bookmark'}
                            </button>
                        </div>
                    </div>
                    <div class="answer-section">
                        ${q.answer ? `
                            <div class="submitted-answer">
                                <span>✓ Answer: ${q.answer}</span>
                                <button class="btn btn-edit-answer" onclick="editAnswer(${i})">Edit</button>
                            </div>
                        ` : `
                            <div class="answer-input-group">
                                <input type="text" class="answer-input" id="answer-${i}" placeholder="Type your answer here...">
                                <button class="btn btn-submit-answer" onclick="submitAnswer(${i}, document.getElementById('answer-${i}').value)">
                                    Submit Answer
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            `).join('');

            const bookmarkedQuestions = questions.filter(q => q.bookmarked);
            
            if (bookmarkedQuestions.length === 0) {
                bookmarkedDiv.innerHTML = `
                    <div class="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <p>No bookmarks yet.<br>Click the bookmark button to save questions!</p>
                    </div>
                `;
                clearBtn.style.display = 'none';
            } else {
                bookmarkedDiv.innerHTML = questions
                    .map((q, i) => q.bookmarked ? `
                        <div class="question-item">
                            <div class="question-content">
                                <span class="question-text">${q.text}</span>
                                <button class="btn btn-remove" onclick="removeBookmark(${i})">Remove</button>
                            </div>
                            ${q.answer ? `
                                <div class="answer-section">
                                    <div class="submitted-answer">
                                        <span>✓ Answer: ${q.answer}</span>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    ` : '')
                    .join('');
                clearBtn.style.display = 'block';
            }

            document.getElementById('totalQuestions').textContent = questions.length;
            document.getElementById('bookmarkedCount').textContent = bookmarkedQuestions.length;
        }

        document.getElementById('newQuestion').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addQuestion();
            }
        });

        updateDisplay();




       
