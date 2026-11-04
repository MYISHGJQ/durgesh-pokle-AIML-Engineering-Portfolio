import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store';

const EDITING_PORTFOLIO_URL = 'https://durgesh-pokle-portfolio.vercel.app/';

export default function EditingWelcomeScreen() {
  const editingWelcomeActive = useStore((state) => state.editingWelcomeActive);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigatedRef = useRef(false);

  useEffect(() => {
    if (!editingWelcomeActive) return;

    // Prevent duplicate navigation across rapid keyboard / touch events
    navigatedRef.current = false;

    // Lock body scroll during welcome sequence
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Prevent default on Enter key while transition is active
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const navigateToEditingPortfolio = () => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;
      window.location.href = EDITING_PORTFOLIO_URL;
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fast, accessible transition for reduced-motion preferences
        const tl = gsap.timeline({
          onComplete: navigateToEditingPortfolio,
        });

        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .fromTo('.editing-content', { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .to({}, { duration: 1.0 })
          .to('.editing-white-flash', { opacity: 1, duration: 0.5 });

        return;
      }

      // Cinematic Editorial Animation Sequence
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: navigateToEditingPortfolio,
      });

      // 1. Existing portfolio background smoothly transitions into the welcome screen
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
        // 2. Small top text fades in elegantly
        .fromTo(
          '.editing-top-text',
          { opacity: 0, y: 15, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
          '+=0.1'
        )
        // 3. 'WELCOME TO' appears with a subtle upward reveal
        .fromTo(
          '.editing-welcome-to',
          { opacity: 0, y: 22, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
          '-=0.35'
        )
        // 4. 'EDITING PORTFOLIO' reveals smoothly with a premium typography animation
        .fromTo(
          '.editing-dominant-title',
          { opacity: 0, y: 32, scale: 0.95, filter: 'blur(12px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.95 },
          '-=0.45'
        )
        // 5. Subtitle fades in after the main title
        .fromTo(
          '.editing-subtitle',
          { opacity: 0, y: 15, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
          '-=0.3'
        )
        // 6. Decorative blue line appears with a smooth width animation
        .fromTo(
          '.editing-line',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.35'
        )
        // 7. Hold the complete composition briefly
        .to({}, { duration: 1.1 })
        // 8. Transition the entire screen smoothly to pure white
        .to(
          '.editing-white-flash',
          { opacity: 1, duration: 0.85, ease: 'power2.inOut' }
        );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [editingWelcomeActive]);

  if (!editingWelcomeActive) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Editing Portfolio"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white overflow-hidden select-none pointer-events-auto px-4 sm:px-6"
    >
      {/* Sophisticated Dark Ambient Background consistent with existing portfolio */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(0, 113, 227, 0.16) 0%, rgba(6, 182, 212, 0.06) 40%, rgba(0, 0, 0, 0.98) 85%)',
        }}
      />

      {/* Subtle Electric-Blue Depth Pulse in the Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Pure White Flash Overlay for smooth destination transition */}
      <div className="editing-white-flash fixed inset-0 bg-white pointer-events-none z-[100000] opacity-0" />

      {/* Main Full-Screen Center Composition */}
      <div className="editing-content relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center justify-center">
        
        {/* 1. Small Top Text */}
        <p className="editing-top-text opacity-0 font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.4em] text-cyan-400 uppercase mb-3 sm:mb-5">
          A NEW CREATIVE EXPERIENCE
        </p>

        {/* 2. Main Title */}
        <h2 className="editing-welcome-to opacity-0 font-outfit font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight uppercase leading-none mb-2 sm:mb-4">
          WELCOME TO
        </h2>

        {/* 3. Dominant Title */}
        <h1 className="editing-dominant-title opacity-0 font-outfit font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter uppercase leading-[0.95] mb-5 sm:mb-7 drop-shadow-[0_0_50px_rgba(0,113,227,0.35)]">
          <span>EDITING </span>
          <span className="text-apple-blue-gradient">PORTFOLIO</span>
        </h1>

        {/* 4. Subtitle */}
        <div className="editing-subtitle opacity-0 font-mono text-[10px] sm:text-xs md:text-sm text-white/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase max-w-3xl px-2 leading-relaxed flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1">
          <span>VIDEO EDITING</span>
          <span className="text-cyan-400 font-bold select-none">•</span>
          <span>MOTION GRAPHICS</span>
          <span className="text-cyan-400 font-bold select-none">•</span>
          <span>VISUAL STORYTELLING</span>
        </div>

        {/* 5. Subtle Decorative Blue Line below the Subtitle */}
        <div className="mt-5 sm:mt-8 flex justify-center w-full">
          <div 
            className="editing-line opacity-0 origin-center w-28 sm:w-40 md:w-56 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          />
        </div>

      </div>
    </div>
  );
}

