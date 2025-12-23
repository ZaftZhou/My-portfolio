"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/siteData';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Devlog', path: '/devlog' },
    { name: 'Lab', path: '/lab' },
    { name: 'Experience', path: '/experience' },
    // Contact is usually an anchor on home, but let's keep it as separate page or anchor logic if needed
    // For now keeping it consistent with previous nav
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-marker text-2xl text-prime-900 tracking-tight hover:rotate-[-2deg] transition-transform"
          >
            {PERSONAL_INFO.name}.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`font-sketch text-lg relative group ${pathname === item.path ? 'text-prime-900' : 'text-prime-600 hover:text-prime-900'
                  }`}
              >
                {item.name}
                {/* Hand-drawn underline SVG */}
                <span className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full stroke-sketch-coral stroke-2 fill-none">
                    <path d="M0 5 Q 50 10, 100 5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              </Link>
            ))}

            {/* Resume Ticket Button */}
            <Link
              href="/resume"
              className="ml-4 relative group"
            >
              <div className="relative bg-sketch-yellow border-2 border-prime-900 text-prime-900 px-6 py-2 font-marker text-sm transform transition-transform group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_#2d251d]">
                {/* Ticket Holes */}
                <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white border-r-2 border-prime-900 rounded-full -translate-y-1/2" />
                <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white border-l-2 border-prime-900 rounded-full -translate-y-1/2" />

                RESUME
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-prime-900 hover:bg-prime-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b-2 border-prime-900 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-sketch text-xl text-prime-700 hover:text-prime-900 py-2 border-b border-prime-100"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/resume"
            onClick={() => setIsMenuOpen(false)}
            className="bg-sketch-yellow border-2 border-prime-900 text-prime-900 text-center py-3 font-marker mt-2"
          >
            Access Resume
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
