document.addEventListener('DOMContentLoaded', () => {
    let currentFilter = 'allTime';
    const highscoresTable = document.querySelector('.highscores-table tbody');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load highscores data
    async function loadHighscores() {
        try {
            const response = await fetch('../data/highscores.json');
            if (!response.ok) {
                throw new Error('Failed to load highscores');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading highscores:', error);
            showError('Failed to load highscores. Please try again later.');
            return null;
        }
    }

    // Display highscores in table
    function displayHighscores(scores) {
        if (!scores || !scores[currentFilter]) {
            highscoresTable.innerHTML = '<tr><td colspan="5">No scores available</td></tr>';
            return;
        }

        highscoresTable.innerHTML = scores[currentFilter].map(score => `
            <tr class="${score.rank <= 3 ? 'top-3' : ''}">
                <td class="rank">#${score.rank}</td>
                <td>${score.username}</td>
                <td>${score.score.toLocaleString()}</td>
                <td>${score.time}</td>
                <td>${formatDate(score.date)}</td>
            </tr>
        `).join('');
    }

    // Format date to local string
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('sv-SE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        highscoresTable.parentElement.insertBefore(errorDiv, highscoresTable);
    }

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            
            // Load and display highscores
            const scores = await loadHighscores();
            displayHighscores(scores);
        });
    });

    // Initial load
    loadHighscores().then(scores => {
        if (scores) {
            displayHighscores(scores);
        }
    });
}); 