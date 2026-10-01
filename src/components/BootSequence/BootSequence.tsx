import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';

const welcomeWords = [
  { text: 'WELCOME', lang: 'ENGLISH' },
  { text: 'स्वागत आहे', lang: 'MARATHI' },
  { text: 'स्वागत है', lang: 'HINDI' },
  { text: 'BIENVENUE', lang: 'FRENCH' },
  { text: 'ようこそ', lang: 'JAPANESE' },
];

export default function BootSequence() {
  const container = useRef<HTMLDivElement>(null);
  const { setBootComplete, bootComplete } = useStore();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [bootText, setBootText] = useState('INITIALIZING PORTFOLIO...');
  const [skipped, setSkipped] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Lock body scroll during intro ONLY if intro is active and scroll to top
  useEffect(() => {
    if (!bootComplete) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [bootComplete]);

  const handleComplete = () => {
    setBootComplete(true);
  };

  const skipIntro = () => {
    setSkipped(true);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    handleComplete();
    gsap.to(container.current, {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        if (container.current) container.current.style.display = 'none';
      }
    });
  };

  useGSAP(() => {
    if (bootComplete || skipped) return;

    const tl = gsap.timeline({
      onComplete: () => {
        handleComplete();

        gsap.to(container.current, {
          opacity: 0,
          scale: 1.05,
          filter: 'blur(10px)',
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            if (container.current) container.current.style.display = 'none';
          }
        });
      }
    });

    timelineRef.current = tl;

    // Phase 1: Rapid System Boot Log (Fast 0.25s)
    tl.to('.boot-log', { opacity: 1, duration: 0.08 })
      .to({}, { duration: 0.08, onComplete: () => setBootText('LOADING ENGINEER PROFILE...') })
      .to({}, { duration: 0.08, onComplete: () => setBootText('SYSTEM READY') })
      .to('.boot-log', { opacity: 0, y: -6, duration: 0.08 });

    // Phase 2: Fast Multilingual Welcome Words (~1.0s total)
    welcomeWords.forEach((_, index) => {
      tl.to({}, {
        duration: 0.01,
        onComplete: () => setCurrentWordIndex(index)
      })
      .fromTo('.welcome-word',
        { opacity: 0, scale: 0.95, filter: 'blur(6px)', y: 6 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.12, ease: 'power2.out' }
      )
      .to('.welcome-word',
        { opacity: 0, scale: 1.03, filter: 'blur(6px)', y: -6, duration: 0.10, ease: 'power2.in', delay: 0.06 }
      );
    });

    // Phase 3: Fast Final Name Reveal (0.4s)
    tl.fromTo('.final-name',
      { opacity: 0, scale: 0.95, filter: 'blur(8px)', y: 10 },
      { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.28, ease: 'power3.out' }
    )
    .fromTo('.final-role',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' },
      '-=0.15'
    )
    .to({}, { duration: 0.15 });

  }, { scope: container });

  const currentWord = welcomeWords[currentWordIndex];

  return (
    <div 
      ref={container}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-mono pointer-events-auto p-6 overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Skip Intro Pill */}
      <button 
        onClick={skipIntro}
        className="absolute top-6 sm:top-8 right-6 sm:right-8 z-50 apple-glass rounded-full px-5 py-2 border border-white/15 text-white/70 hover:text-white font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-2xl flex items-center gap-2 group"
      >
        <span>SKIP INTRO</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>

      {/* Center Stage Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] text-center max-w-4xl mx-auto w-full">
        
        {/* Phase 1: Boot Log */}
        <div className="boot-log absolute inset-0 flex items-center justify-center gap-3 text-xs sm:text-sm text-blue-400 font-mono tracking-[0.3em] uppercase pointer-events-none opacity-0">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          <span>{bootText}</span>
        </div>

        {/* Phase 2: Multilingual Welcome */}
        <div className="welcome-word absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none opacity-0">
          <span className="font-outfit font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase">
            {currentWord.text}
          </span>
          <span className="font-mono text-[0.65rem] sm:text-xs tracking-[0.4em] text-blue-400/80 uppercase font-semibold">
            — {currentWord.lang} —
          </span>
        </div>

        {/* Phase 3: Final Name Reveal */}
        <div className="final-container absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="final-name opacity-0 font-outfit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-4">
            DURGESH <span className="text-apple-blue-gradient">POKLE</span>
          </h1>
          <p className="final-role opacity-0 font-mono text-xs sm:text-sm md:text-base tracking-[0.3em] text-blue-400 uppercase font-medium max-w-xl">
            ARTIFICIAL INTELLIGENCE & MACHINE LEARNING ENGINEER
          </p>
        </div>

      </div>

      {/* Footer Minimal Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] text-white/30 tracking-[0.3em] uppercase">
        CINEMATIC PROFILE SYSTEM • 2026
      </div>
    </div>
  );
}
