document.addEventListener('DOMContentLoaded', () => {
    // --- Scrollspy Logic ---
    const sections = document.querySelectorAll('.main-section');
    const navLinks = document.querySelectorAll('.nav-link');

    // FIX #4: Updated IntersectionObserver options for better accuracy
    const observerOptions = {
        root: document.querySelector('.right-column'), // Observe within the scrolling container
        rootMargin: '-30% 0px -70% 0px', // Trigger when section is in the upper part of the view
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
    // FIX #1: Changed selector to 'body' for full-page effect
    const body = document.querySelector('body');
    body.addEventListener('mousemove', e => {
        // Use requestAnimationFrame for smoother updates
        window.requestAnimationFrame(() => {
            body.style.setProperty('--mouse-x', `${e.clientX}px`);
            body.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    });
});