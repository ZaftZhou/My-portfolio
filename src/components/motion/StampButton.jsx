"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StampButton({
    children,
    onClick,
    stampText = "✓",
    className = "",
    ...props
}) {
    const [isStamped, setIsStamped] = useState(false);

    const handleClick = useCallback((e) => {
        setIsStamped(true);

        // Reset after animation
        setTimeout(() => setIsStamped(false), 800);

        // Call original onClick
        onClick?.(e);
    }, [onClick]);

    return (
        <button
            className={`relative overflow-visible ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}

            {/* Stamp overlay */}
            <AnimatePresence>
                {isStamped && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ scale: 1.5, opacity: 0, rotate: -25 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: -12,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 15
                            }
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <span
                            className="font-marker text-3xl text-green-600"
                            style={{
                                textShadow: '2px 2px 0 rgba(0,0,0,0.1)'
                            }}
                        >
                            {stampText}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ink spread effect */}
            <AnimatePresence>
                {isStamped && (
                    <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        initial={{ scale: 0.5, opacity: 0.5 }}
                        animate={{
                            scale: 2,
                            opacity: 0,
                            transition: { duration: 0.5, ease: "easeOut" }
                        }}
                        style={{
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)'
                        }}
                    />
                )}
            </AnimatePresence>
        </button>
    );
}

// Full page stamp overlay for form submissions
export function StampOverlay({
    show,
    text = "APPROVED",
    onAnimationComplete
}) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onAnimationComplete={onAnimationComplete}
                >
                    <motion.div
                        className="relative"
                        initial={{ scale: 2, rotate: -30, opacity: 0 }}
                        animate={{
                            scale: 1,
                            rotate: -12,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 12
                            }
                        }}
                        exit={{
                            scale: 0.8,
                            opacity: 0,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Stamp border */}
                        <div
                            className="px-12 py-6 border-8 border-green-600 rounded-lg"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
                            }}
                        >
                            <span className="font-marker text-5xl text-green-600 tracking-wider">
                                {text}
                            </span>
                        </div>

                        {/* Ink splatter effect */}
                        <motion.div
                            className="absolute -inset-4 -z-10 opacity-20"
                            initial={{ scale: 0 }}
                            animate={{
                                scale: 1.5,
                                transition: { delay: 0.1, duration: 0.3 }
                            }}
                            style={{
                                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, transparent 60%)',
                                filter: 'blur(8px)'
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
