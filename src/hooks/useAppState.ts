import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

/**
 * Fires a callback when the app transitions between foreground and background.
 *
 * Usage:
 *   useAppState({
 *     onForeground: () => queryClient.invalidateQueries(),
 *   });
 */
export function useAppState({
  onForeground,
  onBackground,
}: {
  onForeground?: () => void;
  onBackground?: () => void;
}) {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        onForeground?.();
      } else if (nextState.match(/inactive|background/)) {
        onBackground?.();
      }
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, [onForeground, onBackground]);
}
