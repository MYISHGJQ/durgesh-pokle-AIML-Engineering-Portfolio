import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { siteConfig } from '../../data/siteConfig';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Apple Keynote Typography Reveal - Syncs seamlessly with intro fade out
    tl.fromTo('.hero-tag', { opacity: 0, y: 20, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, delay: 0.1 })
      .fromTo('.hero-name-first', { opacity: 0, y: 30, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.4')
      .fromTo('.hero-name-last', { opacity: 0, y: 30, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.6')
      .fromTo('.hero-role', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .fromTo('.hero-tagline', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo('.hero-ctas', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

    const isMobile = window.innerWidth < 768;

    // Rockstar-Style Cinematic Zoom Exit
    gsap.to(container.current, {
      scale: 0.90,
      opacity: 0.6,
      filter: isMobile ? 'none' : 'blur(3px)',
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'bottom 80%',
        end: 'bottom -10%',
        scrub: 0.5,
      }
    });

  }, { scope: container, dependencies: [bootComplete] });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={container} 
      id="home"
      className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pointer-events-auto px-4 sm:px-6 py-16 sm:py-24 md:py-28 overflow-hidden bg-transparent"
    >
      {/* Apple Subtle Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[160px] pointer-events-none"></div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        
        {/* Apple Pill Tag */}
        <div className="hero-tag opacity-0 inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/15 mb-4 sm:mb-6 md:mb-8">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="font-mono text-[11px] sm:text-xs tracking-widest text-white/90 uppercase font-medium">
            CREATING INTELLIGENT SYSTEMS
          </span>
        </div>

        {/* Apple Keynote Headline - Single Semantic H1 */}
        <h1 className="flex flex-col items-center leading-none mb-4 sm:mb-6">
          <span className="hero-name-first font-outfit font-black text-5xl sm:text-7xl md:text-9xl tracking-tight text-apple-gradient uppercase">
            {siteConfig.name.split(' ')[0]}
          </span>
          <span className="hero-name-last font-outfit font-black text-5xl sm:text-7xl md:text-9xl tracking-tight text-apple-blue-gradient uppercase -mt-1 sm:-mt-2 md:-mt-6">
            {siteConfig.name.split(' ')[1]}
          </span>
        </h1>

        {/* Role & Tagline */}
        <div className="max-w-2xl flex flex-col items-center gap-2 sm:gap-3 md:gap-4 mt-1 md:mt-2">
          <p className="hero-role opacity-0 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.3em] text-blue-400 uppercase font-semibold">
            {siteConfig.role}
          </p>
          <p className="hero-tagline opacity-0 text-white/70 text-sm sm:text-lg md:text-xl font-light leading-relaxed max-w-xl px-2">
            "{siteConfig.tagline}"
          </p>
        </div>

        {/* Apple CTA Pill Buttons */}
        <div className="hero-ctas opacity-0 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
          <button 
            onClick={() => scrollToSection('projects')}
            className="rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase px-6 sm:px-8 py-3 sm:py-3.5 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            VIEW PROJECTS →
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="apple-pill px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-mono tracking-widest uppercase text-white font-medium hover:scale-105 transition-all duration-300"
          >
            GET IN TOUCH
          </button>
        </div>

      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2">
        <span className="font-mono text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] sm:tracking-[0.3em] text-white/40 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1.5px] h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-transparent animate-pulse rounded-full"></div>
      </div>
    </section>
  );
}
