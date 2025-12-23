"use client";

import { EXPERIENCE_DATA, EDUCATION_DATA } from "@/lib/siteData";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

function getTimelineData() {
    const items = [
        ...EXPERIENCE_DATA.map(e => ({
            ...e,
            category: 'experience',
            year: parseInt(e.period.split(' - ')[0]) || 2019
        })),
        ...EDUCATION_DATA.map(e => ({
            ...e,
            category: 'education',
            year: parseInt(e.year.split(' - ')[0]) || 2020
        }))
    ];

    const groups = {};
    items.forEach(item => {
        if (!groups[item.year]) groups[item.year] = { year: item.year, experience: [], education: [] };
        if (item.category === 'experience') groups[item.year].experience.push(item);
        else groups[item.year].education.push(item);
    });

    return Object.values(groups).sort((a, b) => b.year - a.year);
}

export default function ExperienceTimeline({ onNavigate }) {
    const timelineGroups = getTimelineData();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="journey" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-visible">
            {/* Top Navigation - Fixed to Frame */}
            <div className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 pointer-events-none flex justify-between items-start">
                <button
                    onClick={() => onNavigate && onNavigate(2)}
                    className="pointer-events-auto flex items-center gap-2 text-prime-600 hover:text-prime-900 transition-colors font-bold text-sm uppercase tracking-wide group bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-prime-200"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Selected Work
                </button>
            </div>

            {/* Background Rail Track - subtle opacity */}
            <div className="absolute inset-0 pointer-events-none flex justify-center opacity-[0.04]">
                <div className="w-24 h-full border-x-2 border-dashed border-prime-900 bg-prime-200/50" />
            </div>

            <div className="torn-divider w-full mb-20" />

            <div className="text-center mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-4xl">🚀</span>
                        <h2 className="font-marker text-4xl text-prime-900">
                            <span className="highlight-yellow">Journey So Far</span>
                        </h2>
                    </div>
                    <p className="font-sketch text-xl text-prime-600">
                        Building, learning, and leveling up.
                    </p>
                </motion.div>
            </div>

            <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-32 mb-32">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 z-0 hidden md:block">
                    <svg className="w-1 h-full overflow-visible" preserveAspectRatio="none">
                        <motion.path
                            d="M0 0 Q 3 50, 0 100 T 0 200 T 0 300 T 0 400 T 0 500 T 0 600 T 0 700 T 0 800 T 0 900 T 0 1000 T 0 1200"
                            stroke="#2d251d"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="6 10"
                            style={{ pathLength: scaleY }}
                        />
                    </svg>
                </div>

                {timelineGroups.map((group, index) => (
                    <TimelineRow key={group.year} group={group} index={index} />
                ))}
            </div>

            {/* Bottom Navigation - Fixed to Frame */}
            <div className="fixed bottom-0 right-0 w-full p-6 md:p-12 z-50 pointer-events-none flex justify-end items-end">
                <button
                    onClick={() => onNavigate && onNavigate(4)}
                    className="pointer-events-auto flex items-center gap-2 text-prime-900 hover:text-sketch-coral transition-colors font-black text-lg uppercase tracking-wider group bg-white/90 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border-2 border-white transform rotate-2 hover:rotate-0 hover:scale-105"
                >
                    Next: Contact <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
        </section>
    );
}

function TimelineRow({ group, index }) {
    return (
        <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 relative">
            <div className="md:col-start-6 md:col-span-2 flex justify-start md:justify-center relative z-10 order-1 md:order-2 pl-8 md:pl-0">
                <TimelineNode year={group.year} />
            </div>

            <div className="md:col-span-5 flex flex-col items-end order-2 md:order-1 pr-0 md:pr-12 pl-8 md:pl-0">
                {group.experience.map((exp, i) => (
                    <TimelineCard key={i} item={exp} side="left" index={index + i} />
                ))}
            </div>

            <div className="md:col-span-5 flex flex-col items-start order-3 md:order-3 pl-8 md:pl-12">
                {group.education.map((edu, i) => (
                    <TimelineCard key={i} item={edu} side="right" index={index + i} />
                ))}
            </div>
        </div>
    );
}

function TimelineNode({ year }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-sketch-yellow blur-md opacity-30 scale-150 rounded-full" />
            <div className="bg-white border-2 border-prime-900 rounded-full px-5 py-2 shadow-[2px_2px_0_rgba(0,0,0,0.1)] relative z-10 flex items-center gap-2 transform -rotate-2">
                <span className="font-marker text-xl text-prime-900">{year}</span>
                <span className="text-lg">📍</span>
            </div>
        </motion.div>
    );
}

function TimelineCard({ item, side, index }) {
    const isExp = item.category === 'experience';
    const rotation = isExp ? -1.2 : 1.2;
    const yOffset = index % 2 === 0 ? 0 : 12;

    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'left' ? 50 : -50, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: rotation }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full max-w-md group mb-8 md:mb-0"
            style={{ marginTop: yOffset }}
        >
            <svg
                className={`hidden md:block absolute top-8 w-12 h-2 z-0 ${side === 'left' ? '-right-12' : '-left-12'}`}
            >
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#2d251d" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx={side === 'left' ? "100%" : "0"} cy="50%" r="3" fill="#2d251d" />
            </svg>

            <div className="absolute inset-0 bg-prime-300 rounded-[14px] transform translate-y-2 translate-x-1 rotate-1 opacity-40 z-0 transition-transform group-hover:translate-y-3 group-hover:rotate-2" />

            <div className={`relative bg-white border-2 border-prime-900 rounded-[14px] p-6 z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${isExp ? 'corner-peel' : ''}`}>
                <div className={`tape ${index % 2 === 0 ? 'tape-top' : 'tape-corner'}`} style={{ left: index % 3 === 0 ? '20%' : 'auto', right: index % 3 !== 0 ? '20%' : 'auto' }} />

                <div className="mb-4 pr-8">
                    <div className="flex justify-between items-start">
                        <h4 className="font-marker text-lg text-prime-900 leading-tight">
                            {item.role || item.degree}
                        </h4>
                        <div className="text-xl opacity-80" title={isExp ? "Experience" : "Education"}>
                            {isExp ? '📁' : '🎓'}
                        </div>
                    </div>
                    <p className="font-sketch text-prime-500 text-sm mt-1">
                        {item.company || item.school}
                    </p>
                </div>

                {item.impact && (
                    <div className="mb-4 relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${isExp ? 'bg-orange-200' : 'bg-blue-200'}`} />
                        <p className="pl-3 text-sm font-bold text-prime-700 leading-snug">
                            {item.impact}
                        </p>
                    </div>
                )}

                {item.highlights && (
                    <ul className="space-y-1.5">
                        {item.highlights.map((point, k) => (
                            <li key={k} className="flex items-start gap-2 text-xs text-prime-600 font-medium">
                                <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isExp ? 'bg-orange-400' : 'bg-blue-400'}`} />
                                {point}
                            </li>
                        ))}
                    </ul>
                )}

                <div
                    className="absolute top-[-10px] right-[-10px] border-2 border-prime-900 rounded bg-white px-2 py-1 font-marker text-xs transform rotate-12 shadow-sm group-hover:rotate-6 transition-transform"
                    style={{ color: isExp ? '#ea580c' : '#0284c7', borderColor: isExp ? '#ea580c' : '#0284c7' }}
                >
                    {item.stamp || 'CN'}
                </div>
            </div>
        </motion.div>
    );
}
