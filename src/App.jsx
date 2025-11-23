import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Terminal, ChevronDown, Send, User, Layers, Sparkles, Box, Cpu, Gamepad2, ArrowLeft, X, Image as ImageIcon, Loader2, CheckCircle, MessageSquare, Bot, RefreshCw, Zap, FileText, Download, Printer, MapPin, Phone, GraduationCap, Briefcase } from 'lucide-react';

/**
 * ================================================================================
 * 🔧 CONFIGURATION AREA (Updated with Real CV Data)
 * ================================================================================
 */

const apiKey = ""; 

const PERSONAL_INFO = {
  name: "Zhou Bowen", 
  title: "Unity3D Developer & Technical Artist",
  bio: "Unity developer and technical generalist with a dual background in Mechatronics and IT. Technically focused on building structured systems in Unity and C# (AI, dialogue, character frameworks, shaders). Aiming for a strong mid-level role with senior potential in architecture and tools.",
  location: "Turku, Finland",
  email: "your.email@example.com", 
  phone: "+358 XX XXX XXXX",
  socials: {
    github: "https://github.com/ZaftZhou",
    linkedin: "https://linkedin.com/in/bowen-zhou-87b616251",
    artstation: "https://dreamzhou.artstation.com/"
  }
};

const FORMSPREE_ENDPOINT = ""; 

const CATEGORIES = ['All', 'Game Dev', 'Shaders', '3D Art', 'Tools'];

const PROJECT_ASSET_BASE = '/projects';
const buildGalleryEntries = (folder, files = []) =>
  files.map((file) => ({
    file,
    folder,
    src: `${PROJECT_ASSET_BASE}/${folder}/${file}`
  }));

// 🌟 Real Data from CV
const EDUCATION_DATA = [
  {
    school: "Turku Univ. Applied Sci",
    degree: "B.Eng. Info Tech",
    year: "Expected 2025"
  },
  {
    school: "Shanghai Maritime Univ.",
    degree: "B.Eng. Mechatronics",
    year: "2014"
  }
];

const EXPERIENCE_DATA = [
  {
    role: "Founder / Technical Generalist",
    company: "Shanghai Demu Network Co., Ltd",
    period: "2019 – Present",
    description: "Founded studio focused on 3D digital content. Coordinated client requirements and provided technical training in 3D tools. Shifted focus towards interactive media and Unity."
  },
  {
    role: "Freelance 3D Artist",
    company: "Self-Employed",
    period: "2018 – 2019",
    description: "Produced assets for clients, optimized for real-time engines."
  },
  {
    role: "3D Product Designer",
    company: "Previous Experience",
    period: "2014 – 2018",
    description: "Designed interactive concepts and conducted technical training."
  }
];

