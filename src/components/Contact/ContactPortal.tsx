import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { siteConfig } from '../../data/siteConfig';
import { socialLinks } from '../../data/socialLinks';

export default function ContactPortal() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);
  const showProtocolToast = useStore((state) => state.showProtocolToast);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;

    // Zoom-in reveal on scroll entry
    gsap.fromTo('.contact-card', 
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
  }, { scope: container, dependencies: [bootComplete] });

  if (!bootComplete) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={container} 
      id="contact" 
      className="relative w-full min-h-0 md:min-h-screen flex flex-col justify-between pointer-events-auto bg-transparent px-4 sm:px-6 py-12 sm:py-20 md:py-32 border-t border-white/10"
    >
      <div className="contact-card w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center my-auto">
        
        {/* Left Column: Messaging */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase">
              08 / GET IN TOUCH
            </div>

            {/* Easter Egg #5: Subtle status node indicator */}
            <button
              type="button"
              onClick={() => {
                showProtocolToast({
                  id: 'contact-protocol-easter-egg',
                  title: 'CONNECTION REQUEST DETECTED',
                  subtitle: 'STATUS: READY',
                  protocolNum: '05 / 05',
                  actionText: 'ESTABLISH CONNECTION',
                  onAction: () => {
                    const emailLink = document.getElementById('contact-direct-email');
                    if (emailLink) {
                      emailLink.focus();
                      emailLink.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                });
              }}
              title="System Node Status: Available"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/40 text-[9px] sm:text-[10px] font-mono tracking-wider text-white/50 hover:text-cyan-300 transition-all cursor-pointer active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>NODE: READY</span>
            </button>
          </div>

          <h2 className="font-outfit font-black text-3xl sm:text-5xl md:text-7xl text-white leading-none tracking-tight mb-4 sm:mb-6 uppercase">
            LET'S BUILD<br />
            <span className="text-apple-blue-gradient">WHAT'S NEXT</span><br />
            TOGETHER.
          </h2>

          <p className="text-white/70 text-xs sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-5 sm:mb-8">
            Open for artificial intelligence, machine learning engineering roles, smart manufacturing research, and high-impact software collaborations.
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 font-mono text-xs tracking-wider">
            <a 
              id="contact-direct-email"
              href={`mailto:${siteConfig.email}`} 
              className="flex items-center gap-3 sm:gap-4 text-white hover:text-blue-400 transition-colors p-3.5 sm:p-4.5 apple-glass rounded-xl sm:rounded-2xl border border-white/15 hover:border-blue-500/40 shadow-xl focus:outline-none focus:border-cyan-400 text-[11px] sm:text-xs"
            >
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-blue-500 shrink-0"></span>
              <span className="font-semibold break-all">{siteConfig.email.toUpperCase()}</span>
            </a>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1 sm:pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-500/40 text-white/80 hover:text-blue-300 text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all rounded-full font-medium"
                >
                  {link.platform} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Apple Glass Form */}
        <div className="apple-glass p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl">
          {formStatus === 'sent' ? (
            <div className="text-center py-8 sm:py-12 flex flex-col items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono text-base mb-3 sm:mb-4">
                ✓
              </div>
              <h3 className="font-outfit font-bold text-xl sm:text-2xl text-white uppercase mb-2">
                MESSAGE TRANSMITTED.
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-light max-w-sm mb-5 sm:mb-6">
                Thank you for reaching out. I have received your inquiry and will respond promptly.
              </p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="font-mono text-xs tracking-widest text-blue-400 hover:text-white uppercase border-b border-blue-500/40 pb-1 font-semibold"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-5">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-widest text-white/50 uppercase font-semibold">YOUR NAME</label>
                <input required type="text" placeholder="Durgesh Pokle" className="bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-mono text-xs rounded-xl sm:rounded-2xl" />
              </div>
              
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-widest text-white/50 uppercase font-semibold">YOUR EMAIL</label>
                <input required type="email" placeholder="your.email@example.com" className="bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-mono text-xs rounded-xl sm:rounded-2xl" />
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-widest text-white/50 uppercase font-semibold">MESSAGE</label>
                <textarea required rows={4} placeholder="Let's discuss an AI or engineering project..." className="bg-white/5 border border-white/10 p-3 sm:p-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-mono text-xs rounded-xl sm:rounded-2xl resize-none" />
              </div>

              <button 
                disabled={formStatus === 'sending'}
                type="submit" 
                className="mt-1 sm:mt-2 rounded-full bg-white hover:bg-white/90 text-black p-3.5 sm:p-4 font-mono text-xs tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{formStatus === 'sending' ? 'TRANSMITTING...' : 'START A CONVERSATION'}</span>
                <span>→</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Footer Return Prompt */}
      <div className="max-w-5xl mx-auto w-full pt-8 sm:pt-16 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] sm:text-xs text-white/40 border-t border-white/10 mt-8 sm:mt-16 text-center sm:text-left">
        <p>DURGESH POKLE © {new Date().getFullYear()} • ALL RIGHTS RESERVED</p>
        <button 
          onClick={scrollToTop}
          className="hover:text-blue-400 transition-colors uppercase tracking-widest mt-3 sm:mt-0 font-medium"
        >
          RETURN TO TOP ↑
        </button>
      </div>
    </section>
  );
}
