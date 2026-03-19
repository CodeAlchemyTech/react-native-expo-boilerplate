import { Redirect } from 'expo-router';

// Skip auth flow — go straight to tabs.
// Delete this file when auth flow is needed.
export default function Index() {
  return <Redirect href="/(app)/(tabs)/home" />;
}
