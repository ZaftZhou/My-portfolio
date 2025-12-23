"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// Tech skills with experience data and proof links
const SKILLS_DATA = {
    'Unity 3D': { years: '5+', icon: '🎮', proof: 'Built 10+ games', project: 'vince-virtual-integration' },
    'C#': { years: '5+', icon: '💻', proof: 'AI systems & tools', project: 'ai-enemy-system' },
    'HLSL': { years: '3+', icon: '✨', proof: 'Custom shaders', project: null },
    'Shader Graph': { years: '3+', icon: '🎨', proof: 'VFX & materials', project: null },
    'Blender': { years: '4+', icon: '🧊', proof: '3D modeling', project: null },
    'Substance Painter': { years: '2+', icon: '🖌️', proof: 'Texturing', project: null },
    'ZBrush': { years: '2+', icon: '🗿', proof: 'Sculpting', project: null },
    'Git': { years: '5+', icon: '🌿', proof: 'Version control', project: null },
};

export default function FlipBadge({ skill }) {
    const data = SKILLS_DATA[skill] || { years: '1+', icon: '⭐', proof: 'Experience', project: null };
    const shouldReduceMotion = useReducedMotion();

    // Simple version for reduced motion
    if (shouldReduceMotion) {
        return (
            <span className="sticker-chip" style={{ color: '#3b82f6' }}>
                {skill}
            </span>
        );
    }

    return (
        <motion.div
            className="flip-badge inline-block cursor-pointer"
            whileHover="flipped"
            initial="idle"
        >
            <motion.div
                className="flip-badge-inner relative"
                variants={{
                    idle: { rotateY: 0 },
                    flipped: { rotateY: 180 }
                }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <span
                    className="flip-badge-front sticker-chip block"
                    style={{
                        color: '#3b82f6',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    {skill}
                </span>

                {/* Back */}
                <span
                    className="flip-badge-back sticker-chip absolute inset-0 flex items-center justify-center gap-1"
                    style={{
                        backgroundColor: '#ffd93d',
                        color: '#2d251d',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {data.project ? (
                        <Link
                            href={`/portfolio/${data.project}`}
                            className="hover:underline flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {data.icon} {data.years}
                            <span className="text-xs">→</span>
                        </Link>
                    ) : (
                        <span>{data.icon} {data.years}</span>
                    )}
                </span>
            </motion.div>
        </motion.div>
    );
}
