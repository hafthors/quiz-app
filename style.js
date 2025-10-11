  function toggleAnswer(btn) {
            const answer = btn.nextElementSibling;
            answer.classList.toggle('show');
            
            if (answer.classList.contains('show')) {
                btn.textContent = 'Hide Answer';
                btn.style.background = '#d3a625';
                btn.style.color = '#740001';
            } else {
                btn.textContent = 'Show Answer';
                btn.style.background = '#740001';
                btn.style.color = '#d3a625';
            }
        }

        function filterByTag(tag) {
            const tagText = tag.textContent;
            const allCards = document.querySelectorAll('.question-card');
            
            // Toggle highlight effect
            allCards.forEach(card => {
                const tags = Array.from(card.querySelectorAll('.tag'));
                const hasTag = tags.some(t => t.textContent === tagText);
                
                if (hasTag) {
                    card.style.borderColor = '#d3a625';
                    card.style.background = 'rgba(211, 166, 37, 0.15)';
                    setTimeout(() => {
                        card.style.borderColor = 'rgba(211, 166, 37, 0.3)';
                        card.style.background = 'rgba(255, 255, 255, 0.05)';
                    }, 2000);
                }
            });
        }
