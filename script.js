window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            navMenu?.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
        }
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
    }

    lastScroll = currentScroll;
});

const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2A9D8F;
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        font-family: 'Montserrat Alternates', sans-serif;
    `;
    notification.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    contactForm.reset();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.product-card, .advantage-card, .gallery-item-large, .gallery-item-small, ' +
    '.feature-item, .stat-item, .about-image, .about-content, ' +
    '.section-header, .contact-info, .contact-form, .partner-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

const animStyle = document.createElement('style');
animStyle.textContent = `
    .animate-in {
        animation: fastFadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }

    @keyframes fastFadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .hero-text {
        animation: fastFadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        opacity: 0;
    }

    .hero-image {
        animation: fastFadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        opacity: 0;
    }

    .floating-card {
        animation: fastFadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards, float 3s ease-in-out infinite 0.5s;
        opacity: 0;
    }
`;
document.head.appendChild(animStyle);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && scrolled < 600) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

document.querySelectorAll('.gallery-item-large, .gallery-item-small').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 10);

        lightbox.addEventListener('click', () => {
            lightbox.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.9)';
            setTimeout(() => lightbox.remove(), 300);
        });
    });
});

const animateCounter = (element, target, duration = 1500) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
