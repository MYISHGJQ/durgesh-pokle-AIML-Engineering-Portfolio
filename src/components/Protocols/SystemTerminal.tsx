import { useState, useEffect, useRef } from 'react';
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useStore } from '../../store';

interface LogItem {
  id: string;
  type: 'input' | 'output' | 'system' | 'secret';
  text: string;
}

export default function SystemTerminal() {
  const terminalOpen = useStore((state) => state.terminalOpen);
  const setTerminalOpen = useStore((state) => state.setTerminalOpen);
  const showProtocolToast = useStore((state) => state.showProtocolToast);

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogItem[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'DURGESH.OS [v2.4.0-sys]\nSYSTEM STATUS\n─────────────\nAI CORE ........ ONLINE\nNEURAL ENGINE .. ONLINE\nPROJECTS ....... ONLINE\nCREATIVE CORE .. ONLINE\n\nType \'help\' for available commands.',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [secretTriggered, setSecretTriggered] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && terminalOpen) {
        setTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, setTerminalOpen]);

  if (!terminalOpen) return null;

  const scrollToSection = (id: string) => {
    const targetId = id === 'journey' ? 'journey' : id === 'about' ? 'about' : id === 'skills' ? 'skills' : id === 'projects' ? 'projects' : id === 'contact' ? 'contact' : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    const newHistory = [...history, { id: `${Date.now()}-cmd`, type: 'input' as const, text: `> ${rawCmd}` }];
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setInputVal('');

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: 'AVAILABLE COMMANDS:\n  about     - Navigate to engineering philosophy\n  journey   - Navigate to career & growth milestones\n  projects  - Navigate to technical project showcase\n  systemlab - Navigate to interactive System Lab\n  skills    - Navigate to AI/ML & technical stack\n  contact   - Navigate to contact portal\n  secret    - Execute classified protocol\n  clear     - Clear terminal history\n  exit      - Close terminal',
        });
        break;

      case 'about':
      case 'journey':
      case 'projects':
      case 'skills':
      case 'contact':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Executing navigation protocol -> #${cmd}...`,
        });
        scrollToSection(cmd);
        setTimeout(() => setTerminalOpen(false), 800);
        break;

      case 'systemlab':
      case 'lab':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: 'Executing navigation protocol -> #system-lab...',
        });
        scrollToSection('system-lab');
        setTimeout(() => setTerminalOpen(false), 800);
        break;

      case 'secret':
        setSecretTriggered(true);
        setTimeout(() => setSecretTriggered(false), 2000);
        newHistory.push({
          id: `${Date.now()}-sec`,
          type: 'secret',
          text: 'HIDDEN PROTOCOL DISCOVERED\n"Curiosity is a useful engineering skill."\n[Protocol 01/05 unlocked]',
        });
        showProtocolToast({
          id: 'secret-terminal',
          title: 'HIDDEN PROTOCOL DISCOVERED',
          subtitle: '"Curiosity is a useful engineering skill."',
          protocolNum: '01 / 05',
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
      case 'close':
      case 'quit':
        setTerminalOpen(false);
        return;

      case 'sudo':
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: 'System authentication bypassed: Superuser privileges already active.',
        });
        break;

      default:
        newHistory.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Command not recognized: "${rawCmd}". Type 'help' for available system commands.`,
        });
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setTerminalOpen(false);
      }}
    >
      <div 
        className={`w-full max-w-2xl bg-black/95 border rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col transition-all duration-500 ${
          secretTriggered 
            ? 'border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.5)]' 
            : 'border-white/15'
        }`}
        style={{ maxHeight: '85vh', height: '520px' }}
      >
        {/* Terminal Title Bar */}
        <div className="bg-white/[0.04] border-b border-white/10 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setTerminalOpen(false)} title="Close"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-xs text-white/70 tracking-widest uppercase font-semibold">
              DURGESH.OS [v2.4.0-sys]
            </span>
          </div>

          <button
            type="button"
            onClick={() => setTerminalOpen(false)}
            aria-label="Close terminal"
            className="font-mono text-xs text-white/50 hover:text-white px-2 py-0.5 rounded transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Terminal Output Body */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-[13px] leading-relaxed space-y-3 no-scrollbar"
        >
          {history.map((item) => (
            <div 
              key={item.id} 
              className={`whitespace-pre-wrap ${
                item.type === 'input' 
                  ? 'text-cyan-300 font-bold' 
                  : item.type === 'secret'
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/40 p-3 rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : item.type === 'system'
                  ? 'text-blue-400/90 font-medium'
                  : 'text-white/85'
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Command Line Input */}
        <form 
          onSubmit={handleCommand}
          className="border-t border-white/10 bg-white/[0.02] px-4 py-3 flex items-center gap-2"
        >
          <span className="font-mono text-cyan-400 font-bold select-none text-sm">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            aria-label="Terminal command prompt"
            className="flex-1 bg-transparent font-mono text-xs sm:text-[13px] text-white focus:outline-none placeholder:text-white/30"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="w-2 h-4 bg-cyan-400 animate-pulse hidden sm:inline-block"></span>
        </form>
      </div>
    </div>
  );
}
