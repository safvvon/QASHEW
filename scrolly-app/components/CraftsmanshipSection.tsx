"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function CraftsmanshipSection() {
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
            const gsap = (window as any).gsap;

            gsap.fromTo('.craft-hero-text',
                { opacity: 0, y: 60, filter: "blur(10px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power4.out",
                    scrollTrigger: {
                        trigger: '.craft-section-wrapper',
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo('.craft-img-container img',
                { scale: 1.15, yPercent: -15 },
                {
                    scale: 1,
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.craft-img-container',
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                }
            );
        }
    }, []);

    return (
        <section id="craftsmanship" className="craft-section-wrapper py-32 md:py-48 px-6 min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-[#000000] to-[#050505] border-t border-[#D4AF37]/10 z-30 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center craft-hero-text relative z-10 opacity-0 mb-16 md:mb-24">
                    <p className="text-[#D4AF37] tracking-[0.4em] text-sm md:text-md font-semibold mb-6 uppercase drop-shadow-md">
                        The Process
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-8" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0px 4px 20px rgba(0,0,0,0.6)' }}>
                        Artisanal <span className="gold-gradient">Craftsmanship</span>.
                    </h2>
                    <div className="gold-underline mx-auto mb-10" style={{ width: '100px' }}></div>
                    <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/70 leading-relaxed font-light">
                        Hand-selected from the most prestigious orchards across the globe, our cashews undergo a meticulous roasting process honed over generations. Every batch is an expression of luxury.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch justify-center">

                    <div className="flex-1 glass-card craft-hero-text opacity-0 !p-8 md:!p-12 !text-left flex flex-col justify-center">
                        <div className="mb-10">
                            <h3 className="text-[#D4AF37] text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Precision Roasting</h3>
                            <p className="text-white/70 text-lg leading-relaxed font-light">
                                Our master roasters monitor temperature down to the exact degree, guaranteeing a perfect golden finish and a satisfying, crisp texture that resists gravity itself.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#D4AF37] text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Pure Ingredients</h3>
                            <p className="text-white/70 text-lg leading-relaxed font-light">
                                Enhanced solely with a dusting of Himalayan pink salt or exquisite black truffle, never obscuring the profound natural flavor of the ultimate cashew.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 w-full craft-img-container rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[rgba(212,175,55,0.2)] h-[400px] md:h-auto min-h-[500px] relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                        <img src="/cashew_macro_storytelling.png" alt="Craftsmanship macro cashew" className="w-full h-[130%] object-cover absolute top-[-15%] pointer-events-none" />
                        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20 pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
