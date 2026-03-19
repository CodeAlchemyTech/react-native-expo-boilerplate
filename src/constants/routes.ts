export const ROUTES = {
  // Auth
  LOGIN:           '/(auth)/login',
  SIGNUP:          '/(auth)/signup',
  FORGOT_PASSWORD: '/(auth)/forgot-password',
  // App tabs
  HOME:     '/(app)/(tabs)/home',
  SETTINGS: '/(app)/(tabs)/settings',
  PROFILE:  '/(app)/(tabs)/profile',
  // Modals
  EXAMPLE_MODAL: '/(app)/modal/example-modal',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
