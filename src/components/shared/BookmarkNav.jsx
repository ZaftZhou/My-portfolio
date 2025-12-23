"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BookmarkNav({ sections }) {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="flex flex-col gap-4">
            {sections.map(({ id, label, color }) => (
                <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="group flex items-center gap-3 w-full text-left relative"
                >
                    {/* Bookmark Tab */}
                    <motion.div
                        className="w-4 h-12 rounded-r-md shadow-sm border-y border-r border-prime-900/20"
                        style={{ backgroundColor: color }}
                        animate={{
                            width: activeSection === id ? 24 : 16,
                            x: activeSection === id ? 4 : 0
                        }}
                    />

                    {/* Label */}
                    <span
                        className={`font-marker text-sm uppercase tracking-wide transition-colors ${activeSection === id ? "text-prime-900" : "text-prime-400 group-hover:text-prime-600"
                            }`}
                    >
                        {label}
                    </span>
                </button>
            ))}
        </nav>
    );
}
