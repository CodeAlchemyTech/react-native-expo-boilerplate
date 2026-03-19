import Constants, { ExecutionEnvironment } from 'expo-constants';

/**
 * True when running inside Expo Go (StoreClient).
 *
 * Native modules that require a development build (RevenueCat, AdMob, etc.)
 * are NOT available in Expo Go. Use this flag to conditionally load them
 * and fall back to safe no-op / mock implementations.
 *
 * ExecutionEnvironment values:
 *   StoreClient  → Expo Go app
 *   Bare         → Development build (expo-dev-client) or bare workflow
 *   Standalone   → Production build (App Store / Play Store)
 */
export const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/** True when running in a development build or production standalone build. */
export const isNativeBuild = !isExpoGo;

/** True when running in a production (standalone) build. */
export const isStandalone =
  Constants.executionEnvironment === ExecutionEnvironment.Standalone;
