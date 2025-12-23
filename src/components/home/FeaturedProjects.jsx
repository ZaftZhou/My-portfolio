"use client";

import Link from "next/link";
import { PROJECTS_DATA } from "@/lib/siteData";
import ProjectCard from "@/components/shared/ProjectCard";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function FeaturedProjects() {
    const featuredProjects = PROJECTS_DATA.filter(p => p.featured).slice(0, 3);

    return (
        <section id="work" className="py-24 px-6 max-w-6xl mx-auto relative overflow-hidden">
            {/* Yellow highlighter brush stroke background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[60%] opacity-[0.06] rounded-[50%]"
                    style={{
                        background: 'radial-gradient(ellipse, #ffd93d 0%, transparent 70%)',
                        transform: 'translateX(-50%) rotate(-3deg)'
                    }}
                />
            </div>
            <RevealOnScroll>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    {/* Section title */}
                    <div className="flex items-center gap-4">
                        <svg className="w-10 h-10 wiggle" viewBox="0 0 40 40" fill="none">
                            <path d="M5 12 L5 34 L35 34 L35 12 L20 12 L17 8 L5 8 Z" stroke="#2d251d" strokeWidth="2" fill="#ffd93d" />
                            <path d="M10 22 L30 22 M10 28 L24 28" stroke="#2d251d" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <div>
                            <p className="font-sketch text-lg text-prime-600 mb-1">
                                Portfolio ✦
                            </p>
                            <h2 className="font-marker text-3xl text-prime-900">
                                <span className="sketch-underline">Selected Work</span>
                            </h2>
                        </div>
                    </div>

                    <Link
                        href="/portfolio"
                        className="sketch-btn px-5 py-2.5 text-prime-900 font-bold"
                    >
                        View all →
                    </Link>
                </div>
            </RevealOnScroll>

            {/* Projects grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                    <RevealOnScroll key={project.id} delay={index * 100}>
                        <ProjectCard project={project} index={index} />
                    </RevealOnScroll>
                ))}
            </div>

            {/* Arrow doodle */}
            <div className="mt-16 flex justify-center">
                <svg className="w-32 h-10 float" viewBox="0 0 128 40" fill="none">
                    <path d="M16 20 Q 40 8, 64 20 T 112 20" stroke="#2d251d" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 4" />
                    <path d="M100 14 L112 20 L100 26" stroke="#2d251d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </section>
    );
}
