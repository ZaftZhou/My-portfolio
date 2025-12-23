"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

export default function Template({ children }) {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    // Skip animations if user prefers reduced motion
    if (shouldReduceMotion) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ x: 24, opacity: 0 }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        duration: 0.28,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                }}
                exit={{
                    x: -16,
                    opacity: 0,
                    transition: {
                        duration: 0.2,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                }}
                style={{
                    boxShadow: '0 0 0 rgba(0,0,0,0)'
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
