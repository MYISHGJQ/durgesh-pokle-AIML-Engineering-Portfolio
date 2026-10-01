import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from './store';

import GlobalGradientWavesBackground from './components/Background/GlobalGradientWavesBackground';
import Navbar from './components/Navigation/Navbar';
import BootSequence from './components/BootSequence/BootSequence';
import Hero from './components/Hero/Hero';
import Beginning from './components/Beginning/Beginning';
import JourneyMilestones from './components/Journey/JourneyMilestones';
import ProjectUniverseUI from './components/Projects/ProjectUniverseUI';
import SkillsMatrix from './components/Skills/SkillsMatrix';
import CertificationVault from './components/Certifications/CertificationVault';
import EducationJourney from './components/Education/EducationJourney';
import CommandCenter from './components/CommandCenter/CommandCenter';
import FutureVision from './components/FutureVision/FutureVision';
import ContactPortal from './components/Contact/ContactPortal';
import ProjectDetailModal from './components/Projects/ProjectDetailModal';

function ScrollSync() {
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    let ticking = false;
    let lastProgress = -1;

    const update = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0;
      if (Math.abs(progress - lastProgress) > 0.003) {
        lastProgress = progress;
        setScrollProgress(progress);
      }
      ScrollTrigger.update();
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);

  return null;
}

function App() {
  return (
    <div className="relative min-h-screen bg-black w-full text-white font-inter">
      <ScrollSync />
      
      {/* Single Global Animated GradientWaves Background */}
      <GlobalGradientWavesBackground />

      {/* Fixed Navigation Bar */}
      <Navbar />
      
      {/* Intro Reveal Screen */}
      <BootSequence />
      
      {/* Project Details Modal */}
      <ProjectDetailModal />
      
      {/* Main Narrative Flow */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Section 2: The Beginning */}
        <Beginning />

        {/* Section 3: My Journey Evolution */}
        <JourneyMilestones />

        {/* Section 4: Projects Showcase */}
        <ProjectUniverseUI />

        {/* Section 5: Technical Skills Showcase */}
        <SkillsMatrix />

        {/* Section 6: Knowledge Archive (Certifications) */}
        <CertificationVault />

        {/* Section 7 & 8: Education Timeline */}
        <EducationJourney />

        {/* Section 9: Portfolio Impact */}
        <CommandCenter />

        {/* Section 10: Future Vision */}
        <FutureVision />

        {/* Section 11: Contact */}
        <ContactPortal />
      </main>
    </div>
  );
}

export default App;
