import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';

export default function JourneyMilestones() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;
    const exitScale = isMobile ? 0.96 : 0.92;

    const stages = gsap.utils.toArray('.evolution-stage');
    
    // Stagger reveal on entry
    gsap.fromTo(stages, 
      { opacity: 0, y: 40, scale: startScale, filter: isMobile ? 'none' : 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Zoom exit on scroll away
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

  const evolutionSteps = [
    {
      phase: '01 / STRUCTURE',
      title: 'MECHANICAL ENGINEERING',
      subtitle: 'DIPLOMA IN MECHANICAL ENGINEERING',
      description: 'Mastered physical thermodynamics, CAD modeling, structural mechanics, and manufacturing principles. Understanding how physical hardware functions.',
      accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      bgTag: 'MECHANICAL BASE',
    },
    {
      phase: '02 / SYSTEMS',
      title: 'INDUSTRIAL EXPOSURE',
      subtitle: 'MAIDC INDUSTRIAL INTERNSHIP',
      description: 'Hands-on exposure at The Maharashtra Agro-Industries Development Corporation. Observed real-world plant operations, machinery maintenance, and industrial workflows.',
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      bgTag: 'INDUSTRIAL REALITY',
    },
    {
      phase: '03 / DATA',
      title: 'SOFTWARE & AUTOMATION',
      subtitle: 'WEB TECH & EXTENDSCRIPT AUTOMATION',
      description: 'Bridged physical mechanics with digital code. Developed real-time web applications, weather forecasting APIs, and custom workflow plugins.',
      accent: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      bgTag: 'DIGITAL TRANSITION',
    },
    {
      phase: '04 / INTELLIGENCE',
      title: 'ARTIFICIAL INTELLIGENCE & ML',
      subtitle: 'B.TECH IN AI & ML • AI DIGITAL TWIN',
      description: 'Pursuing B.Tech specialization in Artificial Intelligence. Combining mechanical understanding with predictive ML models to build the AI Digital Twin for smart manufacturing.',
      accent: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10',
      bgTag: 'FUTURE VISION',
    },
  ];

  return (
    <section 
      ref={container} 
      id="journey" 
      className="relative w-full min-h-screen pointer-events-auto px-6 py-24 sm:py-32 bg-transparent border-t border-white/10"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        
        {/* Section Header */}
        <div className="text-center w-full max-w-4xl px-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            03 / EVOLUTION NARRATIVE
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-4">
            STRUCTURE <span className="text-white/40">→</span> SYSTEMS <span className="text-white/40">→</span> DATA <span className="text-apple-blue-gradient">→ INTELLIGENCE</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            The multi-phase transformation from mechanical hardware principles to intelligent machine learning systems.
          </p>
        </div>

        {/* Apple Bento Grid Showcase */}
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {evolutionSteps.map((step, i) => (
              <div 
                key={i} 
                className="evolution-stage apple-glass apple-glass-hover rounded-3xl p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden group shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className={`font-mono text-xs tracking-widest font-semibold uppercase px-3 py-1 rounded-full border ${step.accent}`}>
                      {step.phase}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {step.bgTag}
                    </span>
                  </div>

                  <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-2 uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs text-white/50 tracking-wider mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[0.65rem] text-white/40 uppercase tracking-widest">
                  <span>EVOLUTION STEP 0{i + 1}</span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">EXPLORE →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
