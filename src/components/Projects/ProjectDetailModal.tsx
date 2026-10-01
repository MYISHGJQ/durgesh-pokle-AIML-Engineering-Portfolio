import { useEffect, useRef, useState, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { useStore } from '../../store';
import { projects } from '../../data/projects';

export default function ProjectDetailModal() {
  const { selectedProjectId, setSelectedProjectId } = useStore();
  const lenis = useLenis();

  const [activeProjectId, setActiveProjectId] = useState<string | null>(selectedProjectId);
  const [isClosing, setIsClosing] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keep activeProjectId in sync when selectedProjectId changes
  useEffect(() => {
    if (selectedProjectId) {
      setActiveProjectId(selectedProjectId);
      setIsClosing(false);
    }
  }, [selectedProjectId]);

  const project = projects.find((p) => p.id === activeProjectId);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    if (backdropRef.current && modalRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      });

      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.96,
        y: 15,
        duration: 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          setSelectedProjectId(null);
          setActiveProjectId(null);
          setIsClosing(false);
        },
      });
    } else {
      setSelectedProjectId(null);
      setActiveProjectId(null);
      setIsClosing(false);
    }
  }, [isClosing, setSelectedProjectId]);

  // Lock background scroll, pause Lenis, and handle Escape key
  useEffect(() => {
    if (!project || isClosing) return;

    // Preserve existing body overflow
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Pause Lenis smooth scrolling
    lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Restore body overflow and Lenis
      document.body.style.overflow = originalOverflow;
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, isClosing, lenis, handleClose]);

  // Entry animation
  useEffect(() => {
    if (selectedProjectId && backdropRef.current && modalRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [selectedProjectId]);

  if (!selectedProjectId && !activeProjectId) return null;
  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[94vw] sm:w-[90vw] md:w-[85vw] lg:w-[75vw] max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden apple-glass rounded-3xl p-6 sm:p-10 md:p-12 border border-white/20 shadow-2xl z-[1001]"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Apple Pill Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 font-mono text-xs tracking-widest text-white/70 hover:text-white px-4 py-2 border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 rounded-full transition-all uppercase z-10 cursor-pointer"
        >
          CLOSE ✕
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 mb-8 pr-16">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs tracking-widest text-blue-300 font-semibold uppercase px-3.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
              {project.category}
            </span>
            <span className="font-mono text-xs tracking-widest text-white/40 font-medium">
              {project.year}
            </span>
          </div>

          <h2 className="font-outfit font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight mt-3">
            {project.title}
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-blue-300 font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Description & Problem/Solution Cards */}
        <div className="space-y-6 text-white/80 text-sm sm:text-base font-light leading-relaxed border-y border-white/10 py-6 mb-8">
          <p>{project.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-white/5 p-6 border border-white/10 rounded-2xl">
              <p className="font-mono text-xs tracking-widest text-amber-400 font-semibold uppercase mb-2">THE PROBLEM</p>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">{project.problem}</p>
            </div>
            <div className="bg-blue-500/10 p-6 border border-blue-500/25 rounded-2xl">
              <p className="font-mono text-xs tracking-widest text-blue-400 font-semibold uppercase mb-2">THE SOLUTION</p>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="font-mono text-xs tracking-[0.25em] text-white/50 uppercase mb-4 font-semibold">
            KEY FEATURES & CAPABILITIES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white/80">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <h3 className="font-mono text-xs tracking-[0.25em] text-white/50 uppercase mb-4 font-semibold">
            TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 font-mono text-xs uppercase tracking-wider rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
