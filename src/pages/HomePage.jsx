import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Linkedin, Mail, Layers, Box } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import CentralNeuralNetwork from '../components/animations/CentralNeuralNetwork';
import TechStack from '../components/shared/TechStack';
import ProjectCard from '../components/portfolio/ProjectCard';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/siteData';

function HomePage() {
  // 筛选精选项目（前 3 个标记为 featured 的项目）
  const featuredProjects = PROJECTS_DATA.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen animate-in fade-in">
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 min-h-[600px]">
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <RevealOnScroll delay={100}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">
              <Sparkles size={14} className="mr-2" />
              Tech Art & Game Development
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{PERSONAL_INFO.name}</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <h2 className="text-xl sm:text-2xl text-slate-400 font-light">{PERSONAL_INFO.title}</h2>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <Link
                to="/portfolio"
                className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 rounded-full bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-all"
              >
                Contact Me
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={600}>
            <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-slate-500">
              <a href={PERSONAL_INFO.socials.github} className="hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Hero Visual */}
        <div className="flex-1 relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
          <CentralNeuralNetwork />
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-800/90 border-4 border-slate-700/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-float">
            <Box size={60} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStack />

      {/* Featured Projects */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Layers className="text-cyan-500" /> Featured Projects
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-slate-400">Showcasing my best work</p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA: View All Projects */}
        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all font-bold uppercase tracking-wider"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
