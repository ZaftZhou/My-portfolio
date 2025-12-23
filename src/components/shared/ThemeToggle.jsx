"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="sketch-btn p-3 opacity-50" disabled>
                🎨
            </button>
        );
    }

    const isBlueprint = theme === "blueprint";

    return (
        <motion.button
            onClick={() => setTheme(isBlueprint ? "paper" : "blueprint")}
            className="sketch-btn p-3 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isBlueprint ? "Switch to Paper mode" : "Switch to Blueprint mode"}
            aria-label="Toggle theme"
        >
            <motion.span
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="text-lg"
            >
                {isBlueprint ? "📜" : "📐"}
            </motion.span>
        </motion.button>
    );
}
