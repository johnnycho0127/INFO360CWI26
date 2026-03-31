document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const themeToggle = document.getElementById('theme-toggle');
    const projectGrid = document.getElementById('project-grid');

    let currentSearchTerm = '';
    let currentFilter = 'all';

    // Dark mode
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '☀️ Light Mode';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙 Dark Mode';
            }
        });
    }

    // Function to perform search + filter
    function filterProjects() {
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();

            // team-info -> meta-info
            const teamInfo = card.querySelector('.meta-info').textContent.toLowerCase();

            const keywords = Array.from(card.querySelectorAll('.keyword'))
                .map(k => k.textContent.toLowerCase())
                .join(' ');

            const category = (card.dataset.category || '').toLowerCase();

            const combinedText = `${title} ${teamInfo} ${description} ${keywords} ${category}`;

            const matchesSearch = combinedText.includes(currentSearchTerm);
            const matchesFilter =
                currentFilter === 'all' || category.includes(currentFilter);

            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        sortProjects();
    }

    // Sort function
    function sortProjects() {
        if (!sortSelect || !projectGrid) return;

        const visibleCards = Array.from(projectCards).filter(card => !card.classList.contains('hidden'));

        if (sortSelect.value === 'team') {
            visibleCards.sort((a, b) => Number(a.dataset.team) - Number(b.dataset.team));
        } else if (sortSelect.value === 'alphabetical') {
            visibleCards.sort((a, b) => {
                const titleA = a.querySelector('h3').textContent.toLowerCase();
                const titleB = b.querySelector('h3').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            });
        } else if (sortSelect.value === 'interactive' || sortSelect.value === 'demo') {
            visibleCards.sort((a, b) => {
                const aDemo = a.dataset.hasDemo === 'true' ? 1 : 0;
                const bDemo = b.dataset.hasDemo === 'true' ? 1 : 0;
                return bDemo - aDemo;
            });
        }

        visibleCards.forEach(card => {
            projectGrid.appendChild(card);
        });
    }

    // Search input listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            filterProjects();
        });
    }

    // Filter button listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.dataset.filter.toLowerCase();
            filterProjects();
        });
    });

    // Sort listener
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortProjects();
        });
    }
});

filterProjects();