import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { education } from '../../data/education';

export default function EducationJourney() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;
    const exitScale = isMobile ? 0.96 : 0.92;

    const items = gsap.utils.toArray('.edu-timeline-item');
    
    items.forEach((item: any) => {
      gsap.fromTo(item,
        { opacity: 0.3, x: -20, scale: startScale, filter: isMobile ? 'none' : 'blur(4px)' },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );
    });

    // Zoom exit for section on scroll away
    gsap.to(container.current, {
      scale: exitScale,
      opacity: 0.7,
      filter: isMobile ? 'none' : 'blur(2px)',
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'bottom 60%',
        end: 'bottom -10%',
        scrub: 0.5,
      }
    });

  }, { scope: container, dependencies: [bootComplete] });

  // Chronological order: past to present (SSC -> Diploma -> B.Tech)
  const sortedEdu = [...education].reverse();

  return (
    <section 
      ref={container} 
      id="education" 
      className="relative w-full min-h-screen pointer-events-auto px-6 py-24 sm:py-32 bg-transparent overflow-hidden border-t border-white/10"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto mb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">
          07 / ACADEMIC PATHWAY
        </div>
        <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          EDUCATION <span className="text-apple-blue-gradient">TIMELINE</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-xl font-light leading-relaxed mt-3">
          The formal academic journey from secondary school distinction to mechanical engineering and specialized AI & ML engineering.
        </p>
      </div>

      {/* Vertical Apple Timeline */}
      <div className="max-w-4xl mx-auto relative border-l-2 border-white/15 pl-6 sm:pl-12 space-y-16">
        {sortedEdu.map((edu) => {
          const isCurrent = edu.current;

          return (
            <div key={edu.id} className="edu-timeline-item relative">
              {/* Timeline Indicator Node Dot */}
              <div 
                className={`absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full border-2 border-black ${
                  isCurrent ? 'bg-blue-500 shadow-[0_0_20px_#0071e3]' : 'bg-white/40'
                }`}
              ></div>

              {/* Apple Timeline Card */}
              <div className="apple-glass apple-glass-hover rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
                
                {/* Year & Pill Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-400 uppercase">
                    {edu.year}
                  </span>
                  {isCurrent ? (
                    <span className="font-mono text-xs tracking-widest px-3.5 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 uppercase rounded-full font-medium">
                      CURRENTLY PURSUING
                    </span>
                  ) : (
                    <span className="font-mono text-xs tracking-widest px-3.5 py-1.5 bg-white/5 border border-white/10 text-white/50 uppercase rounded-full font-medium">
                      COMPLETED
                    </span>
                  )}
                </div>

                {/* Degree & Institution */}
                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs text-white/50 tracking-wider mb-4 font-medium">
                  {edu.institution} • {edu.location}
                </p>

                {/* Description */}
                <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed mb-6">
                  {edu.description}
                </p>

                {/* Milestones & Highlights */}
                {edu.milestones && edu.milestones.length > 0 && (
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2.5">
                    {edu.milestones.map((milestone) => (
                      <div key={milestone} className="flex items-center gap-2 font-mono text-xs text-white/80 bg-white/5 px-3.5 py-1.5 border border-white/10 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
