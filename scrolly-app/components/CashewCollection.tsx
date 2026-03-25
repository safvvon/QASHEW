"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const FloatingParticle = ({ size, delay, duration, xStart, xEnd }: any) => {
    return (
        <motion.div
            className="absolute rounded-full bg-[#D4AF37] mix-blend-screen pointer-events-none"
            style={{ width: size, height: size, filter: "blur(2px)" }}
            initial={{ opacity: 0, y: "100%", x: xStart }}
            animate={{
                opacity: [0, 0.8, 0],
                y: "-10%",
                x: [xStart, xEnd, xStart]
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default function CashewCollection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
    const yFloat = useTransform(smoothScroll, [0, 1], [100, -100]);
    const rotateFloat = useTransform(smoothScroll, [0, 1], [0, 15]);

    return (
        <div ref={containerRef} id="products" className="relative w-full bg-[#050505] text-white py-32 overflow-hidden flex flex-col items-center">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Antigravity Golden Particles */}
            {[...Array(20)].map((_, i) => (
                <FloatingParticle
                    key={i}
                    size={Math.random() * 4 + 2}
                    delay={Math.random() * 5}
                    duration={Math.random() * 10 + 10}
                    xStart={`${Math.random() * 100}%`}
                    xEnd={`${Math.random() * 100}%`}
                />
            ))}

            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center mb-32 relative z-10"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                    Cashew Quality & <span className="gold-gradient">Grade Collection</span>
                </h2>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
            </motion.div>

            {/* Section 1 - RCN Quality Parameters */}
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-40">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-3xl font-semibold text-[#D4AF37] tracking-widest uppercase mb-4">RCN Quality Parameters</h3>
                    <p className="text-lg text-white/70 font-light max-w-2xl mx-auto mb-16">Higher outturn means better processing recovery and higher profit margin.</p>

                    {/* Antigravity Rotating Center Raw Cashew */}
                    <motion.div
                        animate={{ y: [-15, 15, -15], rotate: [0, 10, -5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 flex justify-center items-center"
                    >
                        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-[60px] animate-pulse"></div>
                        <img src="/raw_single_cashew.png?v=3" alt="Raw Cashew Nut" className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Orbiting Glassmorphism Cards */}
                    {[
                        { title: "Outturn (lbs/80kg)", items: ["48–50 lbs – Medium", "50–52 lbs – Good", "52–54 lbs – Premium"] },
                        { title: "Moisture Content", items: ["Ideal Range: 8–10%", "Above 12% increases fungus risk"] },
                        { title: "Nut Count (per kg)", items: ["180–190 – Large Nuts", "200–210 – Medium Nuts", "220+ – Small Nuts"] },
                        { title: "Defects (Below 10%)", items: ["Immature & Moldy", "Shrivelled Nuts", "Insect Damage"] },
                        { title: "Dryness Indicators", items: ["Nuts rattle when shaken", "No damp smell", "Properly stored"] }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.15 }}
                            whileHover={{ y: -10, transition: { duration: 0.4 } }}
                            className="glass-card relative border border-[#D4AF37]/20 p-8 rounded-2xl bg-[#ffffff]/[0.02] backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <h4 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">{card.title}</h4>
                            <ul className="space-y-3">
                                {card.items.map((item, i) => (
                                    <li key={i} className="flex items-center text-white/80 font-light">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-3 shadow-[0_0_5px_#D4AF37]"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Section 2 - Processed Cashew Kernel Grades */}
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mb-40">
                {/* Antigravity Falling Real Cashews */}
                {[...Array(8)].map((_, i) => {
                    const size = Math.random() * 50 + 40; // 40px to 90px
                    const isBlurred = Math.random() > 0.6; // Create depth of field
                    return (
                        <motion.div
                            key={i}
                            className="absolute pointer-events-none z-0"
                            style={{
                                width: size,
                                height: size,
                                left: `${Math.random() * 90 + 5}%`,
                                filter: `drop-shadow(0px 10px 15px rgba(0,0,0,0.6)) blur(${isBlurred ? '3px' : '0px'})`
                            }}
                            initial={{ top: "-15%", rotate: Math.random() * 360 }}
                            animate={{ 
                                top: "115%", 
                                rotate: Math.random() * 360 + 360, 
                                x: Math.random() * 100 - 50 
                            }}
                            transition={{ 
                                duration: Math.random() * 15 + 12, 
                                repeat: Infinity, 
                                ease: "linear", 
                                delay: Math.random() * 8 
                            }}
                        >
                            <img 
                                src="/raw_single_cashew.png?v=3" 
                                alt="Falling Cashew" 
                                className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" 
                            />
                        </motion.div>
                    );
                })}


                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative z-10"
                >
                    <h3 className="text-3xl font-semibold text-[#D4AF37] tracking-widest uppercase mb-4">Processed Kernel Grades</h3>
                    <p className="text-lg text-white/70 font-light">Premium golden categories strictly sorted for global standards.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Grade Panels */}
                    {[
                        { title: "Whole Grades", grades: ["W180 – Very Large (Premium)", "W210 – Large", "W240 – Good Large", "W320 – Most Traded", "W450 – Small Size"] },
                        { title: "Broken Grades", grades: ["WS – White Splits", "B – Butts", "LWP – Large Pieces", "SWP – Small Pieces", "BB – Baby Bits"] },
                        { title: "Colour Grades", grades: ["WW – White Wholes (Best)", "SW – Scorched Wholes", "SSW – Slightly Scorched", "DW – Dessert Wholes"] }
                    ].map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className="relative border-l border-[#D4AF37]/30 pl-8 py-4"
                        >
                            <h4 className="text-2xl font-bold text-white mb-8 tracking-widest">{category.title}</h4>
                            <div className="space-y-6">
                                {category.grades.map((grade, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="flex items-center group cursor-default"
                                    >
                                        <div className="text-[#D4AF37] font-semibold text-lg w-16 group-hover:scale-110 transition-transform">{grade.split(" – ")[0]}</div>
                                        <div className="text-white/60 group-hover:text-white transition-colors">{grade.split(" – ")[1]}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Section 3 - Processing Insight & Final Visual */}
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative py-24 border-t border-b border-[#D4AF37]/20"
                >
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Good Quality RCN (52+ lbs Outturn)
                    </h3>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 mb-16">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-6xl md:text-7xl font-bold text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">24%</span>
                            <span className="text-xl text-white/70 tracking-widest uppercase mt-4">Kernel Recovery</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-6xl md:text-7xl font-bold text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">70%</span>
                            <span className="text-xl text-white/70 tracking-widest uppercase mt-4">Whole Kernels</span>
                        </motion.div>
                    </div>

                    {/* Final Floating Luxury Crate Visual */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mt-10"
                    >
                        {/* Soft light beams from behind the crate */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-gradient-to-t from-transparent via-[#D4AF37]/20 to-transparent blur-[40px] rotate-45 pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-gradient-to-t from-transparent via-[#D4AF37]/20 to-transparent blur-[40px] -rotate-45 pointer-events-none"></div>

                        <img src="/cashew_luxury_box.png" alt="Luxury Cashew Crate" className="w-full h-full object-contain relative z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-2xl md:text-3xl text-white/90 font-light italic opacity-80 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#D4AF37] to-white shimmer-effect"
                    >
                        “Precision in Quality. Excellence in Processing.”
                    </motion.p>
                </motion.div>
            </div>

        </div>
    );
}
