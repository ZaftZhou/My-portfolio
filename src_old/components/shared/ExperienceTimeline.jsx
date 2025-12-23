import React from 'react';
import RevealOnScroll from '../animations/RevealOnScroll';

function ExperienceTimeline({ experiences }) {
  return (
    <div className="space-y-12 border-l-2 border-slate-800 pl-8 ml-4">
      {experiences.map((exp, idx) => (
        <RevealOnScroll key={idx} delay={idx * 100}>
          <div className="relative group hover:pl-2 transition-all duration-300">
            <div
              className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform ${
                idx === 0 ? 'bg-cyan-500' : 'bg-slate-600'
              }`}
            ></div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {exp.role}
            </h3>
            <p className="text-cyan-400 mb-2 font-mono text-sm">
              {exp.company} | {exp.period}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}

export default ExperienceTimeline;
