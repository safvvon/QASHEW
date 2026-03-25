"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { useSpring, motion, AnimatePresence } from "framer-motion";

// Ensure locations match prompt requirements
const LOCATION_DATA = [
    {
        name: "Ghana",
        role: "Origin",
        lat: 7.9465,
        lng: -1.0232,
        desc: {
            title: "Procurement",
            text: "Direct sourcing from farmers and aggregators, quality inspection and grading, bulk purchasing and warehousing."
        },
        bg: "radial-gradient(ellipse at center, rgba(30,22,15,0.8) 0%, rgba(5,5,5,1) 100%)"
    },
    {
        name: "Ivory Coast",
        role: "Origin",
        lat: 7.5400,
        lng: -5.5471,
        desc: {
            title: "Procurement",
            text: "Sourcing premium raw nuts in Côte d’Ivoire, engaging directly with agricultural cooperatives on sustainable terms."
        },
        bg: "radial-gradient(ellipse at center, rgba(15,22,30,0.8) 0%, rgba(5,5,5,1) 100%)"
    },
    {
        name: "Burkina Faso",
        role: "Origin",
        lat: 12.2383,
        lng: -1.5616,
        desc: {
            title: "Procurement",
            text: "Establishing long-term supplier relationships in robust farming regions to ensure consistent ethical yields."
        },
        bg: "radial-gradient(ellipse at center, rgba(30,15,15,0.8) 0%, rgba(5,5,5,1) 100%)"
    },
    {
        name: "India",
        role: "Processing Hub",
        lat: 20.5937,
        lng: 78.9629,
        desc: {
            title: "Processing",
            text: "Cleaning, steaming, shelling, drying, grading, and premium packaging engineered for absolute perfection."
        },
        bg: "radial-gradient(ellipse at center, rgba(30,25,10,0.8) 0%, rgba(5,5,5,1) 100%)"
    },
    {
        name: "Indonesia",
        role: "Trade Network",
        lat: -0.7893,
        lng: 113.9213,
        desc: {
            title: "International Trading",
            text: "Import and export of raw cashew nuts and kernels with strong global supply chain partnerships."
        },
        bg: "radial-gradient(ellipse at center, rgba(15,30,20,0.8) 0%, rgba(5,5,5,1) 100%)"
    },
    {
        name: "Vietnam",
        role: "Processing Hub",
        lat: 14.0583,
        lng: 108.2772,
        desc: {
            title: "Advanced Processing",
            text: "High-tech processing facilities pushing the boundaries of automated cashew shelling and premium grading."
        },
        bg: "radial-gradient(ellipse at center, rgba(20,25,30,0.8) 0%, rgba(5,5,5,1) 100%)"
    }
];

const KEY_VALUES = [
    "Premium Quality",
    "Transparent Trade Practices",
    "Long-Term Supplier Relationships",
    "International Compliance",
    "Sustainable Sourcing"
];

// Helper to convert lat/lng to phi/theta approximation for focusing Cobe
const locationToAngles = (lat: number, lng: number) => {
    return {
        phi: (lng - 90) * (Math.PI / 180),
        theta: -(lat * (Math.PI / 180)),
    };
};