// 🌟 Real Projects from CV
const PROJECTS_DATA = [
  {
    id: 1,
    title: "VINCE – Virtual Integration Home",
    slug: "vince",
    category: "Game Dev",
    description: "Bachelor’s Thesis project. A virtual integration home system focusing on modular avatars and UI architecture.",
    tags: ["Unity", "C#", "Modular Avatar", "UI Architecture"],
    color: "from-cyan-500 to-blue-600",
    details: {
      role: "Unity Developer & Tech Designer",
      duration: "2024–2025",
      challenge: "Creating an efficient avatar system that allows for runtime customization without performance penalties on mobile hardware.",
      solution: "Designed a ScriptableObject database and mask-based shader workflow (RGBA) for efficient recoloring and reduced draw calls. Built a mobile-friendly editor with dynamic lists.",
      features: ["Modular Avatar System", "Mask-based Shader Workflow", "Mobile Optimized UI", "User Research Integration"],
      assetFolder: "vince",
      gallery: buildGalleryEntries('vince', ['cover.jpg', 'ui.jpg', 'avatar-mask.jpg'])
    }
  },
  {
    id: 2,
    title: "AI Enemy System (Prototype)",
    slug: "ai-enemy-system",
    category: "Game Dev",
    description: "A personal prototype focusing on FSM frameworks and perception systems for game AI.",
    tags: ["Unity", "C#", "FSM", "AI Perception"],
    color: "from-purple-500 to-pink-500",
    details: {
      role: "Solo Developer",
      duration: "2024",
      challenge: "Building a generic, reusable state machine that can handle complex enemy behaviors like patrolling, chasing, and wariness.",
      solution: "Implemented a generic state machine with concrete states (Patrol, Chase, Wary). Created a layered perception system with FOV checks and sphere casts.",
      features: ["Generic FSM Framework", "Layered Perception System", "Throttled Updates for Performance"],
      assetFolder: "ai-enemy-system",
      gallery: buildGalleryEntries('ai-enemy-system', ['fsm.jpg', 'perception.jpg'])
    }
  },
  {
    id: 3,
    title: "Dialogue System",
    slug: "dialogue-system",
    category: "Tools",
    description: "A data-driven dialogue system with branching narratives and quest integration.",
    tags: ["Unity", "C#", "ScriptableObject", "Event System"],
    color: "from-emerald-500 to-teal-600",
    details: {
      role: "Solo Developer",
      duration: "2023–2024",
      challenge: "Decoupling dialogue logic from game world state while allowing for complex branching and quest hooks.",
      solution: "Used ScriptableObject definitions for nodes. Built a decoupled event system connecting dialogue to gold, shops, and quest logic.",
      features: ["Data-Driven Architecture", "Quest System Hooks", "Event-based Integration"],
      assetFolder: "dialogue-system",
      gallery: buildGalleryEntries('dialogue-system', ['nodes.jpg', 'quest-hooks.jpg'])
    }
  },
  {
    id: 4,
    title: "Volumetric Cloud Renderer",
    slug: "volumetric-cloud-renderer",
    category: "Shaders",
    description: "A highly optimized ray-marching shader for volumetric clouds. Written in HLSL.",
    tags: ["HLSL", "Shader Graph", "Compute Shaders", "Optimization"],
    color: "from-indigo-500 to-purple-500",
    details: {
      role: "Technical Artist",
      duration: "1 Month",
      challenge: "Rendering volumetric clouds in real-time on mid-range hardware without dropping below 60fps.",
      solution: "Implemented temporal reprojection and half-resolution rendering. Used 3D noise textures generated in Substance Designer for shape definition.",
      features: ["Ray-marching with light scattering", "Weather map support", "Zero garbage collection allocation"],
      assetFolder: "volumetric-cloud-renderer",
      gallery: buildGalleryEntries('volumetric-cloud-renderer', ['clouds.jpg', 'lighting.jpg'])
    }
  },
  {
    id: 5,
    title: "Stylized Water Shader",
    slug: "stylized-water-shader",
    category: "Shaders",
    description: "Zelda-inspired water shader including depth-based color absorption.",
    tags: ["URP", "Shader Graph", "VFX Graph"],
    color: "from-blue-400 to-teal-400",
    details: {
      role: "VFX Artist",
      duration: "2 Weeks",
      challenge: "Replicating the specific stylized look of Nintendo games while maintaining flexibility for different lighting conditions.",
      solution: "Used the Camera Depth Texture to calculate water depth for absorption effects. Added Gerstner waves for vertex displacement.",
      features: ["Depth-based foam", "Refraction & Caustics", "Interactive ripples"],
      assetFolder: "stylized-water-shader",
      gallery: buildGalleryEntries('stylized-water-shader', ['foam.jpg', 'refraction.jpg', 'ripples.jpg'])
    }
  },
  {
    id: 6,
    title: "Sci-Fi Mecha Model",
    slug: "sci-fi-mecha",
    category: "3D Art",
    description: "Hard-surface character model. High-poly sculpted in ZBrush, textured in Substance.",
    tags: ["Blender", "Substance Painter", "ZBrush", "PBR Workflow"],
    color: "from-orange-500 to-red-500",
    details: {
      role: "3D Artist",
      duration: "4 Weeks",
      challenge: "Creating a highly detailed mech that is rigged for animation and optimized for game engines.",
      solution: "Used a boolean workflow in Blender for hard surface forms. Baked high-poly normals onto a low-poly mesh with weighted normals for perfect shading.",
      features: ["40k Tris (Game Ready)", "2 x 4K Texture Sets", "Custom IK Rig"],
      assetFolder: "sci-fi-mecha",
      gallery: buildGalleryEntries('sci-fi-mecha', ['beauty.jpg', 'wireframe.jpg', 'textures.jpg', 'rig.jpg'])
    }
  }
];

