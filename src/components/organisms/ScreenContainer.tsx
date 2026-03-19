import { ScrollView, View, type ViewProps, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@utils/cn';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  /** If true, wraps children in a ScrollView */
  scrollable?: boolean;
  /** Background class (defaults to bg-white dark:bg-slate-900) */
  backgroundClassName?: string;
}

type ScreenContainerProps = BaseProps &
  (
    | ({ scrollable: true } & ScrollViewProps)
    | ({ scrollable?: false } & ViewProps)
  );

/**
 * Standard screen wrapper — handles safe area, background, and optional scroll.
 * Use as the outermost wrapper for every screen.
 */
export function ScreenContainer({
  children,
  className,
  scrollable = false,
  backgroundClassName,
  ...props
}: ScreenContainerProps) {
  const background = backgroundClassName ?? 'bg-white dark:bg-slate-900';

  if (scrollable) {
    return (
      <SafeAreaView className={cn('flex-1', background)}>
        <ScrollView
          className={cn('flex-1', className)}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          {...(props as ScrollViewProps)}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={cn('flex-1', background)}>
      <View className={cn('flex-1', className)} {...(props as ViewProps)}>
        {children}
      </View>
    </SafeAreaView>
  );
}
