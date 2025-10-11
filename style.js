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

















       
