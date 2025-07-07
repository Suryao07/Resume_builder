// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('darkModeToggle');
    const getStartedBtn = document.getElementById('getStartedBtn');

    // Theme Management
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        // Update icon based on current theme
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Get Started Button
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'resume-builder.html';
        });
    }
    
    // Mobile Enhancements
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile-specific enhancements
        document.documentElement.classList.add('mobile-device');
        
        // Improve touch targets for mobile
        const allButtons = document.querySelectorAll('button, .btn, .nav-link');
        allButtons.forEach(button => {
            button.classList.add('mobile-touch-target');
        });
        
        // Prevent zoom on input focus for iOS
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
        }
    }
});

// Animation Functions
function animateElement(element, animation) {
    element.classList.add('animated', animation);
    element.addEventListener('animationend', () => {
        element.classList.remove('animated', animation);
    });
} 