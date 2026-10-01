import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { siteConfig } from '../../data/siteConfig';

export default function CommandCenter() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;
    const exitScale = isMobile ? 0.96 : 0.92;

    const stats = gsap.utils.toArray('.stat-typo-block');
    
    stats.forEach((stat: any) => {
      gsap.fromTo(stat,
        { opacity: 0.3, scale: startScale, filter: isMobile ? 'none' : 'blur(4px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
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

  const statItems = [
    { number: `0${siteConfig.stats.projectsBuilt}`, label: 'REAL PROJECTS BUILT', desc: 'From AI Digital Twin to Web Applications' },
    { number: `0${siteConfig.stats.certifications}`, label: 'VERIFIED CERTIFICATIONS', desc: 'Skills4Future, Meta & Google Credentials' },
    { number: '03', label: 'EDUCATION PATHWAYS', desc: 'SSC, Diploma in Mechanical, B.Tech in AI & ML' },
    { number: '04', label: 'CORE SKILL CLUSTERS', desc: 'Programming, Web, AI/ML, Tools & Systems' },
  ];

  return (
    <section 
      ref={container} 
      id="command-center" 
      className="relative w-full min-h-screen pointer-events-auto px-6 py-24 sm:py-32 bg-transparent overflow-hidden border-t border-white/10"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">
          08 / PORTFOLIO IMPACT
        </div>
        <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
          METRICS & <span className="text-apple-blue-gradient">MILESTONES</span>
        </h2>
      </div>

      {/* Apple Bento Statistics Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat, i) => (
          <div 
            key={i} 
            className="stat-typo-block apple-glass apple-glass-hover rounded-3xl p-8 border border-white/10 flex flex-col justify-between items-center text-center shadow-2xl"
          >
            <h3 className="font-outfit font-black text-7xl sm:text-8xl text-white tracking-tight leading-none mb-6">
              {stat.number}
            </h3>
            
            <div className="border-t border-white/10 pt-4 w-full flex flex-col items-center">
              <p className="font-outfit font-bold text-sm text-blue-400 uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className="font-mono text-[0.65rem] text-white/50 tracking-wider font-light">
                {stat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
