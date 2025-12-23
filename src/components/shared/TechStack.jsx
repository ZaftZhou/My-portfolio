import React from 'react';
import { TECH_STACK } from '@/lib/siteData';

function TechStack() {
  return (
    <div className="border-y border-slate-800 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-center text-slate-500 text-xs font-bold mb-8 uppercase tracking-[0.2em]">
          Technical Arsenal
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70">
          {TECH_STACK.map((skill) => (
            <span
              key={skill}
              className="text-lg font-semibold text-slate-300 hover:text-cyan-400 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;
