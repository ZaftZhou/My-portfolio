import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Terminal, ChevronDown, Send, User, Layers, Sparkles, Box, Cpu, Gamepad2, ArrowLeft, X, Image as ImageIcon, Loader2, CheckCircle, MessageSquare, Bot, RefreshCw, Zap, MapPin, Phone, FileText, ChevronLeft, ChevronRight, Play, Video, Printer, Briefcase, MousePointer2, Activity, Shield } from 'lucide-react';
/**
 * ================================================================================
 * 🔧 CONFIGURATION AREA
 * ================================================================================
 */

// 🔑 Gemini API Key
const apiKey = ""; 

const PERSONAL_INFO = {
  name: "Zhou Bowen", 
  title: "Unity3D Developer & Technical Artist",
  bio: "Unity developer and technical generalist with a dual background in Mechatronics and IT. Technically focused on building structured systems in Unity and C# (AI, dialogue, character frameworks, shaders). Aiming for a strong mid-level role with senior potential in architecture and tools.",
  location: "Turku, Finland",
  email: "z375642161@gmail.com", 
  phone: "+358 415710055",
  socials: {
    github: "https://github.com/ZaftZhou",
    linkedin: "https://linkedin.com/in/bowen-zhou-87b616251",
    artstation: "https://dreamzhou.artstation.com/"
  }
};

// 📧 Email Service Configuration
const FORMSPREE_ENDPOINT = ""; 

const CATEGORIES = ['All', 'Game Dev', 'Shaders','Simulator', '3D Art', 'Tools'];

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'letmein',
};

// 📝 UPDATED EXPERIENCE DATA FROM USER IMAGE
const EXPERIENCE_DATA = [
  {
    role: "Founder / Technical Generalist",
    company: "Shanghai Demoon Network Co., Ltd",
    period: "2019 - Present",
    description: "Founded studio focused on 3D digital content. Coordinated client requirements and provided technical training in 3D tools. Shifted focus towards interactive media and Unity."
  },
  {
    role: "Freelance 3D Artist",
    company: "Self-Employed",
    period: "2018 - 2019",
    description: "Produced assets for clients, optimized for real-time engines."
  },
  {
    role: "3D Product Designer",
    company: "Previous Experience",
    period: "2014 - 2018",
    description: "Designed interactive concepts and conducted technical training."
  }
];

// 🎓 EDUCATION DATA (Inferred from Bio for Resume View)
const EDUCATION_DATA = [
  {
    school: "Turku University of Applied Sciences",
    degree: "Bachelor of Engineering, Information Technology",
    year: "2020 - 2024"
  },
  {
    school: "University of Science & Technology",
    degree: "Bachelor of Engineering, Mechatronics",
    year: "2016 - 2020"
  }
];

