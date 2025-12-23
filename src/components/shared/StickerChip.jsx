"use client";

const CATEGORY_COLORS = {
    'Game Dev': '#3b82f6',
    'Shaders': '#a855f7',
    'Simulator': '#f97316',
    '3D Art': '#ec4899',
    'Tools': '#22c55e',
};

export default function StickerChip({
    children,
    category,
    variant = 'default',
    className = ''
}) {
    const color = CATEGORY_COLORS[category] || '#2d251d';

    return (
        <span
            className={`sticker-chip ${className}`}
            data-cat={category}
            style={{
                '--chip-color': color,
                borderColor: variant === 'filled' ? color : undefined,
                backgroundColor: variant === 'filled' ? `${color}15` : undefined,
            }}
        >
            {children}
        </span>
    );
}

// Preset variants
export function YearChip({ year }) {
    return (
        <span className="sticker-chip" style={{ color: '#f97316' }}>
            {year}
        </span>
    );
}

export function RoleChip({ role }) {
    return (
        <span className="sticker-chip" style={{ color: '#22c55e' }}>
            {role}
        </span>
    );
}

export function TechChip({ tech }) {
    return (
        <span className="sticker-chip" style={{ color: '#3b82f6' }}>
            {tech}
        </span>
    );
}
