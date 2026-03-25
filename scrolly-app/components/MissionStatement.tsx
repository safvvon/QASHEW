"use client";

import { useEffect } from "react";

export default function MissionStatement() {
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
            const gsap = (window as any).gsap;

            gsap.fromTo('.mission-hero-text',
                { opacity: 0, y: 60, filter: "blur(10px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power4.out",
                    scrollTrigger: {
                        trigger: '.mission-section-wrapper',
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    return (
        <section id="mission-page" className="mission-section-wrapper pt-32 pb-32 px-6 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#000000] z-30">


            <div className="max-w-4xl mx-auto text-center mission-hero-text relative z-10 opacity-0">
                <p className="text-[#D4AF37] tracking-[0.4em] text-sm md:text-md font-semibold mb-6 uppercase drop-shadow-md">
                    Our Mission
                </p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-10" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0px 4px 20px rgba(0,0,0,0.6)' }}>
                    A heritage of <span className="gold-gradient">excellence</span>.
                </h1>

                <div className="gold-underline mx-auto mb-10" style={{ width: '100px' }}></div>

                <div className="space-y-8 text-lg md:text-2xl text-white/70 leading-relaxed font-light text-left md:text-center mx-auto max-w-3xl">
                    <p>
                        To redefine the standard of luxury snacking through uncompromising quality, sustainable sourcing, and artisanal craftsmanship. We believe that true quality originates from nature and is perfected by passion.
                    </p>
                    <p>
                        Every pristine cashew we select is a testament to our dedication—delivering an anti-gravity experience of flavor that elevates expectations and leaves a lasting impression of absolute excellence.
                    </p>
                    <p className="pt-8 text-[#D4AF37] italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                        "Because Quality Is Our Signature."
                    </p>
                </div>
            </div>
        </section>
    );
}
