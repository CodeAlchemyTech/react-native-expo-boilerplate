# Setup Guide

## Prerequisites

- Node.js 20+
- Xcode 15+ (iOS)
- Android Studio (Android)
- CocoaPods (iOS): `sudo gem install cocoapods`
- EAS CLI (optional, for cloud builds): `npm install -g eas-cli`

## Initial Setup

```bash
# Clone and install
git clone <repo-url>
cd expo-boilerplate
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual API keys

# Generate native projects (required before first build)
npx expo prebuild --clean

# Install iOS pods
cd ios && pod install && cd ..

# Run
npx expo run:ios
npx expo run:android
```

## API Keys Required

| Service | Where to get it | Env var |
|---|---|---|
| RevenueCat iOS | dashboard.revenuecat.com | `EXPO_PUBLIC_REVENUECAT_API_KEY_IOS` |
| RevenueCat Android | dashboard.revenuecat.com | `EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID` |
| AdMob Banner | admob.google.com | `EXPO_PUBLIC_ADMOB_BANNER_ID` |
| AdMob Interstitial | admob.google.com | `EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID` |
| Backend API | Your server | `EXPO_PUBLIC_API_BASE_URL` |

## app.json Replacements

Before your first build, update these values in `app.json`:

| Field | What to replace |
|---|---|
| `expo.ios.bundleIdentifier` | `com.yourcompany.yourapp` |
| `expo.android.package` | `com.yourcompany.yourapp` |
| `expo.plugins[react-native-google-mobile-ads].androidAppId` | Your AdMob Android App ID |
| `expo.plugins[react-native-google-mobile-ads].iosAppId` | Your AdMob iOS App ID |
| `expo.extra.eas.projectId` | Your EAS project ID |

## Common Issues

**"Unable to resolve module" errors after adding a package:**
```bash
npx expo install   # Use expo's installer, not npm, for compatible versions
npx expo start --clear
```

**NativeWind classes not applying:**
- Verify `global.css` is the first import in `index.js`
- Restart Metro with `--clear` flag
- Check that the class name is in the `content` array in `tailwind.config.js`

**RevenueCat crashes on launch:**
- Only works in development builds, not Expo Go
- Verify `purchasesService.configure()` is called with a valid API key
- Check that `react-native-purchases` is listed in native build output

**Auth redirect loop:**
- The `isHydrated` flag in `auth.store.ts` prevents this
- If you see a loop, check `onRehydrateStorage` is calling `setHydrated()`
