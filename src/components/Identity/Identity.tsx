import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';
import { siteConfig, softSkills, languages } from '../../data/siteConfig';
import { education } from '../../data/education';
import { experience } from '../../data/experience';

export default function Identity() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      }
    });

    // 0-25%: "BEHIND EVERY SYSTEM IS A QUESTION."
    tl.fromTo('.id-text-1', { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 })
      .to('.id-text-1', { opacity: 0, scale: 1.1, filter: 'blur(10px)', duration: 0.8 });

    // 25-50%: "BEHIND EVERY QUESTION IS AN ENGINEER."
    tl.fromTo('.id-text-2', { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 })
      .to('.id-text-2', { opacity: 0, scale: 1.1, filter: 'blur(10px)', duration: 0.8 });

    // 50-100%: Reveal Identity Card and keep visible
    tl.fromTo('.id-reveal', { opacity: 0, y: 50, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 });

  }, { scope: container, dependencies: [bootComplete] });

  const mechEdu = education.find(e => e.id === 'edu-diploma');
  const aiEdu = education.find(e => e.id === 'edu-btech');
  const internExp = experience[0];

  return (
    <section ref={container} id="identity" className="relative w-full h-[250vh] pointer-events-none">
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden p-4 md:p-16">
        
        {/* Intro sequence */}
        <h2 className="id-text-1 absolute text-center font-outfit font-black text-3xl md:text-6xl text-white opacity-0">
          BEHIND EVERY SYSTEM<br />
          <span className="text-cyan-400">IS A QUESTION.</span>
        </h2>
        
        <h2 className="id-text-2 absolute text-center font-outfit font-black text-3xl md:text-6xl text-white opacity-0">
          BEHIND EVERY QUESTION<br />
          <span className="text-violet-400">IS AN ENGINEER.</span>
        </h2>

        {/* Identity Reveal */}
        <div className="id-reveal absolute w-full max-w-6xl h-full flex flex-col justify-center opacity-0 pointer-events-auto backdrop-blur-md bg-black/30 p-6 md:p-12 border border-white/10 rounded-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Core Identity */}
            <div className="col-span-full md:col-span-5 flex flex-col gap-6">
              <div>
                <h1 className="font-outfit font-black text-5xl md:text-7xl text-white leading-none tracking-tight">
                  {siteConfig.name.toUpperCase()}
                </h1>
                <p className="font-mono text-sm tracking-widest text-cyan-400 mt-2 border-l border-cyan-500/30 pl-4">
                  {siteConfig.role.toUpperCase()}
                </p>
              </div>
              
              <div className="text-white/70 text-sm md:text-base space-y-4 max-w-md mt-4 backdrop-blur-sm bg-white/5 p-6 border border-white/10 rounded-sm">
                <p>I am a B.Tech student specializing in Artificial Intelligence and Machine Learning, with a foundation in Mechanical Engineering.</p>
                <p>I have hands-on experience and project exposure across AI, Machine Learning, Web Development, Automation, and Engineering Systems.</p>
                <p className="text-white font-medium">My goal is to leverage technology to create innovative real-world engineering solutions.</p>
              </div>

              {/* Soft Skills & Languages - Subtle */}
              <div className="flex flex-wrap gap-4 mt-2">
                {softSkills.map(skill => (
                  <span key={skill} className="text-[0.6rem] font-mono tracking-widest text-white/40 uppercase">
                    {skill}
                  </span>
                ))}
                {languages.map(lang => (
                  <span key={lang} className="text-[0.6rem] font-mono tracking-widest text-violet-400/60 uppercase">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Educational Journey & Experience */}
            <div className="col-span-full md:col-span-6 md:col-start-7 flex flex-col gap-12 mt-8 md:mt-0">
              
              {/* Journey Timeline */}
              <div className="relative border-l border-white/20 pl-8 space-y-12">
                
                {/* Mechanical */}
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-[#f59e0b] rounded-full -left-[38px] top-1"></div>
                  <div className="absolute w-[1px] h-full bg-gradient-to-b from-[#f59e0b] to-[#00d4ff] -left-[32px] top-4"></div>
                  <p className="font-mono text-xs tracking-widest text-[#f59e0b]">{mechEdu?.year}</p>
                  <h3 className="font-outfit font-bold text-xl text-white mt-1">{mechEdu?.degree.toUpperCase()}</h3>
                  <p className="text-white/50 text-sm mt-1">{mechEdu?.institution}</p>
                </div>

                {/* AI / ML */}
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-[#00d4ff] rounded-full -left-[38px] top-1 shadow-[0_0_15px_#00d4ff]"></div>
                  <p className="font-mono text-xs tracking-widest text-[#00d4ff]">{aiEdu?.year} • PURSUING</p>
                  <h3 className="font-outfit font-bold text-xl text-white mt-1">{aiEdu?.degree.toUpperCase()}</h3>
                  <p className="text-white/50 text-sm mt-1">{aiEdu?.institution}</p>
                </div>
              </div>

              {/* Industrial Exposure */}
              <div className="bg-gradient-to-r from-white/5 to-transparent p-6 border-l-2 border-white/20">
                <p className="font-mono text-[0.65rem] tracking-widest text-white/40 uppercase mb-2">Industrial Exposure</p>
                <h4 className="font-outfit font-bold text-lg text-white">{internExp?.title.toUpperCase()}</h4>
                <p className="text-white/70 text-sm mb-2">{internExp?.company}</p>
                <p className="font-mono text-xs text-cyan-400/70">{internExp?.duration.toUpperCase()}</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
