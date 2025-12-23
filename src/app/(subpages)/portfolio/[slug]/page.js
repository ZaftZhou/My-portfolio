"use client";

import { use } from "react";
import { ArrowLeft, ExternalLink, Github, Layers, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { PROJECTS_DATA } from '@/lib/siteData';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage({ params }) {
    const { slug } = use(params);
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto page-transition">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-12 uppercase text-[10px] font-black tracking-widest">
                <ArrowLeft size={14} /> Back to Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left: Content */}
                <div>
                    <RevealOnScroll>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-cyan-500" />
                            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.3em]">{project.category}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            {project.title}
                        </h1>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <div className="flex flex-wrap gap-8 mb-12 py-8 border-y border-white/5">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Role</span>
                                <span className="text-white text-sm font-medium">{project.details.role}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Duration</span>
                                <span className="text-white text-sm font-medium">{project.details.duration}</span>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300}>
                        <div className="space-y-12">
                            <section>
                                <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">The Challenge</h2>
                                <p className="text-slate-400 leading-relaxed font-light italic">{project.details.challenge}</p>
                            </section>
                            <section>
                                <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight">The Solution</h2>
                                <p className="text-slate-400 leading-relaxed">{project.details.solution}</p>
                            </section>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Right: Media / Sticky Info */}
                <div className="space-y-12">
                    {project.details.media.map((item, idx) => (
                        <RevealOnScroll key={idx} delay={idx * 100}>
                            <div className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                                {item.type === 'video' ? (
                                    <video src={item.url} controls poster={item.poster} className="w-full h-auto" />
                                ) : (
                                    <img src={item.url} alt={item.caption} className="w-full h-auto" />
                                )}
                                <div className="p-4 bg-prime-950/40">
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{item.caption}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </div>
    );
}