// 🛠️ MOCK DATA FOR GALLERY (Replace URLs with your local paths)
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "VINCE – Virtual Integration Home",
    category: "Game Dev",
    description: "Bachelor’s Thesis project. A virtual integration home system focusing on modular avatars and UI architecture.",
    tags: ["Unity", "C#", "Modular Avatar", "UI Architecture"],
    color: "from-cyan-500 to-blue-600",
    details: {
      role: "Unity Developer & Tech Designer",
      duration: "2025.9-2025.11",
      challenge: "Creating an efficient avatar system that allows for runtime customization without performance penalties on mobile hardware.",
      solution: "Designed a ScriptableObject database and mask-based shader workflow (RGBA) for efficient recoloring and reduced draw calls. Built a mobile-friendly editor with dynamic lists.",
      features: ["Modular Avatar System", "Mask-based Shader Workflow", "Mobile Optimized UI", "User Research Integration"],
      media: [
        { 
          type: 'video', 
          url: '/projects/vince/video1.mp4', 
          poster: '/projects/vince/image1.png', 
          caption: 'Avatar Customization Demo' 
        },
        { type: 'image', url: '/projects/vince/image1.png', caption: 'Main Menu UI' },
        { type: 'image', url: '/projects/vince/image2.png', caption: 'Stylized shader' },
        { type: 'image', url: '/projects/vince/image3.png', caption: 'DataBase setting' },
      ]
    }
  },
  {
    id: 2,
    title: "AI Enemy System (Prototype)",
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
      media: [
         { type: 'video', url: '/projects/aiEnemy/video1.mp4', caption: 'Simple State Machine Demo' },
        { type: 'image', url: 'https://picsum.photos/800/400?random=201', caption: 'FSM Debug Gizmos' },
        { type: 'image', url: 'https://picsum.photos/600/600?random=202', caption: 'Perception Cone' },
        { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', caption: 'AI Patrolling Behavior' },
      ]
    }
  },
  {
    id: 3,
    title: "Dialogue System",
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
      media: [
        { type: 'image', url: 'https://picsum.photos/800/600?random=301', caption: 'Node Graph Editor' },
        { type: 'image', url: 'https://picsum.photos/800/600?random=302', caption: 'In-Game Dialogue UI' },
      ]
    }
  },
  {
    id: 4,
    title: "Visualize Drone Swarm Algorithm",
    category: "Simulator",
    description: "A highly optimized ray-marching shader for volumetric clouds. Written in HLSL.",
    tags: ["Visualization", "Simulator", "Algorithm", "Research"],
    color: "from-indigo-500 to-purple-500",
    details: {
      role: "Algorithm designer and Developer",
      duration: "1 Month",
      challenge: "Coordinating multiple drones to efficiently cover a search area without overlap or missed zones.",
      solution: "Partitioned grid algorithm that divides the area by drone count, assigns systematic scan patterns (horizontal/spiral), with real-time coverage tracking and GPU trajectory rendering.",
      features: ["Ray-marching with light scattering", "Weather map support", "Zero garbage collection allocation"],
      media: [
        { type: 'video', url: '/projects/drone/video1.mp4', caption: 'Visualize Drone Swarm Algorithm Demo' },
        { type: 'image', url: '/projects/drone/image1.png', caption: 'Spiral patten' },
        { type: 'image', url: '/projects/drone/image2.png', caption: 'Grid patten' },
       ]
    }
  },
  {
    id: 5,
    title: "Stylized Water Shader",
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
      media: [
        { type: 'image', url: 'https://picsum.photos/800/600?random=501', caption: 'Water Edge Foam' },
        { type: 'image', url: 'https://picsum.photos/800/600?random=502', caption: 'Underwater Caustics' },
      ]
    }
  },
  {
    id: 6,
    title: "Sci-Fi Mecha Model",
    category: "3D Art",
    description: "Hard-surface character model. High-poly sculpted in ZBrush, textured in Substance.",
    tags: ["Blender", "Substance Painter", "ZBrush", "PBR Workflow"],
    color: "from-orange-500 to-red-500",
    details: {
      role: "3D Artist",
      duration: "Free time",
      challenge: "Creating a highly detailed Sci-Fi model",
      solution: "Design and make the model by blender,render in Marmoset 3.",

      media: [
        { type: 'image', url: '/projects/hardmesh/1.jpg', caption: 'Sci-Fi Computer' }, // Tall Portrait
        { type: 'image', url: '/projects/hardmesh/2.jpg', caption: 'Sci-Fi Cannon' },
        { type: 'image', url: '/projects/hardmesh/3.jpg', caption: 'Sci-Fi Gun' },
        { type: 'image', url: '/projects/hardmesh/4.jpg', caption: 'Sci-Fi Gun' },
        { type: 'image', url: '/projects/hardmesh/5.jpg', caption: 'Sci-Fi Machine Leg' },
        { type: 'image', url: '/projects/hardmesh/6.jpg', caption: 'Sci-Fi Cannon' },
      ]
    }
  }
];

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
    - Work Experience: ${JSON.stringify(EXPERIENCE_DATA)}
    - Projects: ${JSON.stringify(DEFAULT_PROJECTS.map(p => ({ title: p.title, category: p.category, description: p.description, tags: p.tags, tech: p.details?.features })))}
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

// 🌟 NEW: Reveal Animation Component (Updated with className support)
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

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

/**
 * ================================================================================
 * 📄 RESUME VIEW COMPONENT (Dracula Theme)
 * ================================================================================
 */
