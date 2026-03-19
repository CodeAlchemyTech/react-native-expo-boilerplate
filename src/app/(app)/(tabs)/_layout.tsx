import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@store/theme.store';
import { palette } from '@theme/colors';

// Using inline SVG-style icon placeholders — replace with lucide-react-native
// or @expo/vector-icons in your app
function TabIcon({ focused, color }: { focused: boolean; color: string }) {
  // This is a placeholder — swap with your icon library
  void focused;
  void color;
  return null;
}

export default function TabsLayout() {
  const { t } = useTranslation();
  const resolvedScheme = useThemeStore((s) => s.resolvedScheme);
  const isDark = resolvedScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary600,
        tabBarInactiveTintColor: isDark ? palette.gray400 : palette.gray500,
        tabBarStyle: {
          backgroundColor: isDark ? palette.slate800 : palette.white,
          borderTopColor: isDark ? palette.gray700 : palette.gray200,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: t('home.title'),
          tabBarIcon: (props) => <TabIcon {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: t('settings.title'),
          tabBarIcon: (props) => <TabIcon {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: t('profile.title'),
          tabBarIcon: (props) => <TabIcon {...props} />,
        }}
      />
    </Tabs>
  );
}
