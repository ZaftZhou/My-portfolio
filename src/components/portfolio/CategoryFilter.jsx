import React from 'react';
import { CATEGORIES } from '../../data/siteData';

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
            activeCategory === cat
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
