# CLAUDE.md — Expo Boilerplate

This file is the single source of truth for how this project works. Read it before making changes.

---

## Project Overview

A production-ready, reusable React Native Expo boilerplate built for rapid app development across multiple verticals: AI apps, kids apps, edtech, productivity tools, networking apps, and whitelabel apps.

**Stack:**

- **Expo SDK ~54** with New Architecture enabled (React Native 0.81)
- **Expo Router v6** — file-based routing with typed routes
- **TypeScript** — strict mode, path aliases, `noUncheckedIndexedAccess`
- **Zustand v5** — client/UI state (auth, theme, premium)
- **TanStack Query v5** — server/async state (API calls, caching)
- **NativeWind v4** — Tailwind CSS styling for React Native
- **RevenueCat** — subscription and in-app purchases
- **Google AdMob** — banner and interstitial advertising
- **i18next + expo-localization** — internationalization

---

## Development Setup

### Expo Go vs Development Build

| Feature                          | Expo Go            | Dev Build |
| -------------------------------- | ------------------ | --------- |
| Hot reload, routing, UI          | ✅                 | ✅        |
| RevenueCat                       | ❌ → mock fallback | ✅        |
| Google AdMob                     | ❌ → hidden        | ✅        |
| NativeWind, Zustand, React Query | ✅                 | ✅        |

**RevenueCat and AdMob auto-detect Expo Go** via `isExpoGo` from `src/utils/expo.ts` and switch to safe fallbacks — you never need to wrap call sites with environment checks. All other features work in Expo Go.

Use Expo Go for fast UI iteration. Use a dev build when you need to test monetization.

```bash
# 1. Install dependencies
npm install

# 2. Generate native projects
npx expo prebuild --clean

# 3. Run on simulator/device (development build)
npx expo run:ios      # or: npx expo run:android

# 4. Type checking
npm run type-check

# 5. Linting
npm run lint
```

**First-time setup:**

1. Copy `.env.example` to `.env.local` and fill in your API keys
2. Replace placeholder IDs in `app.json` (bundle identifiers, AdMob app IDs)
3. Configure RevenueCat API keys in `.env.local`

### Reuse as New Project

To use this boilerplate for a new project:

```bash
# Rename app (updates app.json, package.json, regenerates native folders)
npm run rename "New App Name" "com.newapp.bundleid"

# Then install fresh dependencies
npm install
```

Example: `npm run rename "My Fitness App" "com.mycompany.fitnessapp"`

---

## Architecture

### Separation of Concerns

```
UI Layer          →  src/app/, src/components/, src/features/*/components/
Business Logic    →  src/features/*/hooks/, src/hooks/
Server State      →  React Query (useQuery / useMutation in feature hooks)
Client State      →  Zustand stores (src/store/)
Service Layer     →  src/services/ (API, RevenueCat, AdMob, Analytics, Storage)
Config / Env      →  src/config/
Types             →  src/types/
Theme / Tokens    →  src/theme/, tailwind.config.js
i18n              →  src/i18n/
```

### Data Flow

```
Component renders
  → Calls a feature hook (e.g., useLogin, useHomeData)
  → Feature hook uses React Query or Zustand
  → React Query calls service layer (apiClient)
  → Service layer reads config from src/config/env.ts
  → State updates flow back to components via selectors
```

---

## Folder Structure

```
src/
  app/                    Expo Router file-based routes
    _layout.tsx           Root layout: providers, splash screen, theme sync
    (auth)/               Auth flow (redirects away if logged in)
      login.tsx
      signup.tsx
      forgot-password.tsx
    (app)/                Protected flow (redirects to login if not authed)
      _layout.tsx         Auth guard using <Redirect>
      (tabs)/             Tab navigator
        home/
        settings/
        profile/
      modal/
        example-modal.tsx
  components/
    atoms/                Smallest building blocks (Button, Text, Input, etc.)
    molecules/            Composed atoms (Card, EmptyState, Modal, etc.)
    organisms/            Screen-level layout (ScreenContainer, Header)
  features/               Feature modules (self-contained)
    auth/                 components/ + hooks/ + types.ts + index.ts
    home/
    settings/
    paywall/
    profile/
  services/
    api/                  axios client + endpoints
    revenuecat/           RevenueCat service + interface + mock
    admob/                AdMob service + BannerAd + InterstitialAdManager
    analytics/            Analytics service (pluggable)
    storage/              AsyncStorage and SecureStore wrappers
  store/                  Zustand stores
    auth.store.ts
    theme.store.ts
    premium.store.ts      NOT persisted — re-verified from RevenueCat on launch
    query.store.ts        QueryClient singleton
  hooks/                  Shared hooks (useAuth, usePremium, useRevenueCat, etc.)
  utils/                  Pure functions (cn, validators, formatters, logger)
  constants/              routes.ts and other app-wide constants
  types/                  Shared TypeScript types
  theme/                  Design token values (colors, spacing, typography)
  i18n/                   i18next setup + locale JSON files
  config/                 env.ts (ENV object), app.config.ts (feature flags)
  assets/                 Static images, fonts, icons
CLAUDE.md
docs/
```