export default function GlobalPresence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [isInteracting, setIsInteracting] = useState(false);
    const isInteractingRef = useRef(false);
    const pointerPos = useRef<{ x: number, y: number } | null>(null);

    // Physics springs for centering the globe
    const phi = useSpring(0, { stiffness: 40, damping: 20 });
    const theta = useSpring(0, { stiffness: 40, damping: 20 });
    const activeIndexRef = useRef(activeIndex);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        isInteractingRef.current = isInteracting;
    }, [isInteracting]);

    useEffect(() => {
        if (isInteracting) return; // Pause auto-cycle while user drags
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % LOCATION_DATA.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isInteracting]);

    useEffect(() => {
        if (isInteractingRef.current) return; // Don't force auto-center if user is actively dragging
        const target = locationToAngles(LOCATION_DATA[activeIndex].lat, LOCATION_DATA[activeIndex].lng);
        phi.set(target.phi - 0.5);
        theta.set(target.theta);
    }, [activeIndex, phi, theta]);

    useEffect(() => {
        let currentPhi = 0;
        let currentTheta = 0;

        const unsubPhi = phi.onChange((v) => currentPhi = v);
        const unsubTheta = theta.onChange((v) => currentTheta = v);

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000,
            height: 1000,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.0,
            mapSamples: 16000,
            mapBrightness: 5,
            baseColor: [0.16, 0.12, 0.08],
            markerColor: [0.83, 0.68, 0.21],
            glowColor: [0.2, 0.15, 0.1],
            opacity: 0.95,
            markers: LOCATION_DATA.map((loc, i) => ({
                location: [loc.lat, loc.lng] as [number, number],
                size: i === activeIndex ? 0.12 : 0.06
            })),
            onRender: (state) => {
                // Add tiny constant rotation to keep it alive
                state.phi = currentPhi + (performance.now() * 0.00005);
                state.theta = currentTheta;
                
                // Dynamically update markers if the active index changed
                if ((state as any).__lastIndex !== activeIndexRef.current) {
                    (state as any).markers = LOCATION_DATA.map((loc, i) => ({
                        location: [loc.lat, loc.lng] as [number, number],
                        size: i === activeIndexRef.current ? 0.12 : 0.06
                    }));
                    (state as any).__lastIndex = activeIndexRef.current;
                }
            },
        });

        return () => {
            globe.destroy();
            unsubPhi();
            unsubTheta();
        };
    }, [phi, theta]); // Removed activeIndex from dependencies to prevent WebGL context exhaustion

    const activeLoc = LOCATION_DATA[activeIndex];

    return (
        <section id="export" className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-center py-20 z-30 border-t border-[#D4AF37]/20">
            {/* Soft Ambient Particles and Thematic Background */}
            <motion.div
                className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
                style={{ background: activeLoc.bg }}
            />

            {/* Abstract Background Imagery overlayed subtly removed as requested */}

            {/* Directed Trade Routes: Narrow golden arrows pointing from origins towards processing hubs (India & Vietnam) */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 mix-blend-screen" preserveAspectRatio="none">
                <defs>
                    {/* Golden Arrowhead Marker */}
                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                        <polygon points="0 0, 6 3, 0 6" fill="#D4AF37" opacity="0.8" />
                    </marker>
                    {/* Fading Tail Gradient */}
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                        <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Arrow 1: West Africa to India Hub */}
                <motion.path
                    d="M -100 600 Q 400 300 850 450"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop", repeatDelay: 1 }}
                />

                {/* Arrow 2: West Africa to Vietnam Hub */}
                <motion.path
                    d="M -50 750 Q 500 450 1100 550"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 4.5, delay: 1, repeat: Infinity, ease: "easeInOut", repeatType: "loop", repeatDelay: 0.5 }}
                />

                {/* Arrow 3: Indonesia to India Hub */}
                <motion.path
                    d="M 1500 800 Q 1100 700 850 450"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop", repeatDelay: 1.5 }}
                />

                {/* Arrow 4: Indonesia to Vietnam Hub */}
                <motion.path
                    d="M 1400 650 Q 1200 600 1100 550"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop", repeatDelay: 2 }}
                />
            </svg>

            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center relative z-10 h-full">

                {/* Left Side: Dynamic Information Panel */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center pt-10 lg:pt-0 pointer-events-none">
                    <p className="text-[#D4AF37] tracking-[0.4em] text-sm md:text-md font-semibold mb-6 uppercase drop-shadow-md">
                        Global Presence
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-12" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0px 4px 20px rgba(0,0,0,0.6)' }}>
                        Connecting <br /><span className="gold-gradient">The World</span>.
                    </h2>

                    {/* Animated Description Card */}
                    <div className="h-[280px] w-full max-w-lg relative pointer-events-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0 glass-card !p-8 border border-[#D4AF37]/20 rounded-2xl flex flex-col justify-center bg-[#140F0A]/60"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] animate-pulse"></div>
                                    <h3 className="text-xl md:text-2xl text-white font-semibold uppercase tracking-widest">{activeLoc.name}</h3>
                                </div>
                                <p className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase mb-4">{activeLoc.desc.title}</p>
                                <p className="text-white/70 text-lg leading-relaxed font-light">{activeLoc.desc.text}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: The 3D Globe */}
                <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[350px] lg:min-h-[500px] mt-12 lg:mt-0 relative">
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/5 blur-[120px] mix-blend-screen pointer-events-none"></div>
                    <canvas
                        ref={canvasRef}
                        className="mx-auto max-w-[260px] sm:max-w-[300px] md:max-w-[450px] lg:max-w-[600px]"
                        style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "1/1",
                            filter: "drop-shadow(0px 30px 40px rgba(0,0,0,0.8))",
                            cursor: isInteracting ? "grabbing" : "grab",
                            touchAction: "none"
                        }}
                        onPointerDown={(e) => {
                            setIsInteracting(true);
                            pointerPos.current = { x: e.clientX, y: e.clientY };
                        }}
                        onPointerUp={() => {
                            setIsInteracting(false);
                            pointerPos.current = null;
                        }}
                        onPointerOut={() => {
                            setIsInteracting(false);
                            pointerPos.current = null;
                        }}
                        onPointerMove={(e) => {
                            if (isInteracting && pointerPos.current) {
                                const deltaX = e.clientX - pointerPos.current.x;
                                const deltaY = e.clientY - pointerPos.current.y;
                                pointerPos.current = { x: e.clientX, y: e.clientY };

                                // Restored 360-degree high sensitivity rotation
                                phi.set(phi.get() + deltaX * 0.015);
                                theta.set(theta.get() + deltaY * 0.015);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Bottom: Animated Core Values */}
            <div className="w-full max-w-7xl mx-auto px-6 mt-20 relative z-10 border-t border-[#D4AF37]/10 pt-10">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-90">
                    {KEY_VALUES.map((val, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.15 }}
                            className="text-white/60 text-xs md:text-sm tracking-[0.2em] font-medium uppercase px-4 py-2 rounded-full border border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors cursor-default"
                        >
                            {val}
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