const QUICK_PROMPTS = [
  "What is your approach to building reusable gameplay systems?",
  "Tell me about the VINCE virtual integration home project.",
  "How do you optimize shaders for real-time performance?",
  "Which tools have you built to speed up content production?"
];

const PORTFOLIO_STATS = {
  gameplayAndTools: PROJECTS_DATA.filter(p => ['Game Dev', 'Tools'].includes(p.category)).length,
  artAndShaders: PROJECTS_DATA.filter(p => ['Shaders', '3D Art'].includes(p.category)).length,
  experienceRoles: EXPERIENCE_DATA.length,
};

/**
 * ================================================================================
 * 🧠 AI LOGIC AREA
 * ================================================================================
 */

const generateSystemPrompt = () => {
  return `
    You are an AI Digital Assistant for ${PERSONAL_INFO.name}'s portfolio website. 
    Your goal is to help recruiters and visitors understand ${PERSONAL_INFO.name}'s skills and experience.
    Here is ${PERSONAL_INFO.name}'s Resume Data:
    - Bio: ${PERSONAL_INFO.bio}
    - Education: ${JSON.stringify(EDUCATION_DATA)}
    - Work Experience: ${JSON.stringify(EXPERIENCE_DATA)}
    - Projects: ${JSON.stringify(PROJECTS_DATA.map(p => ({ title: p.title, category: p.category, description: p.description, tags: p.tags, tech: p.details?.features })))}
    
    Instructions:
    1. Answer questions in English.
    2. Be concise and professional.
    3. Highlight specific projects (like VINCE or the AI System) when relevant.
  `;
};

const callGeminiAPI = async (userQuery) => {
  if (!apiKey) return "⚠️ API Key is missing.";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: generateSystemPrompt() }] }
  };
  try {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate an answer.";
  } catch (error) { return "Network error."; }
};

/**
 * ================================================================================
 * 🕸️ ANIMATION COMPONENTS
 * ================================================================================
 */
