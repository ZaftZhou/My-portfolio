import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Terminal, ChevronDown, Send, User, Layers, Sparkles, Box, Cpu, Gamepad2, ArrowLeft, X, Image as ImageIcon, Loader2, CheckCircle, MessageSquare, Bot, RefreshCw, Zap, FileText, Download, Printer, MapPin, Phone, GraduationCap, Briefcase } from 'lucide-react';

// 🎯 Import configuration data from JSON files
import configData from './data/config.json';
import projectsData from './data/projects.json';

/**
 * ================================================================================
 * 🔧 CONFIGURATION AREA - Now loaded from JSON files!
 * ================================================================================
 * To update your portfolio:
 * 1. Edit src/data/config.json for personal info
 * 2. Edit src/data/projects.json for projects
 * 3. Add images to public/projects/[project-folder]/
 */

const PERSONAL_INFO = configData.personalInfo;
const EDUCATION_DATA = configData.education;
const EXPERIENCE_DATA = configData.experience;
const CATEGORIES = configData.categories;
const PROJECTS_DATA = projectsData;

const apiKey = configData.apiKeys.gemini;
const FORMSPREE_ENDPOINT = configData.apiKeys.formspree;

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

// 🌟 Interactive Particle Starfield Background
const ParticleStarfield = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkle = 0;
      }

      update() {
        // Mouse attraction
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx += (dx / dist) * force * 0.2;
          this.vy += (dy / dist) * force * 0.2;
        }

        // Damping
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx;
        this.y += this.vy;

        // Twinkle effect
        this.twinkle += this.twinkleSpeed;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        const twinkleOpacity = this.opacity * (0.5 + Math.sin(this.twinkle) * 0.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${twinkleOpacity})`;
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `rgba(34, 211, 238, ${twinkleOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles.current = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000));
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY
      };
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none z-0"
      style={{ height: '100%' }}
    />
  );
};

