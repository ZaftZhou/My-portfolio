"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BOOKMARK_SECTIONS = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "tech", label: "Tech", icon: "⚙️" },
    { id: "challenges", label: "Challenges", icon: "🎯" },
    { id: "results", label: "Results", icon: "✨" },
    { id: "gallery", label: "Gallery", icon: "🖼️" },
];

export default function BookmarkNav({ sections = BOOKMARK_SECTIONS }) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id);
    const observerRef = useRef(null);

    useEffect(() => {
        // Create intersection observer to track active section
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0,
            }
        );

        // Observe all section elements
        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [sections]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav
            className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-40"
            aria-label="Page sections"
        >
            {sections.map(({ id, label, icon }) => {
                const isActive = activeSection === id;

                return (
                    <motion.button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`bookmark-tab group flex items-center gap-2 py-2 px-3 text-sm font-sketch transition-all ${isActive ? 'active bg-sketch-yellow' : 'bg-white'
                            }`}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            border: '2px solid var(--card-border)',
                            borderRadius: '8px 0 0 8px',
                            borderRight: 'none',
                        }}
                    >
                        <span className="text-base">{icon}</span>
                        <span className={`transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            {label}
                        </span>

                        {/* Active indicator - ribbon */}
                        {isActive && (
                            <motion.div
                                className="absolute -right-2 top-0 bottom-0 w-1 bg-sketch-coral"
                                layoutId="bookmark-indicator"
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </nav>
    );
}
