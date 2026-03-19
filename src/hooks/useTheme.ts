import { useThemeStore } from '@store/theme.store';

/**
 * Convenience hook for theme state.
 */
export function useTheme() {
  const colorScheme = useThemeStore((s) => s.colorScheme);
  const resolvedScheme = useThemeStore((s) => s.resolvedScheme);
  const setColorScheme = useThemeStore((s) => s.setColorScheme);

  const isDark = resolvedScheme === 'dark';

  return { colorScheme, resolvedScheme, isDark, setColorScheme };
}
