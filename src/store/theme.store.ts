import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ColorScheme, ResolvedColorScheme } from '@types/theme.types';

interface ThemeState {
  /** User's explicit preference ('system' means "follow OS") */
  colorScheme: ColorScheme;
  /** Actual resolved scheme after OS preference is applied */
  resolvedScheme: ResolvedColorScheme;

  setColorScheme: (scheme: ColorScheme) => void;
  setResolvedScheme: (scheme: ResolvedColorScheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: 'system',
      resolvedScheme: 'light',

      setColorScheme: (colorScheme) => set({ colorScheme }),
      setResolvedScheme: (resolvedScheme) => set({ resolvedScheme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the user's explicit choice — not the resolved scheme (computed at runtime)
      partialize: (state) => ({ colorScheme: state.colorScheme }),
    }
  )
);
