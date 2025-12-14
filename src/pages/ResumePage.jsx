import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Code, Briefcase, Zap, Printer, MapPin, Mail, Phone, Linkedin, ExternalLink, Github } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_DATA, EDUCATION_DATA, PROJECTS_DATA } from '../data/siteData';

function ResumePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#282a36] pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in duration-300">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-[#6272a4] hover:text-[#f8f8f2] bg-[#282a36]/50 hover:bg-[#44475a] px-4 py-2 rounded-full backdrop-blur border border-[#44475a] transition-all print:hidden group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm font-bold">BACK</span>
      </button>

      {/* Resume Container */}
      <div className="max-w-6xl mx-auto flex flex-col print:max-w-none print:w-full">
        {/* Sidebar - 2x2 Grid at Top */}
        <aside className="w-full pb-8 mb-8 border-b border-[#44475a] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-[#ff79c6] text-xs font-bold uppercase tracking-widest border-b border-[#44475a] pb-1 mb-2 font-mono">// CONTACT</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-start gap-3 text-[#f8f8f2] opacity-90">
                <MapPin size={14} className="text-[#8be9fd] mt-0.5 flex-shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-start gap-3 text-[#f8f8f2] opacity-90">
                <Mail size={14} className="text-[#8be9fd] mt-0.5 flex-shrink-0" />
                <span className="break-all">{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-start gap-3 text-[#f8f8f2] opacity-90">
                <Phone size={14} className="text-[#8be9fd] mt-0.5 flex-shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[#f8f8f2] opacity-90 hover:text-[#8be9fd] transition-colors">
                <Linkedin size={14} className="text-[#8be9fd] mt-0.5 flex-shrink-0" />
                <span className="break-all">linkedin.com/in/bowen-zhou-87b616251</span>
              </a>
              <a href={PERSONAL_INFO.socials.artstation} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[#f8f8f2] opacity-90 hover:text-[#8be9fd] transition-colors">
                <ExternalLink size={14} className="text-[#8be9fd] mt-0.5 flex-shrink-0" />
                <span>dreamzhou.artstation.com</span>
              </a>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[#f8f8f2] opacity-90 hover:text-[#8be9fd] transition-colors">
                <Github size={14} className="text-[#8be9fd] mt-0.5 flex-shrink-0" />
                <span>github.com/ZaftZhou</span>
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-[#ff79c6] text-xs font-bold uppercase tracking-widest border-b border-[#44475a] pb-1 mb-2 font-mono">// EDUCATION</h3>
            <div className="space-y-3">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="text-xs font-mono">
                  <div className="font-bold text-[#f8f8f2]">{edu.school}</div>
                  <div className="text-[#50fa7b] opacity-90 mt-0.5">{edu.degree}</div>
                  <div className="text-[#6272a4] mt-0.5">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-[#ff79c6] text-xs font-bold uppercase tracking-widest border-b border-[#44475a] pb-1 mb-2 font-mono">// TECH_STACK</h3>
            <div className="flex flex-wrap gap-2">
              {['C#', 'Unity', 'FSM/AI', 'ShaderGraph', 'Blender', 'ZBrush', 'Git', 'Rider', 'HLSL'].map(skill => (
                <span key={skill} className="px-2 py-1 border border-[#44475a] rounded text-xs font-mono text-[#f1fa8c]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <h3 className="text-[#ff79c6] text-xs font-bold uppercase tracking-widest border-b border-[#44475a] pb-1 mb-2 font-mono">// LANGUAGES</h3>
            <div className="space-y-1 text-xs font-mono opacity-90">
              <div className="flex justify-between text-[#f8f8f2]">
                <span>Chinese</span>
                <span className="text-[#6272a4]">Native</span>
              </div>
              <div className="flex justify-between text-[#f8f8f2]">
                <span>English</span>
                <span className="text-[#6272a4]">Fluent</span>
              </div>
              <div className="flex justify-between text-[#f8f8f2]">
                <span>Finnish</span>
                <span className="text-[#6272a4]">Basic</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full space-y-8">
          {/* Header */}
          <header className="border-b border-[#44475a] pb-6">
            <h1 className="text-5xl font-bold tracking-tight mb-2 text-[#f8f8f2] font-mono uppercase">
              {PERSONAL_INFO.name.toUpperCase()}
            </h1>
            <div className="flex items-center gap-2 text-xl font-mono">
              <span className="text-[#ff79c6]">class</span>
              <span className="text-[#8be9fd] font-bold">UnityDeveloper</span>
              <span className="text-[#f8f8f2]">:</span>
              <span className="text-[#50fa7b]">TechnicalGeneralist</span>
            </div>
          </header>

          {/* Abstract */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3 font-mono text-[#f1fa8c]">
              <Terminal size={14} className="text-[#8be9fd]" /> 01. ABSTRACT
            </div>
            <div className="p-4 rounded border-l-2 border-[#8be9fd] bg-[#21222c]">
              <p className="leading-relaxed text-sm font-light opacity-90 text-justify text-[#f8f8f2]">
                {PERSONAL_INFO.bio}
              </p>
            </div>
          </section>

          {/* Projects */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 font-mono text-[#f1fa8c]">
              <Code size={14} className="text-[#8be9fd]" /> 02. PROJECTS
            </div>
            <div className="space-y-6">
              {PROJECTS_DATA.slice(0, 3).map((project, idx) => (
                <div key={project.id} className="relative pl-6 border-l border-[#44475a]">
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-[#8be9fd]' : 'bg-[#6272a4]'}`}></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h4 className="font-bold text-lg text-[#f8f8f2] font-mono">{project.title}</h4>
                      <span className="text-xs font-mono opacity-70 text-[#6272a4]">{project.details?.duration}</span>
                    </div>
                    <div className="text-xs font-bold mb-3 font-mono text-[#ff79c6]">{project.details?.role}</div>
                    <ul className="text-sm space-y-2 leading-relaxed opacity-90">
                      <li className="flex items-start">
                        <span className="text-[#ff79c6] font-bold mr-2">&gt;</span>
                        <span className="text-[#f8f8f2]">
                          <strong className="text-[#50fa7b]">{project.details?.features?.[0]}:</strong>{' '}
                          {project.details?.solution}
                        </span>
                      </li>
                      {project.details?.features?.slice(1).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          <span className="text-[#ff79c6] font-bold mr-2">&gt;</span>
                          <span className="text-[#f8f8f2]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Work History */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 font-mono text-[#f1fa8c]">
              <Briefcase size={14} className="text-[#8be9fd]" /> 03. WORK_HISTORY
            </div>
            <div className="space-y-6">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l border-[#44475a]">
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-[#ff79c6]' : 'bg-[#6272a4]'}`}></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h4 className="font-bold text-lg text-[#f8f8f2] font-mono">{exp.company}</h4>
                      <span className="text-xs font-mono opacity-70 text-[#6272a4]">{exp.period}</span>
                    </div>
                    <div className="text-xs font-bold mb-2 font-mono text-[#ff79c6]">{exp.role}</div>
                    <p className="text-sm opacity-90 leading-relaxed text-[#f8f8f2]">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 font-mono text-[#f1fa8c]">
              <Zap size={14} className="text-[#8be9fd]" /> 04. STRENGTHS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#21222c] border border-[#44475a] rounded">
                <h3 className="text-[#ff79c6] font-bold text-sm mb-2 font-mono">System-Oriented</h3>
                <p className="text-xs text-[#f8f8f2] opacity-90 leading-relaxed">
                  Prefers building reusable systems and tools over one-off scripts. Cares about architecture.
                </p>
              </div>
              <div className="p-4 bg-[#21222c] border border-[#44475a] rounded">
                <h3 className="text-[#50fa7b] font-bold text-sm mb-2 font-mono">Cross-Disciplinary</h3>
                <p className="text-xs text-[#f8f8f2] opacity-90 leading-relaxed">
                  Can talk with artists and engineers, translating between visual language and technical constraints.
                </p>
              </div>
              <div className="p-4 bg-[#21222c] border border-[#44475a] rounded">
                <h3 className="text-[#8be9fd] font-bold text-sm mb-2 font-mono">Self-Learner</h3>
                <p className="text-xs text-[#f8f8f2] opacity-90 leading-relaxed">
                  Constantly dissecting new tech (HardMesh, ZBrush, HDRP) and applying it to practical prototypes.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Floating Print Button */}
      <button
        onClick={handlePrint}
        className="fixed bottom-8 right-8 bg-[#8be9fd] hover:bg-[#50fa7b] text-[#282a36] p-4 rounded-full shadow-2xl shadow-[#8be9fd]/30 transition-all hover:scale-110 print:hidden z-50"
        title="Print CV / Save as PDF"
      >
        <Printer size={24} />
      </button>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-6xl, .max-w-6xl * {
            visibility: visible;
          }
          .max-w-6xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ResumePage;
