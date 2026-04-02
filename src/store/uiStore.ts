import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PaletteMode } from '@mui/material'

interface UiState {
  colorMode: PaletteMode
  sidebarOpen: boolean
  setColorMode: (mode: PaletteMode) => void
  toggleColorMode: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      colorMode: 'dark',
      sidebarOpen: false,
      setColorMode: (colorMode) => set({ colorMode }),
      toggleColorMode: () =>
        set({ colorMode: get().colorMode === 'dark' ? 'light' : 'dark' }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
    }),
    { name: 'retechfin-ui', partialize: (s) => ({ colorMode: s.colorMode }) },
  ),
)
