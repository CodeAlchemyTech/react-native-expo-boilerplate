import {
  Modal as RNModal,
  View,
  TouchableWithoutFeedback,
  type ModalProps as RNModalProps,
} from 'react-native';
import { Text } from '@components/atoms/Text';
import { Button } from '@components/atoms/Button';
import { cn } from '@utils/cn';

export interface ModalProps extends Omit<RNModalProps, 'children'> {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Label for the primary action button */
  primaryLabel?: string;
  onPrimary?: () => void;
  /** Label for the secondary/cancel button */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** Close modal when backdrop is pressed */
  closeOnBackdrop?: boolean;
  className?: string;
}

export function Modal({
  isVisible,
  onClose,
  title,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  closeOnBackdrop = true,
  className,
  ...props
}: ModalProps) {
  return (
    <RNModal
      visible={isVisible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...props}
    >
      <TouchableWithoutFeedback
        onPress={closeOnBackdrop ? onClose : undefined}
      >
        <View className="flex-1 bg-black/50 items-center justify-center p-6">
          <TouchableWithoutFeedback>
            <View
              className={cn(
                'w-full rounded-card bg-white dark:bg-slate-800 p-6 gap-4',
                className
              )}
            >
              {title && (
                <Text className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  {title}
                </Text>
              )}
              <View>{children}</View>
              {(primaryLabel || secondaryLabel) && (
                <View className="flex-row gap-3 justify-end mt-2">
                  {secondaryLabel && (
                    <Button
                      label={secondaryLabel}
                      onPress={onSecondary ?? onClose}
                      variant="ghost"
                    />
                  )}
                  {primaryLabel && onPrimary && (
                    <Button label={primaryLabel} onPress={onPrimary} />
                  )}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}
