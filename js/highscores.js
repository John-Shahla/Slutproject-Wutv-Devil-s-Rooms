document.addEventListener('DOMContentLoaded', () => {
    // Sample highscores data (replace with actual data from your backend)
    const highscoresData = {
        all: [
            { rank: 1, player: "Spelare1", score: 10000, time: "1:30:45", date: "2024-04-09" },
            { rank: 2, player: "Spelare2", score: 9500, time: "1:45:20", date: "2024-04-08" },
            { rank: 3, player: "Spelare3", score: 9000, time: "2:00:15", date: "2024-04-07" },
            { rank: 4, player: "Spelare4", score: 8500, time: "2:15:30", date: "2024-04-06" },
            { rank: 5, player: "Spelare5", score: 8000, time: "2:30:00", date: "2024-04-05" }
        ],
        weekly: [
            { rank: 1, player: "Spelare1", score: 10000, time: "1:30:45", date: "2024-04-09" },
            { rank: 2, player: "Spelare2", score: 9500, time: "1:45:20", date: "2024-04-08" },
            { rank: 3, player: "Spelare3", score: 9000, time: "2:00:15", date: "2024-04-07" }
        ],
        monthly: [
            { rank: 1, player: "Spelare1", score: 10000, time: "1:30:45", date: "2024-04-09" },
            { rank: 2, player: "Spelare2", score: 9500, time: "1:45:20", date: "2024-04-08" },
            { rank: 3, player: "Spelare3", score: 9000, time: "2:00:15", date: "2024-04-07" },
            { rank: 4, player: "Spelare4", score: 8500, time: "2:15:30", date: "2024-04-06" },
            { rank: 5, player: "Spelare5", score: 8000, time: "2:30:00", date: "2024-04-05" }
        ]
    };

    const highscoresBody = document.getElementById('highscores-body');
    const filterButtons = document.querySelectorAll('.highscores-filters .filter-btn');

    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('sv-SE', options);
    }

    // Function to display highscores
    function displayHighscores(data) {
        highscoresBody.innerHTML = '';
        
        data.forEach(score => {
            const row = document.createElement('tr');
            if (score.rank <= 3) {
                row.classList.add('top-3');
            }

            row.innerHTML = `
                <td class="rank">#${score.rank}</td>
                <td>${score.player}</td>
                <td>${score.score.toLocaleString()}</td>
                <td>${score.time}</td>
                <td>${formatDate(score.date)}</td>
            `;

            highscoresBody.appendChild(row);
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            displayHighscores(highscoresData[filter]);
        });
    });

    // Initial display
    displayHighscores(highscoresData.all);

    // Function to update highscores (to be called when new scores are available)
    function updateHighscores(newData) {
        // Update the data
        Object.assign(highscoresData, newData);
        
        // Get current active filter
        const activeFilter = document.querySelector('.highscores-filters .filter-btn.active').getAttribute('data-filter');
        
        // Update display
        displayHighscores(highscoresData[activeFilter]);
    }

    // Example of how to update highscores (to be implemented with your backend)
    // updateHighscores({
    //     all: [...newData],
    //     weekly: [...newData],
    //     monthly: [...newData]
    // });
}); 