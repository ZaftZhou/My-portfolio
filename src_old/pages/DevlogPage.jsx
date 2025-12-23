import React, { useEffect } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';

// Mock data for initial expansion
const DEVLOG_POSTS = [
    {
        id: 1,
        title: "Optimizing Mobile Shaders in Unity",
        date: "2025-11-20",
        readTime: "8 min read",
        excerpt: "A deep dive into RGBA mask-based workflows for modular avatar systems on mobile hardware.",
        tags: ["Unity", "Shaders", "Mobile Optimization"]
    },
    {
        id: 2,
        title: "Building a Scalable FSM for Game AI",
        date: "2025-10-15",
        readTime: "12 min read",
        excerpt: "How to design a decoupled state machine that handles complex behaviors without spaghetti code.",
        tags: ["C#", "AI", "Game Dev"]
    }
];

function DevlogPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto page-transition">
            <div className="mb-12">
                <RevealOnScroll>
                    <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <BookOpen className="text-cyan-500" /> Devlog
                    </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                    <p className="text-slate-400 text-lg">Detailed insights and technical breakdowns from my development journey.</p>
                </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {DEVLOG_POSTS.map((post, index) => (
                    <RevealOnScroll key={post.id} delay={index * 100}>
                        <article className="glass-card rounded-2xl p-8 group cursor-pointer">
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                                {post.title}
                            </h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-prime-900/50 border border-prime-800 rounded text-[10px] text-cyan-300 uppercase font-bold tracking-widest">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 text-cyan-400 font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest">
                                Read Article <ArrowRight size={16} />
                            </button>
                        </article>
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    );
}

export default DevlogPage;