---

## State Management Strategy

### Rule: Zustand vs React Query

| Data Type                   | Use                  | Why                                                     |
| --------------------------- | -------------------- | ------------------------------------------------------- |
| Auth session (user, tokens) | Zustand + persist    | Client-owned, needs persistence, used everywhere        |
| Theme preference            | Zustand + persist    | Device-local preference, no server involved             |
| Premium entitlements        | Zustand (no persist) | Verified from RevenueCat on every launch                |
| API data (lists, profiles)  | React Query          | Server-owned, needs caching, refetching, loading states |
| Form state                  | Local `useState`     | Component-scoped, ephemeral                             |
| UI flags (modal open, etc.) | Local `useState`     | Component-scoped, ephemeral                             |

### Zustand Rules

- Access stores outside React using `useXStore.getState()` (e.g., in API interceptors)
- Use `partialize` to exclude ephemeral state from persistence
- `isHydrated` flag in `auth.store` prevents redirect loops during AsyncStorage load
- Never put server data in Zustand — use React Query for that

### React Query Rules

- Default `staleTime` is 5 minutes — adjust per-query as needed
- `refetchOnWindowFocus: false` — mobile apps don't have window focus
- `networkMode: 'offlineFirst'` — queries don't pause when offline
- Use `queryClient.invalidateQueries()` after mutations that change server state

---

## Styling (NativeWind v4)

### How It Works

NativeWind v4 transforms Tailwind class strings at build time via the `jsxImportSource: 'nativewind'` Babel preset option. The `global.css` file must be imported **first** in `index.js`.

### Rules

- **Always use the custom `<Text>` component** from `@components/atoms/Text` instead of React Native's `Text`. NativeWind v4 requires this wrapper for className support.
- **Never mix `StyleSheet.create()` with NativeWind** on the same component — they conflict with the className theming system.
- **Use the `cn()` utility** for conditional classes: `cn('base', isActive && 'active', variant === 'danger' && 'bg-danger')`
- **Dark mode** uses the `dark:` prefix: `className="bg-white dark:bg-slate-900"`
- **Design tokens are in `tailwind.config.js`** — use token names (`bg-primary-600`, `text-muted`) not raw hex values

### Design Token Naming

| Token                | Usage                            |
| -------------------- | -------------------------------- |
| `primary-{50-900}`   | Brand blue — main actions, links |
| `secondary-{50-900}` | Brand violet — secondary actions |
| `surface`            | Card/component backgrounds       |
| `muted`              | Secondary text, placeholders     |
| `danger`             | Errors, destructive actions      |
| `success`            | Confirmations, positive states   |
| `warning`            | Cautions, attention needed       |

---

## Navigation (Expo Router v4)

### Route Groups

- `(auth)/` — unauthenticated routes. Layout redirects to `(app)` if already logged in.
- `(app)/` — protected routes. Layout renders `<Redirect href="/(auth)/login">` if not authenticated.
- `(app)/(tabs)/` — bottom tab navigator with home, settings, profile.

### Auth Guard Pattern

The `(app)/_layout.tsx` guards all protected routes:

```tsx
const isHydrated = useAuthStore((s) => s.isHydrated);
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

if (!isHydrated) return null; // Wait for AsyncStorage
if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
```

The `isHydrated` flag is critical — without it, the redirect fires before AsyncStorage finishes loading, causing a redirect loop for authenticated users.

### Adding a New Screen

**Tab screen:**

```
src/app/(app)/(tabs)/my-feature/index.tsx
```

Then add a `<Tabs.Screen>` in `src/app/(app)/(tabs)/_layout.tsx`.

**Stack screen (inside app):**

```
src/app/(app)/my-screen.tsx
```

Then add a `<Stack.Screen>` in `src/app/(app)/_layout.tsx`.

**Modal:**

```
src/app/(app)/modal/my-modal.tsx
```

