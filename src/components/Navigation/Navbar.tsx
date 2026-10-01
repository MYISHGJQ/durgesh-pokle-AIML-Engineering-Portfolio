import { useStore } from '../../store';
import { useSectionObserver } from '../../hooks/useSectionObserver';
import { cn } from '../../utils/cn';

const sectionIds = [
  'home',
  'about',
  'journey',
  'projects',
  'skills',
  'certifications',
  'education',
  'contact',
];

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar() {
  const bootComplete = useStore((state) => state.bootComplete);
  const activeSection = useSectionObserver(sectionIds);

  if (!bootComplete) return null;

  const scrollToSection = (id: string) => {
    const targetId = id === 'hero' ? 'home' : id === 'beginning' ? 'about' : id === 'skills-matrix' ? 'skills' : id;
    const element = document.getElementById(targetId) || document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-6xl pointer-events-auto">
      <div className="apple-glass rounded-full px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl border border-white/15 gap-3 sm:gap-6">
        
        {/* Left Column: DP Logo & Title */}
        <button 
          onClick={() => scrollToSection('home')}
          aria-label="Scroll to home section"
          className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center font-outfit font-black text-xs text-white">
            DP
          </div>
          <div className="hidden lg:flex flex-col text-[0.65rem] font-mono tracking-widest leading-tight text-white/60">
            <span className="text-white font-bold group-hover:text-blue-400 transition-colors">DURGESH POKLE</span>
            <span className="text-white/40">AI & ML ENGINEER</span>
          </div>
        </button>

        {/* Center / Right Column: Direct Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative font-mono text-[0.65rem] lg:text-xs tracking-wider uppercase whitespace-nowrap px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 focus:outline-none",
                  isActive
                    ? "bg-white/15 text-white font-semibold border border-white/20 shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5 font-medium"
                )}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0"></span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
