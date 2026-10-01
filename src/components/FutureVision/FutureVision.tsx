import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';

export default function FutureVision() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;
    const exitScale = isMobile ? 0.96 : 0.92;

    // Zoom-in reveal on scroll entry
    gsap.fromTo('.fv-card', 
      { opacity: 0.3, y: 40, scale: startScale, filter: isMobile ? 'none' : 'blur(4px)' }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        filter: 'blur(0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 0.5,
        }
      }
    );

    // Zoom-out exit on scroll away
    gsap.to('.fv-card', {
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

  return (
    <section 
      ref={container} 
      id="future-vision" 
      className="relative w-full pointer-events-auto px-6 py-20 sm:py-28 bg-transparent flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Apple Keynote Vision Card */}
        <div className="fv-card apple-glass rounded-3xl p-10 sm:p-16 border border-white/10 shadow-2xl flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase">
            THE CONTINUOUS EVOLUTION
          </div>

          <h2 className="font-outfit font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-tight">
            THE JOURNEY<br />
            HAS ONLY<br />
            <span className="text-apple-blue-gradient">JUST BEGUN.</span>
          </h2>

          <div className="flex flex-col items-center gap-3">
            <p className="font-outfit font-bold text-2xl sm:text-3xl text-blue-400 tracking-wide uppercase">
              FROM BUILDING SYSTEMS TO BUILDING INTELLIGENCE.
            </p>
            <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-white/50 uppercase mt-4 font-medium">
              I'M JUST GETTING STARTED.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