Then add `<Stack.Screen name="modal/my-modal" options={{ presentation: 'modal' }}>` in `src/app/(app)/_layout.tsx`.

**Auth screen:**

```
src/app/(auth)/my-auth-screen.tsx
```

Then add a `<Stack.Screen>` in `src/app/(auth)/_layout.tsx`.

### Typed Routes

With `typedRoutes: true` in `app.json`, `href` props and `router.push()` are fully typed. Use the constants in `src/constants/routes.ts` for navigation.

---

## Adding a New Feature

Follow this pattern to keep features self-contained:

```
src/features/my-feature/
  components/
    MyFeatureList.tsx
    MyFeatureCard.tsx
  hooks/
    useMyFeatureData.ts   ← React Query hook
    useMyFeatureAction.ts ← useMutation hook
  types.ts
  index.ts               ← barrel export
```

**Steps:**

1. Create the folder and files above
2. Define types in `types.ts`
3. Write the React Query hook in `hooks/`
4. Write UI components in `components/`
5. Export everything from `index.ts`
6. Create the route file in `src/app/`
7. Never import from another feature — only from `@components`, `@hooks`, `@services`, `@store`, `@utils`

---

## Adding a New API Call

1. Add the endpoint to `src/services/api/endpoints.ts`
2. Create a feature hook:

```typescript
// src/features/my-feature/hooks/useMyData.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@services/api/client';
import { ENDPOINTS } from '@services/api/endpoints';

export function useMyData(id: string) {
  return useQuery({
    queryKey: ['my-feature', id],
    queryFn: async () => {
      const res = await apiClient.get(`${ENDPOINTS.myFeature.detail}/${id}`);
      return res.data.data;
    },
  });
}
```

3. Use in components: `const { data, isLoading, isError } = useMyData(id)`

---

## Monetization

### RevenueCat

**Rules:**

- Never import `react-native-purchases` directly in components
- Always use `useRevenueCat()` from `@hooks/useRevenueCat`
- The `IPurchasesService` interface in `purchases.types.ts` is the contract — the real service and mock both implement it
- Entitlements are in `usePremiumStore` — check `isPremium` for simple gates, `checkEntitlement('my-entitlement')` for specific feature gates
- In Expo Go, `purchasesService` automatically resolves to `mockPurchasesService` — no manual checks needed

**Configure on app start** (add to `src/app/_layout.tsx`):

```tsx
useEffect(() => {
  purchasesService.configure(
    Platform.OS === 'ios' ? ENV.REVENUECAT_API_KEY_IOS : ENV.REVENUECAT_API_KEY_ANDROID
  );
}, []);
```

**Show the paywall:**

```tsx
router.push('/(app)/modal/paywall'); // Create this route using PaywallScreen component
```

### Google AdMob

**Rules:**

- Never check `isPremium` before rendering `<BannerAd />` — it handles this internally
- Never check `isExpoGo` before rendering `<BannerAd />` — it handles this internally
- Never show ads inside core navigation flows — only in content areas
- The `useInterstitialAd()` hook respects `APP_CONFIG.AD_FREQUENCY`
- In Expo Go: `<BannerAd />` renders null, `useInterstitialAd().showAd()` is a no-op

**Initialize AdMob** (in root `_layout.tsx`):

```tsx
useEffect(() => {
  admobService.initialize();
}, []);
```

**Use banner ad:**

```tsx
import { BannerAd } from '@services/admob';
<BannerAd />; // Auto-hides for premium users
```

---

## Localization (i18n)

- All user-facing strings must use `useTranslation()` — never hardcode strings
- Translation keys use dot notation: `auth.login.title`, `common.button.save`
- Add translations to both `en.json` and `es.json` simultaneously
- The i18n system auto-detects device locale via `expo-localization`

**Adding a new string:**

```json
// src/i18n/locales/en.json
{
  "myFeature": {
    "title": "My Feature"
  }
}
```

```tsx
const { t } = useTranslation();
<Text>{t('myFeature.title')}</Text>;
```

**Adding a new language:**

1. Create `src/i18n/locales/fr.json`
2. Import and add to resources in `src/i18n/index.ts`

---

## Environment Variables

Access pattern: `.env.local` → `process.env.EXPO_PUBLIC_*` → `src/config/env.ts` → components

```typescript
import { ENV } from '@config/env';
const url = ENV.API_BASE_URL;
```

**Adding a new env var:**

