import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

const deviceLocale = getLocales()[0]?.languageCode ?? 'en';

// Called from index.js before any component renders.
// Guard against double-initialization (hot reload).
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng:           deviceLocale,
    fallbackLng:   'en',
    interpolation: { escapeValue: false },
    // Required for React Native — some older Android versions lack Intl.PluralRules
    compatibilityJSON: 'v4',
  });
}

export default i18n;
