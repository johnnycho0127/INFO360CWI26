document.addEventListener('DOMContentLoaded', () => {
    // Get the project ID from the URL (e.g., "?id=group1")
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    // Find the project in our "database"
    const project = projects.find(p => p.id === projectId);

    if (project) {
        // Populate the page with the project data
        document.title = project.title; // Set page title
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-members').textContent = project.members.join(', ');
        document.getElementById('project-abstract').innerHTML = project.abstract;
        document.getElementById('project-description').innerHTML = project.description;
        document.getElementById('project-image').src = project.thumbnail;
        document.getElementById('project-image').alt = project.title;

        // Add tags
        const tagsContainer = document.getElementById('project-tags');
        project.keywords.forEach(k => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = k;
            tagsContainer.appendChild(tag);
        });

        // Handle the paper/poster link
        const link = document.getElementById('project-link');
        if (project.paperLink) {
            link.href = project.paperLink;
        } else {
            // Hide the link if no paper is provided
            link.style.display = 'none';
        }

    } else {
        // If no project is found, show an error
        document.getElementById('project-title').textContent = 'Project Not Found';
        document.querySelector('.project-detail-container').innerHTML = '<p>Sorry, the requested project could not be found. Please return to the homepage.</p>';
    }
});
