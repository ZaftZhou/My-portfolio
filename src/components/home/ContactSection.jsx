"use client";

import { useState } from "react";
import { Github, Linkedin, MapPin, Copy, Check } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/siteData";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Footer from "@/components/layout/Footer";

export default function ContactSection() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        await navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto relative overflow-hidden">
            {/* Pink letter paper background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-8 border-4 border-pink-400 rounded-lg" />
                <div className="absolute inset-12 border-2 border-pink-300 rounded-lg border-dashed" />
            </div>

            <div className="torn-divider w-full mb-16" />

            <RevealOnScroll>
                <div className="text-center mb-10">
                    <svg className="w-14 h-14 mx-auto mb-4 float" viewBox="0 0 56 56" fill="none">
                        <rect x="8" y="14" width="40" height="28" rx="2" fill="#fff" stroke="#2d251d" strokeWidth="2" />
                        <path d="M8 18 L28 32 L48 18" stroke="#2d251d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M44 8 Q 42 4, 40 8 Q 38 4, 36 8 Q 38 12, 40 14 Q 42 12, 44 8" fill="#ff6b6b" stroke="#2d251d" strokeWidth="1" />
                    </svg>

                    <h2 className="font-marker text-3xl text-prime-900 mb-4">
                        <span className="highlight-yellow">Let's Connect!</span>
                    </h2>
                    <p className="font-sketch text-xl text-prime-600 max-w-md mx-auto">
                        Open to opportunities and collaborations. Feel free to reach out! 💬
                    </p>
                </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                {/* Envelope container */}
                <div className="relative max-w-lg mx-auto">
                    {/* Envelope flap (triangle) */}
                    <div className="absolute -top-6 left-0 right-0 h-12 overflow-hidden">
                        <div
                            className="absolute top-6 left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '180px solid transparent',
                                borderRight: '180px solid transparent',
                                borderBottom: '48px solid #fef3c7'
                            }}
                        />
                        <div
                            className="absolute top-6 left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '178px solid transparent',
                                borderRight: '178px solid transparent',
                                borderBottom: '46px solid #2d251d'
                            }}
                        />
                        <div
                            className="absolute top-8 left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '175px solid transparent',
                                borderRight: '175px solid transparent',
                                borderBottom: '42px solid #fffbeb'
                            }}
                        />
                    </div>

                    {/* Envelope body */}
                    <div className="bg-amber-50 border-2 border-prime-900 rounded-lg p-8 pt-10 shadow-[4px_4px_0_#2d251d]">
                        {/* Stamp decoration */}
                        <div className="absolute top-2 right-4 w-16 h-20 border-2 border-prime-300 rounded bg-white p-1">
                            <div className="w-full h-full border border-dashed border-prime-300 flex items-center justify-center">
                                <span className="text-2xl">📮</span>
                            </div>
                        </div>

                        {/* Address label style */}
                        <div className="bg-white border-2 border-prime-200 rounded p-4 mb-6">
                            <p className="font-sketch text-sm text-prime-500 mb-1">To:</p>
                            <p className="font-marker text-lg text-prime-900">{PERSONAL_INFO.name}</p>
                            <div className="flex items-center gap-2 mt-2 text-prime-600">
                                <MapPin className="w-4 h-4" />
                                <span className="font-sketch">{PERSONAL_INFO.location}</span>
                            </div>
                        </div>

                        {/* Email with copy button */}
                        <button
                            onClick={copyEmail}
                            className="w-full group relative bg-white border-2 border-prime-900 rounded-lg p-4 hover:bg-sketch-yellow/20 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">✉️</span>
                                    <span className="font-sketch text-lg text-prime-900">{PERSONAL_INFO.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {copied ? (
                                        <Check className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-prime-400 group-hover:text-prime-900 transition-colors" />
                                    )}
                                </div>
                            </div>

                            {/* Copied stamp overlay */}
                            {copied && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div
                                        className="px-4 py-2 border-4 border-green-600 rounded text-green-600 font-bold text-xl uppercase tracking-wider rotate-[-12deg] animate-stamp"
                                        style={{ background: 'rgba(255,255,255,0.9)' }}
                                    >
                                        COPIED!
                                    </div>
                                </div>
                            )}
                        </button>

                        {/* Social links as postage stamps */}
                        <div className="flex justify-center gap-4 mt-6">
                            <SocialStamp
                                href={PERSONAL_INFO.socials.github}
                                icon={<Github className="w-5 h-5" />}
                                label="GitHub"
                                color="#1f2937"
                            />
                            <SocialStamp
                                href={PERSONAL_INFO.socials.linkedin}
                                icon={<Linkedin className="w-5 h-5" />}
                                label="LinkedIn"
                                color="#3b82f6"
                            />
                            <SocialStamp
                                href={PERSONAL_INFO.socials.artstation}
                                icon={
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-3.313l-5.476-9.471a2.424 2.424 0 0 0-2.107-1.216H8.73l9.823 17.001L24 14.41zm-11.13-8.686l5.476 9.472H6.347l5.523-9.472z" />
                                    </svg>
                                }
                                label="Art"
                                color="#ff6b6b"
                            />
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Footer */}
            <RevealOnScroll delay={200}>
                <p className="text-center text-prime-500 text-sm mt-10 font-sketch flex items-center justify-center gap-2">
                    Made with
                    <svg className="w-4 h-4 text-sketch-coral wiggle" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 14 Q 1 8, 3 4 Q 5 1, 8 4 Q 11 1, 13 4 Q 15 8, 8 14" />
                    </svg>
                    by {PERSONAL_INFO.name} © {new Date().getFullYear()}
                </p>
            </RevealOnScroll>

            <Footer />
        </section>
    );
}

function SocialStamp({ href, icon, label, color }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
        >
            <div
                className="w-14 h-16 border-2 rounded p-1 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ borderColor: color, background: 'white' }}
            >
                <div
                    className="w-full h-full border border-dashed flex items-center justify-center"
                    style={{ borderColor: color, color }}
                >
                    {icon}
                </div>
            </div>
            <span className="font-sketch text-xs text-prime-500 mt-1">{label}</span>
        </a>
    );
}
