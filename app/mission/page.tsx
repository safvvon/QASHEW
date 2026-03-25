"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./../legacy.css"; // Reuse existing styles for consistency

export default function MissionPage() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Basic scroll reveal initialization (simplified for this dedicated page)
        if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
            const gsap = (window as any).gsap;

            document.body.classList.remove('loading');
            document.body.classList.add('loaded');

            gsap.fromTo('.mission-hero-text',
                { opacity: 0, y: 40, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 2.2, ease: "power4.out", delay: 0.2 }
            );
        }
    }, []);

    return (
        <div className="bg-[#000000] min-h-screen text-white font-sans selection:bg-white/30 relative">
            {/* Simple Navbar for subpage */}
            <nav className="fixed top-0 w-full z-50 flex justify-between items-center py-4 px-8 md:px-12 bg-black border-b border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-b-3xl">
                <Link href="/" className="logo font-playfair text-[#D4AF37] tracking-[4px] hover:text-[#F3E5AB] transition">QASHEW</Link>
                <div
                    className={`hamburger flex flex-col gap-[6px] cursor-pointer z-[1001] ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className="line w-[30px] h-[2px] bg-[#D4AF37] transition-all"></div>
                    <div className="line w-[30px] h-[2px] bg-[#D4AF37] transition-all"></div>
                    <div className="line w-[30px] h-[2px] bg-[#D4AF37] transition-all"></div>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <div className="mobile-links">
                    <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link href="/mission" onClick={() => setMenuOpen(false)}>Mission</Link>
                    <Link href="/#craftsmanship" onClick={() => setMenuOpen(false)}>Craftsmanship</Link>
                    <Link href="/#products" onClick={() => setMenuOpen(false)}>Collection</Link>
                </div>
            </div>

            {/* Dedicated Mission Content */}
            <section className="pt-40 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center mission-hero-text relative z-10">
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

                    <div className="mt-16">
                        <Link href="/#products">
                            <button className="glass-button relative z-10 mx-auto">
                                Explore Collection
                                <span className="btn-glow"></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="luxury-footer relative z-10">
                <div className="logo large">QASHEW</div>
                <p>© 2026 Qashew Company. The Art of Premium Cashews.</p>
            </footer>
        </div>
    );
}
