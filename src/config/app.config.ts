/**
 * App-level feature flags and constants.
 * Toggle features without touching business logic.
 */
export const APP_CONFIG = {
  // Feature flags — set to false to completely disable a feature
  ENABLE_ADS:          true,
  ENABLE_REVENUECAT:   true,
  ENABLE_ANALYTICS:    true,

  // Query defaults
  DEFAULT_PAGE_SIZE:   20,

  // Auth
  SESSION_TIMEOUT_MS:  1000 * 60 * 60 * 24 * 7, // 7 days

  // Ads
  AD_FREQUENCY:        5, // Show interstitial every N actions
} as const;
