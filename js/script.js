// ===== SOCIALNITI ENHANCED WEBSITE JAVASCRIPT =====

// ===== GLOBAL VARIABLES =====
let isScrolling = false;
let animationObserver;
let counterObserver;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== MAIN INITIALIZATION =====
function initializeWebsite() {
    // Initialize all features
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initProgressBars();
    initParallaxEffects();
    initFormValidation();
    initTooltips();
    initLazyLoading();
    
    // Initialize enhanced features
    initHeroAnimations();
    initServiceCardEffects();
    initPackageCardEffects();
    initReviewCardEffects();
    initFooterAnimations();
    
    console.log('SocialNiti website initialized successfully!');
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on nav links
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .scale-in');
    
    if ('IntersectionObserver' in window) {
        animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add staggered animation for multiple elements
                    const delay = entry.target.style.animationDelay || '0s';
                    entry.target.style.animationDelay = delay;
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    if ('IntersectionObserver' in window) {
        counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// ===== PROGRESS BARS =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .progress-line');
    
    if ('IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 500);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-bg-elements, .services-bg-elements, .reviews-bg-elements, .footer-bg-elements');
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach(element => {
                    element.style.transform = `translateY(${rate}px)`;
                });
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formFields = form.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            // Clear previous errors
            form.querySelectorAll('.error-message').forEach(error => error.remove());
            formFields.forEach(field => field.classList.remove('error'));
            
            // Validate each field
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    showFieldError(field, 'This field is required');
                    isValid = false;
                }
                
                if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
                
                if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
                    showFieldError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show success message
                showSuccessMessage(form, 'Thank you! Your message has been sent successfully.');
                form.reset();
            }
        });
    });
}

// ===== FORM VALIDATION HELPERS =====
function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ===== TOOLTIPS =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-card, .hero-stats, .hero-cta');
    
    // Staggered animation for hero elements
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Floating animation for hero background elements
    const heroShapes = document.querySelectorAll('.hero-bg-shape');
    heroShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 2}s`;
    });
}

// ===== SERVICE CARD EFFECTS =====
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card-enhanced, .service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
}

// ===== PACKAGE CARD EFFECTS =====
function initPackageCardEffects() {
    const packageCards = document.querySelectorAll('.package-card-enhanced, .package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.1)';
        });
    });
}

// ===== REVIEW CARD EFFECTS =====
function initReviewCardEffects() {
    const reviewCards = document.querySelectorAll('.review-card-enhanced, .review-card');
    
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle rotation
            this.style.transform = 'translateY(-8px) rotateY(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
}

// ===== FOOTER ANIMATIONS =====
function initFooterAnimations() {
    const footerElements = document.querySelectorAll('.footer-brand-enhanced, .footer-column-enhanced, .footer-stats');
    
    // Staggered animation for footer elements
    footerElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== UTILITY FUNCTIONS =====
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== CLEANUP ON PAGE UNLOAD =====
window.addEventListener('beforeunload', function() {
    if (animationObserver) {
        animationObserver.disconnect();
    }
    if (counterObserver) {
        counterObserver.disconnect();
    }
});

// ===== INITIALIZE SCROLL TO TOP =====
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// ===== CONSOLE BRANDING =====
console.log('%c🚀 SocialNiti Website', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cDigital Marketing & Web Development Agency', 'color: #666; font-size: 14px;');
console.log('%cWebsite developed with ❤️ by SocialNiti', 'color: #FF6B35; font-size: 12px;');
