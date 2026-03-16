document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to perform the search
    function filterProjects(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

        projectCards.forEach(card => {
            // Get content from: Title, Team Name, Team Members, Description, Keywords
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            // NEW: Get team info
            const teamInfo = card.querySelector('.team-info').textContent.toLowerCase();

            // Get keywords
            const keywords = Array.from(card.querySelectorAll('.keyword'))
                                  .map(k => k.textContent.toLowerCase())
                                  .join(' ');
            
            // Combine all text into one string to search against
            const combinedText = `${title} ${teamInfo} ${description} ${keywords}`;

            // Check if the search term exists in that string
            if (combinedText.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Listen for user input
    searchInput.addEventListener('input', (e) => {
        filterProjects(e.target.value);
    });
});
