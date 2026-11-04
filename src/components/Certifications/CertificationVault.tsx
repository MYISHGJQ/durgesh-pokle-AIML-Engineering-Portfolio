import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';
import { certifications } from '../../data/certifications';
import Folder from '../ui/Folder';
import StrokeText from '../ui/StrokeText';
import CertificatePreviewModal from './CertificatePreviewModal';
import type { Certification } from '../../types';

export default function CertificationVault() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Group real certificates by organization
  const googleCerts = certifications.filter((c) => c.organization.toLowerCase().includes('google'));
  const metaCerts = certifications.filter((c) => c.organization.toLowerCase().includes('meta'));
  const s4fCerts = certifications.filter((c) => c.organization.toLowerCase().includes('skills4future'));
  const deloitteCerts = certifications.filter((c) => c.organization.toLowerCase().includes('deloitte'));
  const infosysCerts = certifications.filter((c) => c.organization.toLowerCase().includes('infosys'));

  const topFolders = [
    {
      id: 'folder-google',
      title: 'GOOGLE',
      badge: 'GOOGLE AI',
      certs: googleCerts,
    },
    {
      id: 'folder-meta',
      title: 'META',
      badge: 'META DB',
      certs: metaCerts,
    },
    {
      id: 'folder-skills4future',
      title: 'SKILLS4FUTURE',
      badge: 'GREEN AI',
      certs: s4fCerts,
    },
  ];

  const bottomFolders = [
    {
      id: 'folder-deloitte',
      title: 'DELOITTE',
      badge: 'DATA ANALYTICS',
      certs: deloitteCerts,
    },
    {
      id: 'folder-infosys',
      title: 'INFOSYS',
      badge: 'CLOUD & AI',
      certs: infosysCerts,
    },
  ];

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const exitScale = isMobile ? 0.96 : 0.92;

    // Staggered folder reveal on scroll entry
    gsap.fromTo('.archive-folder-card', 
      { opacity: 0, y: 40, scale: 0.85 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.5,
        }
      }
    );

    // Section zoom-out exit on scroll away
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

  return (
    <section 
      ref={container} 
      id="certifications" 
      className="relative w-full min-h-0 md:min-h-screen pointer-events-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 bg-transparent overflow-hidden border-t border-white/10"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-10 md:mb-12 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
          06 / KNOWLEDGE ARCHIVE
        </div>
        <h2 className="sr-only">Certifications</h2>
        <div className="w-full max-w-4xl px-2 my-1 sm:my-2">
          <StrokeText 
            text="DIGITAL CERTIFICATION ARCHIVE"
            strokeColor="#64d2ff"
            fillColor="#ffffff"
            strokeWidth={1.5}
            drawDuration={1.8}
            fillDelay={0.2}
            stagger={0.03}
            ease="power2.out"
            trigger="scroll"
            fillMode="wipe"
            fontSize={isMobile ? 38 : isTablet ? 64 : 90}
            fontWeight={900}
            letterSpacing={isMobile ? -0.5 : -2}
          />
        </div>
        <p className="text-white/60 text-[11px] sm:text-xs md:text-sm font-mono tracking-widest uppercase mt-2 sm:mt-3">
          CLICK A FOLDER TO REVEAL PHYSICAL CERTIFICATE DOCUMENTS
        </p>
      </div>

      {/* Interactive Folder Grid - Top Row (3 Folders) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 md:gap-16 pt-2 sm:pt-4 md:pt-6 pb-2 sm:pt-4 md:pb-6 items-start">
        {topFolders.map((cat) => (
          <div key={cat.id} className="archive-folder-card w-full flex justify-center">
            <Folder
              title={cat.title}
              badge={cat.badge}
              certificates={cat.certs}
              onSelectCertificate={(cert) => setSelectedCert(cert)}
            />
          </div>
        ))}
      </div>

      {/* Interactive Folder Grid - Bottom Row (2 Folders: Deloitte & Infosys) */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16 pt-2 sm:pt-4 pb-8 sm:pb-12 md:pb-16 items-start">
        {bottomFolders.map((cat) => (
          <div key={cat.id} className="archive-folder-card w-full flex justify-center">
            <Folder
              title={cat.title}
              badge={cat.badge}
              certificates={cat.certs}
              onSelectCertificate={(cert) => setSelectedCert(cert)}
            />
          </div>
        ))}
      </div>

      {/* Premium Full-Screen Certificate Preview Modal (Portal rendered & viewport centered) */}
      {selectedCert && (
        <CertificatePreviewModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
}
