import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { projects } from '../../data/projects';

export default function ProjectUniverseUI() {
  const container = useRef<HTMLDivElement>(null);
  const { bootComplete, setSelectedProjectId, showProtocolToast } = useStore();
  const [dtBadgeClicks, setDtBadgeClicks] = useState(0);

  const handleDigitalTwinBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextCount = dtBadgeClicks + 1;
    setDtBadgeClicks(nextCount);
    if (nextCount === 3) {
      setDtBadgeClicks(0);
      showProtocolToast({
        id: 'diagnostic-mode',
        title: 'DIAGNOSTIC MODE: SYSTEM CORE ACCESS',
        subtitle: 'Subsystem telemetry synchronizing... All parameters nominal.',
        protocolNum: '04 / 05',
      });
    }
  };

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;
    const exitScale = isMobile ? 0.96 : 0.92;

    const cards = gsap.utils.toArray('.project-showcase-card');
    
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0.3, y: 50, scale: startScale, filter: isMobile ? 'none' : 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: card,
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

  // Apple project theme styling
  const getProjectStyles = (id: string) => {
    switch (id) {
      case 'ai-digital-twin':
        return {
          border: 'border-blue-500/30 hover:border-blue-400/60',
          gradientBg: 'from-blue-600/15 via-indigo-600/10 to-transparent',
          tagText: 'text-blue-400',
          badge: 'FEATURED FLAGSHIP PROJECT',
          badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          identityTag: 'INDUSTRIAL INTELLIGENCE',
        };
      case 'weather-forecasting':
        return {
          border: 'border-cyan-500/30 hover:border-cyan-400/60',
          gradientBg: 'from-cyan-600/15 via-blue-600/10 to-transparent',
          tagText: 'text-cyan-400',
          badge: 'ATMOSPHERIC DATA',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          identityTag: 'ATMOSPHERIC & REAL-TIME',
        };
      case 'lab-safety-management':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-400/60',
          gradientBg: 'from-emerald-600/15 via-teal-600/10 to-transparent',
          tagText: 'text-emerald-400',
          badge: 'SMART MONITORING',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          identityTag: 'STRUCTURED & PROFESSIONAL',
        };
      case 'after-effects-plugin':
        return {
          border: 'border-indigo-500/30 hover:border-indigo-400/60',
          gradientBg: 'from-indigo-600/15 via-purple-600/10 to-transparent',
          tagText: 'text-indigo-400',
          badge: 'WORKFLOW AUTOMATION',
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
          identityTag: 'CREATIVE & MOTION PIPELINE',
        };
      case 'domestic-tumbler':
      default:
        return {
          border: 'border-amber-500/30 hover:border-amber-400/60',
          gradientBg: 'from-amber-600/15 via-orange-600/10 to-transparent',
          tagText: 'text-amber-400',
          badge: 'MECHANICAL DESIGN',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          identityTag: 'ENGINEERING & CAD',
        };
    }
  };

  return (
    <section 
      ref={container} 
      id="projects"
      className="relative w-full min-h-screen pointer-events-auto px-6 py-24 sm:py-32 bg-transparent overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            04 / PROJECT SHOWCASE
          </div>
          <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
            WHAT I HAVE <span className="text-apple-blue-gradient">BUILT</span>
          </h2>
        </div>
        <p className="text-white/60 text-sm sm:text-base max-w-md font-light leading-relaxed">
          Engineering solutions bridging physical mechanics, intelligent software algorithms, and automated systems.
        </p>
      </div>

      {/* Apple Bento Launch Grid */}
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {projects.map((project, i) => {
          const theme = getProjectStyles(project.id);
          const isFeatured = project.featured && project.id === 'ai-digital-twin';

          return (
            <div 
              key={project.id}
              className={`project-showcase-card apple-glass apple-glass-hover rounded-3xl p-8 md:p-12 border ${theme.border} relative overflow-hidden flex flex-col lg:flex-row gap-8 items-stretch bg-gradient-to-br ${theme.gradientBg} shadow-2xl`}
            >
              {/* Left Details Column */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Status & Pill Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="font-mono text-xs font-bold tracking-widest text-white/40">
                      0{i + 1}
                    </span>
                    <span 
                      onClick={project.id === 'ai-digital-twin' ? handleDigitalTwinBadgeClick : undefined}
                      title={project.id === 'ai-digital-twin' ? 'AI Digital Twin System Core' : undefined}
                      className={`font-mono text-xs tracking-widest px-3.5 py-1.5 border uppercase rounded-full font-medium ${theme.badgeBg} ${
                        project.id === 'ai-digital-twin' ? 'cursor-pointer select-none active:scale-95 hover:border-cyan-400' : ''
                      }`}
                    >
                      {theme.badge}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full ml-auto">
                      {theme.identityTag}
                    </span>
                  </div>

                  {/* Project Title & Category */}
                  <h3 className="font-outfit font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className={`font-mono text-xs tracking-wider mb-4 ${theme.tagText} font-semibold`}>
                    {project.subtitle} • {project.category}
                  </p>

                  {/* Description */}
                  <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-xs font-mono text-white/80 border border-white/15 px-3.5 py-1.5 rounded-full bg-white/5 uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="rounded-full bg-white hover:bg-white/90 text-black px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                  >
                    <span>EXPLORE PROJECT DETAILS</span>
                    <span>→</span>
                  </button>

                  <span className="font-mono text-xs text-white/40 font-medium">{project.year}</span>
                </div>
              </div>

              {/* Right Apple Media Frame */}
              <div className="w-full lg:w-96 min-h-[240px] bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex justify-between items-center z-10 font-mono text-[0.65rem] text-white/50 uppercase tracking-widest border-b border-white/10 pb-3">
                  <span>MEDIA FRAME</span>
                  <span className={`${theme.tagText} font-semibold`}>{project.category}</span>
                </div>

                <div className="z-10 my-6 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center font-mono text-sm font-bold text-white mb-3 shadow-inner">
                    {isFeatured ? 'AI' : '0' + (i + 1)}
                  </div>
                  <p className="font-outfit font-bold text-base text-white uppercase">
                    {project.title}
                  </p>
                  <p className="font-mono text-[0.65rem] text-white/40 mt-1">
                    READY FOR DEMO / SCREENSHOT INTEGRATION
                  </p>
                </div>

                <div className="z-10 font-mono text-[0.65rem] text-white/40 flex justify-between border-t border-white/10 pt-3">
                  <span>ASPECT RATIO 16:9</span>
                  <span className="text-blue-400 font-semibold">VIEW SPEC</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
