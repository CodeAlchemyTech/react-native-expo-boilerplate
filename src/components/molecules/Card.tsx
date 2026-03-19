import { View, type ViewProps } from 'react-native';
import { cn } from '@utils/cn';

export interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn(
        'rounded-card bg-white dark:bg-slate-800 p-4',
        'shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
