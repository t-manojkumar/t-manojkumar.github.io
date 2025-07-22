document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Experience Tabs ---
    const tabList = document.querySelector('.tab-list');
    const tabItems = document.querySelectorAll('.tab-item');
    const contentItems = document.querySelectorAll('.content-item');

    if (tabList) {
        tabList.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-item');
            if (!clickedTab) return;

            // Remove active class from all tabs and content
            tabItems.forEach(tab => tab.classList.remove('active'));
            contentItems.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            clickedTab.classList.add('active');

            // Show corresponding content
            const contentId = clickedTab.dataset.tab;
            const correspondingContent = document.getElementById(contentId);
            if (correspondingContent) {
                correspondingContent.classList.add('active');
            }
        });
    }

    // --- Smooth scrolling for nav links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});