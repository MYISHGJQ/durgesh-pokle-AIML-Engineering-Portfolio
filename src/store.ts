import { create } from 'zustand';

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
}));

