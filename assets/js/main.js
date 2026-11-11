// Analytics: every interaction pushes a named event into the GTM dataLayer
function track(eventName, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
}

// Outbound links and in-page navigation (delegated, so the dynamically
// injected support button is covered too)
document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (!href || href === '#') return;

    var target;
    try {
        target = new URL(link.href, window.location.href);
    } catch (error) {
        return;
    }

    if (target.hostname !== window.location.hostname) {
        track('outbound_click', {
            link_url: target.href,
            link_domain: target.hostname,
            link_text: (link.textContent || '').trim().slice(0, 100)
        });
        return;
    }

    if (href.charAt(0) === '#') {
        var nav = link.closest('.index-nav, .sticky-nav, .footer-minimal-nav');
        if (!nav) return;
        var location = nav.classList.contains('index-nav') ? 'hero' :
            (nav.classList.contains('sticky-nav') ? 'sticky' : 'footer');
        track('nav_click', { section: href.slice(1) || 'top', nav_location: location });
    }
});

// Content engagement: report each pillar once it has been read
var seenSections = {};
if ('IntersectionObserver' in window) {
    var sectionViewObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.id;
            if (!id || seenSections[id]) return;
            seenSections[id] = true;
            track('section_view', { section: id });
            sectionViewObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('main section.pillar').forEach(function (section) {
        sectionViewObserver.observe(section);
    });
}

// Scroll depth milestones
var scrollMilestones = [25, 50, 75, 90];
var trackedMilestones = {};

function trackScrollDepth() {
    var docHeight = document.body.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    var percent = Math.round((window.scrollY / docHeight) * 100);
    scrollMilestones.forEach(function (milestone) {
        if (percent >= milestone && !trackedMilestones[milestone]) {
            trackedMilestones[milestone] = true;
            track('scroll_depth', { percent_scrolled: milestone });
        }
    });
}

// Scroll Reveal Animation (initialized first so content is never left hidden)
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

// Initialize Lucide icons (guard against a failed CDN load)
function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
}

refreshIcons();

// Lucide is deferred, so render the icons once it has executed
window.addEventListener('DOMContentLoaded', refreshIcons);

// Demo links: placeholder anchors should not jump to the top
document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
});

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

            track('install_command_copy', {
                copy_location: box.id === 'install' ? 'install_section' : 'hero'
            });
            
            // Store original icon name
            const originalIconName = iconElement.getAttribute('data-lucide') || 'copy';
            
            // Create temporary <i> tag for Lucide to replace
            const tempIcon = document.createElement('i');
            tempIcon.setAttribute('data-lucide', 'check');
            tempIcon.className = 'icon icon--small';
            iconElement.replaceWith(tempIcon);
            refreshIcons();
            
            setTimeout(() => {
                textSpan.innerText = originalText;
                this.classList.remove('copied');
                
                // Revert icon
                const currentIcon = this.querySelector('.icon');
                const revertIcon = document.createElement('i');
                revertIcon.setAttribute('data-lucide', originalIconName);
                revertIcon.className = 'icon icon--small';
                currentIcon.replaceWith(revertIcon);
                refreshIcons();
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
        refreshIcons();

        textSpan.textContent = 'Copied!';
        demoCopyBtn.classList.add('confirmed');

        track('demo_copy_click', { case_study: 'purposeful_animation' });

        setTimeout(() => {
            // Revert
            const copyIcon = document.createElement('i');
            copyIcon.setAttribute('data-lucide', 'copy');
            copyIcon.id = 'demo-copy-icon';
            copyIcon.className = 'icon icon--small';
            demoCopyBtn.querySelector('[data-lucide]').replaceWith(copyIcon);
            refreshIcons();

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
            setMenuState(false);
        }
    });
}, { threshold: 0.1 });

if (heroSection) {
    heroObserver.observe(heroSection);
}

// Mobile Nav Toggle Logic
function setMenuState(isOpen) {
    if (!navToggle || !stickyNavLinksContainer) return;
    stickyNavLinksContainer.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));

    const menuText = navToggle.querySelector('.menu-text');
    if (menuText) menuText.textContent = isOpen ? 'Close' : 'Menu';

    const icon = navToggle.querySelector('[data-lucide]');
    if (icon) {
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        newIcon.className = 'icon icon--small';
        icon.replaceWith(newIcon);
        refreshIcons();
    }
}

if (navToggle && stickyNavLinksContainer) {
    navToggle.addEventListener('click', () => {
        setMenuState(!stickyNavLinksContainer.classList.contains('is-open'));
    });

    // Close menu when a link is clicked
    stickyLinks.forEach(link => {
        link.addEventListener('click', () => setMenuState(false));
    });

    // Close menu with Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && stickyNavLinksContainer.classList.contains('is-open')) {
            setMenuState(false);
        }
    });
}

// Scroll spy: highlight active section and update mobile title
function updateScrollSpy() {
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
        if (isActive) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    if (activeSectionName && currentTitle) {
        activeSectionName.textContent = currentTitle;
    }
}

// Reading progress
const progressBar = document.getElementById('reading-progress');

function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
        updateScrollSpy();
        updateProgress();
        trackScrollDepth();
        scrollTicking = false;
    });
}, { passive: true });

updateScrollSpy();
updateProgress();

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');

function syncThemeToggle() {
    if (!themeToggle) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
}

syncThemeToggle();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        syncThemeToggle();
        track('theme_toggle', { theme: nextTheme });
    });
}
