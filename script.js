document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Custom Premium Preloader Fadeout
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        });
    }

    /* ==========================================================================
       2. Dynamic Smooth Scroll Anchor Implementation (Controlled Easing Curve)
       ========================================================================== */
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                // Advanced Smooth scrolling API
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       3. Nav Shutter Scroll Control & Highlight Action
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       4. Ambient Lighting Mouse Movement Tracker (Parallax Overlay)
       ========================================================================== */
    const ambientOverlay = document.getElementById('ambient-overlay');
    
    if (ambientOverlay) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            // Subtle spring physics calculation
            ambientOverlay.style.left = `${x}px`;
            ambientOverlay.style.top = `${y}px`;
        });
    }

    /* ==========================================================================
       5. Responsive Shutter Menu Toggle
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       6. Luxury Light Mode Sunset Theme Controller
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
            }
            localStorage.setItem('theme', theme);
        });
    }

    /* ==========================================================================
       7. Hero Typography Dynamic Subtitle Typist
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const categories = ['Eco-Luxury Safaris.', 'Private Jet Expeditions.', 'Isolated Sanctuary Outposts.', 'Exclusive Marine Passages.'];
    let arrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 120;

    function processTyping() {
        if (!typingSpan) return;

        const currentWord = categories[arrayIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            speed = 60;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            speed = 140;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            speed = 2200; // Pause at completion
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            arrayIndex = (arrayIndex + 1) % categories.length;
            speed = 400; // Pause before typing next word
        }

        setTimeout(processTyping, speed);
    }
    
    if (typingSpan) {
        processTyping();
    }

    /* ==========================================================================
       8. Stats Counter Dynamic Runner
       ========================================================================== */
    const counterElements = document.querySelectorAll('.stat-number');

    const triggerCounters = (counter) => {
        const targetValue = +counter.getAttribute('data-target');
        const incrementValue = targetValue / 70;
        
        const updateCount = () => {
            const currentValue = +counter.innerText;
            if (currentValue < targetValue) {
                counter.innerText = Math.ceil(currentValue + incrementValue);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = targetValue + '+';
            }
        };
        updateCount();
    };

    /* ==========================================================================
       9. High-performance Intersection Observer (Sweep Reveal)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal-sweeping');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Specific trigger for counters inside the viewport element
                const localCounters = entry.target.querySelectorAll('.stat-number');
                if (localCounters.length > 0) {
                    localCounters.forEach(counter => {
                        triggerCounters(counter);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    const statsBlock = document.querySelector('.stats-editorial');
    if (statsBlock) {
        revealObserver.observe(statsBlock);
    }

    /* ==========================================================================
       10. Active Interactive Form Selector Coordinates
       ========================================================================== */
    const destBtns = document.querySelectorAll('.dest-btn');
    const formMessageInput = document.getElementById('message');

    destBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            destBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const chosenDest = this.getAttribute('data-dest');
            
            // Dynamically alter text area to match selection
            formMessageInput.value = `I am interested in organizing a bespoke voyage to ${chosenDest} with GTS. Please supply seasonal availability options, chartered transport suggestions, and private accommodation details.`;
        });
    });

    /* ==========================================================================
       11. Back to Top Smooth Trigger
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       12. Form Submission Handler
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn-editorial');
            const feedbackBox = contactForm.querySelector('.form-feedback');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Processing Request...</span> <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                feedbackBox.classList.remove('hidden', 'success', 'error');
                feedbackBox.classList.add('success');
                feedbackBox.innerHTML = 'Voyage proposal initiated. Our luxury GTS desk will compile custom coordinates for you.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Submit Formal Inquiry</span> <i class="fas fa-paper-plane"></i>';
            }, 1800);
        });
    }
});
// GTS Travel Automated Photo Slideshow Runner (Self-Healing)
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slideshow-container .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // إظهار الصورة الأولى فوراً
    slides[0].classList.add('active');
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
});