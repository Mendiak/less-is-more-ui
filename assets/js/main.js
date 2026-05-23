// Initialize Lucide icons
lucide.createIcons();

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', function() {
        const box = this.closest('.installation-box');
        const code = box.querySelector('code').innerText;
        const textSpan = this.querySelector('.button-text');
        const iconElement = this.querySelector('.icon');
        
        navigator.clipboard.writeText(code).then(() => {
            const originalText = textSpan.innerText;
            textSpan.innerText = 'Copied';
            this.classList.add('copied');
            
            // Store original icon name
            const originalIconName = iconElement.getAttribute('data-lucide') || 'copy';
            
            // Create temporary <i> tag for Lucide to replace
            const tempIcon = document.createElement('i');
            tempIcon.setAttribute('data-lucide', 'check');
            tempIcon.className = 'icon icon--small';
            iconElement.replaceWith(tempIcon);
            lucide.createIcons();
            
            setTimeout(() => {
                textSpan.innerText = originalText;
                this.classList.remove('copied');
                
                // Revert icon
                const currentIcon = this.querySelector('.icon');
                const revertIcon = document.createElement('i');
                revertIcon.setAttribute('data-lucide', originalIconName);
                revertIcon.className = 'icon icon--small';
                currentIcon.replaceWith(revertIcon);
                lucide.createIcons();
            }, 2000);
        });
    });
});

// Demo: Purposeful Animation (Case Study 06)
const demoCopyBtn = document.getElementById('demo-copy-btn');
if (demoCopyBtn) {
    demoCopyBtn.addEventListener('click', function() {
        const textSpan = document.getElementById('demo-copy-text');
        const iconEl = document.getElementById('demo-copy-icon');

        // Swap icon to check
        const checkIcon = document.createElement('i');
        checkIcon.setAttribute('data-lucide', 'check');
        checkIcon.className = 'icon icon--small';
        iconEl.replaceWith(checkIcon);
        lucide.createIcons();

        textSpan.textContent = 'Copied!';
        demoCopyBtn.classList.add('confirmed');

        setTimeout(() => {
            // Revert
            const copyIcon = document.createElement('i');
            copyIcon.setAttribute('data-lucide', 'copy');
            copyIcon.id = 'demo-copy-icon';
            copyIcon.className = 'icon icon--small';
            demoCopyBtn.querySelector('[data-lucide]').replaceWith(copyIcon);
            lucide.createIcons();

            textSpan.textContent = 'Copy Command';
            demoCopyBtn.classList.remove('confirmed');
        }, 2000);
    });
}

// Sticky Navigation
const stickyNav = document.getElementById('sticky-nav');
const stickyNavLinksContainer = document.getElementById('sticky-nav-links');
const navToggle = document.getElementById('nav-toggle');
const activeSectionName = document.getElementById('active-section-name');
const heroSection = document.querySelector('header.hero');
const pillars = document.querySelectorAll('.pillar');
const stickyLinks = document.querySelectorAll('.sticky-nav-link');

// Show/hide sticky nav based on hero visibility
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            stickyNav.classList.add('is-visible');
        } else {
            stickyNav.classList.remove('is-visible');
            // Close mobile menu if hero is visible again
            if (stickyNavLinksContainer) {
                stickyNavLinksContainer.classList.remove('is-open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        }
    });
}, { threshold: 0.1 });

if (heroSection) {
    heroObserver.observe(heroSection);
}

// Mobile Nav Toggle Logic
if (navToggle && stickyNavLinksContainer) {
    navToggle.addEventListener('click', () => {
        const isOpen = stickyNavLinksContainer.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
        
        // Change icon based on state
        const icon = navToggle.querySelector('[data-lucide]');
        if (icon) {
            const newIconName = isOpen ? 'x' : 'menu';
            const newIcon = document.createElement('i');
            newIcon.setAttribute('data-lucide', newIconName);
            newIcon.className = 'icon icon--small';
            icon.replaceWith(newIcon);
            lucide.createIcons();
        }
    });

    // Close menu when a link is clicked
    stickyLinks.forEach(link => {
        link.addEventListener('click', () => {
            stickyNavLinksContainer.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            const icon = navToggle.querySelector('[data-lucide]');
            if (icon && icon.getAttribute('data-lucide') === 'x') {
                const menuIcon = document.createElement('i');
                menuIcon.setAttribute('data-lucide', 'menu');
                menuIcon.className = 'icon icon--small';
                icon.replaceWith(menuIcon);
                lucide.createIcons();
            }
        });
    });
}

// Scroll spy: highlight active section and update mobile title
window.addEventListener('scroll', () => {
    let current = '';
    let currentTitle = '';
    
    pillars.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 120)) {
            current = section.getAttribute('id');
            currentTitle = section.querySelector('h2')?.textContent || '';
        }
    });

    stickyLinks.forEach(link => {
        const isActive = link.dataset.section === current;
        link.classList.toggle('is-active', isActive);
    });

    if (activeSectionName && currentTitle) {
        activeSectionName.textContent = currentTitle;
    }
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.05
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.pillar, .designer-profile, .comparison-item, .surface-subtle').forEach((el) => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else if (theme === 'light') {
            theme = 'dark';
        } else {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Reading Progress Bar Logic
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.width = `${scrollPercent * 100}%`;
    });
}
