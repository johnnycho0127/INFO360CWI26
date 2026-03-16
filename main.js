document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('project-grid');

    projects.forEach(project => {
        // Create the project card
        const card = document.createElement('a');
        card.href = `project.html?id=${project.id}`;
        card.className = 'project-card';

        // Create and add the image
        const img = document.createElement('img');
        img.src = project.thumbnail;
        img.alt = `${project.title} thumbnail`;
        card.appendChild(img);

        // Create and add the title
        const title = document.createElement('h3');
        title.textContent = project.title;
        card.appendChild(title);

        // Create and add the abstract
        const abstract = document.createElement('p');
        abstract.textContent = project.abstract;
        card.appendChild(abstract);

        // Create a container for tags
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags';
        project.keywords.forEach(k => {
            const tag = document.createElement('span');
            tag.textContent = k;
            tagsContainer.appendChild(tag);
        });
        card.appendChild(tagsContainer);

        // Add the completed card to the grid
        grid.appendChild(card);
    });
});
