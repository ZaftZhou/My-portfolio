import React, { useEffect } from 'react';
import { FlaskConical, Box, Code, ExternalLink } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';

const LAB_EXPERIMENTS = [
    {
        id: 1,
        title: "Volumetric Cloud Marching",
        description: "Pure HLSL ray-marching implementation in URP.",
        thumbnail: "from-indigo-600 to-purple-800",
        tags: ["HLSL", "URP", "Raymarching"]
    },
    {
        id: 2,
        title: "Dynamic Water Ripples",
        description: "GPU-based ripple simulation with depth interaction.",
        thumbnail: "from-cyan-500 to-blue-700",
        tags: ["Shader Graph", "Compute"]
    }
];

function LabPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto page-transition">
            <div className="mb-12">
                <RevealOnScroll>
                    <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <FlaskConical className="text-accent-violet" /> Shader Lab
                    </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                    <p className="text-slate-400 text-lg">A playground for visual experiments, shaders, and technical prototypes.</p>
                </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {LAB_EXPERIMENTS.map((exp, index) => (
                    <RevealOnScroll key={exp.id} delay={index * 100}>
                        <div className="glass-card rounded-2xl overflow-hidden group">
                            <div className={`h-48 bg-gradient-to-br ${exp.thumbnail} relative flex items-center justify-center`}>
                                <Box size={48} className="text-white/20 group-hover:scale-125 group-hover:text-white/40 transition-all duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{exp.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {exp.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-300 uppercase font-mono tracking-tighter">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="text-xs font-bold text-accent-violet flex items-center gap-1 hover:text-white transition-colors">
                                        <Code size={14} /> VIEW SOURCE
                                    </button>
                                    <button className="text-xs font-bold text-accent-violet flex items-center gap-1 hover:text-white transition-colors">
                                        <ExternalLink size={14} /> OPEN DEMO
                                    </button>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}

                {/* Placeholder for future expansion */}
                <div className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-4 text-slate-600">
                        <FlaskConical size={24} />
                    </div>
                    <p className="text-slate-600 font-medium">New experiments spawning soon...</p>
                </div>
            </div>
        </div>
    );
}

export default LabPage;
