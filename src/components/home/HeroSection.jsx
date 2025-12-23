"use client";

import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/siteData";

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
            {/* Yellow folder edge borders */}
            <div className="fixed top-0 left-0 w-full h-3 bg-sketch-yellow z-50" />
            <div className="fixed bottom-0 left-0 w-full h-3 bg-sketch-yellow z-50" />

            {/* Background doodles - ultra slow drift */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Star with twinkle */}
                <svg className="absolute top-20 left-[10%] w-10 h-10 twinkle drift" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4 L22 16 L34 18 L22 20 L20 32 L18 20 L6 18 L18 16 Z" stroke="#2d251d" strokeWidth="1.5" fill="#ffd93d" />
                </svg>

                {/* Circle */}
                <svg className="absolute top-32 right-[15%] w-8 h-8 drift" style={{ animationDelay: '3s' }} viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="#2d251d" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                </svg>

                {/* Squiggle arrow */}
                <svg className="absolute bottom-40 left-[8%] w-16 h-12 drift" style={{ animationDelay: '5s' }} viewBox="0 0 64 48" fill="none">
                    <path d="M8 24 Q 16 12, 24 24 T 40 24 T 56 24" stroke="#2d251d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M48 18 L56 24 L48 30" stroke="#2d251d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>

                {/* Coffee mug */}
                <svg className="absolute bottom-32 right-[12%] w-10 h-12 drift" style={{ animationDelay: '8s' }} viewBox="0 0 40 48" fill="none">
                    <path d="M6 14 L6 40 Q 6 44, 10 44 L30 44 Q 34 44, 34 40 L34 14" stroke="#2d251d" strokeWidth="1.5" fill="#fff" />
                    <path d="M34 20 Q 40 20, 40 26 Q 40 32, 34 32" stroke="#2d251d" strokeWidth="1.5" fill="none" />
                </svg>
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center max-w-3xl">
                {/* Window title bar */}
                <div className="inline-flex items-center gap-2 bg-prime-100 border-2 border-prime-900 rounded-t-lg px-4 py-2 mb-0 bounce-in">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-sketch-coral border border-prime-900" />
                        <span className="w-3 h-3 rounded-full bg-sketch-yellow border border-prime-900" />
                        <span className="w-3 h-3 rounded-full bg-sketch-mint border border-prime-900" />
                    </div>
                    <span className="font-sketch text-sm text-prime-600 ml-2">
                        {PERSONAL_INFO.name} — Portfolio
                    </span>
                </div>

                {/* Content card */}
                <div className="paper-card p-8 rounded-t-none border-t-0 mb-8 bounce-in" style={{ animationDelay: '0.1s' }}>
                    {/* Greeting */}
                    <p className="font-sketch text-2xl text-prime-600 mb-2">
                        Hello, I'm
                    </p>

                    {/* Name with highlight */}
                    <h1 className="font-marker text-5xl md:text-7xl text-prime-900 mb-4 tracking-tight">
                        <span className="highlight-yellow">{PERSONAL_INFO.name}</span>
                    </h1>

                    {/* Hand-drawn underline */}
                    <svg className="w-60 md:w-80 h-3 mx-auto mb-6" viewBox="0 0 320 12" fill="none">
                        <path d="M8 6 Q 40 2, 80 8 T 160 4 T 240 8 T 312 6" stroke="#2d251d" strokeWidth="2" strokeLinecap="round" className="draw-line" />
                    </svg>

                    {/* Title */}
                    <p className="font-sketch text-xl md:text-2xl text-prime-700 mb-6">
                        {PERSONAL_INFO.title}
                    </p>

                    {/* Bio with location pin */}
                    <p className="text-prime-600 max-w-xl mx-auto leading-relaxed text-lg">
                        Building immersive experiences with Unity, C#, and custom shaders.
                    </p>
                    <p className="flex items-center justify-center gap-2 mt-2">
                        <span className="text-prime-600">Based in</span>
                        <span className="inline-flex items-center gap-1 highlight-coral font-medium location-bounce">
                            📍 {PERSONAL_INFO.location}
                        </span>
                    </p>
                </div>

                {/* CTA buttons with hand-drawn pointer */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bounce-in" style={{ animationDelay: '0.3s' }}>
                    <Link
                        href="/portfolio"
                        className="sketch-btn stamp-btn px-8 py-4 text-prime-900 font-bold text-lg"
                    >
                        View My Work →
                    </Link>

                    <Link
                        href="#contact"
                        className="sketch-btn sketch-btn-primary stamp-btn px-8 py-4 text-prime-900 font-bold text-lg"
                    >
                        Say Hello! 👋
                    </Link>
                </div>

                {/* Hand-drawn pointer hint */}
                <p className="font-sketch text-base text-prime-500 mt-4 italic bounce-in" style={{ animationDelay: '0.5s' }}>
                    ↑ Click to explore projects ↑
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bounce-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex flex-col items-center gap-2 text-prime-600">
                    <span className="font-sketch text-base">scroll</span>
                    <svg className="w-5 h-6 animate-bounce" viewBox="0 0 20 24" fill="none">
                        <path d="M10 4 L10 18 M6 14 L10 18 L14 14" stroke="#2d251d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
