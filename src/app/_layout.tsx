// NativeWind CSS MUST be the first import in the entire app.
// It is already imported in index.js but this import ensures tree-shaking
// doesn't accidentally remove it if the bundler processes this file first.
import '../../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { queryClient } from '@store/query.store';
import { useAuthStore } from '@store/auth.store';
import { useThemeStore } from '@store/theme.store';

// Keep splash visible while stores hydrate from AsyncStorage
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const setResolvedScheme = useThemeStore((s) => s.setResolvedScheme);
  const colorScheme = useThemeStore((s) => s.colorScheme);
  const systemScheme = useColorScheme();

  // Sync OS color scheme into our theme store
  useEffect(() => {
    if (colorScheme === 'system') {
      setResolvedScheme(systemScheme === 'dark' ? 'dark' : 'light');
    } else {
      setResolvedScheme(colorScheme);
    }
  }, [colorScheme, systemScheme, setResolvedScheme]);

  // Hide splash once auth store has finished loading from AsyncStorage
  useEffect(() => {
    if (isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: true }} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
