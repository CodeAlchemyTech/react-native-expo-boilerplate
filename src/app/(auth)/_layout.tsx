import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '@store/auth.store';

export default function AuthLayout() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  // If the user is already logged in, skip auth screens and go to main app
  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      router.replace('/(app)/(tabs)/home');
    }
  }, [isAuthenticated, isHydrated, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
