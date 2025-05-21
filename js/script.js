// Main JavaScript file - script.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize sticky header
    initializeStickyHeader();
    
    // Initialize smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Initialize contact form validation (if on contact page)
    if (document.getElementById('contact-form')) {
        initializeFormValidation();
    }
});

/**
 * Initialize the mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (mobileMenuBtn && navLinks) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Handle dropdown menus in mobile view
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function(e) {
                    // Only handle clicks in mobile view
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    }
                });
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize sticky header behavior
 */
function initializeStickyHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip dropdown toggles
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            // Only process actual anchors (not just #)
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const navLinks = document.getElementById('nav-links');
                    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                    
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Get header height for offset
                    const headerHeight = document.getElementById('header').offsetHeight;
                    
                    // Scroll to target with offset for header
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Initialize form validation for the contact form
 */
function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            // Reset previous error states
            requiredFields.forEach(field => {
                field.style.borderColor = '';
            });
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    emailField.style.borderColor = 'red';
                    isValid = false;
                }
            }
            
            // If valid, show success message (in a real implementation, this would submit the form data)
            if (isValid) {
                // Here you would typically send the form data to your server
                // For this demo, we'll just show a success message
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 30px 0;">
                        <h3 style="color: var(--accent-color); margin-bottom: 16px;">Thank You for Your Message!</h3>
                        <p>We have received your inquiry and will get back to you shortly.</p>
                    </div>
                `;
                
                // Scroll to top of form
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Animate elements when they come into view
 * Note: This is a bonus feature that adds subtle animations
 */
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Call this function if you add elements with the 'animate-on-scroll' class
// document.addEventListener('DOMContentLoaded', initializeScrollAnimations);