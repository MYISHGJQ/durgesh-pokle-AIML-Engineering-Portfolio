import { useEffect } from 'react';
import { useStore } from '../../store';

export default function ProtocolToast() {
  const activeToast = useStore((state) => state.activeToast);
  const clearProtocolToast = useStore((state) => state.clearProtocolToast);

  useEffect(() => {
    if (!activeToast) return;

    const timer = setTimeout(() => {
      clearProtocolToast();
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeToast, clearProtocolToast]);

  if (!activeToast) return null;

  return (
    <aside 
      role="status"
      aria-live="polite"
      aria-label="System notification"
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 pointer-events-auto transition-all duration-300"
    >
      <div className="apple-glass rounded-2xl p-4 sm:p-5 border border-cyan-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.2)] flex flex-col gap-2 relative overflow-hidden backdrop-blur-xl bg-black/85">
        {/* Subtle accent glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-400 font-bold">
              {activeToast.protocolNum ? `PROTOCOL ${activeToast.protocolNum}` : 'HIDDEN SIGNAL'}
            </span>
          </div>
          <button
            type="button"
            onClick={clearProtocolToast}
            aria-label="Dismiss notification"
            className="w-5 h-5 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div>
          <h4 className="font-outfit font-bold text-sm text-white tracking-wide uppercase">
            {activeToast.title}
          </h4>
          <p className="font-mono text-xs text-white/80 mt-1 leading-relaxed">
            {activeToast.subtitle}
          </p>
        </div>

        {/* Optional Action Button */}
        {activeToast.actionText && activeToast.onAction && (
          <button
            type="button"
            onClick={() => {
              activeToast.onAction?.();
              clearProtocolToast();
            }}
            className="mt-2 self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-[11px] tracking-wider uppercase border border-cyan-500/40 transition-all cursor-pointer hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] active:scale-95"
          >
            <span>{activeToast.actionText}</span>
            <span>→</span>
          </button>
        )}
      </div>
    </aside>
  );
}
