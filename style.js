   let questions = [
             { text: "Who is Harry Potter's best friend throughout the series?", bookmarked: false, answer: "" },
            { text: "Which magical creature guards the entrance to the Gryffindor common room?", bookmarked: false, answer: "" },
            { text: "What is the name of the name of the game played on flying broomsticks in the widarding world?", bookmarked: false, answer: "" },
            { text: "What is the name of the three-headed dog that guards the Sorcerer's Stonety?", bookmarked: false, answer: "" },
            { text: "Which professor is the head of Slytherin House at Hogwarts?", bookmarked: false, answer: "" }
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
                questions.push({ text: text, bookmarked: false });
                input.value = '';
                updateDisplay();
            }
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
                    <span class="question-text">${q.text}</span>
                    <button class="btn btn-bookmark ${q.bookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${i})">
                        ${q.bookmarked ? '★ Bookmarked' : '★ Bookmark'}
                    </button>
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
                            <span class="question-text">${q.text}</span>
                            <button class="btn btn-remove" onclick="removeBookmark(${i})">Remove</button>
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

















       
