// Initialize AOS (Animate On Scroll) with enhanced settings
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// Enhanced scroll animations
function createScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Change hamburger icon
            const svg = mobileMenuButton.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                // Show hamburger icon
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                // Show close icon
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                // Reset hamburger icon
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                // Reset hamburger icon
                const svg = mobileMenuButton.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Account for fixed navbar height
            const navbarHeight = 64; // 4rem = 64px
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.classList.add('navbar-enhanced', 'scrolled');
        navbar.classList.remove('bg-white/95');
    } else {
        navbar.classList.remove('navbar-enhanced', 'scrolled');
        navbar.classList.add('bg-white/95');
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const rate = window.scrollY * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced counter animation with easing
function animateCounterEnhanced(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    function updateCounter() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            element.classList.add('stat-counter');
        }
    }
    
    updateCounter();
}

// Enhanced intersection observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounterEnhanced(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe elements with counters
document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// Enhanced form submission handling with better UX
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[action="process.php"]');
    if (contactForm) {
        // Add enhanced form styling
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.add('form-input-enhanced');
            
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateFormEnhanced(this)) {
                showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const originalHTML = submitButton.innerHTML;
            
            // Show enhanced loading state
            submitButton.innerHTML = '<div class="loading-spinner mr-2"></div>Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('opacity-75');
            
            // Simulate form submission (replace with actual PHP processing)
            setTimeout(() => {
                // Show success message with enhanced styling
                showNotificationEnhanced('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form with animation
                this.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                
                // Reset button with animation
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-75');
                submitButton.classList.add('bg-green-500');
                setTimeout(() => {
                    submitButton.classList.remove('bg-green-500');
                }, 2000);
            }, 2000);
        });
    }
});

// Enhanced form validation
function validateFormEnhanced(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const parent = input.parentElement;
        
        if (!input.value.trim()) {
            input.classList.add('border-red-500', 'shake-animation');
            parent.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('border-red-500', 'shake-animation');
            parent.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('border-red-500', 'shake-animation');
                parent.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Enhanced notification system
function showNotificationEnhanced(message, type = 'info') {
    // Create notification element with enhanced styling
    const notification = document.createElement('div');
    const iconClass = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    const bgClass = type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                   type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                   'bg-gradient-to-r from-blue-500 to-blue-600';
    
    notification.className = `fixed top-4 right-4 z-50 p-6 rounded-xl shadow-2xl transform translate-x-full transition-all duration-500 ${bgClass} text-white backdrop-blur-sm border border-white/20`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <i class="fas ${iconClass} text-2xl mr-4"></i>
            </div>
            <div class="flex-1">
                <p class="text-lg font-semibold">${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Info'}</p>
                <p class="text-white/90">${message}</p>
            </div>
            <button class="ml-4 text-white/70 hover:text-white transition-colors duration-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        <div class="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl overflow-hidden">
            <div class="h-full bg-white/50 animate-pulse"></div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in with bounce effect
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('animate-bounce');
        setTimeout(() => {
            notification.classList.remove('animate-bounce');
        }, 500);
    }, 100);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 6000);
}

