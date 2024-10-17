import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('site-form');
    const sitesList = document.getElementById('sites-list');

    // Get a reference to the database service
    const database = getDatabase();

    // Animation for the header
    gsap.from('header', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });

    // Animation for the sections
    gsap.from('section', { 
        opacity: 0, 
        y: 50, 
        duration: 1, 
        ease: 'power3.out',
        stagger: 0.2
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const siteName = document.getElementById('site-name').value;
        const siteUrl = document.getElementById('site-url').value;
        const siteDescription = document.getElementById('site-description').value;

        // Push the new site to Firebase
        push(ref(database, 'sites'), {
            name: siteName,
            url: siteUrl,
            description: siteDescription
        });

        form.reset();
    });

    // Listen for new sites being added
    onChildAdded(ref(database, 'sites'), (snapshot) => {
        const site = snapshot.val();
        addSiteToUI(site);
    });

    function addSiteToUI(site) {
        const siteCard = document.createElement('div');
        siteCard.classList.add('site-card');
        siteCard.innerHTML = `
            <h3>${site.name}</h3>
            <a href="${site.url}" target="_blank">${site.url}</a>
            <p>${site.description}</p>
        `;

        sitesList.prepend(siteCard);

        // Animation for the new site card
        gsap.from(siteCard, { 
            opacity: 0, 
            y: 20, 
            duration: 0.5, 
            ease: 'power3.out'
        });
    }
});
