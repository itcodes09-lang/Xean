// =====================================================
// Main JavaScript for Pink Multimedia Portfolio
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initBackToTopButton();
    initNavigationHighlight();
    initSmoothScrolling();
});

// =====================================================
// Back to Top Button
// =====================================================

function initBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =====================================================
// Navigation Highlight on Scroll
// =====================================================

function initNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (navLinks.length === 0) return;

    // Get all sections (if they exist)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
}

// =====================================================
// Smooth Scrolling for Anchor Links
// =====================================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =====================================================
// Intersection Observer for Animation on Scroll
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and expertise items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .teaser-card, .floating-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
});

// =====================================================
// Mobile Menu Toggle (if needed)
// =====================================================

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Add mobile menu functionality here if needed
    // This can be extended for hamburger menu on mobile devices
}

// =====================================================
// Utility: Add scroll progress indicator
// =====================================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #FFB3D9, #FF85B4);
        z-index: 2000;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// =====================================================
// Solar System Calculator
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const earthYearsInput = document.getElementById('earth-years');
    const resultsDiv = document.getElementById('calculation-results');
    const resultsContent = document.getElementById('results-content');

    if (calculateBtn && earthYearsInput) {
        calculateBtn.addEventListener('click', calculateOrbitalData);
        earthYearsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateOrbitalData();
            }
        });
    }

    function calculateOrbitalData() {
        const earthYears = parseFloat(earthYearsInput.value);
        
        if (isNaN(earthYears) || earthYears <= 0) {
            alert('Please enter a valid number of Earth years');
            return;
        }

        const planets = [
            { name: 'Mercury', orbitalPeriod: 0.24, distanceFromSun: 57.9 },
            { name: 'Venus', orbitalPeriod: 0.615, distanceFromSun: 108.2 },
            { name: 'Earth', orbitalPeriod: 1, distanceFromSun: 149.6 },
            { name: 'Mars', orbitalPeriod: 1.88, distanceFromSun: 227.9 },
            { name: 'Jupiter', orbitalPeriod: 11.86, distanceFromSun: 778.5 },
            { name: 'Saturn', orbitalPeriod: 29.46, distanceFromSun: 1427 },
            { name: 'Uranus', orbitalPeriod: 84.01, distanceFromSun: 2871 },
            { name: 'Neptune', orbitalPeriod: 164.79, distanceFromSun: 4495 }
        ];

        let html = '';
        planets.forEach(planet => {
            const revolutions = (earthYears / planet.orbitalPeriod).toFixed(2);
            html += `
                <div class="result-item">
                    <strong>${planet.name}</strong><br>
                    Revolutions: ${revolutions}<br>
                    Days in Orbit: ${(planet.orbitalPeriod * 365.25).toFixed(0)}<br>
                    Distance from Sun: ${planet.distanceFromSun}M km
                </div>
            `;
        });

        resultsContent.innerHTML = html;
        resultsDiv.style.display = 'grid';
    }
});
