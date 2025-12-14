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
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <RevealOnScroll>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="text-cyan-500" /> All Projects
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-slate-400">Explore my full portfolio of work</p>
          </RevealOnScroll>
        </div>

        {/* Category Filter */}
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