1. Add to `.env.example` with placeholder
2. Add `EXPO_PUBLIC_MY_VAR=value` to `.env.local`
3. Add to `ENV` object in `src/config/env.ts`

**Never:**

- Access `process.env` directly in components
- Commit `.env.local`
- Use non-`EXPO_PUBLIC_` prefixed vars (they won't be available at runtime)

---

## Extending the Design System

### Adding a New Color Token

1. Add to `src/theme/colors.ts` (in both `light` and `dark` palettes if semantic)
2. Add to `tailwind.config.js` under `theme.extend.colors`
3. Use in components: `className="bg-my-new-color"`

### Adding a New Tailwind Class/Component Style

Add to `tailwind.config.js` under the relevant `theme.extend` section. Changes take effect after restarting Metro (`npx expo start --clear`).

---

## Code Quality Rules

1. **No `any`** — use `unknown` and narrow, or define a proper type
2. **No hardcoded strings** — use i18n keys
3. **No business logic in atoms** — Button, Text, Input are purely presentational
4. **No monetization logic in UI components** — use hooks; let components receive only what they need to render
5. **No direct `console.log`** — use `logger` from `@utils/logger`
6. **No cross-feature imports** — `features/auth` should not import from `features/home`
7. **Prefix hooks with `use`** — `useMyHook.ts`, not `myHook.ts`
8. **PascalCase for components** — `MyComponent.tsx`
9. **camelCase for everything else** — `myFunction`, `myVariable`
10. **Barrel exports** — every folder has an `index.ts`

---

## What NOT to Modify Casually

| File                                         | Why                                                                                          |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `babel.config.js`                            | Changing `jsxImportSource` breaks all NativeWind styling                                     |
| `metro.config.js`                            | Changing the NativeWind input path breaks CSS processing                                     |
| `global.css`                                 | Import order in `index.js` is load-order sensitive                                           |
| `index.js`                                   | Import order matters: CSS first, i18n second, router last                                    |
| `src/app/_layout.tsx`                        | Provider order affects the entire app render tree                                            |
| `src/app/(app)/_layout.tsx`                  | Auth guard logic — breaking this exposes protected routes                                    |
| `src/store/auth.store.ts`                    | `isHydrated` and `partialize` logic are critical for auth guard                              |
| `src/services/revenuecat/purchases.types.ts` | Interface contract between real and mock service                                             |
| `src/utils/expo.ts`                          | `isExpoGo` detection used by RevenueCat and AdMob — changing this breaks conditional loading |

---

## Expo Go Compatibility

The `isExpoGo` flag in `src/utils/expo.ts` uses `Constants.executionEnvironment` to detect Expo Go at runtime:

```typescript
import { isExpoGo, isNativeBuild } from '@utils/expo';
```

**When adding a new native-only package** (one that crashes in Expo Go):

1. Add a mock implementation that satisfies the same interface
2. Export a service that switches at runtime:

```typescript
import { isExpoGo } from '@utils/expo';
import { myMockService } from './my.mock';
import { MyRealService } from './my.service';

export const myService = isExpoGo ? myMockService : MyRealService.getInstance();
```

3. Document in `CLAUDE.md` under the relevant section
4. Never guard at the call site — the service itself handles the switch

**Packages that require a dev build and their fallback strategy:**

| Package                          | Expo Go behaviour                            |
| -------------------------------- | -------------------------------------------- |
| `react-native-purchases`         | Mock service (empty offerings, no purchases) |
| `react-native-google-mobile-ads` | BannerAd renders null; showAd() is a no-op   |

---

## Build & Deployment

### Local Development Build

```bash
npx expo prebuild --clean    # Regenerate ios/ and android/ folders
npx expo run:ios             # Build and launch iOS simulator
npx expo run:android         # Build and launch Android emulator
```

### EAS Build (CI/CD)

```bash
npx eas build --platform ios --profile preview
npx eas build --platform android --profile preview
```

**Before submitting:**

- Update `version` in `app.json`
- Update `ios.buildNumber` / `android.versionCode`
- Verify all env vars are set in EAS secrets
- Run `npm run type-check` and `npm run lint` — must pass with 0 errors

### Whitelabeling This Boilerplate

To create a new app from this template:

1. Clone the repo
2. Update `app.json`: `name`, `slug`, `scheme`, `bundleIdentifier`, `package`
3. Update `package.json` `name`
4. Replace API keys in `.env.local`
5. Update `tailwind.config.js` color palette to match the new brand
6. Replace assets in `src/assets/`
7. Run `npx expo prebuild --clean`
