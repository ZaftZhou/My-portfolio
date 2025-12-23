"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trophy } from "lucide-react";

export default function QuestLog({ onNavigate }) {
    const [quests, setQuests] = useState([
        { id: 'about', label: 'Read About Me', xp: 10, completed: false },
        { id: 'work', label: 'View Selected Work', xp: 20, completed: false },
        { id: 'journey', label: 'Unlock Journey', xp: 15, completed: false },
        { id: 'contact', label: 'Send a Message', xp: 30, completed: false },
    ]);
    const [totalXP, setTotalXP] = useState(0);
    const [showReward, setShowReward] = useState(false);

    const QUEST_PAGE_MAP = {
        'about': 1,
        'work': 2,
        'journey': 3,
        'contact': 4
    };

    // ... existing useEffect ...

    const handleQuestClick = (id) => {
        if (onNavigate && QUEST_PAGE_MAP[id] !== undefined) {
            onNavigate(QUEST_PAGE_MAP[id]);
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            checkQuest('about', scrollPercent > 0.15);
            checkQuest('work', scrollPercent > 0.35);
            checkQuest('journey', scrollPercent > 0.60);
            checkQuest('contact', scrollPercent > 0.90);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [quests]);

    const checkQuest = (id, condition) => {
        setQuests(prev => {
            const quest = prev.find(q => q.id === id);
            if (quest && !quest.completed && condition) {
                triggerReward(quest.xp);
                return prev.map(q => q.id === id ? { ...q, completed: true } : q);
            }
            return prev;
        });
    };

    const triggerReward = (xp) => {
        setTotalXP(prev => prev + xp);
        setShowReward(true);
        setTimeout(() => setShowReward(false), 2000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: 1, y: -50, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-12 right-0 font-black text-2xl text-sketch-yellow drop-shadow-md"
                    >
                        +XP!
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="bg-[#fefce8] p-6 w-64 shadow-lg border border-prime-200 rotate-[-2deg]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full shadow-sm border border-red-600" />

                <div className="flex justify-between items-center mb-4 border-b-2 border-prime-900 pb-2">
                    <h3 className="font-black text-prime-900 uppercase text-sm tracking-wider">Quest Log</h3>
                    <div className="flex items-center gap-1 bg-prime-900 text-white px-2 py-0.5 rounded text-xs font-bold">
                        <Trophy size={10} />
                        <span>LVL {Math.floor(totalXP / 50) + 1}</span>
                    </div>
                </div>

                <ul className="space-y-3 font-sketch text-prime-700">
                    {quests.map(quest => (
                        <li
                            key={quest.id}
                            onClick={() => handleQuestClick(quest.id)}
                            className="flex items-start gap-2 group cursor-pointer hover:text-prime-900 transition-colors"
                        >
                            <div className={`mt-1 w-4 h-4 border-2 border-prime-600 rounded-sm flex items-center justify-center transition-colors ${quest.completed ? 'bg-sketch-mint border-sketch-mint' : 'bg-transparent group-hover:border-prime-900'}`}>
                                {quest.completed && <Check size={12} className="text-white" />}
                            </div>
                            <span className={`leading-tight transition-all ${quest.completed ? 'line-through opacity-50' : 'group-hover:font-bold'}`}>
                                {quest.label}
                            </span>
                            {quest.completed && (
                                <span className="text-[10px] text-sketch-mint font-bold ml-auto">+{quest.xp}</span>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="mt-4 pt-2 border-t border-dashed border-prime-300 text-[10px] text-prime-400 font-mono text-center">
                    TOTAL XP: {totalXP}
                </div>
            </motion.div>
        </div>
    );
}
