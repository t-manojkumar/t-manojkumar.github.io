document.addEventListener('DOMContentLoaded', () => {
    // --- Scrollspy Logic ---
    const sections = document.querySelectorAll('.main-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = {
        root: document.querySelector('.right-column'),
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Cursor Glow Effect ---
    const body = document.querySelector('body');
    body.addEventListener('mousemove', e => {
        window.requestAnimationFrame(() => {
            body.style.setProperty('--mouse-x', `${e.clientX}px`);
            body.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    });

    // --- FIX #2: Scroll to top on name click ---
    const homeLink = document.getElementById('home-link');
    const rightColumn = document.querySelector('.right-column');
    if (homeLink && rightColumn) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            rightColumn.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});