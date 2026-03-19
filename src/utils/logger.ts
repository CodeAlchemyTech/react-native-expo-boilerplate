/**
 * Dev-only logger. All calls are no-ops in production builds.
 * Use this instead of console.log to avoid leaking logs in production.
 */
export const logger = {
  log: (...args: unknown[]) => {
    if (__DEV__) console.log('[App]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (__DEV__) console.warn('[App]', ...args);
  },
  error: (...args: unknown[]) => {
    if (__DEV__) console.error('[App]', ...args);
  },
  info: (...args: unknown[]) => {
    if (__DEV__) console.info('[App]', ...args);
  },
};
