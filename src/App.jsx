import React from 'react';
import { Github, Linkedin, Mail, Link2 } from 'lucide-react';
import './App.css';

const socialLinks = [
  { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com' },
  { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <Mail size={18} />, label: 'Email', href: 'mailto:zhou.bowen@example.com' },
  { icon: <Link2 size={18} />, label: 'Portfolio', href: '#' }
];

const arsenal = [
  'Unity 3D',
  'C#',
  'HLSL',
  'Shader Graph',
  'Blender',
  'Substance Painter',
  'ZBrush',
  'Git'
];

const categories = ['All', 'Game Dev', 'Shader Dev', '3D Art', 'Tools'];

function App() {
  return (
    <div className="min-h-screen bg-[#0b1021] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.06),transparent_35%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pb-16">
        <header className="pt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-white/5 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Tech Art & Game Development
          </div>
        </header>

        <section className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-lg text-cyan-200">Unity3D Developer & Technical Artist</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              I am <span className="text-cyan-300">Zhou Bowen</span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-200">
              Unity developer and technical generalist with a dual background in Mechatronics and IT.
              Technically focused on tool development and systems in Unity and C# (AI, dialogue, character frameworks, shaders).
              Aiming for a strong foundation in shader work and acceleration in other tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="cta-primary" href="#projects">View Projects</a>
              <a className="cta-secondary" href="#contact">Contact Me</a>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="social-btn"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-lg mx-auto">
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#121a33] to-[#0b0f26] border border-slate-800/70 shadow-[0_30px_120px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-6 rounded-full border border-cyan-500/30" />
              <div className="absolute inset-12 rounded-full border border-indigo-500/20" />
              <div className="absolute inset-20 rounded-full bg-gradient-to-b from-cyan-500/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Selected Works</div>
                <div className="mt-2 text-4xl font-semibold text-slate-100">Technical Art</div>
                <p className="mt-4 max-w-xs text-sm text-slate-400">
                  A selection of my favorite work spanning development, tools, and art.
                </p>
              </div>
              <div className="floating-badge left-1/2 top-10 -translate-x-1/2">Shader Tech</div>
              <div className="floating-badge right-10 top-1/3">R&D</div>
              <div className="floating-badge right-12 bottom-20">Tools</div>
              <div className="floating-badge left-8 bottom-16">Unity</div>
              <div className="floating-node">Tech Art</div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400">Technical Arsenal</h2>
          <h3 className="text-2xl font-semibold text-slate-100">So, you want to make a game? I know a thing or two about that.</h3>
          <div className="flex flex-wrap gap-3 pt-4">
            {arsenal.map((item) => (
              <span key={item} className="pill">{item}</span>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-16 space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-slate-400">Selected Works</h2>
          <h3 className="text-2xl font-semibold text-slate-100">The work I am most proud of.</h3>
          <p className="text-slate-300 max-w-3xl">
            All of my projects have a detailed breakdown of my roles and contributions throughout development.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            {categories.map((category) => (
              <button key={category} className={`filter-btn ${category === 'All' ? 'active' : ''}`}>
                {category}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
