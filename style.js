
  let bookmarkedData = new Map();

        function showPage(page) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            
            if (page === 'home') {
                document.getElementById('homePage').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Quiz App';
                event.target.classList.add('active');
            } else if (page === 'bookmarks') {
                document.getElementById('bookmarksPage').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Bookmarks';
                event.target.classList.add('active');
                updateBookmarksPage();
            } else if (page === 'profile') {
                document.getElementById('profilePage').classList.add('active');
                document.getElementById('pageTitle').textContent = 'Profile';
                event.target.classList.add('active');
            }
        }

        function toggleBookmark(icon) {
            icon.classList.toggle('active');
            const card = icon.closest('.quiz-card');
            const question = card.querySelector('.answer').textContent;
            
            if (icon.classList.contains('active')) {
                const cardData = {
                    question: card.querySelector('.answer').textContent,
                    answer: card.querySelector('.answer-content').textContent,
                    tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent)
                };
                bookmarkedData.set(question, cardData);
            } else {
                bookmarkedData.delete(question);
            }
            
            updateBookmarkCount();
        }

        function updateBookmarkCount() {
            const count = bookmarkedData.size;
            document.getElementById('bookmarkCount').textContent = count;
            document.getElementById('bookmarkStatCount').textContent = count;
        }

        function updateBookmarksPage() {
            const bookmarksContainer = document.getElementById('bookmarkedQuestions');
            bookmarksContainer.innerHTML = '';
            
            if (bookmarkedData.size === 0) {
                bookmarksContainer.innerHTML = `
                    <div class="quiz-card">
                        <div class="empty-state">
                            <div class="empty-state-icon">🔖</div>
                            <h2>No bookmarks yet!</h2>
                            <p>Bookmark questions from the home page to see them here.</p>
                        </div>
                    </div>
                `;
            } else {
                bookmarkedData.forEach((data, key) => {
                    const card = document.createElement('div');
                    card.className = 'quiz-card';
                    card.innerHTML = `
                        <span class="bookmark-icon active" onclick="toggleBookmarkFromPage(this, '${key.replace(/'/g, "\\'")}')">🔖</span>
                        <div class="question">Question?</div>
                        <div class="answer">${data.question}</div>
                        <button class="show-answer-btn" onclick="toggleAnswer(this)">Show Answer</button>
                        <div class="answer-content">${data.answer}</div>
                        <div class="tags">
                            ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    `;
                    bookmarksContainer.appendChild(card);
                });
            }
        }

        function toggleBookmarkFromPage(icon, question) {
            icon.classList.toggle('active');
            
            if (!icon.classList.contains('active')) {
                bookmarkedData.delete(question);
                
                const homeCards = document.querySelectorAll('#homePage .quiz-card');
                homeCards.forEach(card => {
                    const cardQuestion = card.querySelector('.answer').textContent;
                    if (cardQuestion === question) {
                        card.querySelector('.bookmark-icon').classList.remove('active');
                    }
                });
                
                updateBookmarkCount();
                updateBookmarksPage();
            }
        }

        function toggleAnswer(btn) {
            const answerContent = btn.nextElementSibling;
            if (answerContent.style.display === 'none' || !answerContent.style.display) {
                answerContent.style.display = 'block';
                btn.textContent = 'Hide Answer';
            } else {
                answerContent.style.display = 'none';
                btn.textContent = 'Show Answer';
            }
        }

        function toggleDarkMode(toggle) {
            toggle.classList.toggle('active');
            document.body.classList.toggle('dark-mode');
        }
  
