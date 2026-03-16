// This is the "database" of all your projects.
// Add a new object for each of your 20 groups.

const projects = [
    {
        id: 'group1', // A unique ID for each group
        title: 'Analyzing Misinformation on Social Media',
        members: ['Alice Smith', 'Bob Johnson', 'Charlie Lee'],
        keywords: ['Misinformation', 'Social Media', 'Data Analysis'],
        thumbnail: 'images/placeholder.png', // Path to a preview image
        abstract: 'This project investigates the spread of misinformation on X (formerly Twitter) using quantitative content analysis.',
        description: 'We collected 5,000 tweets related to a recent political event and analyzed them for common misinformation tropes. Our findings indicate that... [Add full project description, methodology, findings, etc. You can use <strong>HTML tags</strong> here for formatting.]',
        paperLink: 'files/group1_paper.pdf' // Path to their final PDF poster or paper
    },
    {
        id: 'group2',
        title: 'Usability Study of E-Learning Platforms',
        members: ['David Kim', 'Eva Rodriguez'],
        keywords: ['HCI', 'Usability', 'Education', 'UX Research'],
        thumbnail: 'images/placeholder.png',
        abstract: 'This project evaluated the user experience of three popular e-learning platforms using heuristic evaluation and user testing.',
        description: 'We conducted user interviews, surveys, and heuristic evaluations to identify key pain points and provide design recommendations. Our study involved 15 undergraduate participants...',
        paperLink: 'files/group2_poster.pdf'
    },
    {
        id: 'group3',
        title: 'Project Title 3',
        members: ['Student Name', 'Student Name'],
        keywords: ['Keyword 1', 'Keyword 2'],
        thumbnail: 'images/placeholder.png',
        abstract: 'A short, 1-2 sentence abstract for the homepage grid.',
        description: 'The full, detailed description of the project goes here.',
        paperLink: null // You can set this to null if there is no paper
    }
    // ... Add all 20 of your projects here
];
