import { useState } from 'react';
import type { Certification } from '../../types';
import './Folder.css';

interface FolderProps {
  title: string;
  badge: string;
  certificates: Certification[];
  onSelectCertificate: (cert: Certification) => void;
}

export default function Folder({
  title,
  badge,
  certificates,
  onSelectCertificate,
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCertId, setHoveredCertId] = useState<string | null>(null);

  const toggleFolder = () => {
    setIsOpen((prev) => !prev);
  };

  const getCertStyle = (index: number, total: number, isHovered: boolean) => {
    if (!isOpen) {
      return {
        transform: 'translate(0px, 30px) scale(0.6)',
        opacity: 0,
        zIndex: 5 + index,
      };
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const scaleMultiplier = isHovered ? 1.08 : 1.0;
    const zIndex = isHovered ? 50 : 10 + index;

    if (total === 1) {
      const baseScale = isMobile ? 0.95 : 1.05;
      const translateY = isMobile ? -120 : -145;
      const rotate = -3;
      return {
        transform: `translate(0px, ${translateY}px) rotate(${rotate}deg) scale(${baseScale * scaleMultiplier})`,
        opacity: 1,
        zIndex,
      };
    }

    if (total === 2) {
      const offsetX = index === 0 ? (isMobile ? -45 : -80) : (isMobile ? 45 : 80);
      const rotateDeg = index === 0 ? -10 : 10;
      const baseScale = isMobile ? 0.9 : 1.0;
      const translateY = isMobile ? -110 : -135;
      return {
        transform: `translate(${offsetX}px, ${translateY}px) rotate(${rotateDeg}deg) scale(${baseScale * scaleMultiplier})`,
        opacity: 1,
        zIndex,
      };
    }

    // total === 3 or more
    let offsetX = 0;
    let offsetY = isMobile ? -120 : -150;
    let rotateDeg = 0;
    let baseScale = isMobile ? 0.85 : 0.98;

    if (index === 0) {
      offsetX = isMobile ? -50 : -95;
      offsetY = isMobile ? -100 : -125;
      rotateDeg = -12;
    } else if (index === 2) {
      offsetX = isMobile ? 50 : 95;
      offsetY = isMobile ? -100 : -125;
      rotateDeg = 12;
    }

    return {
      transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotateDeg}deg) scale(${baseScale * scaleMultiplier})`,
      opacity: 1,
      zIndex,
    };
  };

  return (
    <div className="folder-wrapper">
      <div 
        onClick={toggleFolder}
        className={`folder-container ${isOpen ? 'is-open' : ''}`}
      >
        {/* Back Cover */}
        <div className="folder-back">
          <div className="folder-tab">
            <span className="folder-tab-text">{badge}</span>
          </div>
        </div>

        {/* Real Certificate Image Papers Emerging from Inside */}
        <div className="folder-papers-layer">
          {certificates.map((cert, i) => {
            const isHovered = hoveredCertId === cert.id;
            return (
              <div 
                key={cert.id}
                style={getCertStyle(i, certificates.length, isHovered)}
                onMouseEnter={() => setHoveredCertId(cert.id)}
                onMouseLeave={() => setHoveredCertId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCertificate(cert);
                }}
                className={`cert-paper ${isHovered ? 'is-hovered' : ''}`}
                title={cert.name}
              >
                <img 
                  src={cert.image} 
                  alt={cert.name} 
                />
              </div>
            );
          })}
        </div>

        {/* Front Flap Cover */}
        <div className="folder-front">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-mono text-xs text-blue-400 font-bold">
              📁
            </div>
            <span className="font-mono text-[0.65rem] text-white/60 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              {certificates.length} {certificates.length === 1 ? 'CERTIFICATE' : 'CERTIFICATES'}
            </span>
          </div>

          {/* Title & Click Action */}
          <div className="flex flex-col gap-1 text-left mt-auto">
            <h3 className="font-outfit font-black text-2xl text-white tracking-tight uppercase">
              {title}
            </h3>
            <p className="font-mono text-[0.65rem] text-blue-400 tracking-widest uppercase font-semibold flex items-center gap-1.5">
              <span>{isOpen ? 'CLOSE ARCHIVE' : 'CLICK TO OPEN FOLDER'}</span>
              <span>{isOpen ? '↓' : '→'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
