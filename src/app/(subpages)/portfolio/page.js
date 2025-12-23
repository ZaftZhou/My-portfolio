"use client";

import { useState } from 'react';
import { Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import CategoryFilter from '@/components/portfolio/CategoryFilter';
import ProjectCard from '@/components/portfolio/ProjectCard';
import { PROJECTS_DATA } from '@/lib/siteData';

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects =
        activeCategory === 'All'
            ? PROJECTS_DATA
            : PROJECTS_DATA.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto page-transition">
            {/* Back to Studio */}
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-12 uppercase text-[10px] font-black tracking-widest">
                <ArrowLeft size={14} /> Back to Studio
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                <div className="max-w-2xl">
                    <RevealOnScroll>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-6">
                            <span className="w-16 h-[2px] bg-cyan-500" /> PROJECTS
                        </h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={200}>
                        <p className="text-slate-400 text-xl font-light">Comprehensive archive of modular avatars, AI systems, and visual experiments.</p>
                    </RevealOnScroll>
                </div>

                <div className="glass p-1 rounded-full border border-white/10">
                    <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-40 border border-dashed border-white/5 rounded-3xl">
                    <p className="text-slate-500 text-lg uppercase tracking-widest font-black opacity-50">Null pointer: No matching projects found.</p>
                </div>
            )}
        </div>
    );
}
