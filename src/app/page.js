"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroLetter from "@/components/home/HeroLetter";
import QuestLog from "@/components/game/QuestLog";
// Import existing sections
import AboutSection from "@/components/home/AboutSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import ContactSection from "@/components/home/ContactSection";
import PageIndicator from "@/components/shared/PageIndicator";
import { Tape, CoffeeStain, PaperClip } from "@/components/props/InteractiveProps";

const SECTIONS = [
  { id: "home", component: HeroLetter },
  { id: "about", component: AboutSection },
  { id: "work", component: FeaturedProjects },
  { id: "journey", component: ExperienceTimeline },
  { id: "contact", component: ContactSection }
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const journeyIndex = SECTIONS.findIndex(s => s.id === 'journey');

  // Scroll handling for page turns
  useEffect(() => {
    const handleWheel = (e) => {
      // Disable auto-page turn if in Journey section
      if (currentPage === journeyIndex) return;

      if (isScrolling) return;

      if (Math.abs(e.deltaY) > 30) { // Threshold
        setIsScrolling(true);

        if (e.deltaY > 0) {
          // Scroll Down -> Next Page
          setCurrentPage(prev => Math.min(prev + 1, SECTIONS.length - 1));
        } else {
          // Scroll Up -> Prev Page
          setCurrentPage(prev => Math.max(prev - 1, 0));
        }

        // Cooldown
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling, currentPage]);

  // Page Transition Variants
  const pageVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      zIndex: 0,
      transformOrigin: direction > 0 ? "right center" : "left center"
    }),
    visible: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      zIndex: 0,
      transformOrigin: direction > 0 ? "left center" : "right center"
    })
  };

  // Determine direction for animation
  const prevPage = useRef(0);
  useEffect(() => {
    prevPage.current = currentPage;
  }, [currentPage]);

  const sliderDirection = currentPage > prevPage.current ? 1 : -1;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#e6e1db] font-serif">
      {/* Background Texture Global */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-noise z-0" />

      {/* Desk Mat / Surface */}
      <div className="fixed inset-4 md:inset-8 border-4 border-prime-300 rounded-3xl z-0 pointer-events-none" />

      {/* Global Desk Props */}
      <Tape className="top-10 left-20 -rotate-12 z-0" />
      <Tape className="bottom-20 right-40 rotate-45 z-0" />
      <CoffeeStain className="top-[15%] right-[10%] z-0" />

      {/* Quest Log - Always Visible */}
      <QuestLog onNavigate={setCurrentPage} />

      {/* Page Indicator */}
      <PageIndicator
        activePage={currentPage}
        totalPages={SECTIONS.length}
        setPage={setCurrentPage}
        isJourney={currentPage === journeyIndex}
      />

      {/* Content Area */}
      <div className="relative h-screen flex items-center justify-center p-4 md:p-8 perspective-1000">
        <AnimatePresence mode="wait" custom={sliderDirection}>
          <motion.div
            key={currentPage}
            custom={sliderDirection}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-7xl h-full md:h-[90vh] relative flex flex-col overflow-hidden perspective-1000"
          >


            {/* Page Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto remove-scrollbar relative p-6 md:p-12">
              {/* Render the component dynamically with onNavigate prop */}
              {(() => {
                const Component = SECTIONS[currentPage]?.component;
                return Component ? <Component onNavigate={setCurrentPage} /> : <div className="flex items-center justify-center h-full">Section Loading...</div>;
              })()}
            </div>

            {/* Footer Label - Fixed Frame */}
            <div className="absolute bottom-4 right-6 text-prime-400 font-mono text-xs z-50 pointer-events-none">
              {currentPage === journeyIndex
                ? "JOURNEY · 2014 → 2025"
                : `PAGE ${currentPage + 1} OF ${SECTIONS.length}`
              }
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
          .perspective-1000 {
              perspective: 2000px;
          }
          .remove-scrollbar::-webkit-scrollbar {
              width: 0px; 
              background: transparent; 
          }
      `}</style>
    </main>
  );
}
