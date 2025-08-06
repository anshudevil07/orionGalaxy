document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================================
    //     1. MOBILE MENU & NAVIGATION LOGIC (THE FIX)
    // ======================================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('menu-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Function to open or close the mobile menu
    function toggleMenu() {
        navMenu.classList.toggle('open');
        overlay.classList.toggle('visible');
    }

    // --- Event Listeners to make the menu work ---
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // This loop adds the highlighting logic and closes the menu on link click
    navLinks.forEach(clickedLink => {
        clickedLink.addEventListener('click', () => {
            // Remove .active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add .active class to the clicked link
            clickedLink.classList.add('active');

            // If the mobile menu is open, close it
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ======================================================
    //     2. SCROLL ANIMATION FOR "ABOUT US" SECTION
    // ======================================================
    const aboutSection = document.querySelector('#about');
    const aboutContent = document.querySelector('.about-content');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutContent.classList.add('is-visible');
                    aboutImage.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        aboutObserver.observe(aboutSection);
    }
    
    // ======================================================
    //     3. SCROLL ANIMATION FOR "PHOTOS" GALLERY
    // ======================================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        const galleryObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        galleryItems.forEach(item => galleryObserver.observe(item));
    }


     const contactSection = document.querySelector('#contact');

    if (contactSection) {
        const contactDetails = document.querySelector('.contact-details');
        const mapContainer = document.querySelector('.map-container');

        const contactObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactDetails.classList.add('is-visible');
                    mapContainer.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        contactObserver.observe(contactSection);
    }

});