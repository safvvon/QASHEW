document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Canvas Image Sequence Setup
    const canvas = document.getElementById("hero-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const frameCount = 192;
    const images = new Array(frameCount);
    const sequence = { frame: 0 };

    // Load first frame immediately to prevent long loading times
    const firstImg = new Image();
    firstImg.src = `./ezgif-frame-001.jpg`;
    images[0] = firstImg;

    firstImg.onload = () => {
        // Show the page as soon as the first frame is ready
        render(0);
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        initAnimation();

        // Load the rest of the images asynchronously in the background
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            const paddedIndex = (i + 1).toString().padStart(3, '0');
            img.src = `./ezgif-frame-${paddedIndex}.jpg`;
            images[i] = img;

            // If the user scrolls to a frame that just finished loading, render it
            img.onload = () => {
                if (Math.round(sequence.frame) === i) {
                    render(i);
                }
            };
        }
    };

    function render(index) {
        if (!images[index] || !images[index].complete) return;
        const img = images[index];

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) { // Cover
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        } else {
            drawHeight = drawWidth / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function initAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        tl.to(sequence, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            onUpdate: () => render(Math.round(sequence.frame))
        }, 0);

        // Text Animations
        tl.to('.hero-text-1', { opacity: 0, y: -50, duration: 0.1 }, 0);
        tl.fromTo('.hero-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.2);
        tl.to('.hero-text-2', { opacity: 0, y: -50, duration: 0.1 }, 0.4);
        tl.fromTo('.hero-text-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 }, 0.5);
        tl.to('.hero-text-3', { opacity: 0, y: -50, duration: 0.1 }, 0.7);
        tl.fromTo('.hero-text-4', { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 0.1,
            onStart: () => document.querySelector('.navbar').classList.add('visible'),
            onReverseComplete: () => document.querySelector('.navbar').classList.remove('visible')
        }, 0.8);
    }

    // Custom Cursor
    const cursor = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .glass-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover-glow'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover-glow'));
    });

    // (Navbar logic moved into main GSAP timeline - triggers when QASHEW COMPANY shows)

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    hamburger.addEventListener('click', () => {
        const isActive = mobileMenu.classList.contains('active');
        if (isActive) {
            mobileMenu.classList.remove('active');
        } else {
            mobileMenu.classList.add('active');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Scroll Reveal Animations
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach(reveal => {
        gsap.to(reveal, {
            scrollTrigger: {
                trigger: reveal,
                start: "top 80%",
                toggleClass: "visible",
                once: true
            }
        });
    });

    // Parallax Img
    gsap.utils.toArray('.parallax-img').forEach(container => {
        const img = container.querySelector('img');
        gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

});
