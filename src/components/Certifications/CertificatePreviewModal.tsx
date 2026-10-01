import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import type { Certification } from '../../types';

interface CertificatePreviewModalProps {
  cert: Certification;
  onClose: () => void;
}

export default function CertificatePreviewModal({ cert, onClose }: CertificatePreviewModalProps) {
  const lenis = useLenis();
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    if (backdropRef.current && modalRef.current) {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.inOut',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 15,
        duration: 0.22,
        ease: 'power2.inOut',
        onComplete: () => {
          onClose();
        },
      });
    } else {
      onClose();
    }
  }, [isClosing, onClose]);

  // Lock background scroll, pause Lenis, and handle Escape key
  useEffect(() => {
    // Record current scroll position
    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Lock document scroll
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Pause Lenis smooth scrolling
    lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Restore document scroll and Lenis
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      lenis?.start();
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lenis, handleClose]);

  // Smooth entrance animation
  useEffect(() => {
    if (backdropRef.current && modalRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => {
        if (e.target === backdropRef.current) e.preventDefault();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 w-screen h-[100dvh] z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="apple-glass rounded-3xl p-5 sm:p-8 md:p-10 border border-white/20 shadow-2xl relative flex flex-col gap-6 w-[94vw] sm:w-[90vw] max-w-[1000px] max-h-[88dvh] overflow-y-auto overflow-x-hidden z-[10000]"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close certificate preview"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-xs transition-colors z-20 cursor-pointer"
        >
          ✕
        </button>

        {/* Credential Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 pr-12">
          <span className="font-mono text-xs font-semibold tracking-widest text-blue-300 uppercase bg-blue-500/20 px-3.5 py-1.5 border border-blue-500/30 rounded-full">
            {cert.organization}
          </span>
          {cert.date && (
            <span className="font-mono text-xs text-white/50">
              ISSUED: {cert.date.toUpperCase()}
            </span>
          )}
        </div>

        {/* Full High-Res Certificate Image Container */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white flex items-center justify-center">
          <img
            src={cert.image}
            alt={`${cert.name} - ${cert.organization} verified certificate document`}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full max-w-full h-auto object-contain block"
          />
        </div>

        {/* Certificate Meta Details */}
        <div className="flex flex-col gap-3">
          <h3 id="cert-modal-title" className="font-outfit font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
            {cert.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cert.skillsCovered.map((skill) => (
              <span key={skill} className="text-xs font-mono text-blue-300 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full uppercase font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Close CTA */}
        <button
          onClick={handleClose}
          className="w-full rounded-full bg-white text-black font-mono text-xs tracking-widest font-semibold uppercase py-3.5 hover:bg-white/90 transition-all shadow-xl cursor-pointer"
        >
          CLOSE PREVIEW
        </button>
      </div>
    </div>,
    document.body
  );
}
