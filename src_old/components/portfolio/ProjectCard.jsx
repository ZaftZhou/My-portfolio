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
        className="group glass-card rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-700 ease-out hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(34,211,238,0.2)] flex flex-col h-full cursor-pointer relative block group/card"
      >
        {/* Visual Header */}
        <div className={`h-56 w-full bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center p-8`}>
          <div className="absolute inset-0 bg-prime-950/20 group-hover/card:bg-transparent transition-all duration-700" />

          {/* Animated background shape */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover/card:bg-white/20 transition-all duration-700" />

          <div className="p-5 rounded-2xl glass border border-white/20 transform group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-700 shadow-2xl relative z-10">
            {iconMap[project.category]}
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover/card:opacity-100 translate-y-4 group-hover/card:translate-y-0 transition-all duration-500 delay-100">
            <span className="text-[8px] font-black tracking-widest text-white uppercase bg-black/40 backdrop-blur px-2 py-1 rounded border border-white/10">
              VIEW SOURCE
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 flex flex-col flex-grow bg-prime-950/40 relative z-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-cyan-500 group-hover/card:w-12 transition-all duration-500" />
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">{project.category}</span>
          </div>

          <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover/card:text-cyan-400 transition-colors uppercase leading-none">
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed font-light italic">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-white/5 text-slate-400 rounded uppercase tracking-tighter border border-white/5 group-hover/card:border-cyan-500/20 transition-colors">
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