const ResumeView = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#282a36] pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in duration-300">

      {/* Back Button - Top Left */}
      <button 
        onClick={onClose} 
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-[#6272a4] hover:text-[#f8f8f2] bg-[#282a36]/50 hover:bg-[#44475a] px-4 py-2 rounded-full backdrop-blur border border-[#44475a] transition-all print:hidden group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm font-bold">BACK_TO_SITE</span>
      </button>

      {/* Resume Container - README Layout (Column Direction) */}
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
              {projects.slice(0, 3).map((project, idx) => (
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
};

/**
 * ================================================================================
 * 🛑 VIEW RENDERING AREA
 * ================================================================================
 */

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [customPages, setCustomPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showResume, setShowResume] = useState(false); // 🌟 New State for Resume View
  const [contactMode, setContactMode] = useState('email');
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('admin-session') === 'true');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [authFields, setAuthFields] = useState({ username: '', password: '', error: '' });
  const [projectForm, setProjectForm] = useState({ title: '', category: '', description: '', tags: '', image: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [pageForm, setPageForm] = useState({ title: '', slug: '', content: '', coverImage: '' });
  const [editingPageId, setEditingPageId] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: `Hi there! I'm ${PERSONAL_INFO.name}'s AI assistant. Ask me anything about his skills, experience, or projects! ✨` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // 🌟 LIGHTBOX STATE
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const chatEndRef = useRef(null);
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio-projects');
    const storedPages = localStorage.getItem('portfolio-pages');
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedPages) setCustomPages(JSON.parse(storedPages));
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio-pages', JSON.stringify(customPages));
  }, [customPages]);

  useEffect(() => {
    localStorage.setItem('admin-session', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => { if (selectedProject) window.scrollTo(0, 0); }, [selectedProject]);
  useEffect(() => { if (showResume) window.scrollTo(0, 0); }, [showResume]);
  useEffect(() => { if (contactMode === 'chat') chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory, contactMode]);

  // 🌟 KEYBOARD NAVIGATION FOR LIGHTBOX
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevMedia();
      if (e.key === 'ArrowRight') nextMedia();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentMediaIndex]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      authFields.username === ADMIN_CREDENTIALS.username &&
      authFields.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAdmin(true);
      setAdminModalOpen(false);
      setAuthFields({ username: '', password: '', error: '' });
    } else {
      setAuthFields((prev) => ({ ...prev, error: '账号或密码不正确。' }));
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminModalOpen(false);
  };

  const handleProjectImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProjectForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handlePageCoverUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPageForm((prev) => ({ ...prev, coverImage: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.category) return;

    const tags = projectForm.tags ? projectForm.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
    const existingProject = projects.find((p) => p.id === editingProjectId);

    if (existingProject) {
      const updated = {
        ...existingProject,
        title: projectForm.title,
        category: projectForm.category,
        description: projectForm.description || existingProject.description,
        tags,
        details: {
          ...existingProject.details,
          challenge: projectForm.description || existingProject.details?.challenge,
          features: tags.length ? tags : existingProject.details?.features,
          media: projectForm.image
            ? [{ type: 'image', url: projectForm.image, caption: projectForm.title }]
            : existingProject.details?.media || [],
        },
      };
      setProjects((prev) => prev.map((p) => (p.id === editingProjectId ? updated : p)));
    } else {
      const newProject = {
        id: Date.now(),
        title: projectForm.title,
        category: projectForm.category,
        description: projectForm.description || '暂无描述。',
        tags,
        color: 'from-cyan-500 to-blue-600',
        details: {
          role: 'Administrator',
          duration: '自定义项目',
          challenge: projectForm.description,
          solution: '通过后台面板快速创建。',
          features: tags,
          media: projectForm.image ? [{ type: 'image', url: projectForm.image, caption: projectForm.title }] : [],
        },
      };

      setProjects((prev) => [...prev, newProject]);
    }

    setEditingProjectId(null);
    setProjectForm({ title: '', category: '', description: '', tags: '', image: '' });
  };

  const handleAddPage = (e) => {
    e.preventDefault();
    if (!pageForm.title || !pageForm.content) return;
    const slug = pageForm.slug || pageForm.title.toLowerCase().replace(/\s+/g, '-');
    const existingPage = customPages.find((page) => page.id === editingPageId);

    if (existingPage) {
      const updated = {
        ...existingPage,
        title: pageForm.title,
        slug,
        content: pageForm.content,
        coverImage: pageForm.coverImage || existingPage.coverImage,
      };
      setCustomPages((prev) => prev.map((page) => (page.id === editingPageId ? updated : page)));
    } else {
      const newPage = {
        id: Date.now(),
        title: pageForm.title,
        slug,
        content: pageForm.content,
        coverImage: pageForm.coverImage,
      };

      setCustomPages((prev) => [...prev, newPage]);
    }

    setEditingPageId(null);
    setPageForm({ title: '', slug: '', content: '', coverImage: '' });
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description || project.details?.challenge || '',
      tags: project.tags?.join(', ') || '',
      image: '',
    });
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (editingProjectId === id) {
      setEditingProjectId(null);
      setProjectForm({ title: '', category: '', description: '', tags: '', image: '' });
    }
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const handleEditPage = (page) => {
    setEditingPageId(page.id);
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      coverImage: '',
    });
  };

  const handleDeletePage = (id) => {
    setCustomPages((prev) => prev.filter((page) => page.id !== id));
    if (editingPageId === id) {
      setEditingPageId(null);
      setPageForm({ title: '', slug: '', content: '', coverImage: '' });
    }
    if (selectedPage?.id === id) {
      setSelectedPage(null);
    }
  };

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

  // 🌟 LIGHTBOX HANDLERS
  const openLightbox = (index) => {
    setCurrentMediaIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextMedia = (e) => {
    e?.stopPropagation();
    if (!selectedProject?.details?.media) return;
    setCurrentMediaIndex((prev) => (prev + 1) % selectedProject.details.media.length);
  };

  const prevMedia = (e) => {
    e?.stopPropagation();
    if (!selectedProject?.details?.media) return;
    setCurrentMediaIndex((prev) => (prev - 1 + selectedProject.details.media.length) % selectedProject.details.media.length);
  };

  const renderDetailView = () => {
    if (!selectedProject) return null;
    const { details } = selectedProject;
    
    // Ensure media exists, fallback to empty array
    const mediaList = details.media || [];

    return (
      <div className="min-h-screen bg-slate-950 animate-in fade-in duration-300 relative">
        <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 z-40 h-16 flex items-center px-4 sm:px-8 justify-between">
          <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors font-medium group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </button>
        </nav>

        <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Header Area */}
          <div className={`w-full h-64 md:h-96 rounded-3xl bg-gradient-to-br ${selectedProject.color} relative overflow-hidden flex items-center justify-center shadow-2xl shadow-cyan-900/20 mb-12`}>
             <div className="text-white opacity-20 transform scale-150">
                {selectedProject.category === 'Game Dev' && <Gamepad2 size={120} />}
                {selectedProject.category === 'Shaders' && <Sparkles size={120} />}
                {selectedProject.category === '3D Art' && <Box size={120} />}
                {selectedProject.category === 'Tools' && <Terminal size={120} />}
                {selectedProject.category === 'Tools' && <Activity size={120} />}
             </div>
             <div className="absolute bottom-8 left-8 md:left-12 right-8">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-cyan-400">{selectedProject.category}</span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{selectedProject.title}</h1>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Left Content Column */}
            <div className="md:col-span-2 space-y-10">
              <section><h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Cpu size={20} className="text-cyan-500" /> The Challenge</h3><p className="text-slate-400 leading-relaxed text-lg">{details?.challenge}</p></section>
              <section><h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Code size={20} className="text-cyan-500" /> The Solution</h3><p className="text-slate-400 leading-relaxed text-lg">{details?.solution}</p></section>

              {/* 🌟 MASONRY GALLERY */}
              <section>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><ImageIcon size={20} className="text-cyan-500" /> Gallery & Media</h3>
                {mediaList.length > 0 ? (
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                    {mediaList.map((mediaItem, idx) => (
                      <div 
                        key={idx} 
                        className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-800 border border-slate-700 cursor-pointer shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                        onClick={() => openLightbox(idx)}
                      >
                         {/* Render based on type */}
                         {mediaItem.type === 'video' ? (
                           <div className="relative">
                             <video 
                                src={mediaItem.url} 
                                // 🔥 Changed: Increased scale to 110, added brightness effect, and added poster support
                                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                                muted
                                preload="metadata"
                                poster={mediaItem.poster} // 🌟 Added Poster
                             />
                             <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-all duration-500">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/80 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                   <Play fill="white" className="text-white ml-1" size={20} />
                                </div>
                             </div>
                             <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-xs font-bold text-white flex items-center gap-1"><Video size={12}/> Video</div>
                           </div>
                         ) : (
                           <div className="relative">
                             <img 
                               src={mediaItem.url} 
                               alt={mediaItem.caption || `Gallery Image ${idx}`} 
                               // 🔥 Changed: Increased scale to 110 and added brightness effect
                               className="w-full h-auto object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                               loading="lazy"
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                           </div>
                         )}
                         
                         {/* Caption Overlay on Hover */}
                         {mediaItem.caption && (
                           <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <p className="text-white text-sm font-medium">{mediaItem.caption}</p>
                           </div>
                         )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 border border-dashed border-slate-700 p-8 rounded-xl text-center">No media available for this project yet.</p>
                )}
              </section>
            </div>

            {/* Right Sidebar Info */}
            <aside className="space-y-8 h-fit">
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project Details</h4>
                  <div className="space-y-4">
                    <div><span className="text-slate-500 text-sm block mb-1">Role</span><span className="text-white font-medium">{details?.role}</span></div>
                    <div><span className="text-slate-500 text-sm block mb-1">Duration</span><span className="text-white font-medium">{details?.duration}</span></div>
                    <div><span className="text-slate-500 text-sm block mb-1">Tech Stack</span><div className="flex flex-wrap gap-2 mt-2">{selectedProject.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 bg-slate-800 border border-slate-700 rounded text-cyan-300">{tag}</span>)}</div></div>
                  </div>
               </div>
            </aside>
          </div>
        </main>

        {/* 🌟 FULLSCREEN LIGHTBOX OVERLAY */}
        {lightboxOpen && mediaList[currentMediaIndex] && (
          <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200" onClick={closeLightbox}>
             {/* Close Button */}
             <button 
                onClick={closeLightbox} 
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-slate-800 rounded-full transition-all z-50"
             >
                <X size={32} />
             </button>

             {/* Main Content Area */}
             <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
                
                {/* Previous Button */}
                <button 
                  onClick={prevMedia}
                  className="absolute left-2 md:left-8 p-3 bg-black/50 hover:bg-cyan-500 text-white rounded-full transition-all backdrop-blur-sm group border border-white/10 hover:border-cyan-400 z-10"
                >
                  <ChevronLeft size={32} className="group-active:-translate-x-1 transition-transform" />
                </button>

                {/* Media Content */}
                <div className="relative max-w-full max-h-full shadow-2xl shadow-black">
                   {mediaList[currentMediaIndex].type === 'video' ? (
                     <video 
                       src={mediaList[currentMediaIndex].url} 
                       controls 
                       autoPlay 
                       className="max-h-[85vh] max-w-[90vw] rounded shadow-lg bg-black"
                     >
                        Your browser does not support video.
                     </video>
                   ) : (
                     <img 
                       src={mediaList[currentMediaIndex].url} 
                       alt={mediaList[currentMediaIndex].caption}
                       className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-lg"
                     />
                   )}
                   
                   {/* Caption in Lightbox */}
                   {mediaList[currentMediaIndex].caption && (
                     <div className="absolute -bottom-12 left-0 right-0 text-center">
                        <p className="text-white text-lg font-medium tracking-wide">{mediaList[currentMediaIndex].caption}</p>
                        <p className="text-slate-500 text-sm mt-1">{currentMediaIndex + 1} / {mediaList.length}</p>
                     </div>
                   )}
                </div>

                {/* Next Button */}
                <button 
                  onClick={nextMedia}
                  className="absolute right-2 md:right-8 p-3 bg-black/50 hover:bg-cyan-500 text-white rounded-full transition-all backdrop-blur-sm group border border-white/10 hover:border-cyan-400 z-10"
                >
                  <ChevronRight size={32} className="group-active:translate-x-1 transition-transform" />
                </button>

             </div>
          </div>
        )}

      </div>
    );
  };

  const renderPageView = () => {
    if (!selectedPage) return null;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <button
            onClick={() => setSelectedPage(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all"
          >
            <ArrowLeft size={16} /> 返回作品页
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {selectedPage.coverImage && (
              <img
                src={selectedPage.coverImage}
                alt={selectedPage.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-8 space-y-4">
              <h2 className="text-3xl font-bold text-white">{selectedPage.title}</h2>
              <div className="text-slate-400 text-sm">自定义链接：{selectedPage.slug}</div>
              <div className="prose prose-invert max-w-none whitespace-pre-line leading-relaxed text-slate-200">
                {selectedPage.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 🌟 CONDITIONAL RENDERING
  if (showResume) return <ResumeView onClose={() => setShowResume(false)} />;
  if (selectedProject) return renderDetailView();
  if (selectedPage) return renderPageView();

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
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">{PERSONAL_INFO.name}.</div>
            <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
              {['About', 'Portfolio', 'Pages', 'Experience', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase() === 'about' ? 'hero' : item.toLowerCase())} className="text-slate-400 hover:text-white transition-colors uppercase tracking-wide">{item}</button>
              ))}
              
              {/* 🌟 SWITCH TO RESUME VIEW BUTTON */}
              <button
                onClick={() => setShowResume(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider ml-4 group"
              >
                <FileText size={14} className="group-hover:scale-110 transition-transform"/>
                Resume
              </button>

              <button
                onClick={() => setAdminModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider ml-2 transition-all ${isAdmin ? 'bg-green-500/20 text-green-200 border-green-500/50' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'}`}
              >
                <Shield size={14} />
                {isAdmin ? 'Admin 面板' : '后台登录'}
              </button>

            </div>
            <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}><span className="sr-only">Open menu</span><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               {['About', 'Portfolio', 'Pages', 'Experience', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase() === 'about' ? 'hero' : item.toLowerCase())} className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800 w-full text-left">{item}</button>
              ))}
              <button onClick={() => { setShowResume(true); setIsMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:text-white hover:bg-slate-800 w-full text-left flex items-center gap-2">
                <FileText size={16} /> Resume
              </button>
              <button onClick={() => { setAdminModalOpen(true); setIsMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 w-full text-left flex items-center gap-2">
                <Shield size={16} /> {isAdmin ? 'Admin 面板' : '后台登录'}
              </button>
            </div>
          </div>
        )}
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 min-h-[600px]">
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <RevealOnScroll delay={100}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20"><Sparkles size={14} className="mr-2" />Tech Art & Game Development</div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{PERSONAL_INFO.name}</span></h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={300}>
            <h2 className="text-xl sm:text-2xl text-slate-400 font-light">{PERSONAL_INFO.title}</h2>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={500}>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <button onClick={() => scrollToSection('portfolio')} className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10">View Projects</button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3 rounded-full bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-all">Contact Me</button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={600}>
            <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-slate-500">
              <a href={PERSONAL_INFO.socials.github} className="hover:text-white transition-colors"><Github size={24} /></a>
              <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors"><Mail size={24} /></a>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* 🌟 Hero Visual: Central Hub Neural Network */}
        <div className="flex-1 relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
          {/* Background: Dynamic Connections */}
          <CentralNeuralNetwork />

          {/* Core: Central Box Icon */}
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
            <RevealOnScroll>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2"><Layers className="text-cyan-500" /> Selected Works</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-slate-400">Click on any project to view the full breakdown.</p>
            </RevealOnScroll>
          </div>
          <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>{cat}</button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            // 🌟 Added RevealOnScroll with staggered delay and h-full to maintain grid layout
            <RevealOnScroll key={project.id} delay={index * 100} className="h-full">
              <div 
                onClick={() => setSelectedProject(project)} 
                className="group card-shimmer bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-400 transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col h-full cursor-pointer relative"
              >
                <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden p-6 flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-all"></div>
                  {/* Icon Scale & Rotate */}
                  <div className="bg-slate-950/30 backdrop-blur-sm p-4 rounded-full transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 border border-white/10 relative z-10 shadow-lg">
                      {project.category === 'Game Dev' && <Gamepad2 size={32} className="text-white" />}
                      {project.category === 'Shaders' && <Sparkles size={32} className="text-white" />}
                      {project.category === '3D Art' && <Box size={32} className="text-white" />}
                      {project.category === 'Tools' && <Terminal size={32} className="text-white" />}
                      {project.category === 'Simulator' && <Activity size={32} className="text-white" />}
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
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section id="pages" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <RevealOnScroll>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2"><FileText className="text-cyan-500" /> 自定义作品页面</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="text-slate-400">在后台登录后，可以在这里创建专属的图文作品页。</p>
            </RevealOnScroll>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
            <Shield size={16} className="text-green-400" />
            {isAdmin ? '已登录管理员，可以创建新的页面。' : '需要管理员登录才能新增页面。'}
          </div>
        </div>

        {customPages.length === 0 ? (
          <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <p className="text-lg mb-2">还没有自定义页面。</p>
            <p className="text-sm">点击导航栏的“后台登录”进入管理面板，立刻创建你的第一篇作品记录。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customPages.map((page) => (
              <RevealOnScroll key={page.id} className="h-full">
                <div
                  onClick={() => setSelectedPage(page)}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all duration-300 cursor-pointer h-full flex flex-col"
                >
                  {page.coverImage ? (
                    <img src={page.coverImage} alt={page.title} className="h-40 w-full object-cover" />
                  ) : (
                    <div className="h-40 w-full bg-slate-800 flex items-center justify-center text-slate-500">无封面</div>
                  )}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <div className="text-xs uppercase text-cyan-400 tracking-wide">/{page.slug}</div>
                    <h3 className="text-xl font-bold text-white">{page.title}</h3>
                    <p className="text-slate-400 text-sm flex-grow leading-relaxed max-h-24 overflow-hidden">{page.content}</p>
                    <div className="text-sm text-slate-500">点击查看详情</div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </section>

      <section id="experience" className="py-20 bg-slate-900/30 border-y border-slate-800/50">
         <div className="max-w-3xl mx-auto px-4">
            <RevealOnScroll>
              <h2 className="text-3xl font-bold text-center text-white mb-12">Work Experience</h2>
            </RevealOnScroll>
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
          <RevealOnScroll>
            <h2 className="text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Have a question? You can email me directly, or chat with my AI assistant to learn more about my work instantly.</p>
          </RevealOnScroll>
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

      {adminModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Shield className="text-cyan-400" size={20} />
                管理后台
              </div>
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <button onClick={handleLogout} className="px-3 py-2 text-sm bg-slate-800 rounded-lg text-slate-200 hover:bg-slate-700 border border-slate-700">退出登录</button>
                )}
                <button onClick={() => setAdminModalOpen(false)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"><X size={18} /></button>
              </div>
            </div>

            {!isAdmin ? (
              <form onSubmit={handleLogin} className="p-6 space-y-4">
                <p className="text-slate-300 text-sm">使用默认账号 <code className="px-2 py-1 bg-slate-800 rounded">admin / letmein</code> 登录，开始上传图片和创建作品页面。</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">用户名</label>
                    <input value={authFields.username} onChange={(e) => setAuthFields({ ...authFields, username: e.target.value, error: '' })} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-1 block">密码</label>
                    <input type="password" value={authFields.password} onChange={(e) => setAuthFields({ ...authFields, password: e.target.value, error: '' })} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white" />
                  </div>
                </div>
                {authFields.error && <div className="text-red-400 text-sm">{authFields.error}</div>}
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold">登录</button>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold">{editingProjectId ? '编辑项目' : '快速添加新项目'}</h3>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(null);
                          setProjectForm({ title: '', category: '', description: '', tags: '', image: '' });
                        }}
                        className="text-sm text-slate-400 hover:text-white"
                      >
                        取消编辑
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm">标题</label>
                      <input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm">分类</label>
                      <input value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" placeholder="例如 Game Dev" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-slate-400 text-sm">简介</label>
                      <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" rows={3} placeholder="一句话描述项目" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-slate-400 text-sm">标签（逗号分隔）</label>
                      <input value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" placeholder="Unity, Shader" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm">封面图片</label>
                      <input type="file" accept="image/*" onChange={(e) => handleProjectImageUpload(e.target.files?.[0])} className="w-full text-slate-300" />
                      {projectForm.image && <img src={projectForm.image} alt="预览" className="mt-2 h-24 rounded-lg object-cover border border-slate-800" />}
                    </div>
                    <div className="flex items-end justify-end md:justify-start">
                      <button type="submit" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold">{editingProjectId ? '更新项目' : '保存项目'}</button>
                    </div>
                  </form>
                  <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-slate-200 font-semibold">已创建的项目</h4>
                      <span className="text-xs text-slate-500">点击编辑或删除</span>
                    </div>
                    {projects.length === 0 ? (
                      <p className="text-slate-500 text-sm">暂无项目。</p>
                    ) : (
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {projects.map((project) => (
                          <div key={project.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                            <div>
                              <div className="text-white text-sm font-semibold">{project.title}</div>
                              <div className="text-xs text-slate-500">{project.category}</div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <button onClick={() => handleEditProject(project)} className="px-2 py-1 rounded bg-slate-800 text-cyan-400 hover:text-white">编辑</button>
                              <button onClick={() => handleDeleteProject(project.id)} className="px-2 py-1 rounded bg-slate-800 text-red-400 hover:text-white">删除</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold">{editingPageId ? '编辑作品页面' : '新建作品页面'}</h3>
                    {editingPageId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPageId(null);
                          setPageForm({ title: '', slug: '', content: '', coverImage: '' });
                        }}
                        className="text-sm text-slate-400 hover:text-white"
                      >
                        取消编辑
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleAddPage} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm">页面标题</label>
                      <input value={pageForm.title} onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm">自定义链接</label>
                      <input value={pageForm.slug} onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" placeholder="留空则自动生成" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-slate-400 text-sm">正文内容</label>
                      <textarea value={pageForm.content} onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })} className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white" rows={4} placeholder="支持直接输入多行文本" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm">封面图片</label>
                      <input type="file" accept="image/*" onChange={(e) => handlePageCoverUpload(e.target.files?.[0])} className="w-full text-slate-300" />
                      {pageForm.coverImage && <img src={pageForm.coverImage} alt="预览" className="mt-2 h-24 rounded-lg object-cover border border-slate-800" />}
                    </div>
                    <div className="flex items-end justify-end md:justify-start">
                      <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold">{editingPageId ? '更新页面' : '发布页面'}</button>
                    </div>
                  </form>
                  <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-slate-200 font-semibold">已创建的页面</h4>
                      <span className="text-xs text-slate-500">点击编辑或删除</span>
                    </div>
                    {customPages.length === 0 ? (
                      <p className="text-slate-500 text-sm">暂无页面。</p>
                    ) : (
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {customPages.map((page) => (
                          <div key={page.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                            <div>
                              <div className="text-white text-sm font-semibold">{page.title}</div>
                              <div className="text-xs text-slate-500">/{page.slug}</div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <button onClick={() => handleEditPage(page)} className="px-2 py-1 rounded bg-slate-800 text-cyan-400 hover:text-white">编辑</button>
                              <button onClick={() => handleDeletePage(page.id)} className="px-2 py-1 rounded bg-slate-800 text-red-400 hover:text-white">删除</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-slate-200 font-semibold mb-3">当前内容概览</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                      <div className="font-bold text-white">项目数量：{projects.length}</div>
                      <p className="text-slate-500 mt-1">最新：{projects[projects.length - 1]?.title}</p>
                    </div>
                    <div>
                      <div className="font-bold text-white">自定义页面：{customPages.length}</div>
                      <p className="text-slate-500 mt-1">最新：{customPages[customPages.length - 1]?.title || '暂无'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-slate-950"><p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p></footer>
    </div>
  );
};

export default App;