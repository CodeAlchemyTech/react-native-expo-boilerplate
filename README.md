# Expo Boilerplate

Production-ready React Native Expo boilerplate with TypeScript, NativeWind, Zustand, TanStack Query, RevenueCat, and AdMob.

## Quick Start

```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env.local

# Run in Expo Go (fast iteration)
npx expo start

# Run native development build (for monetization features)
npx expo prebuild --clean
npx expo run:ios        # or: npx expo run:android
```

## Setup

1. Copy `.env.example` to `.env.local` and fill in your API keys
2. Update `app.json`:
   - `name`, `slug`, `scheme`
   - `ios.bundleIdentifier`
   - `android.package`
3. Configure RevenueCat and AdMob API keys in `.env.local`

## Development

```bash
npx expo start          # Expo Go
npx expo run:ios        # iOS dev build
npx expo run:android    # Android dev build
```

## Verification

```bash
npm run lint            # ESLint
npm run type-check      # TypeScript
npm run test            # Jest
```

## Deployment

```bash
npx eas build --platform ios --profile preview
npx eas build --platform android --profile preview
```

## Whitelabeling

To create a new app from this template:

1. Clone the repo
2. Update `app.json`: `name`, `slug`, `scheme`, `bundleIdentifier`, `package`
3. Update `package.json` `name`
4. Replace API keys in `.env.local`
5. Update `tailwind.config.js` color palette
6. Replace assets in `src/assets/`
7. Run `npx expo prebuild --clean`

## Stack

- **Expo SDK 54** with New Architecture
- **Expo Router v6** — file-based routing
- **TypeScript** — strict mode
- **NativeWind v4** — Tailwind CSS
- **Zustand v5** — client state
- **TanStack Query v5** — server state
- **RevenueCat** — subscriptions
- **Google AdMob** — advertising
- **i18next** — internationalization
