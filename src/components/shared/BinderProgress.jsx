"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const HOLE_COUNT = 8;

export default function BinderProgress() {
    const { scrollYProgress } = useScroll();

    // Map scroll progress to dot position
    const dotY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, (HOLE_COUNT - 1) * 32] // 32px gap between holes
    );

    return (
        <div
            className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-30"
            aria-hidden="true"
        >
            {/* Binder strip */}
            <div className="relative flex flex-col gap-8">
                {/* Static holes */}
                {Array.from({ length: HOLE_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className="w-3 h-3 rounded-full border-2 border-prime-400 bg-background"
                    />
                ))}

                {/* Moving dot */}
                <motion.div
                    className="absolute left-0 w-3 h-3 rounded-full bg-sketch-yellow border-2 border-prime-900"
                    style={{ y: dotY }}
                />
            </div>
        </div>
    );
}
