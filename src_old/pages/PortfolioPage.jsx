import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import CategoryFilter from '../components/portfolio/CategoryFilter';
import ProjectCard from '../components/portfolio/ProjectCard';
import { PROJECTS_DATA } from '../data/siteData';

function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto page-transition">
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

        {/* Category Filter - Wrapped for better styling */}
        <div className="glass p-1 rounded-full border border-white/10">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-40 border border-dashed border-white/5 rounded-3xl">
          <p className="text-slate-500 text-lg uppercase tracking-widest font-black opacity-50">Null pointer: No matching projects found.</p>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
