document.addEventListener('DOMContentLoaded', () => {
    // Handle loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate stats when they come into view
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat .number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.match(/\D/g)?.join('') || '';
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const step = duration / 50;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCounter, step);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate stats when hero section comes into view
                if (entry.target.id === 'hero') {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all animated elements
    document.querySelectorAll('.step, .feature, .testimonial, #hero').forEach((el) => {
        observer.observe(el);
    });

    // Mobile Navigation
    const header = document.querySelector('header');
    const navLinks = document.querySelector('.nav-links');
    
    // Create and append menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    header.insertBefore(menuToggle, navLinks);

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Form submission handling with enhanced feedback
    const form = document.getElementById('rental-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your interest!</h3>
            <p>We'll contact you shortly to discuss your robot rental.</p>
        `;
        
        // Replace form with success message
        form.style.opacity = '0';
        setTimeout(() => {
            form.parentElement.appendChild(successMessage);
            form.style.display = 'none';
            successMessage.style.opacity = '1';
        }, 300);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});
