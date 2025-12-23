import React from 'react';
import { PERSONAL_INFO } from '../../data/siteData';

function Footer() {
  return (
    <footer className="py-20 text-center border-t border-white/5 bg-prime-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tighter opacity-50">
            {PERSONAL_INFO.name.toUpperCase()}.
          </span>
        </div>
        <p className="text-slate-600 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. ALL RIGHTS RESERVED. / DATA-DRIVEN ARTISTRY
        </p>
      </div>
    </footer>
  );
}

export default Footer;
