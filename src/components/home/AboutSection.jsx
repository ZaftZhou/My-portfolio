"use client";

import { PERSONAL_INFO, TECH_STACK } from "@/lib/siteData";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import FlipBadge from "@/components/shared/FlipBadge";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 max-w-5xl mx-auto relative overflow-hidden">
            {/* Wave paper background - subtle gray waves */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0 20 Q25 10, 50 20 T100 20 L100 40 Q75 30, 50 40 T0 40 Z" fill="#6b7280" />
                    <path d="M0 50 Q25 40, 50 50 T100 50 L100 70 Q75 60, 50 70 T0 70 Z" fill="#6b7280" />
                    <path d="M0 80 Q25 70, 50 80 T100 80 L100 100 Q75 90, 50 100 T0 100 Z" fill="#6b7280" />
                </svg>
            </div>
            {/* Torn paper divider */}
            <div className="torn-divider w-full mb-16" />

            <RevealOnScroll>
                {/* Section title */}
                <div className="flex items-center gap-4 mb-10">
                    <svg className="w-8 h-8 wiggle" viewBox="0 0 32 32" fill="none">
                        <path d="M6 26 L8 24 L24 8 L28 4" stroke="#2d251d" strokeWidth="2" strokeLinecap="round" />
                        <path d="M24 8 L28 12" stroke="#2d251d" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 26 L4 30 L8 28 Z" fill="#ffd93d" stroke="#2d251d" strokeWidth="1.5" />
                    </svg>
                    <h2 className="font-marker text-3xl text-prime-900">
                        <span className="sketch-underline">About Me</span>
                    </h2>
                </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-5 gap-10">
                {/* Bio */}
                <div className="md:col-span-3">
                    <RevealOnScroll delay={100}>
                        <div className="paper-card p-6 relative">
                            <div className="tape tape-left" />
                            <p className="font-sketch text-lg text-prime-700 leading-relaxed pt-4">
                                {PERSONAL_INFO.bio}
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <p className="mt-6 text-prime-600 leading-relaxed flex items-start gap-3">
                            <span className="text-xl">🎮</span>
                            <span className="font-sketch text-lg">When I'm not coding, you'll find me exploring new game mechanics, experimenting with shaders, or working on 3D art!</span>
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Tech stack with flip badges */}
                <div className="md:col-span-2">
                    <RevealOnScroll delay={300}>
                        <div className="paper-card p-5">
                            <p className="font-marker text-base text-prime-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10 L8 14 L16 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Tech Stack
                                <span className="text-xs font-sketch text-prime-500 ml-2">(hover to flip!)</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TECH_STACK.map((tech, index) => (
                                    <div
                                        key={tech}
                                        className="pop-in"
                                        style={{ animationDelay: `${index * 60}ms` }}
                                    >
                                        <FlipBadge skill={tech} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Divider doodle */}
            <div className="mt-20 flex justify-center">
                <svg className="w-40 h-6" viewBox="0 0 160 24" fill="none">
                    <path d="M16 12 Q 40 6, 64 12 T 112 12 T 144 12" stroke="#2d251d" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" />
                    <circle cx="80" cy="12" r="5" fill="#ffd93d" stroke="#2d251d" strokeWidth="1.5" />
                </svg>
            </div>
        </section>
    );
}
