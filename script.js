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
            themeToggle.textContent = '☀️';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
    }

    function filterProjects() {
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            const teamInfo = card.querySelector('.meta-info').textContent.toLowerCase();

            const keywords = Array.from(card.querySelectorAll('.keyword'))
                .map(k => k.textContent.toLowerCase())
                .join(' ');

            const category = (card.dataset.category || '').toLowerCase();
            const combinedText = `${title} ${teamInfo} ${description} ${keywords} ${category}`;

            const matchesSearch = combinedText.includes(currentSearchTerm);
            const matchesFilter = currentFilter === 'all' || category.includes(currentFilter);

            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        sortProjects();
    }

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

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            filterProjects();
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.dataset.filter.toLowerCase();
            filterProjects();
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortProjects();
        });
    }

    filterProjects();

    /* =========================
       Chatbot Logic
    ========================= */
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');

    function addChatMessage(text, sender = 'bot') {
        const message = document.createElement('div');
        message.classList.add('chatbot-message');
        message.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function openChatbot() {
        chatbotWindow.classList.remove('hidden-chat');
    }

    function closeChatbot() {
        chatbotWindow.classList.add('hidden-chat');
    }

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            console.log('chat button clicked');
            alert('clicked');
            chatbotWindow.classList.toggle('hidden-chat');
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', closeChatbot);
    }

    function getAllCards() {
        return Array.from(document.querySelectorAll('.project-card'));
    }

    function getProjectData() {
        return getAllCards().map(card => {
            const team = card.dataset.team || '';
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const meta = card.querySelector('.meta-info')?.textContent?.trim() || '';
            const description = card.querySelector('.description')?.textContent?.trim() || '';
            const keywords = Array.from(card.querySelectorAll('.keyword')).map(k => k.textContent.trim());
            const category = card.dataset.category || '';
            const hasDemo = card.dataset.hasDemo === 'true';

            const proposalLink = card.querySelector('.project-link')?.href || '';
            const videoLink = card.querySelector('.video-link')?.href || '';
            const demoLink = card.querySelector('.interactive-link')?.href || '';

            return {
                card,
                team,
                title,
                meta,
                description,
                keywords,
                category,
                hasDemo,
                proposalLink,
                videoLink,
                demoLink
            };
        });
    }

    function highlightCard(card) {
        if (!card) return;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.outline = '3px solid #8a2cff';
        card.style.outlineOffset = '4px';

        setTimeout(() => {
            card.style.outline = '';
            card.style.outlineOffset = '';
        }, 2000);
    }

    function findTeamInMessage(message) {
        const match = message.match(/team\s*(\d+)/i);
        return match ? match[1] : null;
    }

    function showTeam(teamNumber) {
        const project = getProjectData().find(p => p.team === String(teamNumber));
        if (!project) {
            return `Sorry, I couldn't find Team ${teamNumber}.`;
        }

        highlightCard(project.card);
        return `Here is Team ${teamNumber}: ${project.title}`;
    }

    function openTeamDemo(teamNumber) {
        const project = getProjectData().find(p => p.team === String(teamNumber));
        if (!project) {
            return `Sorry, I couldn't find Team ${teamNumber}.`;
        }

        if (!project.demoLink) {
            return `Team ${teamNumber} does not have an interactive demo link.`;
        }

        window.open(project.demoLink, '_blank');
        return `Opening the interactive demo for Team ${teamNumber}: ${project.title}`;
    }

    function openTeamProposal(teamNumber) {
        const project = getProjectData().find(p => p.team === String(teamNumber));
        if (!project) {
            return `Sorry, I couldn't find Team ${teamNumber}.`;
        }

        if (!project.proposalLink) {
            return `Team ${teamNumber} does not have a proposal link available.`;
        }

        window.open(project.proposalLink, '_blank');
        return `Opening the proposal for Team ${teamNumber}: ${project.title}`;
    }

    function openTeamVideo(teamNumber) {
        const project = getProjectData().find(p => p.team === String(teamNumber));
        if (!project) {
            return `Sorry, I couldn't find Team ${teamNumber}.`;
        }

        if (!project.videoLink) {
            return `Team ${teamNumber} does not have a video link available.`;
        }

        window.open(project.videoLink, '_blank');
        return `Opening the video for Team ${teamNumber}: ${project.title}`;
    }

    function listDemoProjects() {
        const demoProjects = getProjectData().filter(project => project.hasDemo);

        if (demoProjects.length === 0) {
            return 'I could not find any projects with demos.';
        }

        const names = demoProjects.map(project => `Team ${project.team}: ${project.title}`);
        return `Projects with demos:\n${names.join('\n')}`;
    }

    function findProjectsByKeyword(keyword) {
        const query = keyword.toLowerCase();

        return getProjectData().filter(project => {
            const combined = `
                ${project.team}
                ${project.title}
                ${project.meta}
                ${project.description}
                ${project.category}
                ${project.keywords.join(' ')}
            `.toLowerCase();

            return combined.includes(query);
        });
    }

    function formatProjectList(projects) {
        if (projects.length === 0) {
            return "I couldn't find any matching projects.";
        }

        return projects
            .slice(0, 6)
            .map(project => `Team ${project.team}: ${project.title}`)
            .join('\n');
    }

    function handlePortfolioQuestion(message) {
        const text = message.trim().toLowerCase();

        if (
            text === 'hi' ||
            text === 'hello' ||
            text === 'hey' ||
            text === 'good morning' ||
            text === 'good afternoon'
        ) {
            return 'Hi! I can help you find teams, topics, demos, proposals, and videos on this portfolio website.';
        }

        if (
            text === 'thanks' ||
            text === 'thank you' ||
            text === 'thank u'
        ) {
            return "You're welcome! Ask me about teams, demos, proposals, videos, or project topics anytime.";
        }

        if (!text) {
            return 'Please type a question.';
        }

        if (
            text.includes('how do i use this website') ||
            text.includes('how to use this website') ||
            text.includes('how do i use this site') ||
            text.includes('what can i do here')
        ) {
            return 'You can browse projects, use the category filters, sort by team or alphabetically, search by team/member/keyword, and open each team’s proposal, video, or interactive demo.';
        }

        if (
            text.includes('what is this website') ||
            text.includes('about this website') ||
            text.includes('what is this site')
        ) {
            return 'This website showcases 23 INFO 360 student research proposal projects. You can explore each team’s topic, members, keywords, and available links.';
        }

        if (
            text.includes('how do i search') ||
            text === 'search' ||
            text.includes('how to search')
        ) {
            return 'Use the search bar to look up a team number, student name, project title, or keyword.';
        }

        if (
            text.includes('how do i filter') ||
            text.includes('how to filter')
        ) {
            return 'Use the category buttons like Education, AI, Accessibility, and Mental Health to narrow the list of projects.';
        }

        if (
            text.includes('which projects have demos') ||
            text.includes('projects with demos') ||
            text.includes('has demo') ||
            text.includes('interactive demo')
        ) {
            return listDemoProjects();
        }

        const teamNumber = findTeamInMessage(text);

        if (teamNumber && (text.includes('show') || text.includes('go to') || text.includes('find'))) {
            return showTeam(teamNumber);
        }

        if (teamNumber && text.includes('demo')) {
            return openTeamDemo(teamNumber);
        }

        if (teamNumber && text.includes('proposal')) {
            return openTeamProposal(teamNumber);
        }

        if (teamNumber && text.includes('video')) {
            return openTeamVideo(teamNumber);
        }

        if (teamNumber) {
            return showTeam(teamNumber);
        }

        if (text.includes('ai projects') || text === 'ai') {
            const projects = findProjectsByKeyword('ai');
            return `Here are some AI-related projects:\n${formatProjectList(projects)}`;
        }

        if (text.includes('accessibility')) {
            const projects = findProjectsByKeyword('accessibility');
            return `Here are some accessibility-related projects:\n${formatProjectList(projects)}`;
        }

        if (text.includes('mental health')) {
            const projects = findProjectsByKeyword('mental health');
            return `Here are some mental health-related projects:\n${formatProjectList(projects)}`;
        }

        if (text.includes('education')) {
            const projects = findProjectsByKeyword('education');
            return `Here are some education-related projects:\n${formatProjectList(projects)}`;
        }

        if (text.includes('elderly') || text.includes('older adults') || text.includes('seniors')) {
            const projects = findProjectsByKeyword('elderly');
            return `Here are some projects related to older adults:\n${formatProjectList(projects)}`;
        }

        const matchedProjects = findProjectsByKeyword(text);
        if (matchedProjects.length > 0) {
            return `I found these matching projects:\n${formatProjectList(matchedProjects)}`;
        }

        return "Sorry, I couldn't find a good match for that. Try asking about a team number, a topic like AI or accessibility, or how to use the website.";
    }

    function sendChatbotMessage(customText = null) {
        const userText = customText || chatbotInput.value.trim();

        if (!userText) return;

        addChatMessage(userText, 'user');
        const response = handlePortfolioQuestion(userText);
        addChatMessage(response, 'bot');

        if (!customText) {
            chatbotInput.value = '';
        }

        openChatbot();
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', () => {
            sendChatbotMessage();
        });
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
    }

    quickActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            sendChatbotMessage(button.textContent.trim());
        });
    });
});