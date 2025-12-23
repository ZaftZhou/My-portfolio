"use client";

import { motion } from "framer-motion";

export default function PageIndicator({ activePage, totalPages, setPage, isJourney }) {
    if (isJourney) {
        return (
            <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-50 text-[10px] font-mono font-bold text-prime-400">
                <span>'25</span>
                <div className="w-[1px] h-16 bg-prime-300 relative">
                    {/* We could animate scroll progress here if we had it, for now static indicator of "flow" */}
                    <motion.div
                        className="absolute top-0 left-[-1px] right-[-1px] w-[3px] bg-prime-800"
                        initial={{ height: "0%" }}
                        animate={{ height: "50%" }} // Mock 50% for now
                    />
                </div>
                <span>'14</span>
            </div>
        );
    }

    return (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className="relative group p-2"
                >
                    <motion.div
                        className={`w-3 h-3 rounded-full border-2 border-prime-800 transition-colors ${activePage === i ? "bg-prime-800" : "bg-transparent"
                            }`}
                        whileHover={{ scale: 1.2 }}
                    />
                    {/* Tooltip/Label */}
                    <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        {["Home", "About", "Selected Work", "Journey", "Contact"][i] || `Page ${i + 1}`}
                    </div>
                </button>
            ))}
        </div>
    );
}
