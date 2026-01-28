// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== NAVBAR ACTIVE SECTION HIGHLIGHT ==========
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    }
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // ========== FORM VALIDATION ==========
    const form = document.getElementById('messageForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = '#ff6b6b';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#ff6b6b';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#2d2d44';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = '#ff6b6b';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#ff6b6b';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#2d2d44';
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageError.textContent = 'Message is required';
            messageInput.style.borderColor = '#ff6b6b';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#ff6b6b';
            return false;
        } else {
            messageError.textContent = '';
            messageInput.style.borderColor = '#2d2d44';
            return true;
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message and reset the form
            
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            
            // Reset border colors
            nameInput.style.borderColor = '#2d2d44';
            emailInput.style.borderColor = '#2d2d44';
            messageInput.style.borderColor = '#2d2d44';
        } else {
            // Scroll to first error
            if (!isNameValid) {
                nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!isEmailValid) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!isMessageValid) {
                messageInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // ========== ANIMATIONS ON SCROLL ==========
    // Simple animation for elements when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .review-card');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check scroll on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // ========== ACTIVE NAV LINK STYLE ==========
    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--yellow) !important;
            background-color: rgba(255, 215, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
});