const CentralNeuralNetwork = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const skills = [
      { name: 'C#', color: '#22d3ee', radius: 140, speed: 0.002, offset: 0 },
      { name: 'HLSL', color: '#e879f9', radius: 140, speed: 0.002, offset: Math.PI },
      { name: 'Unity', color: '#ffffff', radius: 190, speed: -0.0015, offset: 1 },
      { name: 'Shader Graph', color: '#a78bfa', radius: 190, speed: -0.0015, offset: 3 },
      { name: 'VFX', color: '#f472b6', radius: 190, speed: -0.0015, offset: 5 },
    ];

    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
    };

    const draw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      time += 1;

      skills.forEach((skill, index) => {
        const angle = time * skill.speed + skill.offset;
        const floatX = Math.cos(time * 0.01 + index) * 5; 
        const floatY = Math.sin(time * 0.01 + index) * 5;
        
        const x = centerX + Math.cos(angle) * skill.radius + floatX;
        const y = centerY + Math.sin(angle) * skill.radius + floatY;

        const pulse = (Math.sin(time * 0.05 + index) + 1) / 2; 
        const alpha = 0.15 + pulse * 0.15;
        
        const gradient = ctx.createLinearGradient(centerX, centerY, x, y);
        gradient.addColorStop(0, `rgba(34, 211, 238, 0)`);
        gradient.addColorStop(0.5, skill.color === '#ffffff' ? `rgba(255,255,255, ${alpha})` : skill.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
        gradient.addColorStop(1, skill.color === '#ffffff' ? `rgba(255,255,255, ${alpha})` : skill.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fill();
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();

        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = skill.color;
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, x, y + 32);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  );
};

const GalleryImage = ({ entry, title }) => {
  const [hasError, setHasError] = useState(false);

  if (!entry || hasError) {
    return (
      <div className="aspect-video bg-slate-800 rounded-xl border border-dashed border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-500 px-4 text-center">
        <ImageIcon size={20} className="text-cyan-400" />
        <p className="text-xs leading-relaxed">
          Place <span className="text-cyan-300">{entry?.file || 'image-name.ext'}</span> in
          <span className="text-cyan-300"> /public{PROJECT_ASSET_BASE}/{entry?.folder || 'your-folder'}</span>
          {' '}then list it in the gallery array.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-slate-900 rounded-xl border border-slate-700 overflow-hidden group hover:border-cyan-500/50 transition-all relative">
      <img
        src={entry.src}
        alt={`${title} image ${entry.file}`}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-xs text-white font-mono">
        {entry.file}
      </div>
    </div>
  );
};

/**
 * ================================================================================
 * 📄 RESUME VIEW COMPONENT (Integrated from CV HTML)
 * ================================================================================
 */
const ResumeView = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in duration-300">
      
      {/* Resume Container (A4-ish ratio max width) */}
      <div className="max-w-5xl mx-auto bg-[#1e1e1e] border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row print:shadow-none print:border-none print:max-w-none print:w-full">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 bg-[#252526] p-8 border-b md:border-b-0 md:border-r border-[#333] flex flex-col gap-8">
          
          {/* Photo & Status */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-lg border-2 border-cyan-500 p-1 mb-3">
               <div className="w-full h-full bg-slate-800 rounded flex items-center justify-center text-cyan-500">
                 <User size={48} />
               </div>
            </div>
            <div className="text-xs font-mono text-green-500 opacity-80 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Status: Online
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 font-mono">
              // CONTACT
            </h3>
            <div className="flex flex-col gap-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3 opacity-90">
                <MapPin size={14} className="text-cyan-500" /> {PERSONAL_INFO.location}
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <Mail size={14} className="text-cyan-500" /> {PERSONAL_INFO.email}
              </div>
              <div className="flex items-center gap-3 opacity-90">
                <Phone size={14} className="text-cyan-500" /> {PERSONAL_INFO.phone}
              </div>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 opacity-90 hover:text-white">
                <Linkedin size={14} className="text-cyan-500" /> LinkedIn
              </a>
              <a href={PERSONAL_INFO.socials.artstation} target="_blank" rel="noreferrer" className="flex items-center gap-3 opacity-90 hover:text-white">
                <ExternalLink size={14} className="text-cyan-500" /> ArtStation
              </a>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 opacity-90 hover:text-white">
                <Github size={14} className="text-cyan-500" /> GitHub
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 font-mono">
              // EDUCATION
            </h3>
            <div className="space-y-4 font-mono text-xs">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx}>
                  <div className="font-bold text-white">{edu.school}</div>
                  <div className="text-yellow-400 opacity-90 mt-1">{edu.degree}</div>
                  <div className="text-slate-500 mt-1">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 font-mono">
              // TECH_STACK
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {['C#', 'Unity', 'FSM/AI', 'ShaderGraph', 'Blender', 'ZBrush', 'Git', 'Rider', 'HLSL'].map(skill => (
                <span key={skill} className="px-2 py-1 border border-slate-600 rounded text-orange-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest border-b border-slate-700 pb-2 font-mono">
              // LANGUAGES
            </h3>
            <ul className="space-y-2 font-mono text-xs text-slate-300">
                <li className="flex justify-between"><span>Chinese</span> <span className="text-slate-500">Native</span></li>
                <li className="flex justify-between"><span>English</span> <span className="text-slate-500">Fluent</span></li>
                <li className="flex justify-between"><span>Finnish</span> <span className="text-slate-500">Basic</span></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-2/3 p-8 md:p-12 flex flex-col gap-8 bg-[#1e1e1e]">
          
          {/* Header */}
          <header className="border-b border-slate-700 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-white font-mono uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <div className="flex items-center gap-2 text-lg md:text-xl font-mono">
                <span className="text-purple-400">class</span>
                <span className="text-cyan-400 font-bold">UnityDeveloper</span>
                <span className="text-slate-400">:</span>
                <span className="text-yellow-400">TechnicalGeneralist</span>
            </div>
          </header>

          {/* Abstract */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3 font-mono text-orange-300">
                <Terminal size={14} className="text-cyan-500" /> 01. ABSTRACT
            </div>
            <div className="p-4 rounded border-l-2 border-cyan-500 bg-[#252526]">
                <p className="leading-relaxed text-sm font-light text-slate-300 text-justify">
                    {PERSONAL_INFO.bio}
                </p>
            </div>
          </section>

          {/* Projects */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 font-mono text-orange-300">
                <Code size={14} className="text-cyan-500" /> 02. PROJECTS
            </div>
            <div className="space-y-6">
              {PROJECTS_DATA.slice(0, 3).map((project) => (
                <div key={project.id} className="relative pl-6 border-l border-slate-700">
                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${project.id === 1 ? 'bg-cyan-500' : 'bg-slate-600'}`}></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <h4 className="font-bold text-lg font-mono text-white">{project.title}</h4>
                        <span className="text-xs font-mono text-slate-500">{project.details?.duration}</span>
                    </div>
                    <div className="text-xs font-bold mb-2 font-mono text-purple-400">{project.details?.role}</div>
                    <ul className="text-sm space-y-2 leading-relaxed text-slate-400">
                        <li className="flex items-start gap-2">
                           <span className="text-cyan-500 mt-1">›</span>
                           <span><strong className="text-yellow-400 font-normal">Challenge:</strong> {project.details?.challenge}</span>
                        </li>
                        <li className="flex items-start gap-2">
                           <span className="text-cyan-500 mt-1">›</span>
                           <span><strong className="text-yellow-400 font-normal">Solution:</strong> {project.details?.solution}</span>
                        </li>
                    </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Work History */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 font-mono text-orange-300">
                <Briefcase size={14} className="text-cyan-500" /> 03. WORK_HISTORY
            </div>
            <div className="space-y-6">
                {EXPERIENCE_DATA.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-slate-700">
                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                            <h4 className="font-bold text-lg font-mono text-white">{exp.company}</h4>
                            <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                        </div>
                        <div className="text-xs font-bold mb-2 font-mono text-purple-400">{exp.role}</div>
                        <p className="text-sm opacity-90 leading-relaxed text-slate-400">{exp.description}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Strengths */}
          <section>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3 font-mono text-orange-300">
                <Zap size={14} className="text-cyan-500" /> 04. STRENGTHS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 rounded border border-slate-700 bg-[#252526]">
                    <h5 className="font-bold text-xs mb-1 font-mono text-cyan-400">System-Oriented</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed">Prefers building reusable systems and tools over one-off scripts. Cares about architecture.</p>
                </div>
                <div className="p-3 rounded border border-slate-700 bg-[#252526]">
                    <h5 className="font-bold text-xs mb-1 font-mono text-cyan-400">Cross-Disciplinary</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed">Can talk with artists and engineers, translating between visual language and technical constraints.</p>
                </div>
                <div className="p-3 rounded border border-slate-700 bg-[#252526]">
                    <h5 className="font-bold text-xs mb-1 font-mono text-cyan-400">Self-Learner</h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed">Constantly dissecting new tech (HardMesh, ZBrush, HDRP) and applying it to practical prototypes.</p>
                </div>
            </div>
          </section>

        </main>
      </div>

      {/* Floating Print Button for Resume View */}
      <button 
        onClick={handlePrint}
        className="fixed bottom-8 right-8 bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-full shadow-2xl shadow-cyan-900/50 transition-transform hover:scale-110 print:hidden z-50"
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
          .max-w-5xl, .max-w-5xl * {
            visibility: visible;
          }
          .max-w-5xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            border: none;
            box-shadow: none;
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Ensure background colors print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * ================================================================================
 * 🛑 MAIN APP RENDER
 * ================================================================================
 */

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // View State: 'home' | 'resume'
  const [currentView, setCurrentView] = useState('home');
  
  // --- Contact & Chat State (English) ---
  const [contactMode, setContactMode] = useState('email');
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  
  // Initial Chat Message in English
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: `Hi there! I'm ${PERSONAL_INFO.name}'s AI assistant. Ask me anything about his skills, experience, or projects! ✨` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  const scrollToSection = (id) => {
    // If we are in Resume view, switch back to home first
    if (currentView !== 'home') {
      setCurrentView('home');
      // Slight delay to allow render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  useEffect(() => { if (selectedProject) window.scrollTo(0, 0); }, [selectedProject]);
  useEffect(() => { if (contactMode === 'chat') chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory, contactMode]);

  const handleContactSubmit = async (e) => {
    e.preventDefault(); setFormStatus('submitting');
    
    setTimeout(() => { 
        setFormStatus('success'); 
        if (!FORMSPREE_ENDPOINT) {
            const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.email}`);
            const body = encodeURIComponent(formData.message);
            window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
        }
        setFormData({ email: '', message: '' }); 
    }, 1500);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);
    const aiResponse = await callGeminiAPI(userMsg);
    setChatHistory(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsChatLoading(false);
  };

  const renderDetailView = () => {
    if (!selectedProject) return null;
    const { details } = selectedProject;
    return (
      <div className="min-h-screen bg-slate-950 animate-in fade-in duration-300">
        <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 h-16 flex items-center px-4 sm:px-8 justify-between">
          <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors font-medium group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </button>
        </nav>
        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className={`w-full h-64 md:h-96 rounded-3xl bg-gradient-to-br ${selectedProject.color} relative overflow-hidden flex items-center justify-center shadow-2xl shadow-cyan-900/20 mb-12`}>
             <div className="text-white opacity-20 transform scale-150">
                {selectedProject.category === 'Game Dev' && <Gamepad2 size={120} />}
                {selectedProject.category === 'Shaders' && <Sparkles size={120} />}
                {selectedProject.category === '3D Art' && <Box size={120} />}
                {selectedProject.category === 'Tools' && <Terminal size={120} />}
             </div>
             <div className="absolute bottom-8 left-8 md:left-12 right-8">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-cyan-400">{selectedProject.category}</span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{selectedProject.title}</h1>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-10">
              <section><h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Cpu size={20} className="text-cyan-500" /> The Challenge</h3><p className="text-slate-400 leading-relaxed text-lg">{details?.challenge}</p></section>
              <section><h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Code size={20} className="text-cyan-500" /> The Solution</h3><p className="text-slate-400 leading-relaxed text-lg">{details?.solution}</p></section>
              <section><h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><ImageIcon size={20} className="text-cyan-500" /> Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{details?.gallery?.length
                  ? details.gallery.map((entry, idx) => (
                      <GalleryImage key={`${entry.src}-${idx}`} entry={entry} title={selectedProject.title} />
                    ))
                  : <p className="text-slate-500">No images yet. Add file names to the gallery array for this project.</p>}
                </div>
              </section>
            </div>
            <aside className="space-y-8">
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Details</h4>
                  <div className="space-y-4">
                    <div><span className="text-slate-500 text-sm block mb-1">Role</span><span className="text-white font-medium">{details?.role}</span></div>
                    <div><span className="text-slate-500 text-sm block mb-1">Duration</span><span className="text-white font-medium">{details?.duration}</span></div>
                    <div><span className="text-slate-500 text-sm block mb-1">Tech Stack</span><div className="flex flex-wrap gap-2 mt-2">{selectedProject.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 bg-slate-800 border border-slate-700 rounded text-cyan-300">{tag}</span>)}</div></div>
                  </div>
               </div>
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                 <div className="flex items-center gap-2 text-slate-300 font-semibold"><RefreshCw size={16} className="text-cyan-400" /> Faster uploads next time</div>
                 <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                   <li>Create <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">public{PROJECT_ASSET_BASE}/{details?.assetFolder || selectedProject.slug}</code></li>
                   <li>Drop JPG/PNG/WebP files there (keep names simple, e.g. <span className="text-cyan-300">cover.jpg</span>).</li>
                   <li>Update <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">PROJECTS_DATA</code> → <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300">gallery</code> with the filenames only.</li>
                 </ol>
                 <div className="text-xs text-slate-500 bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                   Example: <span className="text-cyan-300">gallery: buildGalleryEntries('{details?.assetFolder || selectedProject.slug}', ['cover.jpg', 'ui-01.png'])</span>
                 </div>
               </div>
            </aside>
          </div>
        </main>
      </div>
    );
  };

  // RENDER ROUTER
  if (selectedProject) return renderDetailView();
  if (currentView === 'resume') {
    return (
      <>
        <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-50 h-16 flex items-center px-4 sm:px-8 justify-between print:hidden">
          <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors font-medium group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">CV_VIEW_MODE</div>
        </nav>
        <ResumeView />
      </>
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white animate-in fade-in">
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-15deg); } 50% { transform: translateX(150%) skewX(-15deg); } 100% { transform: translateX(150%) skewX(-15deg); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .card-shimmer:hover::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); animation: shimmer 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>

      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent" onClick={() => scrollToSection('hero')} style={{cursor: 'pointer'}}>{PERSONAL_INFO.name}.</div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              {['About', 'Portfolio', 'Experience', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase() === 'about' ? 'hero' : item.toLowerCase())} className="text-slate-400 hover:text-white transition-colors uppercase tracking-wide">{item}</button>
              ))}
              {/* 🌟 RESUME BUTTON */}
              <button onClick={() => setCurrentView('resume')} className="text-cyan-400 hover:text-white transition-colors uppercase tracking-wide border border-cyan-500/30 px-3 py-1 rounded hover:bg-cyan-500/10 flex items-center gap-2">
                 <FileText size={14} /> Resume
              </button>
            </div>
            <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}><span className="sr-only">Open menu</span><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               {['About', 'Portfolio', 'Experience', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase() === 'about' ? 'hero' : item.toLowerCase())} className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800 w-full text-left">{item}</button>
              ))}
              <button onClick={() => { setCurrentView('resume'); setIsMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:text-white hover:bg-slate-800 w-full text-left">Resume / CV</button>
            </div>
          </div>
        )}
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 min-h-[600px]">
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20"><Sparkles size={14} className="mr-2" />Tech Art & Game Development</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{PERSONAL_INFO.name}</span></h1>
          <h2 className="text-xl sm:text-2xl text-slate-400 font-light">{PERSONAL_INFO.title}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">{PERSONAL_INFO.bio}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <button onClick={() => scrollToSection('portfolio')} className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10">View Projects</button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-3 rounded-full bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-all">Contact Me</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Gameplay & Tools</p>
              <p className="text-2xl font-bold text-white">{PORTFOLIO_STATS.gameplayAndTools} projects</p>
              <p className="text-sm text-slate-400">State machines, dialogue pipelines, runtime UI systems.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Shaders & Art</p>
              <p className="text-2xl font-bold text-white">{PORTFOLIO_STATS.artAndShaders} showcases</p>
              <p className="text-sm text-slate-400">HLSL, Shader Graph, VFX-ready 3D assets.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Experience</p>
              <p className="text-2xl font-bold text-white">{PORTFOLIO_STATS.experienceRoles}+ roles</p>
              <p className="text-sm text-slate-400">Hands-on across studios, freelance, and founding a team.</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-slate-500">
            <a href={PERSONAL_INFO.socials.github} className="hover:text-white transition-colors"><Github size={24} /></a>
            <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
        
        <div className="flex-1 relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
          <CentralNeuralNetwork />
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-800/90 border-4 border-slate-700/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-float">
             <Box size={60} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
      </section>

      <div className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-center text-slate-500 text-xs font-bold mb-8 uppercase tracking-[0.2em]">Technical Arsenal</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70">
            {['Unity 3D', 'C#', 'HLSL', 'Shader Graph', 'Blender', 'Substance Painter', 'ZBrush', 'Git'].map((skill) => <span key={skill} className="text-lg font-semibold text-slate-300 hover:text-cyan-400 transition-colors cursor-default">{skill}</span>)}
          </div>
        </div>
      </div>

      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2"><Layers className="text-cyan-500" /> Selected Works</h2>
            <p className="text-slate-400">Click on any project to view the full breakdown.</p>
          </div>
          <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>{cat}</button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)} 
              className="group card-shimmer bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-400 transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col h-full cursor-pointer relative"
            >
              <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden p-6 flex items-center justify-center`}>
                 <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-all"></div>
                 <div className="bg-slate-950/30 backdrop-blur-sm p-4 rounded-full transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 border border-white/10 relative z-10 shadow-lg">
                    {project.category === 'Game Dev' && <Gamepad2 size={32} className="text-white" />}
                    {project.category === 'Shaders' && <Sparkles size={32} className="text-white" />}
                    {project.category === '3D Art' && <Box size={32} className="text-white" />}
                    {project.category === 'Tools' && <Terminal size={32} className="text-white" />}
                 </div>
                 <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-xs text-white font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">View Details →</div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative z-20 bg-slate-900 group-hover:bg-slate-800/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">{project.tags.map(tag => <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 font-mono">{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="py-20 bg-slate-900/30 border-y border-slate-800/50">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Work Experience</h2>
            <div className="space-y-12 border-l-2 border-slate-800 pl-8 ml-4">
                {EXPERIENCE_DATA.map((exp, idx) => (
                  <div key={idx} className="relative group hover:pl-2 transition-all duration-300">
                     <div className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform ${idx === 0 ? 'bg-cyan-500' : 'bg-slate-600'}`}></div>
                     <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                     <p className="text-cyan-400 mb-2 font-mono text-sm">{exp.company} | {exp.period}</p>
                     <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
            </div>
         </div>
      </section>

      <section id="contact" className="py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Have a question? You can email me directly, or chat with my AI assistant to learn more about my work instantly.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Direct Email</p>
            <p className="text-white font-semibold mb-3 break-words">{PERSONAL_INFO.email}</p>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors"><Mail size={16} /> Compose Message</a>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Location</p>
            <p className="text-white font-semibold">{PERSONAL_INFO.location}</p>
            <p className="text-slate-400 text-sm">Available for hybrid and remote collaborations.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Networks</p>
            <div className="flex items-center gap-3 text-slate-300">
              <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-white transition-colors inline-flex items-center gap-1"><Linkedin size={16} /> LinkedIn</a>
              <span className="text-slate-600">•</span>
              <a href={PERSONAL_INFO.socials.github} className="hover:text-white transition-colors inline-flex items-center gap-1"><Github size={16} /> GitHub</a>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex border-b border-slate-800">
            <button onClick={() => setContactMode('email')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${contactMode === 'email' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}><Mail size={18} /> Send Email</button>
            <button onClick={() => setContactMode('chat')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${contactMode === 'chat' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}><Sparkles size={18} className={contactMode === 'chat' ? "text-cyan-400" : ""} /> Ask AI Assistant</button>
          </div>
          <div className="p-6 sm:p-8 min-h-[400px]">
            {contactMode === 'email' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col justify-center">
                {formStatus === 'success' ? (
                  <div className="py-12 flex flex-col items-center"><div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500"><CheckCircle size={32} /></div><h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3><p className="text-slate-400 text-center mb-6">{FORMSPREE_ENDPOINT ? "Thanks for reaching out." : "I've opened your email client."}</p><button onClick={() => setFormStatus('idle')} className="text-cyan-400 hover:text-white underline">Send another message</button></div>
                ) : (
                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <div><label htmlFor="email" className="sr-only">Your Email</label><input type="email" id="email" placeholder="your.email@example.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50" disabled={formStatus === 'submitting'} /></div>
                    <div><label htmlFor="message" className="sr-only">Message</label><textarea id="message" rows={5} placeholder="Hi Zhou, I have a project regarding..." required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none disabled:opacity-50" disabled={formStatus === 'submitting'}></textarea></div>
                    <button disabled={formStatus === 'submitting'} className="w-full py-3 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">{formStatus === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={18} />}{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</button>
                  </form>
                )}
              </div>
            )}
            {contactMode === 'chat' && (
              <div className="flex flex-col h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-wrap gap-2 mb-4">
                  {QUICK_PROMPTS.map(prompt => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setChatInput(prompt)}
                      className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <div className="flex-grow overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  {chatHistory.map((msg, idx) => (<div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-slate-700'}`}>{msg.role === 'ai' ? <Bot size={18} className="text-white" /> : <User size={18} className="text-slate-300" />}</div><div className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[80%] ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700' : 'bg-cyan-900/30 text-cyan-100 rounded-tr-none border border-cyan-500/30'}`}>{msg.text}</div></div>))}
                  {isChatLoading && (<div className="flex items-start gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-white" /></div><div className="p-3 bg-slate-800 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-2"><Loader2 size={16} className="animate-spin text-cyan-400" /><span className="text-slate-400 text-xs">Thinking...</span></div></div>)}<div ref={chatEndRef} />
                </div>
                <form onSubmit={handleChatSubmit} className="relative mt-auto"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about my skills..." className="w-full pl-4 pr-12 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" disabled={isChatLoading} /><button type="submit" disabled={!chatInput.trim() || isChatLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-800 text-cyan-400 rounded-lg hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><Send size={16} /></button></form>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-slate-950"><p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p></footer>
    </div>
  );
};

export default App;