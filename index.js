// IMPORTANT: Import order matters here.
// 1. NativeWind CSS must be imported first — generates the style sheet
// 2. i18n must be initialized before any component renders
// 3. expo-router/entry must be last — it renders the app

import './global.css';
import './src/i18n';
import 'expo-router/entry';
