"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/siteData';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Devlog', path: '/devlog' },
    { name: 'Lab', path: '/lab' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full glass z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tighter hover:scale-105 transition-transform"
          >
            {PERSONAL_INFO.name.toUpperCase()}.
          </Link>

          <div className="hidden lg:flex space-x-10 text-[10px] font-black items-center uppercase tracking-[0.2em]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`transition-all duration-300 relative group overflow-hidden ${pathname === item.path ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 transform origin-left transition-transform duration-300 ${pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
              </Link>
            ))}

            <Link
              href="/resume"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full glass border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group shadow-[0_0_15px_rgba(34,211,238,0.1)]"
            >
              <FileText size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black">RESUME</span>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden glass border-t border-white/5 animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-8 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-xs font-black tracking-widest text-slate-400 hover:text-white hover:bg-white/5 uppercase transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/resume"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 rounded-xl glass border border-cyan-500/20 text-cyan-400 flex items-center justify-center gap-3 font-black text-xs tracking-widest uppercase"
            >
              <FileText size={18} /> Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
