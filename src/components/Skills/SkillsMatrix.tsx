import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { skillCategories } from '../../data/skills';

export default function SkillsMatrix() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.02 : 1.05;
    const exitScale = isMobile ? 0.96 : 0.92;
    const noBlur = 'blur(0px)';
    const initialBlur = isMobile ? 'none' : 'blur(4px)';
    const exitBlur = isMobile ? 'none' : 'blur(2px)';

    // Sequential reveal for categories
    const categories = gsap.utils.toArray('.skill-category-block');

    categories.forEach((cat: any) => {
      gsap.fromTo(cat,
        { opacity: 0, y: 40, scale: startScale, filter: initialBlur },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: noBlur,
          duration: 0.8,
          scrollTrigger: {
            trigger: cat,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
            onLeave: () => {
              gsap.set(cat, { filter: noBlur, opacity: 1, scale: 1, y: 0 });
            },
            onEnterBack: () => {
              gsap.set(cat, { filter: noBlur, opacity: 1, scale: 1, y: 0 });
            }
          }
        }
      );
    });

    // Zoom exit for section container on scroll away
    gsap.fromTo(container.current,
      { scale: 1, opacity: 1, filter: noBlur },
      {
        scale: exitScale,
        opacity: 0.7,
        filter: exitBlur,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'bottom 60%',
          end: 'bottom -10%',
          scrub: 0.5,
          onEnterBack: () => {
            gsap.set(container.current, { filter: noBlur, opacity: 1, scale: 1 });
          },
          onLeaveBack: () => {
            gsap.set(container.current, { filter: noBlur, opacity: 1, scale: 1 });
          }
        }
      }
    );

  }, { scope: container, dependencies: [bootComplete] });

  const cat1 = skillCategories.find((c) => c.id === 'ai-ml');
  const cat2 = skillCategories.find((c) => c.id === 'programming-tech');
  const cat3 = skillCategories.find((c) => c.id === 'creative-media');

  return (
    <section 
      ref={container} 
      id="skills-matrix" 
      className="relative w-full min-h-screen pointer-events-auto px-6 py-24 sm:py-32 bg-transparent overflow-hidden border-t border-white/10"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">
          05 / TECHNICAL CAPABILITY MAP
        </div>
        <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          ENGINEERING <span className="text-apple-blue-gradient">CAPABILITIES</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-xl font-light leading-relaxed mt-3">
          Structured AI/ML technical architecture, core programming tools, and creative automation systems.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* CATEGORY 01: AI & MACHINE LEARNING (PRIMARY - Highest Hierarchy) */}
        {cat1 && (
          <div className="skill-category-block relative apple-glass rounded-3xl p-8 sm:p-12 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,212,255,0.08)] bg-gradient-to-b from-blue-950/20 via-black/40 to-transparent flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-widest text-black bg-cyan-400 px-3 py-1 rounded-full uppercase">
                  {cat1.number} // {cat1.badge}
                </span>
                <h3 className="font-outfit font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                  {cat1.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-cyan-300/80 tracking-wider">
                {cat1.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat1.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="group relative apple-glass apple-glass-hover p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 bg-cyan-950/10 hover:bg-cyan-900/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg hover:shadow-[0_10px_30px_rgba(0,212,255,0.15)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[0.65rem] tracking-widest text-cyan-300 font-bold uppercase bg-cyan-500/20 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                        {skill.tag}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse group-hover:scale-125 transition-transform"></span>
                    </div>

                    <h4 className="font-outfit font-black text-xl text-white mb-2 tracking-tight group-hover:text-cyan-200 transition-colors">
                      {skill.name}
                    </h4>

                    <p className="text-white/70 text-xs font-light leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {skill.usedInProject && (
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[0.65rem] text-cyan-300/90 tracking-widest uppercase">
                      <span>USED IN →</span>
                      <span className="text-white font-semibold group-hover:text-cyan-300 transition-colors truncate max-w-[170px]">
                        {skill.usedInProject}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY 02: PROGRAMMING & TECHNOLOGY (ENGINEERING BASE) */}
        {cat2 && (
          <div className="skill-category-block apple-glass rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-widest text-white bg-blue-600 px-3 py-1 rounded-full uppercase">
                  {cat2.number} // {cat2.badge}
                </span>
                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  {cat2.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-white/50 tracking-wider">
                {cat2.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {cat2.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="group apple-glass apple-glass-hover p-5 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-md hover:shadow-[0_8px_25px_rgba(59,130,246,0.12)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[0.6rem] tracking-widest text-blue-400 font-semibold uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                        {skill.tag}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors"></span>
                    </div>

                    <h4 className="font-outfit font-bold text-base text-white mb-1 tracking-tight group-hover:text-blue-300 transition-colors">
                      {skill.name}
                    </h4>

                    <p className="text-white/60 text-[0.75rem] font-light leading-snug mb-3">
                      {skill.description}
                    </p>
                  </div>

                  {skill.usedInProject && (
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[0.6rem] text-white/40 uppercase tracking-wider">
                      <span>USED IN →</span>
                      <span className="text-blue-300/80 font-medium truncate max-w-[120px]">
                        {skill.usedInProject}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY 03: CREATIVE & MEDIA (ADDITIONAL CREATIVE CAPABILITIES) */}
        {cat3 && (
          <div className="skill-category-block apple-glass rounded-3xl p-8 sm:p-12 border border-purple-500/20 shadow-xl flex flex-col gap-8 bg-gradient-to-b from-purple-950/10 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-widest text-white bg-purple-600/80 px-3 py-1 rounded-full uppercase">
                  {cat3.number} // {cat3.badge}
                </span>
                <h3 className="font-outfit font-black text-xl sm:text-2xl text-white tracking-tight uppercase">
                  {cat3.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-purple-300/70 tracking-wider">
                {cat3.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {cat3.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="group apple-glass apple-glass-hover p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-md hover:shadow-[0_8px_25px_rgba(168,85,247,0.12)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[0.6rem] tracking-widest text-purple-300 font-semibold uppercase bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                        {skill.tag}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 group-hover:bg-purple-300 transition-colors"></span>
                    </div>

                    <h4 className="font-outfit font-bold text-base text-white mb-1 tracking-tight group-hover:text-purple-200 transition-colors">
                      {skill.name}
                    </h4>

                    <p className="text-white/60 text-[0.75rem] font-light leading-snug mb-3">
                      {skill.description}
                    </p>
                  </div>

                  {skill.usedInProject && (
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[0.6rem] text-purple-300/70 uppercase tracking-wider">
                      <span>USED IN →</span>
                      <span className="text-purple-200 font-medium truncate max-w-[120px]">
                        {skill.usedInProject}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
