import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Sparkles, Box, Terminal, Activity } from 'lucide-react';
import RevealOnScroll from '../animations/RevealOnScroll';

function ProjectCard({ project, index = 0 }) {
  const iconMap = {
    'Game Dev': <Gamepad2 size={32} className="text-white" />,
    'Shaders': <Sparkles size={32} className="text-white" />,
    '3D Art': <Box size={32} className="text-white" />,
    'Tools': <Terminal size={32} className="text-white" />,
    'Simulator': <Activity size={32} className="text-white" />,
  };

  return (
    <RevealOnScroll delay={index * 100} className="h-full">
      <Link
        to={`/portfolio/${project.slug}`}
        className="group card-shimmer bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-400 transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col h-full cursor-pointer relative block"
      >
        {/* 渐变头部 */}
        <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden p-6 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-all"></div>
          <div className="bg-slate-950/30 backdrop-blur-sm p-4 rounded-full transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 border border-white/10 relative z-10 shadow-lg">
            {iconMap[project.category]}
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-xs text-white font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
            View Details →
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-6 flex flex-col flex-grow relative z-20 bg-slate-900 group-hover:bg-slate-800/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">{project.category}</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </RevealOnScroll>
  );
}

export default ProjectCard;
