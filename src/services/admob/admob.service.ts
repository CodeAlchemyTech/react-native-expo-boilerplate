import { APP_CONFIG } from '@config/app.config';
import { isExpoGo } from '@utils/expo';

/**
 * AdMob service — wraps react-native-google-mobile-ads initialization.
 *
 * In Expo Go: initialize() is a no-op. All ad components self-hide.
 * In dev/prod build: initializes the SDK on first call.
 *
 * Call admobService.initialize() once on app startup (in root _layout.tsx).
 */
class AdmobService {
  private initialized = false;

  async initialize(): Promise<void> {
    // AdMob native SDK is unavailable in Expo Go
    if (isExpoGo || !APP_CONFIG.ENABLE_ADS) return;
    if (this.initialized) return;

    try {
      const { default: mobileAds } = await import('react-native-google-mobile-ads');
      await mobileAds().initialize();
      this.initialized = true;
    } catch (error) {
      console.warn('[AdMob] Failed to initialize:', error);
    }
  }

  get isInitialized() {
    return this.initialized;
  }
}

export const admobService = new AdmobService();
