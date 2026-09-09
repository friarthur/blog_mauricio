// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const btnNav = document.querySelector('.btn-nav');

// Create overlay
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

if (btnNav) {
    btnNav.addEventListener('click', closeMenu);
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// MODALIDADES INTERACTION
// ============================================
const modalidadeBtns = document.querySelectorAll('.modalidade-btn');
const modalidadeDetails = document.querySelectorAll('.modalidade-detail');

modalidadeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.modalidade;
        
        // Update buttons
        modalidadeBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-expanded', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        
        // Update details
        modalidadeDetails.forEach(detail => {
            detail.classList.remove('active');
            if (detail.dataset.modalidade === target) {
                detail.classList.add('active');
            }
        });
    });
    
    // Keyboard navigation
    btn.addEventListener('keydown', (e) => {
        const btns = Array.from(modalidadeBtns);
        const currentIndex = btns.indexOf(btn);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % btns.length;
            btns[nextIndex].focus();
            btns[nextIndex].click();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + btns.length) % btns.length;
            btns[prevIndex].focus();
            btns[prevIndex].click();
        }
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const isActive = question.classList.contains('active');
        const answer = question.nextElementSibling;
        const answerId = question.getAttribute('aria-controls');
        const answerElement = document.getElementById(answerId);
        
        // Close all answers
        faqQuestions.forEach(q => {
            q.classList.remove('active');
            q.setAttribute('aria-expanded', 'false');
            const a = q.nextElementSibling;
            a.style.maxHeight = null;
        });
        
        // If was not active, open it
        if (!isActive) {
            question.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
    
    // Keyboard support
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealElements = document.querySelectorAll('.section, .beneficio-item, .depoimento-card, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// ============================================
// NAVBAR ACTIVE LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--color-text)';
                }
            });
        }
    });
}

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(updateActiveLink);
});

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Remove preloader if DOM ready before window load
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 1500);
    
    // Initial active link update
    updateActiveLink();
});