import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import type { Certification } from '../../types';

interface CertificatePreviewModalProps {
  cert: Certification;
  onClose: () => void;
}

interface FullscreenElementWithWebkit extends HTMLDivElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

interface DocumentWithWebkit extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element | null;
}

export default function CertificatePreviewModal({ cert, onClose }: CertificatePreviewModalProps) {
  const lenis = useLenis();
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageViewerRef = useRef<HTMLDivElement>(null);

  const [isClosing, setIsClosing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Synchronize fullscreen state from native browser fullscreen events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as DocumentWithWebkit;
      const activeEl = document.fullscreenElement || doc.webkitFullscreenElement;
      setIsFullscreen(activeEl === imageViewerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

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
      // If browser is currently in fullscreen, let native ESC exit fullscreen
      const doc = document as DocumentWithWebkit;
      const activeFs = document.fullscreenElement || doc.webkitFullscreenElement;
      if (activeFs) {
        return;
      }

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

  // Smooth entrance animation for modal
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

  // Toggle true browser fullscreen on ONLY the certificate image container
  const toggleFullscreen = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();

    const doc = document as DocumentWithWebkit;
    const activeFs = document.fullscreenElement || doc.webkitFullscreenElement;
    const el = imageViewerRef.current as FullscreenElementWithWebkit | null;

    try {
      if (!activeFs) {
        if (el) {
          if (el.requestFullscreen) {
            await el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            await el.webkitRequestFullscreen();
          }
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Fullscreen request failed:', err);
      }
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

        {/* Dedicated Fullscreen Target Wrapper: Only this container enters browser fullscreen */}
        <div
          ref={imageViewerRef}
          className={`relative w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group/viewer transition-all ${
            isFullscreen
              ? 'bg-black w-screen h-screen max-w-none max-h-none border-0 rounded-none p-3 sm:p-6 md:p-10'
              : 'bg-white border border-white/20'
          }`}
        >
          {/* Certificate Image */}
          <img
            src={cert.image}
            alt={`${cert.name} - ${cert.organization} verified certificate document`}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className={
              isFullscreen
                ? 'max-w-full max-h-full w-auto h-auto object-contain select-none shadow-2xl pointer-events-none'
                : 'w-full max-w-full h-auto object-contain block'
            }
          />

          {/* Fullscreen Toggle Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit certificate fullscreen' : 'View certificate fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            className={
              isFullscreen
                ? 'absolute top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/80 hover:bg-black/95 text-white font-mono text-xs uppercase tracking-widest border border-white/30 backdrop-blur-xl shadow-2xl transition-all cursor-pointer hover:border-cyan-400'
                : 'absolute top-3 right-3 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-cyan-400/60 backdrop-blur-md transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95 group/btn'
            }
          >
            {isFullscreen ? (
              <>
                <svg
                  className="w-4 h-4 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
                <span className="font-semibold tracking-wider">EXIT FULLSCREEN</span>
              </>
            ) : (
              <svg
                className="w-4 h-4 text-white group-hover/btn:text-cyan-300 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>
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

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-1">
          {cert.verificationUrl && (
            <button
              type="button"
              onClick={() => {
                window.open(cert.verificationUrl, '_blank', 'noopener,noreferrer');
              }}
              aria-label="Verify certificate"
              title="Open official certificate verification"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 font-mono text-xs tracking-widest font-semibold uppercase py-3.5 px-4 border border-blue-500/30 hover:border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <svg
                className="w-4 h-4 flex-shrink-0 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>VERIFY CERTIFICATE</span>
              <svg
                className="w-3.5 h-3.5 flex-shrink-0 opacity-70 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={handleClose}
            className={`w-full ${cert.verificationUrl ? 'sm:flex-1' : ''} rounded-full bg-white text-black font-mono text-xs tracking-widest font-semibold uppercase py-3.5 hover:bg-white/90 transition-all shadow-xl cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
          >
            CLOSE PREVIEW
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
