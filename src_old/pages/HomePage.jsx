import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import CentralNeuralNetwork from '../components/animations/CentralNeuralNetwork';
import TechStack from '../components/shared/TechStack';
import ProjectCard from '../components/portfolio/ProjectCard';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/siteData';

function HomePage() {
  // 筛选精选项目（前 3 个标记为 featured 的项目）
  const featuredProjects = PROJECTS_DATA.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen page-transition">
      {/* Hero Section */}
      <section id="hero" className="relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl -z-10 opacity-30">
          <div className="absolute top-20 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] animate-pulse delay-700" />
        </div>

        <div className="max-w-4xl space-y-10 z-10">
          <RevealOnScroll delay={100}>
            <div className="inline-flex items-center px-5 py-2 rounded-full glass border border-cyan-500/20 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">
              <Sparkles size={14} className="mr-3 animate-pulse" />
              Technical Generalist & Unity Developer
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase">
              ZHOU <br />
              <span className="neon-text">BOWEN</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <p className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed italic opacity-80">
              "Crafting immersive digital worlds through <span className="text-white font-medium">technical precision</span> and <span className="text-white font-medium">artistic vision</span>."
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <div className="flex flex-wrap gap-8 justify-center pt-8">
              <Link
                to="/portfolio"
                className="px-12 py-5 rounded-full bg-white text-black font-black text-xs tracking-[0.2em] hover:bg-cyan-400 transition-all transform hover:scale-110 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase"
              >
                Launch Projects
              </Link>
              <Link
                to="/contact"
                className="px-12 py-5 rounded-full glass border border-white/20 text-white font-black text-xs tracking-[0.2em] hover:border-white transition-all uppercase"
              >
                Inquire
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        {/* Neural Network Visual */}
        <div className="mt-32 w-full max-w-4xl opacity-30 grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105">
          <CentralNeuralNetwork />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <TechStack />
      </section>

      {/* Featured Projects */}
      <section className="py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-6">
                <span className="w-16 h-[2px] bg-cyan-500" /> SELECTED WORK
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-slate-400 text-xl font-light leading-relaxed">A curated collection of my most impactful projects in technical art, gameplay systems, and visual research.</p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={300}>
            <Link
              to="/portfolio"
              className="group flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase hover:text-white transition-colors"
            >
              BROWSE ALL PROJECTS <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
