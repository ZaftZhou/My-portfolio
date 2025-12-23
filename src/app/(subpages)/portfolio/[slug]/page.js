"use client";

import { use } from "react";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS_DATA } from '@/lib/siteData';
import { motion } from "framer-motion";

import BrandBoardHeader from '@/components/shared/BrandBoardHeader';
import BookmarkNav from '@/components/shared/BookmarkNav';
import PolaroidGallery from '@/components/shared/PolaroidGallery';
import TechStack from '@/components/shared/TechStack';
import RevealOnScroll from '@/components/animations/RevealOnScroll';

export default function ProjectDetailPage({ params }) {
    const { slug } = use(params);
    const project = PROJECTS_DATA.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const sections = [
        { id: 'brief', label: 'The Brief', color: '#fef3c7' }, // Yellow
        { id: 'analysis', label: 'Analysis', color: '#e0f2fe' }, // Blue
        { id: 'evidence', label: 'Evidence', color: '#fce7f3' }, // Pink
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Top Navigation */}
            <div className="mb-8 flex justify-between items-center ">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-prime-600 hover:text-prime-900 transition-colors font-sketch text-lg"
                >
                    <ArrowLeft size={18} /> Back to Desk
                </Link>

                {/* File Number Stamp */}
                <div className="hidden md:block border-2 border-prime-900/30 text-prime-900/40 rounded px-2 py-1 font-marker text-xs transform rotate-3">
                    FILE #{String(project.id).padStart(3, '0')}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                {/* Left Sidebar: Bookmarks */}
                <aside className="hidden lg:block w-32 sticky top-32 z-10">
                    <BookmarkNav sections={sections} />
                </aside>

                {/* Main Content: The Dossier */}
                <main className="flex-1 w-full max-w-4xl">

                    {/* Cover Sheet: Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BrandBoardHeader project={project} />
                    </motion.div>

                    {/* Section 1: The Brief (Yellow Legal Pad) */}
                    <div id="brief" className="scroll-mt-32 mb-16 relative">
                        {/* Paperclip */}
                        <div className="absolute -top-4 left-8 z-20 w-8 h-20 border-r-4 border-b-4 border-l-4 border-zinc-400 rounded-b-full opacity-80" style={{ height: '40px' }} />
                        <div className="absolute -top-4 left-8 z-0 w-8 h-20 border-r-4 border-l-4 border-zinc-400 rounded-b-full opacity-80" style={{ height: '20px' }} />

                        <RevealOnScroll>
                            <div className="paper-lined p-8 md:p-12 relative rotate-1 origin-top-left">
                                <h2 className="font-marker text-2xl text-prime-900 mb-6 flex items-center gap-2">
                                    <span className="text-3xl">📝</span> The Brief
                                </h2>

                                <div className="space-y-8">
                                    {/* Role & Duration (Handwritten notes) */}
                                    <div className="flex flex-wrap gap-8 text-prime-700 font-sketch text-xl">
                                        <div className="relative">
                                            <span className="block text-sm font-sans text-prime-400 uppercase tracking-widest mb-1">Assigned Role</span>
                                            <span className="relative z-10">{project.details.role}</span>
                                            <svg className="absolute -bottom-2 -left-2 w-full h-4 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                <path d="M0 5 Q 50 10, 100 5" stroke="#f97316" strokeWidth="3" fill="none" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-sans text-prime-400 uppercase tracking-widest mb-1">Timeline</span>
                                            <span>{project.details.duration}</span>
                                        </div>
                                    </div>

                                    {/* Challenge Content */}
                                    <div>
                                        <h3 className="font-bold text-prime-800 mb-2 uppercase tracking-wide text-xs">Mission Objective</h3>
                                        <p className="text-prime-800 leading-relaxed text-lg" style={{ fontFamily: 'var(--font-geist-mono)' }}>
                                            {project.details.challenge}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Section 2: Analysis (Graph Paper) */}
                    <div id="analysis" className="scroll-mt-32 mb-16">
                        <RevealOnScroll delay={100}>
                            <div className="paper-graph p-8 md:p-12 relative -rotate-1 origin-top-right">
                                {/* Binder Holes opacity overlay */}
                                <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-evenly pointer-events-none">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-4 h-4 rounded-full bg-prime-900/10 shadow-inner" />
                                    ))}
                                </div>

                                <div className="pl-8">
                                    <h2 className="font-marker text-2xl text-prime-900 mb-6 flex items-center gap-2">
                                        <span className="text-3xl">🔬</span> Solution Analysis
                                    </h2>

                                    <div className="gap-8">
                                        <p className="text-prime-800 leading-relaxed mb-8">
                                            {project.details.solution}
                                        </p>

                                        {/* Tech Stack Sticker Collection */}
                                        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-prime-200">
                                            <h4 className="font-sketch text-prime-500 mb-3">Tools Deployed:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="sticker-chip text-sm">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Section 3: Evidence (Polaroid Gallery) */}
                    <div id="evidence" className="scroll-mt-32">
                        <RevealOnScroll delay={200}>
                            <div className="relative">
                                {/* Section Title as a Post-it */}
                                <div className="absolute -top-6 -left-4 z-20 bg-sketch-yellow p-4 shadow-md rotate-[-2deg] max-w-[200px]">
                                    <h2 className="font-marker text-xl text-prime-900">
                                        Visual Evidence 📸
                                    </h2>
                                </div>

                                <div className="pt-12">
                                    <PolaroidGallery items={project.details.media} />
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                </main>
            </div>
        </div>
    );
}
