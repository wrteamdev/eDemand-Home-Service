document.addEventListener('DOMContentLoaded', () => {
    // Get all sections for scrollspy
    const sections = document.querySelectorAll('section');

    // Navigation highlight
    const leftNavLinks = document.querySelectorAll('.left-sidebar .nav-links li a');
    const rightNavLinks = document.querySelectorAll('.right-sidebar .nav-links li a');

    // Add click event to right sidebar links (for in-page navigation)
    rightNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Smooth scroll to section
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scrollspy implementation
    function onScroll() {
        const scrollPosition = window.scrollY;

        // Check each section's position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                // Remove active class from all right sidebar links
                rightNavLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                });

                // Add active class to the corresponding link
                const activeLink = document.querySelector(`.right-sidebar .nav-links li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', onScroll);

    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    document.querySelector('.left-sidebar .sidebar-header').appendChild(mobileMenuToggle);

    mobileMenuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.left-sidebar .nav-links');
        navLinks.classList.toggle('show');
    });

    // Run onScroll once to set initial active state
    onScroll();
}); 