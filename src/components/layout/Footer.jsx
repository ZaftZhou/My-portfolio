import React from 'react';
import { PERSONAL_INFO } from '../../data/siteData';

function Footer() {
  return (
    <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800 bg-slate-950">
      <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
