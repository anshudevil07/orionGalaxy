document.addEventListener('DOMContentLoaded', function() {
    
    // ======================================================
    //     1. MOBILE MENU & NAVIGATION LOGIC
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

    // Event Listeners for the hamburger menu
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Add smooth scrolling and close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent instant jump

            // Smoothly scroll to the target section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // If the mobile menu is open, close it
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ======================================================
    //     2. IMAGE POPUP MODAL LOGIC
    // ======================================================
    const popup = document.getElementById('image-popup');
    if (popup) {
        const popupImg = document.getElementById('popup-img');
        const closeBtn = document.querySelector('.popup-close');
        const galleryImages = document.querySelectorAll('.gallery-item img');

        // Open the popup when a gallery image is clicked
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer'; // Add a pointer cursor to indicate it's clickable
            img.addEventListener('click', () => {
                popup.style.display = 'block';
                popupImg.src = img.src;
            });
        });

        // Close the popup when the 'x' is clicked
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Close the popup when clicking on the background overlay
        window.addEventListener('click', (e) => {
            if (e.target == popup) {
                popup.style.display = 'none';
            }
        });
    }

    // ======================================================
    //     3. FADE-IN ANIMATIONS ON SCROLL
    // ======================================================
    const sectionsToAnimate = [
        { selector: '#about', elements: ['.about-content', '.about-image'], threshold: 0.15 },
        { selector: '#contact', elements: ['.contact-details', '.map-container'], threshold: 0.15 }
    ];

    sectionsToAnimate.forEach(sectionInfo => {
        const section = document.querySelector(sectionInfo.selector);
        if (section) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        sectionInfo.elements.forEach(elSelector => {
                            document.querySelector(elSelector).classList.add('is-visible');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: sectionInfo.threshold });
            observer.observe(section);
        }
    });

    // Individual observer for gallery items for a staggered effect
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

    // ======================================================
    //     4. ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
    // ======================================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 85; // Adjusted for header height
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href contains the current section's ID
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // ======================================================
    //     5. BROCHURE POPUP FORM LOGIC (NEW)
    // ======================================================
    const openBrochureBtn = document.getElementById('open-brochure-popup');
    const brochurePopup = document.getElementById('brochure-popup');
    const closeBrochureBtn = document.querySelector('.popup-form-close');
    const brochureForm = document.getElementById('brochure-form');

    if (openBrochureBtn && brochurePopup && closeBrochureBtn && brochureForm) {

        function openPopup() {
            brochurePopup.classList.add('visible');
        }

        function closePopup() {
            brochurePopup.classList.remove('visible');
        }

        openBrochureBtn.addEventListener('click', openPopup);
        closeBrochureBtn.addEventListener('click', closePopup);
        brochurePopup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });

        // --- FORM SUBMISSION LOGIC ---
        brochureForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = brochureForm.querySelector('.submit-button');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // +++ IMPORTANT: PASTE YOUR GOOGLE APPS SCRIPT URL HERE +++
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwN-_J8ng-ew92dlm27QznZEaeX2xyYQVH0NH4tpEdC4vATEl1yQw-BsTJr27HdwfBHsw/exec';
            
            const formData = new FormData(brochureForm);

            fetch(scriptURL, {
                method: 'POST',
                body: formData
              })
              .then(response => response.text())
              .then(result => {
                console.log(result); // Log the response for debugging

                if (result === "Data Saved Successfully") {
                  alert('Thank you! Your brochure is now downloading.');
                  closePopup(); 

                  // +++ IMPORTANT: UPDATE THIS PATH TO YOUR BROCHURE FILE +++
                  const brochurePath = 'Brochure/Brochure.pdf';
                  const link = document.createElement('a');
                  link.href = brochurePath;
                  link.download = 'Orion-Galaxy-Brochure.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  brochureForm.reset();
                } else {
                  // If the script returns an error, show it
                  alert(result); 
                }
              })
              .catch(error => {
                console.error('Fetch Error:', error); 
                alert('An error occurred. Please check your connection and try again.');
              })
              .finally(() => {
                // Always reset the button
                submitBtn.textContent = 'Submit & Download';
                submitBtn.disabled = false;
              });
        });
    }
});