// Enhanced notification system (backward compatibility)
function showNotification(message, type = 'info') {
    showNotificationEnhanced(message, type);
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counters
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe elements with counters
document.querySelectorAll('[data-target]').forEach(counter => {
    observer.observe(counter);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#home');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transform hover:scale-110 transition-all duration-200 opacity-0 pointer-events-none z-40';
    backToTop.id = 'back-to-top';
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTop.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
createBackToTopButton();

// Enhanced section interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add testimonial card effects
    const testimonialCards = document.querySelectorAll('.bg-white.rounded-2xl.p-8');
    testimonialCards.forEach(card => {
        card.classList.add('testimonial-card');
    });
    
    // Add team member card effects
    const teamMembers = document.querySelectorAll('.text-center.group');
    teamMembers.forEach(member => {
        member.classList.add('team-member-card');
    });
    
    // Add pricing card effects
    const pricingCards = document.querySelectorAll('.bg-white.rounded-2xl.p-8.shadow-lg');
    pricingCards.forEach((card, index) => {
        card.classList.add('pricing-card');
        if (index === 1) { // Professional plan
            card.classList.add('popular');
        }
    });
    
    // Add statistics section class
    const statsSection = document.querySelector('.bg-gradient-to-r.from-primary.to-purple-600');
    if (statsSection) {
        statsSection.classList.add('statistics-section');
    }
    
    // Enhanced pricing plan interactions
    const pricingButtons = document.querySelectorAll('.pricing-card button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planName = this.closest('.pricing-card').querySelector('h3').textContent;
            showNotificationEnhanced(`Thank you for your interest in the ${planName} plan! We'll contact you within 24 hours.`, 'success');
        });
    });
    
    // Enhanced testimonial interactions
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            const clientName = this.querySelector('h4').textContent;
            const clientCompany = this.querySelector('p').textContent;
            showNotificationEnhanced(`Client: ${clientName} from ${clientCompany}`, 'info');
        });
    });
    
    // Team member interactions
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberName = this.querySelector('h3').textContent;
            const memberRole = this.querySelector('p').textContent;
            showNotificationEnhanced(`${memberName} - ${memberRole}`, 'info');
        });
    });
    
    // Process step interactions
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const stepTitle = this.querySelector('h3').textContent;
            const stepNumber = index + 1;
            showNotificationEnhanced(`Step ${stepNumber}: ${stepTitle}`, 'info');
        });
    });
    
    // Feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('h3').textContent;
            showNotificationEnhanced(`Feature: ${featureTitle}`, 'info');
        });
    });
    
    // Blog card interactions
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('click', function() {
            const blogTitle = this.querySelector('h3').textContent;
            showNotificationEnhanced(`Blog: ${blogTitle}`, 'info');
        });
    });
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.scroll-animate-fade-in, .scroll-animate-slide-left, .scroll-animate-slide-right').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Enhanced floating elements
    const floatingElements = document.querySelectorAll('.absolute.top-20, .absolute.top-40, .absolute.bottom-40, .absolute.bottom-20');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
        el.classList.add('float-animation');
    });
    
    // Enhanced button effects
    const enhancedButtons = document.querySelectorAll('button, .btn-enhanced');
    enhancedButtons.forEach(button => {
        button.classList.add('btn-enhanced');
    });
    
    // Enhanced form inputs
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.classList.add('focus-enhanced');
    });
    
    // Enhanced card hover effects
    const allCards = document.querySelectorAll('.bg-white.rounded-2xl');
    allCards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Enhanced icon animations
    const icons = document.querySelectorAll('.fas, .fab');
    icons.forEach(icon => {
        icon.classList.add('hover-glow');
    });
    
    // Process step counter animation
    let processStepCounter = 0;
    const processNumbers = document.querySelectorAll('.process-number');
    processNumbers.forEach((number, index) => {
        setTimeout(() => {
            number.style.animation = 'pulse-glow-enhanced 2s ease-in-out infinite';
        }, index * 200);
    });
    
    // Feature icon rotation animation
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animation = 'float-slow 3s ease-in-out infinite';
        }, index * 300);
    });
    
    // Blog image parallax effect
    const blogImages = document.querySelectorAll('.blog-image');
    blogImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Enhanced statistics animation
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'slideInFromBottomEnhanced 0.8s ease-out';
        }, index * 200);
    });
    
    // Shimmer effect for loading states
    const shimmerElements = document.querySelectorAll('.shimmer-effect');
    shimmerElements.forEach(element => {
        element.classList.add('shimmer-effect');
    });
    
    // Enhanced text gradient animation
    const gradientTexts = document.querySelectorAll('.text-animate-gradient');
    gradientTexts.forEach(text => {
        text.classList.add('text-animate-gradient');
    });
    
    // Enhanced section dividers
    const sectionDividers = document.querySelectorAll('.section-divider-enhanced');
    sectionDividers.forEach(divider => {
        divider.classList.add('section-divider-enhanced');
    });
});

// Enhanced notification system
function showNotificationEnhanced(message, type = 'info') {
    const iconClass = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    const bgClass = type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                   type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                   'bg-gradient-to-r from-blue-500 to-blue-600';
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-6 rounded-xl shadow-2xl transform translate-x-full transition-all duration-500 ${bgClass} text-white backdrop-blur-sm border border-white/20`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <i class="fas ${iconClass} text-2xl mr-4"></i>
            </div>
            <div class="flex-1">
                <p class="text-lg font-semibold">${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Info'}</p>
                <p class="text-white/90">${message}</p>
            </div>
            <button class="ml-4 text-white/70 hover:text-white transition-colors duration-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        <div class="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl overflow-hidden">
            <div class="h-full bg-white/50 animate-pulse"></div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('animate-bounce');
        setTimeout(() => {
            notification.classList.remove('animate-bounce');
        }, 500);
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 6000);
}

// Ensure footer visibility
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'block';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
        footer.style.position = 'relative';
        footer.style.zIndex = '10';
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Add form validation to contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[action="process.php"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
});