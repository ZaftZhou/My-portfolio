"use client";

import { useState } from "react";

const CATEGORY_COLORS = {
    'All': '#2d251d',
    'Game Dev': '#3b82f6',
    'Shaders': '#a855f7',
    'Simulator': '#f97316',
    '3D Art': '#ec4899',
    'Tools': '#22c55e',
};

export default function FolderTabs({ categories, activeCategory, onCategoryChange }) {
    return (
        <nav className="flex flex-col gap-2">
            {categories.map((category, index) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className="folder-tab text-left group"
                    data-active={activeCategory === category}
                    style={{
                        animationDelay: `${index * 50}ms`,
                    }}
                >
                    <span className="flex items-center gap-3">
                        {/* Category color dot */}
                        <span
                            className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                            style={{ backgroundColor: CATEGORY_COLORS[category] || '#2d251d' }}
                        />
                        {category}
                    </span>

                    {/* Active indicator line */}
                    {activeCategory === category && (
                        <span
                            className="absolute bottom-1 left-4 right-4 h-0.5 bg-current"
                            style={{ backgroundColor: CATEGORY_COLORS[category] }}
                        />
                    )}
                </button>
            ))}
        </nav>
    );
}
