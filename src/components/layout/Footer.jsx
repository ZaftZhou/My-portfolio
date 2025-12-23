"use client";

import React from 'react';
import { PERSONAL_INFO } from '@/lib/siteData';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-prime-950 text-prime-100 py-16 overflow-hidden mt-auto">
      {/* Kraft Paper Texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
        }}
      />

      {/* Torn Paper Top Edge */}
      <div
        className="absolute top-[-1px] left-0 w-full h-8 transform rotate-180"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0 20 Q 50 0, 100 20 T 200 20 T 300 15 T 400 25 T 500 20 T 600 18 T 700 22 T 800 20 T 900 15 T 1000 25 T 1100 20 T 1200 20 L 1200 40 L 0 40 Z' fill='%23fffdf8'/%3E%3C/svg%3E")`,
          backgroundSize: '100% 100%'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Left: Thank you note */}
        <div className="text-center md:text-left">
          <div className="font-marker text-3xl mb-2 text-sketch-yellow rotate-[-2deg] inline-block">
            Thanks for visiting!
          </div>
          <p className="font-sketch text-prime-400 max-w-xs text-lg">
            Constructed with pixels, passion, and way too much coffee.
          </p>
        </div>

        {/* Right: Social Stamps & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <SocialStamp icon={<Github size={20} />} href={PERSONAL_INFO.socials?.github} label="GH" />
            <SocialStamp icon={<Linkedin size={20} />} href={PERSONAL_INFO.socials?.linkedin} label="IN" />
            <SocialStamp icon={<Twitter size={20} />} href={PERSONAL_INFO.socials?.twitter} label="X" />
            <SocialStamp icon={<Mail size={20} />} href={`mailto:${PERSONAL_INFO.email}`} label="@" />
          </div>

          <div className="text-center md:text-right">
            <p className="font-marker text-sm text-prime-300 uppercase tracking-widest">
              © {currentYear} {PERSONAL_INFO.name}
            </p>
            <p className="text-[10px] text-prime-500 font-mono mt-1 opacity-50">
              ALL RIGHTS RESERVED / NO AI TRAINING
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialStamp({ icon, href, label }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-12 h-12 flex items-center justify-center bg-prime-200 text-prime-900 rounded-sm shadow-md transition-transform hover:-translate-y-1 hover:rotate-3"
    >
      {/* Stamp Border Effect */}
      <div className="absolute inset-0 border-[3px] border-dashed border-prime-400 rounded-sm opacity-50" />

      {/* Icon */}
      <div className="relative z-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      {/* Corner Label */}
      <span className="absolute bottom-0.5 right-1 text-[8px] font-bold opacity-30">
        {label}
      </span>
    </a>
  );
}

export default Footer;
