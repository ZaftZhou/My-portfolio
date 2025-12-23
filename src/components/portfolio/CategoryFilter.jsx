import React from 'react';
import { CATEGORIES } from '@/lib/siteData';

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex p-1 bg-white/5 rounded-full overflow-x-auto scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap uppercase ${activeCategory === cat
            ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
            : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
