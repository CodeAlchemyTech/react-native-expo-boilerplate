import { APP_CONFIG } from '@config/app.config';

type EventProperties = Record<string, string | number | boolean>;

/**
 * Analytics service — plug in your preferred provider (Mixpanel, Amplitude, PostHog, etc.).
 * Currently logs to console in dev and is a no-op in production.
 */
class AnalyticsService {
  private isEnabled = APP_CONFIG.ENABLE_ANALYTICS;

  track(event: string, properties?: EventProperties): void {
    if (!this.isEnabled) return;
    if (__DEV__) {
      console.warn(`[Analytics] ${event}`, properties);
      return;
    }
    // TODO: Forward to your analytics provider
    // e.g. Mixpanel.track(event, properties);
  }

  identify(userId: string, traits?: EventProperties): void {
    if (!this.isEnabled) return;
    if (__DEV__) {
      console.warn(`[Analytics] identify: ${userId}`, traits);
      return;
    }
    // TODO: e.g. Mixpanel.identify(userId);
  }

  screen(screenName: string, properties?: EventProperties): void {
    this.track(`Screen: ${screenName}`, properties);
  }

  reset(): void {
    if (!this.isEnabled) return;
    // TODO: e.g. Mixpanel.reset();
  }
}

export const analyticsService = new AnalyticsService();