const CentralNeuralNetwork = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const skills = [
      { name: 'C#', color: '#22d3ee', radius: 140, speed: 0.002, offset: 0, size: 18 },
      { name: 'HLSL', color: '#e879f9', radius: 140, speed: 0.002, offset: Math.PI, size: 14 },
      { name: 'Unity', color: '#ffffff', radius: 190, speed: -0.0015, offset: 1, size: 20 },
      { name: 'Shader Graph', color: '#a78bfa', radius: 190, speed: -0.0015, offset: 3, size: 16 },
      { name: 'VFX', color: '#f472b6', radius: 190, speed: -0.0015, offset: 5, size: 15 },
    ];

    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      skills.forEach((skill) => {
        const angle = time * skill.speed + skill.offset;
        const x = centerX + Math.cos(angle) * skill.radius;
        const y = centerY + Math.sin(angle) * skill.radius;

        const distance = Math.sqrt(Math.pow(clickX - x, 2) + Math.pow(clickY - y, 2));
        if (distance < 25) {
          // Create ripple effect on click
          createRipple(x, y, skill.color);
        }
      });
    };

    let ripples = [];
    const createRipple = (x, y, color) => {
      ripples.push({ x, y, color, radius: 0, alpha: 1 });
    };

    const draw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Draw orbital paths (like planetary orbits)
      [140, 190].forEach((radius) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw central "sun" with glow
      const centralGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
      centralGlow.addColorStop(0, 'rgba(34, 211, 238, 0.3)');
      centralGlow.addColorStop(0.5, 'rgba(34, 211, 238, 0.1)');
      centralGlow.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = centralGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Central icon/core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fill();
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.fill();

      // Track skill positions for hover detection
      const skillPositions = [];

      skills.forEach((skill, index) => {
        const angle = time * skill.speed + skill.offset;
        const floatX = Math.cos(time * 0.01 + index) * 3;
        const floatY = Math.sin(time * 0.01 + index) * 3;

        const x = centerX + Math.cos(angle) * skill.radius + floatX;
        const y = centerY + Math.sin(angle) * skill.radius + floatY;

        skillPositions.push({ x, y, skill });

        // Check if mouse is hovering over this skill
        const distance = Math.sqrt(
          Math.pow(mousePos.current.x - x, 2) +
          Math.pow(mousePos.current.y - y, 2)
        );
        const isHovered = distance < 25;
        if (isHovered && hoveredSkill !== skill.name) {
          setHoveredSkill(skill.name);
        } else if (!isHovered && hoveredSkill === skill.name) {
          setHoveredSkill(null);
        }

        const pulse = (Math.sin(time * 0.05 + index) + 1) / 2;
        const baseAlpha = isHovered ? 0.4 : 0.15;
        const alpha = baseAlpha + pulse * 0.15;

        // Neural fiber connection
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        // Curved path for organic feel
        const controlX = (centerX + x) / 2 + Math.sin(time * 0.02 + index) * 20;
        const controlY = (centerY + y) / 2 + Math.cos(time * 0.02 + index) * 20;
        ctx.quadraticCurveTo(controlX, controlY, x, y);

        const gradient = ctx.createLinearGradient(centerX, centerY, x, y);
        gradient.addColorStop(0, `rgba(34, 211, 238, 0)`);
        gradient.addColorStop(0.5, skill.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`));
        gradient.addColorStop(1, skill.color.replace('rgb', 'rgba').replace(')', `, ${alpha})`));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.stroke();

        // Particle effect along the line
        if (isHovered || time % 60 < 30) {
          const particleProgress = (time % 60) / 60;
          const particleX = centerX + (x - centerX) * particleProgress;
          const particleY = centerY + (y - centerY) * particleProgress;

          ctx.beginPath();
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = skill.color;
          ctx.fill();
        }

        // Planet glow
        const planetGlow = ctx.createRadialGradient(x, y, 0, x, y, isHovered ? 35 : 25);
        planetGlow.addColorStop(0, skill.color.replace('rgb', 'rgba').replace(')', ', 0.3)'));
        planetGlow.addColorStop(1, skill.color.replace('rgb', 'rgba').replace(')', ', 0)'));
        ctx.fillStyle = planetGlow;
        ctx.beginPath();
        ctx.arc(x, y, isHovered ? 35 : 25, 0, Math.PI * 2);
        ctx.fill();

        // Planet body
        const planetSize = isHovered ? skill.size + 4 : skill.size;
        ctx.beginPath();
        ctx.arc(x, y, planetSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.fill();
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();

        // Inner core
        ctx.beginPath();
        ctx.arc(x, y, planetSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = skill.color.replace('rgb', 'rgba').replace(')', ', 0.6)');
        ctx.fill();

        // Label
        ctx.font = isHovered ? 'bold 13px "JetBrains Mono", monospace' : '12px "JetBrains Mono", monospace';
        ctx.fillStyle = skill.color;
        ctx.textAlign = 'center';
        ctx.shadowColor = isHovered ? skill.color : 'transparent';
        ctx.shadowBlur = isHovered ? 10 : 0;
        ctx.fillText(skill.name, x, y + planetSize + 20);
        ctx.shadowBlur = 0;
      });

      // Draw ripples
      ripples = ripples.filter(ripple => {
        ripple.radius += 2;
        ripple.alpha -= 0.02;

        if (ripple.alpha > 0) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = ripple.color.replace('rgb', 'rgba').replace(')', `, ${ripple.alpha})`);
          ctx.lineWidth = 2;
          ctx.stroke();
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredSkill]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="cursor-pointer" />
    </div>
  );
};

// 🌟 Typewriter Effect Hook
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return [displayText, isComplete];
};

// 🌟 Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }

      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable = target.closest('a, button, input, textarea, [role="button"]');
      setIsPointer(!!isClickable);
    };

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.15;
      cursorY += dy * 0.15;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] transition-all duration-200 ${
          isPointer
            ? 'border-cyan-400 scale-150 bg-cyan-400/10'
            : 'border-cyan-500/50 bg-cyan-500/5'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className={`fixed w-1 h-1 rounded-full pointer-events-none z-[9999] transition-all duration-100 ${
          isPointer ? 'bg-cyan-300' : 'bg-cyan-500'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

// 🌟 3D Tilt Card Hook
const use3DTilt = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

// 🌟 Scroll Fade-In Hook
const useScrollFadeIn = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// 🌟 Typewriter Title Component
const TypewriterTitle = () => {
  const fullText = `I am ${PERSONAL_INFO.name}`;
  const [displayText, isComplete] = useTypewriter(fullText, 80);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white min-h-[1.2em]">
      {displayText}
      {!isComplete && <span className="animate-pulse text-cyan-400">|</span>}
    </h1>
  );
};

// 🌟 Masonry Gallery Component (Supports Images & Videos)
const MasonryGallery = ({ images, projectTitle, onImageClick }) => {
  const [columns, setColumns] = useState([[], []]);

  useEffect(() => {
    // Split media into 2 columns for masonry layout
    const col1 = [];
    const col2 = [];

    images.forEach((media, idx) => {
      if (idx % 2 === 0) {
        col1.push({ media, idx });
      } else {
        col2.push({ media, idx });
      }
    });

    setColumns([col1, col2]);
  }, [images]);

  const isVideo = (src) => {
    if (typeof src === 'string') {
      return /\.(mp4|webm|ogg|mov)$/i.test(src);
    }
    return false;
  };

  const renderMedia = (media, idx) => {
    const src = typeof media === 'string' ? media : media.src || media;
    const isVid = isVideo(src);

    return (
      <div
        key={idx}
        className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden cursor-pointer hover:border-cyan-500 transition-all group relative"
        onClick={() => onImageClick(idx)}
      >
        {isVid ? (
          <>
            <video
              src={src}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
            />
            <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-mono flex items-center gap-1">
              <Play size={12} /> Video
            </div>
          </>
        ) : (
          <img
            src={src}
            alt={`${projectTitle} screenshot ${idx + 1}`}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `<div class="aspect-video flex items-center justify-center"><span class="text-slate-600 font-mono text-xs">Media ${idx + 1}</span></div>`;
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      {/* Column 1 */}
      <div className="flex-1 flex flex-col gap-4">
        {columns[0].map(({ media, idx }) => renderMedia(media, idx))}
      </div>

      {/* Column 2 */}
      {columns[1].length > 0 && (
        <div className="flex-1 flex flex-col gap-4">
          {columns[1].map(({ media, idx }) => renderMedia(media, idx))}
        </div>
      )}
    </div>
  );
};

// 🌟 Media Lightbox Component (Supports Images & Videos)
const ImageLightbox = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoRef = useRef(null);

  const currentMedia = images[currentIndex];
  const isVideo = (src) => {
    const mediaStr = typeof src === 'string' ? src : src?.src || '';
    return /\.(mp4|webm|ogg|mov)$/i.test(mediaStr);
  };
  const currentSrc = typeof currentMedia === 'string' ? currentMedia : currentMedia?.src || currentMedia;
  const isCurrentVideo = isVideo(currentSrc);

  const goToPrevious = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      // Space to play/pause video
      if (e.key === ' ' && isCurrentVideo && videoRef.current) {
        e.preventDefault();
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isCurrentVideo]);

  // Auto-play video when it becomes current
  useEffect(() => {
    if (isCurrentVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play may be blocked, user will need to click play
      });
    }
  }, [currentIndex, isCurrentVideo]);

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10001] p-3 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition-all hover:scale-110"
        title="Close (ESC)"
      >
        <X size={24} />
      </button>

      {/* Media Counter & Type */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[10001] px-4 py-2 bg-slate-800/80 rounded-full text-white text-sm font-mono flex items-center gap-2">
          {isCurrentVideo && <Play size={14} />}
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 z-[10001] p-3 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition-all hover:scale-110"
          title="Previous (←)"
        >
          <ArrowLeft size={24} />
        </button>
      )}

      {/* Media Display */}
      <div className="max-w-[90vw] max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
        {isCurrentVideo ? (
          <video
            ref={videoRef}
            src={currentSrc}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            controls
            loop
            playsInline
          />
        ) : (
          <img
            src={currentSrc}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 z-[10001] p-3 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition-all hover:scale-110"
          title="Next (→)"
        >
          <ArrowLeft size={24} className="rotate-180" />
        </button>
      )}

      {/* Keyboard hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10001] px-4 py-2 bg-slate-800/60 rounded-full text-white/60 text-xs font-mono">
        {images.length > 1 ? `← → to navigate${isCurrentVideo ? ' • SPACE to play/pause' : ''} • ESC to close` : isCurrentVideo ? 'SPACE to play/pause • ESC to close' : 'ESC to close'}
      </div>
    </div>
  );
};

// 🌟 Portfolio Header Component with Fade-In
const PortfolioHeader = () => {
  const [headerRef, isVisible] = useScrollFadeIn();

  return (
    <div
      ref={headerRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Layers className="text-cyan-500" /> Selected Works
        </h2>
        <p className="text-slate-400">Click on any project to view the full breakdown.</p>
      </div>
    </div>
  );
};

// 🌟 Project Card Component with 3D Tilt
const ProjectCard = ({ project, onClick }) => {
  const tiltRef = use3DTilt();
  const [fadeRef, isVisible] = useScrollFadeIn();

  const setRefs = (element) => {
    tiltRef.current = element;
    fadeRef.current = element;
  };

  return (
    <div
      ref={setRefs}
      onClick={onClick}
      className={`group card-shimmer bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-400 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col h-full relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transformStyle: 'preserve-3d',
        cursor: 'pointer'
      }}
    >
      <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden p-6 flex items-center justify-center`}>
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-all"></div>
        <div className="bg-slate-950/30 backdrop-blur-sm p-4 rounded-full transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 border border-white/10 relative z-10 shadow-lg">
          {project.category === 'Game Dev' && <Gamepad2 size={32} className="text-white" />}
          {project.category === 'Shaders' && <Sparkles size={32} className="text-white" />}
          {project.category === '3D Art' && <Box size={32} className="text-white" />}
          {project.category === 'Tools' && <Terminal size={32} className="text-white" />}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-xs text-white font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
          View Details →
        </div>
      </div>

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
    <div className="min-h-screen bg-[#282a36] pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in duration-300">

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
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
        {/* Image Lightbox */}
        {lightboxIndex !== null && (
          <ImageLightbox
            images={selectedProject.images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
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
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <MasonryGallery
                    images={selectedProject.images}
                    projectTitle={selectedProject.title}
                    onImageClick={(idx) => setLightboxIndex(idx)}
                  />
                ) : (
                  <p className="text-slate-500">No images available yet. Add images to public/projects/</p>
                )}
                <p className="text-slate-500 text-xs mt-4 text-center">💡 Click on any image to view full size</p>
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
      <ParticleStarfield />
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

      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 min-h-[600px] relative z-10">
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20"><Sparkles size={14} className="mr-2" />Tech Art & Game Development</div>
          <TypewriterTitle />
          <h2 className="text-xl sm:text-2xl text-slate-400 font-light">{PERSONAL_INFO.title}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">{PERSONAL_INFO.bio}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <button onClick={() => scrollToSection('portfolio')} className="px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10">View Projects</button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-3 rounded-full bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-all">Contact Me</button>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-6 pt-4 text-slate-500">
            <a href={PERSONAL_INFO.socials.github} className="hover:text-white transition-colors"><Github size={24} /></a>
            <a href={PERSONAL_INFO.socials.linkedin} className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors"><Mail size={24} /></a>
          </div>
        </div>
        
        <div className="flex-1 relative h-[500px] md:h-[600px] w-full max-w-full flex items-center justify-center overflow-visible">
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

      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <PortfolioHeader />
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>{cat}</button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
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

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-slate-950"><p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p></footer>
    </div>
  );
};

export default App;