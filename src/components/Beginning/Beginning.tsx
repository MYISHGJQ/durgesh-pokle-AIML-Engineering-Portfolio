import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';

export default function Beginning() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const isMobile = window.innerWidth < 768;
    const startScale = isMobile ? 1.03 : 1.08;
    const exitScale = isMobile ? 0.96 : 0.92;
    const noBlur = 'blur(0px)';
    const initialBlur = isMobile ? 'none' : 'blur(4px)';
    const exitBlur = isMobile ? 'none' : 'blur(2px)';

    // Zoom-in reveal on scroll entry
    gsap.fromTo('.beg-card', 
      { opacity: 0.3, y: 40, scale: startScale, filter: initialBlur }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        filter: noBlur,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 0.5,
          onLeave: () => {
            gsap.set('.beg-card', { filter: noBlur, opacity: 1, scale: 1, y: 0 });
          },
          onEnterBack: () => {
            gsap.set('.beg-card', { filter: noBlur, opacity: 1, scale: 1, y: 0 });
          }
        }
      }
    );

    // Zoom-out exit on scroll away
    gsap.fromTo(container.current,
      { scale: 1, opacity: 1, filter: noBlur },
      {
        scale: exitScale,
        opacity: 0.7,
        filter: exitBlur,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'bottom 60%',
          end: 'bottom -10%',
          scrub: 0.5,
          onEnterBack: () => {
            gsap.set(container.current, { filter: noBlur, opacity: 1, scale: 1 });
            gsap.set('.beg-card', { filter: noBlur, opacity: 1, scale: 1, y: 0 });
          },
          onLeaveBack: () => {
            gsap.set(container.current, { filter: noBlur, opacity: 1, scale: 1 });
            gsap.set('.beg-card', { filter: noBlur, opacity: 1, scale: 1, y: 0 });
          }
        }
      }
    );

  }, { scope: container, dependencies: [bootComplete] });

  return (
    <section 
      ref={container} 
      id="about"
      className="relative w-full pointer-events-auto px-6 py-20 sm:py-32 bg-transparent border-y border-white/5 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="beg-card relative z-10 max-w-6xl mx-auto w-full">
        {/* Apple Keynote About Container */}
        <div className="apple-glass rounded-3xl p-8 sm:p-12 md:p-16 border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Professional Profile Photo */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="relative group w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-500">
              {/* Photo */}
              <img 
                src="/profile.jpg" 
                alt="Durgesh Pokle - AI and Machine Learning Engineer"
                width={400}
                height={500}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle glass gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              
              {/* Name Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl apple-glass border border-white/10 flex flex-col gap-1">
                <span className="font-outfit font-extrabold text-white text-base tracking-wide uppercase">DURGESH POKLE</span>
                <span className="font-mono text-[0.65rem] text-blue-400 tracking-widest uppercase">AI & ML ENGINEER</span>
              </div>
            </div>
          </div>

          {/* Right Side: Storytelling Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-[0.3em] uppercase self-start">
              02 / MEET THE ENGINEER
            </div>

            <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] uppercase">
              ARTIFICIAL INTELLIGENCE &<br />
              <span className="text-apple-blue-gradient">MACHINE LEARNING.</span>
            </h2>

            <div className="flex flex-col gap-4 text-white/80 font-light text-base sm:text-lg leading-relaxed">
              <p>
                I started my journey with a strong foundation in <strong className="text-white font-semibold">Mechanical Engineering</strong>, mastering physical mechanics, CAD design, and engineering systems.
              </p>
              <p>
                Gradually, my passion evolved toward <strong className="text-white font-semibold">Artificial Intelligence & Machine Learning</strong>. Today, I focus on building intelligent algorithms that bridge physical engineering systems and computational intelligence.
              </p>
              <p className="text-white/60 text-sm sm:text-base">
                Currently pursuing my B.Tech in AI & ML at DMIHER, I build neural network solutions, smart automation pipelines, and real-time AI digital twin architectures.
              </p>
            </div>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-white/90 flex flex-col gap-1">
                <span className="text-blue-400 font-bold text-sm">B.TECH AI & ML</span>
                <span className="text-white/50 text-[0.65rem]">DMIHER (2024–27)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-white/90 flex flex-col gap-1">
                <span className="text-blue-400 font-bold text-sm">DIPLOMA MECH</span>
                <span className="text-white/50 text-[0.65rem]">ASPC Wardha (2021–24)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-white/90 flex flex-col gap-1 col-span-2 sm:col-span-1">
                <span className="text-blue-400 font-bold text-sm">AI & SYSTEMS</span>
                <span className="text-white/50 text-[0.65rem]">Digital Twins & ML</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

