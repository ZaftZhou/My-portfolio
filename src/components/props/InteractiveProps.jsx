"use client";

import { motion } from "framer-motion";

export function Tape({ className, rotate = 0 }) {
    return (
        <div
            className={`absolute h-8 w-24 bg-white/30 backdrop-blur-[1px] shadow-sm transform ${className}`}
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <div className="absolute inset-0 opacity-20 bg-noise" />
            {/* Thread/texture lines */}
            <div className="w-full h-full border-t border-b border-white/40" />
        </div>
    );
}

export function PaperClip({ className, rotate = 0, color = "#9ca3af" }) {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            className={`absolute w-10 h-10 cursor-grab active:cursor-grabbing opacity-70 ${className}`}
            style={{ rotate: rotate }}
        >
            <svg viewBox="0 0 50 100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round">
                <path d="M15 20 L15 80 A 10 10 0 0 0 35 80 L35 10 A 10 10 0 0 0 10 10 L10 60" />
            </svg>
        </motion.div>
    );
}

export function CoffeeStain({ className, size = 120, opacity = 0.1 }) {
    return (
        <div
            className={`absolute pointer-events-none select-none ${className}`}
            style={{ width: size, height: size, opacity }}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-prime-700 stroke-[5] fill-none">
                {/* Irregular circle */}
                <path d="M 50 10 C 75 10, 90 25, 90 50 C 90 75, 75 90, 50 90 C 25 90, 10 75, 10 50 C 10 25, 25 10, 50 10"
                    strokeDasharray="250 10"
                    style={{ filter: "url(#ink-spread)" }}
                />
            </svg>
        </div>
    );
}

export function Sticker({ children, className, rotate = 0 }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: rotate + 5 }}
            className={`absolute inline-flex items-center justify-center p-2 bg-white border-2 border-white shadow-md rounded-lg transform ${className}`}
            style={{ rotate: rotate }}
        >
            {children}
        </motion.div>
    );
}
