import { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from '../../store';

export default function SystemLab() {
  const setSelectedProjectId = useStore((state) => state.setSelectedProjectId);

  // Machine A State Parameters
  const [temperature, setTemperature] = useState(72); // °C (default 72)
  const [vibration, setVibration] = useState(4.8);   // mm/s (default 4.8)
  const [rpm, setRpm] = useState(1540);              // RPM (default 1540)

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  // Viewport tracking to pause animations when off-screen
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Deterministic Predictive Math
  const { failureRisk, health, torque, status, statusColor, statusMessage } = useMemo(() => {
    // Normal baseline: 72°C, 4.8 mm/s, 1540 RPM -> 18% Failure Risk
    const baseRisk = 18;
    const tempImpact = Math.max(0, temperature - 74) * 1.35;
    const vibImpact = Math.max(0, vibration - 5.0) * 8.2;
    const rpmImpact = Math.max(0, rpm - 1700) * 0.035;

    // Small negative impact if exceptionally cool/stable
    const stabilityBonus = (temperature < 65 ? (65 - temperature) * 0.4 : 0) + (vibration < 3.5 ? (3.5 - vibration) * 2 : 0);

    const rawRisk = Math.round(baseRisk + tempImpact + vibImpact + rpmImpact - stabilityBonus);
    const risk = Math.min(96, Math.max(4, rawRisk));
    const h = Math.max(4, 100 - risk);

    // Correlated torque (baseline ~41 Nm at 1540 RPM)
    const t = Math.round(41 * (rpm / 1540) * (1 + (vibration - 4.8) * 0.05));

    let s = 'NORMAL OPERATION';
    let sc = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]';
    let sm = 'Current operating parameters indicate normal conditions.';

    if (risk >= 65) {
      s = 'ATTENTION REQUIRED';
      sc = 'text-red-400 bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.25)]';
      sm = 'Elevated thermal friction and anomalous vibration exceed safe operating thresholds.';
    } else if (risk >= 35) {
      s = 'ADVISORY WARNING';
      sc = 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      sm = 'Moderate parameter variance observed. Monitoring sub-assembly harmonics.';
    }

    return {
      failureRisk: risk,
      health: h,
      torque: t,
      status: s,
      statusColor: sc,
      statusMessage: sm,
    };
  }, [temperature, vibration, rpm]);

  // Run Analysis Sequence
  const handleRunAnalysis = () => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisCompleted(false);
    setAnalysisStep(1); // INITIALIZING...

    setTimeout(() => setAnalysisStep(2), 550);  // READING SENSOR DATA...
    setTimeout(() => setAnalysisStep(3), 1100); // ANALYZING PATTERNS...
    setTimeout(() => setAnalysisStep(4), 1650); // RUNNING PREDICTION MODEL...
    setTimeout(() => {
      setAnalysisStep(5); // ANALYSIS COMPLETE
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
    }, 2250);
  };

  const analysisStepText = [
    '',
    'INITIALIZING SYSTEM TELEMETRY...',
    'READING MULTI-AXIS SENSOR DATA...',
    'ANALYZING FREQUENCY PATTERNS...',
    'RUNNING PREDICTION MODEL...',
    'ANALYSIS COMPLETE',
  ][analysisStep];

  // Navigation handlers
  const handleExploreDigitalTwin = () => {
    setSelectedProjectId('ai-digital-twin');
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContinueToSkills = () => {
    const skillsEl = document.getElementById('skills');
    if (skillsEl) {
      skillsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rotation speed linked to RPM
  const rotationDuration = useMemo(() => {
    return Math.max(0.6, (60 / rpm) * 3);
  }, [rpm]);

  return (
    <section
      ref={sectionRef}
      id="system-lab"
      aria-label="System Lab - Interactive AI Simulation"
      className="relative w-full min-h-[90vh] py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-auto"
    >
      {/* Subtle Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none transition-colors duration-700 blur-[140px] opacity-25"
        style={{
          background: failureRisk >= 65 
            ? 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)'
            : failureRisk >= 35 
            ? 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)',
        }}
      ></div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>INTERACT • EXPERIMENT • PREDICT</span>
          </div>

          <h2 className="font-outfit font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            SYSTEM LAB
          </h2>

          <p className="mt-3 font-mono text-sm sm:text-base text-white/70 max-w-xl text-center leading-relaxed">
            "Don't just see what I build. Interact with it."
          </p>
        </div>

        {/* Main Interactive Machine Stage */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Machine A Hardware & Telemetry Visual */}
          <div className="lg:col-span-5 flex flex-col justify-between apple-glass rounded-3xl p-5 sm:p-7 border border-white/15 relative overflow-hidden bg-black/60 shadow-2xl">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span 
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                    failureRisk >= 65 ? 'bg-red-500 animate-ping' : failureRisk >= 35 ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400 animate-pulse'
                  }`}
                ></span>
                <span className="font-mono text-xs text-white font-bold tracking-widest uppercase">
                  MACHINE A // VIRTUAL TWIN
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                ACTIVE SIM
              </span>
            </div>

            {/* SVG Machine Representation */}
            <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto my-2 flex items-center justify-center">
              {/* Outer Housing Ring */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Fixed Technical Ring with Tick Marks */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                
                {/* Rotating Turbine / Spindle Rotor (CSS Animated with Dynamic Speed) */}
                <g 
                  className="origin-center"
                  style={{
                    animation: isVisible ? `spin ${rotationDuration}s linear infinite` : 'none',
                    transformOrigin: '100px 100px',
                  }}
                >
                  {/* Turbine Blades */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1="100"
                      y1="100"
                      x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
                      y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
                      stroke={failureRisk >= 65 ? 'rgba(239,68,68,0.5)' : 'rgba(6,182,212,0.45)'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  ))}
                  <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                </g>

                {/* Core Sensor Hub (Color linked to risk) */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="26" 
                  fill="#000000" 
                  stroke={failureRisk >= 65 ? '#ef4444' : failureRisk >= 35 ? '#f59e0b' : '#06b6d4'} 
                  strokeWidth="2" 
                  className="transition-colors duration-500"
                />
                
                {/* Center Core Pulse */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="12" 
                  fill={failureRisk >= 65 ? '#ef4444' : failureRisk >= 35 ? '#f59e0b' : '#06b6d4'}
                  className="transition-colors duration-500 opacity-80"
                />
              </svg>

              {/* Dynamic Overlay Telemetry in Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">RPM</span>
                <span className="font-mono font-black text-lg sm:text-xl text-white tracking-wider">{rpm}</span>
              </div>
            </div>

            {/* Live Waveform Oscillogram */}
            <div className="w-full bg-black/60 rounded-xl p-3 border border-white/10 mt-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] text-white/50 tracking-widest uppercase">
                <span>VIBRATION HARMONIC SPECTRUM</span>
                <span className={failureRisk >= 65 ? 'text-red-400 font-bold' : 'text-cyan-400'}>
                  {vibration} mm/s
                </span>
              </div>
              <div className="w-full h-8 overflow-hidden relative flex items-center">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
                  <path
                    d={`M 0 12 Q 12 ${12 - vibration * 1.1}, 25 12 T 50 12 T 75 12 T 100 12`}
                    fill="none"
                    stroke={failureRisk >= 65 ? '#ef4444' : '#06b6d4'}
                    strokeWidth="1.8"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>
            </div>

            {/* Machine Meta Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 font-mono text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 tracking-widest uppercase">TORQUE</span>
                <span className="font-bold text-white tracking-wide">{torque} Nm</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-white/40 tracking-widest uppercase">HEALTH SCORE</span>
                <span className={`font-bold tracking-wide ${health >= 70 ? 'text-emerald-400' : health >= 45 ? 'text-amber-400' : 'text-red-400'}`}>
                  {health}%
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Controls, Analysis & Predictive Engine */}
          <div className="lg:col-span-7 flex flex-col justify-between apple-glass rounded-3xl p-5 sm:p-7 border border-white/15 bg-black/60 shadow-2xl gap-6">
            
            {/* Sub-heading & Status */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-outfit font-extrabold text-xl text-white tracking-tight uppercase">
                    SIMULATED SENSOR CONTROL
                  </h3>
                  <p className="font-mono text-xs text-white/60 mt-0.5">
                    Adjust operational variables to observe dynamic risk response.
                  </p>
                </div>

                {/* Status Indicator Badge */}
                <div className={`self-start sm:self-center px-3.5 py-1.5 rounded-full border font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-500 ${statusColor}`}>
                  {status}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6">
                
                {/* 1. Temperature */}
                <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-white/60 tracking-wider">TEMPERATURE</span>
                    <span className={`font-bold ${temperature > 85 ? 'text-red-400' : 'text-cyan-300'}`}>
                      {temperature}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="110"
                    step="1"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    aria-label="Machine A temperature control"
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40">
                    <span>50°C</span>
                    <span>NOMINAL (72)</span>
                    <span>110°C</span>
                  </div>
                </div>

                {/* 2. Vibration */}
                <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-white/60 tracking-wider">VIBRATION</span>
                    <span className={`font-bold ${vibration > 6.5 ? 'text-red-400' : 'text-cyan-300'}`}>
                      {vibration} mm/s
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="11.0"
                    step="0.1"
                    value={vibration}
                    onChange={(e) => setVibration(Number(e.target.value))}
                    aria-label="Machine A vibration control"
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40">
                    <span>1.5</span>
                    <span>NOMINAL (4.8)</span>
                    <span>11.0</span>
                  </div>
                </div>

                {/* 3. RPM */}
                <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-white/60 tracking-wider">RPM</span>
                    <span className={`font-bold ${rpm > 1900 ? 'text-red-400' : 'text-cyan-300'}`}>
                      {rpm}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="900"
                    max="2300"
                    step="20"
                    value={rpm}
                    onChange={(e) => setRpm(Number(e.target.value))}
                    aria-label="Machine A rotational speed control"
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40">
                    <span>900</span>
                    <span>NOMINAL (1540)</span>
                    <span>2300</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Run Analysis Trigger Area */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full py-4 px-6 rounded-2xl font-mono text-xs tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"></span>
                    <span>{analysisStepText}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>[ RUN ANALYSIS ]</span>
                  </>
                )}
              </button>

              {/* Real-Time Progress Bar while analyzing */}
              {isAnalyzing && (
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${(analysisStep / 5) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Analysis Result / Predictive Dashboard */}
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-500 flex flex-col gap-3 ${
              analysisCompleted 
                ? 'bg-white/[0.04] border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                : 'bg-white/[0.02] border-white/10'
            }`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="font-mono text-xs text-white/70 tracking-widest uppercase font-semibold">
                  PREDICTIVE ANALYSIS REPORT
                </span>
                <span className="font-mono text-[10px] text-cyan-400 tracking-wider uppercase">
                  {analysisCompleted ? 'VERIFIED' : 'ACTIVE MODEL READY'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase block">
                    CALCULATED FAILURE RISK
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className={`font-outfit font-black text-3xl sm:text-4xl tracking-tight transition-colors duration-500 ${
                      failureRisk >= 65 ? 'text-red-400' : failureRisk >= 35 ? 'text-amber-400' : 'text-cyan-400'
                    }`}>
                      {failureRisk}%
                    </span>
                    <span className="font-mono text-xs text-white/50 uppercase">
                      ({failureRisk >= 65 ? 'CRITICAL' : failureRisk >= 35 ? 'ELEVATED' : 'NOMINAL'})
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase block sm:text-right">
                    SYSTEM HEALTH MATRIX
                  </span>
                  <span className="font-mono font-bold text-lg text-white mt-0.5">
                    {status}
                  </span>
                </div>
              </div>

              <p className="font-mono text-xs text-white/80 leading-relaxed pt-1">
                {statusMessage}
              </p>

              <span className="font-mono text-[10px] text-white/40 italic">
                * Simulated demonstration model inspired by industrial AI Digital Twin architecture.
              </span>
            </div>

            {/* Digital Twin Connection Banner */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-mono text-xs text-white/80 text-center sm:text-left">
                "This is the kind of problem I build AI systems to solve."
              </p>

              <button
                type="button"
                onClick={handleExploreDigitalTwin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider uppercase border border-white/20 hover:border-cyan-400/60 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] active:scale-95"
              >
                <span>EXPLORE DIGITAL TWIN</span>
                <span className="text-cyan-400">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* System Lab Exit CTA */}
        <div className="mt-12 sm:mt-16 w-full flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/50 tracking-[0.25em] uppercase">
            <span>OBSERVE</span>
            <span className="text-cyan-400">→</span>
            <span>ANALYZE</span>
            <span className="text-cyan-400">→</span>
            <span>PREDICT</span>
            <span className="text-cyan-400">→</span>
            <span className="text-white font-bold">BUILD</span>
          </div>

          <button
            type="button"
            onClick={handleContinueToSkills}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-white/90 hover:text-white font-mono text-xs tracking-widest uppercase border border-white/15 hover:border-white/30 backdrop-blur-md transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95 group"
          >
            <span>CONTINUE TO SKILLS</span>
            <span className="text-blue-400 group-hover:translate-y-0.5 transition-transform">↓</span>
          </button>
        </div>

      </div>
    </section>
  );
}
