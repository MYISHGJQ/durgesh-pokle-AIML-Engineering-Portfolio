import { create } from 'zustand';

export interface ProtocolToast {
  id: string;
  title: string;
  subtitle: string;
  protocolNum?: string;
  actionText?: string;
  onAction?: () => void;
}

interface AppState {
  bootComplete: boolean;
  setBootComplete: (status: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (status: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  activeToast: ProtocolToast | null;
  showProtocolToast: (toast: ProtocolToast) => void;
  clearProtocolToast: () => void;
}

export const useStore = create<AppState>((set) => ({
  bootComplete: false,
  setBootComplete: (status) => set({ bootComplete: status }),
  soundEnabled: false,
  setSoundEnabled: (status) => set({ soundEnabled: status }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  selectedProjectId: null,
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
  terminalOpen: false,
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  activeToast: null,
  showProtocolToast: (toast) => set({ activeToast: toast }),
  clearProtocolToast: () => set({ activeToast: null }),
}));

