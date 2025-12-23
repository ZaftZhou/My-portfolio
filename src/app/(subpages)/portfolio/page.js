"use client";

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import FolderTabs from '@/components/shared/FolderTabs';
import ProjectCard from '@/components/shared/ProjectCard';
import { PROJECTS_DATA, CATEGORIES } from '@/lib/siteData';

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects =
        activeCategory === 'All'
            ? PROJECTS_DATA
            : PROJECTS_DATA.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
            {/* Yellow folder edges */}
            <div className="fixed top-0 left-0 w-full h-3 bg-sketch-yellow z-50" />
            <div className="fixed bottom-0 left-0 w-full h-3 bg-sketch-yellow z-50" />

            <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-prime-600 hover:text-prime-900 transition-colors mb-8 font-sketch text-lg"
                >
                    <ArrowLeft size={18} /> Back to Home
                </Link>

                {/* Header */}
                <header className="mb-12 bounce-in">
                    <div className="paper-card p-6 md:p-8 relative">
                        <div className="tape tape-left" />
                        <div className="tape tape-right" />

                        <div className="pt-4">
                            <p className="font-sketch text-lg text-prime-600 mb-2">
                                Archive ✦
                            </p>
                            <h1 className="font-marker text-4xl md:text-5xl text-prime-900 mb-4">
                                <span className="highlight-yellow">Projects</span>
                            </h1>
                            <p className="font-sketch text-xl text-prime-600 max-w-2xl">
                                Comprehensive archive of game systems, shaders, simulators, and visual experiments.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Main content: Sidebar + Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left sidebar - Folder tabs */}
                    <aside className="lg:w-48 flex-shrink-0">
                        <div className="lg:sticky lg:top-28">
                            <p className="font-marker text-sm text-prime-600 mb-4 uppercase tracking-wider">
                                Categories
                            </p>
                            <FolderTabs
                                categories={CATEGORIES}
                                activeCategory={activeCategory}
                                onCategoryChange={setActiveCategory}
                            />
                        </div>
                    </aside>

                    {/* Right side - Project grid */}
                    <main className="flex-1">
                        {/* Results count */}
                        <p className="font-sketch text-prime-500 mb-6">
                            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                            {activeCategory !== 'All' && ` in ${activeCategory}`}
                        </p>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Empty state */}
                        {filteredProjects.length === 0 && (
                            <div className="paper-card text-center py-20">
                                <p className="font-sketch text-xl text-prime-500">
                                    No projects found in this category.
                                </p>
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className="sketch-btn px-6 py-3 mt-4 text-prime-900"
                                >
                                    View all projects
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
