/**
 * Centralized environment variable access.
 *
 * Values are read from Expo's EXPO_PUBLIC_ prefix at build time.
 * Never access process.env directly in components — always use this module.
 *
 * To add a new env var:
 *   1. Add to .env.example
 *   2. Add EXPO_PUBLIC_ prefix in actual .env files
 *   3. Add to this ENV object
 */
export const ENV = {
  IS_DEV: __DEV__,

  API_BASE_URL: process.env['EXPO_PUBLIC_API_BASE_URL'] ?? 'https://api.example.com',

  REVENUECAT_API_KEY_IOS:
    process.env['EXPO_PUBLIC_REVENUECAT_API_KEY_IOS'] ?? '',

  REVENUECAT_API_KEY_ANDROID:
    process.env['EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID'] ?? '',

  ADMOB_BANNER_ID:
    process.env['EXPO_PUBLIC_ADMOB_BANNER_ID'] ?? '',

  ADMOB_INTERSTITIAL_ID:
    process.env['EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID'] ?? '',
} as const;
