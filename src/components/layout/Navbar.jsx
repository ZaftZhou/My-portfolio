import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/siteData';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 处理 About 链接：首页滚动，其他页跳转
  const handleAboutClick = () => {
    if (location.pathname === '/') {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'About', onClick: handleAboutClick, isSpecial: true },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
          >
            {PERSONAL_INFO.name}.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            {navItems.map((item) => (
              item.isSpecial ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="text-slate-400 hover:text-white transition-colors uppercase tracking-wide"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-slate-400 hover:text-white transition-colors uppercase tracking-wide ${
                    location.pathname === item.path ? 'text-cyan-400' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}

            {/* Resume Button */}
            <Link
              to="/resume"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider ml-4 group"
            >
              <FileText size={14} className="group-hover:scale-110 transition-transform" />
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.isSpecial ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800 w-full text-left"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {item.name}
                </Link>
              )
            ))}
            <Link
              to="/resume"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-cyan-400 hover:text-white hover:bg-slate-800 flex items-center gap-2"
            >
              <FileText size={16} /> Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
