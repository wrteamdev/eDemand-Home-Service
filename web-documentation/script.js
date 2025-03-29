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
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        // Check if we're near the bottom of the page (within 100px)
        const isNearBottom = scrollPosition + windowHeight > docHeight - 100;
        
        // If near bottom, highlight the last nav item
        if (isNearBottom) {
            rightNavLinks.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            
            // Activate the last link
            const lastLink = rightNavLinks[rightNavLinks.length - 1];
            if (lastLink) {
                lastLink.parentElement.classList.add('active');
            }
            return; // Exit early
        }
        
        // For all other cases, use normal scrollspy logic
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Remove active from all links
        rightNavLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });
        
        // Add active to current section link
        if (currentSection) {
            const activeLink = document.querySelector(`.right-sidebar .nav-links li a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
            }
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', onScroll);
    // Use throttled scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(onScroll, 100);
    });

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