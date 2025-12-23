"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroLetter() {
    const [isStampHovered, setIsStampHovered] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase());

    // Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [2, -2]); // Vertical tilt
    const rotateY = useTransform(x, [-100, 100], [-2, 2]); // Horizontal tilt

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center normalized
        // We limit the range to avoid extreme flipping
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Dampen the values
        x.set(mouseX / 10);
        y.set(mouseY / 10);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };


    return (
        <section
            id="hero"
            className="min-h-full flex items-center justify-center relative py-12 px-4 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Interactive Desk Props Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Props scattered around */}
                <div className="absolute top-[10%] left-[5%] w-16 h-16 opacity-60">
                    <svg viewBox="0 0 50 100" fill="none" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" transform="rotate(-15)">
                        <path d="M15 20 L15 80 A 10 10 0 0 0 35 80 L35 10 A 10 10 0 0 0 10 10 L10 60" />
                    </svg>
                </div>
            </div>

            {/* The Big Notebook Page */}
            <motion.div
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative bg-[#fffefc] w-[90%] max-w-5xl aspect-video md:aspect-[16/9] p-8 md:p-16 shadow-2xl border border-gray-100 transform z-10 mx-auto flex flex-col justify-between"
            >
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
                />

                {/* Header Row */}
                <div className="relative z-10 flex justify-between items-start mb-8">
                    {/* Date/Postmark */}
                    <div className="flex flex-col items-start gap-1 opacity-60">
                        <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">Entry No. 001</span>
                        <div className="text-prime-800 font-marker text-xl -rotate-2">{date}</div>
                    </div>

                    {/* Stamp */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-24 h-24 border-4 border-dashed border-prime-300 p-2 bg-white shadow-sm flex items-center justify-center transform rotate-3"
                    >
                        <span className="text-4xl filter grayscale contrast-125">👨‍💻</span>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center font-serif text-2xl md:text-4xl text-prime-800 leading-snug space-y-6">
                    <p className="font-marker text-prime-500 text-xl md:text-2xl mb-4 -rotate-1">
                        Dear Visitor,
                    </p>

                    <div className="space-y-2">
                        <p>
                            I’m <strong className="highlight-yellow inline-block px-2 transform -rotate-1">Zhou Bowen</strong>.
                        </p>
                        <p>
                            I build worlds as a
                            <span className="group relative inline-block mx-2 cursor-help border-b-2 border-dashed border-sketch-coral">
                                Technical Artist
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                                    Bridge between Code & Art
                                </span>
                            </span>
                            &
                            <span className="group relative inline-block mx-2 cursor-help border-b-2 border-dashed border-sketch-mint">
                                Developer
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                                    Full Stack Magic
                                </span>
                            </span>.
                        </p>
                        <p className="text-xl md:text-2xl text-prime-500 mt-4 max-w-2xl">
                            Currently based in Finland, crafting interactive experiences that feel tactile, playful, and human.
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="relative z-10 flex flex-wrap gap-6 items-end justify-between mt-8">
                    {/* P.S. Note */}
                    <div className="hidden md:block transform -rotate-3 bg-yellow-100 p-3 shadow border border-yellow-200 text-sm font-hand">
                        <span className="font-bold text-yellow-800">P.S.</span> Drag the paperclips?
                    </div>

                    <div className="flex gap-4">
                        <Link href="#portfolio">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-prime-900 text-white font-bold tracking-wider rounded-lg shadow-lg flex items-center gap-2 hover:bg-black transition-colors"
                            >
                                OPEN FOLDER <ArrowRight size={18} />
                            </motion.button>
                        </Link>

                        <Link href="#contact">
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white border-2 border-prime-900 text-prime-900 font-marker text-xl shadow-lg transform rotate-1"
                            >
                                Write Back ✍️
                            </motion.button>
                        </Link>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
