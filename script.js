document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.main-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const options = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.3 // 30% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Find the corresponding nav link and add the active class
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
});