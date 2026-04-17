# AGENTS.md

## Critical Commands

```bash
# Development
npx expo start              # Expo Go (fast iteration)
npx expo run:ios             # Dev build on iOS simulator
npx expo run:android         # Dev build on Android emulator
npx expo prebuild --clean    # Regenerate ios/ and android/ folders (required after native deps)

# Verification (run in this order)
npm run lint                 # ESLint
npm run type-check           # TypeScript (tsc --noEmit)
npm run test                 # Jest

# Deployment
npx eas build --platform ios --profile preview
npx eas build --platform android --profile preview
```

## Critical Import Order (NEVER CHANGE)

**`index.js`** — import order is intentional:

```js
import './global.css'; // 1. NativeWind CSS first
import './src/i18n'; // 2. i18n second
import 'expo-router/entry'; // 3. Router last
```

**`babel.config.js`** — plugins order is intentional:

- `babel-preset-expo` with `jsxImportSource: 'nativewind'` must be first
- `react-native-reanimated/plugin` must be **last**

## Styling Rules (NativeWind v4)

- Use custom `<Text>` from `@components/atoms/Text` — not React Native's `Text`
- Never mix `StyleSheet.create()` with NativeWind className on the same component
- Use `cn()` utility for conditional classes
- Design tokens in `tailwind.config.js`: `bg-primary-600`, `text-muted`, etc.
- Tailwind changes require Metro restart: `npx expo start --clear`

## Auth Guard Pattern

```tsx
const isHydrated = useAuthStore((s) => s.isHydrated);
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

if (!isHydrated) return null; // CRITICAL: prevents redirect loop
if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
```

The `isHydrated` flag in `auth.store.ts` is set by the `onRehydrateStorage` callback after AsyncStorage loads.

## Expo Go Compatibility

Services auto-detect Expo Go via `isExpoGo` from `@utils/expo.ts` and switch to safe fallbacks.

| Package                          | Expo Go behavior                             |
| -------------------------------- | -------------------------------------------- |
| `react-native-purchases`         | Mock service (empty offerings)               |
| `react-native-google-mobile-ads` | `BannerAd` renders null; `showAd()` is no-op |

**Never guard at call sites** — services handle the switch internally.

## Service Layer Rules

- RevenueCat: Use `useRevenueCat()` from `@hooks`, not `react-native-purchases` directly
- AdMob: Use `BannerAd` and `InterstitialAdManager` from `@services/admob`
- Never check `isPremium` before rendering ads — components handle this internally

## Code Quality

- No `any` — use `unknown` and narrow
- No hardcoded strings — use i18n keys
- No `console.log` — use `logger` from `@utils/logger`
- No cross-feature imports — features import only from `@components`, `@hooks`, `@services`, `@store`, `@utils`
- Barrel exports (`index.ts`) for every folder

## Environment Variables

Access via `src/config/env.ts` — never `process.env` directly in components.

Adding a new var:

1. Add to `.env.example`
2. Add `EXPO_PUBLIC_` prefix in `.env.local`
3. Add to `ENV` object in `src/config/env.ts`

## What NOT to Modify

| File                                         | Reason                                                     |
| -------------------------------------------- | ---------------------------------------------------------- |
| `babel.config.js`                            | Breaking `jsxImportSource` breaks all NativeWind styling   |
| `metro.config.js`                            | Breaking `withNativeWind` breaks CSS processing            |
| `src/store/auth.store.ts`                    | `isHydrated`/`partialize` logic is critical for auth guard |
| `src/utils/expo.ts`                          | Used by RevenueCat and AdMob services                      |
| `src/services/revenuecat/purchases.types.ts` | Interface contract between real and mock service           |

## Key Files

- `CLAUDE.md` — Full project documentation
- `src/config/env.ts` — Environment variables
- `src/config/app.config.ts` — Feature flags
- `src/store/auth.store.ts` — Auth state with AsyncStorage persistence
- `src/services/revenuecat/` — RevenueCat service + mock
- `src/services/admob/` — AdMob service + components
