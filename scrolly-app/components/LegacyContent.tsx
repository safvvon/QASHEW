"use client";

import { useEffect } from "react";

export default function LegacyContent() {
    useEffect(() => {
        // Ensure GSAP plugins are ready
        if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
            const gsap = (window as any).gsap;
            const ScrollTrigger = (window as any).ScrollTrigger;

            gsap.registerPlugin(ScrollTrigger);

            // High-End Hero Initial Animations (Luxury Fade & Float)
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
            gsap.utils.toArray('.parallax-img').forEach((container: any) => {
                const img = container.querySelector('img');
                if (img) {
                    gsap.fromTo(img,
                        { scale: 1.15, yPercent: -15 },
                        {
                            scale: 1,
                            yPercent: 15,
                            ease: "none",
                            scrollTrigger: {
                                trigger: container,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1.5
                            }
                        }
                    );
                }
            });
        }
    }, []);

    return (
        <div className="loaded relative z-20 bg-background text-white pb-32">


            {/* Product Showcase */}
            <section id="products" className="products-section scroll-reveal">
                <h2 className="section-title text-center">The <span className="gold-gradient">Collection</span></h2>
                <div className="gold-underline center-line"></div>

                <div className="product-scroll">
                    <div className="product-card glass-card">
                        <div className="card-glow"></div>
                        <div className="product-image-wrapper">
                            <img src="/cashew_jar_mockup.png" alt="Signature Gold Jar" className="product-jar" />
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">Signature Gold Jar</h3>
                            <p className="product-desc">Lightly salted with Himalayan pink salt, roasted to perfection.</p>
                        </div>
                        <div className="nutrition-hover">
                            <h4>Nutrition Profile</h4>
                            <ul>
                                <li><span className="nut-label">Protein:</span> 5g</li>
                                <li><span className="nut-label">Healthy Fats:</span> 12g</li>
                                <li><span className="nut-label">Carbs:</span> 9g</li>
                            </ul>
                        </div>
                    </div>

                    <div className="product-card glass-card">
                        <div className="card-glow"></div>
                        <div className="product-image-wrapper">
                            <img src="/cashew_luxury_box.png" alt="Emerald Reserve Box" className="product-jar" />
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">Emerald Reserve Box</h3>
                            <p className="product-desc">Truffle infused gourmet cashews in our premium gift packaging.</p>
                        </div>
                        <div className="nutrition-hover">
                            <h4>Nutrition Profile</h4>
                            <ul>
                                <li><span className="nut-label">Protein:</span> 5g</li>
                                <li><span className="nut-label">Healthy Fats:</span> 13g</li>
                                <li><span className="nut-label">Carbs:</span> 8g</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Replaced Global Presence Section by new GlobalPresence component logic */}

        </div >
    );
}
