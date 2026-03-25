document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // High-End Hero Initial Animations (Luxury Fade & Float)
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');

            gsap.fromTo('.hero-title',
                { opacity: 0, y: 40, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.2, ease: "power4.out", delay: 0.5 }
            );
            gsap.fromTo('.cta-button',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.8, ease: "power3.out", delay: 1.2 }
            );
        }, 800);
    });

    // Custom Cursor
    const cursor = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: "power2.out" // smooth trailing cursor
        });
    });

    const hoverElements = document.querySelectorAll('a, button, .glass-card, .product-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover-glow'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover-glow'));
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            if (mobileMenu.classList.contains('active')) {
                gsap.fromTo('.mobile-links a',
                    { y: 30, opacity: 0, filter: "blur(5px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 }
                );
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Cinematic Scroll Reveals (Blur-to-Clear with gentle float)
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(reveal => {
        gsap.fromTo(reveal,
            { opacity: 0, y: 80, filter: "blur(15px)", scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 2.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: reveal,
                    start: "top 85%", // Triggers slightly earlier
                    toggleActions: "play none none reverse" // Allows replay if scrolled back far
                }
            }
        );
    });

    // Advanced 3D Parallax with Scaling
    gsap.utils.toArray('.parallax-img').forEach(container => {
        const img = container.querySelector('img');
        gsap.fromTo(img,
            { scale: 1.15, yPercent: -15 }, // Start slightly zoomed and offset
            {
                scale: 1, // Settles in
                yPercent: 15, // Moves opposite to scroll for depth
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5 // 1.5 adds that smooth buttery lag to the parallax
                }
            }
        );
    });

});
