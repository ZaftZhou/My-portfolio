"use client";

import RevealOnScroll from '@/components/animations/RevealOnScroll';

export default function LabPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto page-transition">
            <RevealOnScroll>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                    SHADER<span className="text-cyan-500">.</span>LAB
                </h1>
                <p className="text-slate-400 text-xl font-light">Visual experiments and tech-art prototypes.</p>
            </RevealOnScroll>

            <div className="mt-20 py-40 border border-dashed border-white/5 rounded-3xl text-center">
                <p className="text-slate-500 uppercase tracking-widest font-black opacity-50">Initialize_Shader_Environment...</p>
            </div>
        </div>
    );
}
