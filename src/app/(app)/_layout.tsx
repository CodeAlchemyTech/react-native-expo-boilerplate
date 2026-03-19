import { Stack } from 'expo-router';

// AUTH GUARD DISABLED — goes straight to tabs for development.
// To re-enable: restore the isAuthenticated + isHydrated checks and <Redirect>.
export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="components" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal/example-modal"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Example Modal',
        }}
      />
    </Stack>
  );
}
