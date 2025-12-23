import React, { useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import ExperienceTimeline from '../components/shared/ExperienceTimeline';
import { EXPERIENCE_DATA } from '../data/siteData';

function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <h1 className="text-4xl font-bold text-center text-white mb-4 flex items-center justify-center gap-2">
            <Briefcase className="text-cyan-500" /> Work Experience
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <p className="text-center text-slate-400 mb-12">
            My professional journey in game development and 3D art
          </p>
        </RevealOnScroll>

        <ExperienceTimeline experiences={EXPERIENCE_DATA} />
      </div>
    </div>
  );
}

export default ExperiencePage;
