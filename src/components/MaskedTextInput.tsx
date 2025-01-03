import { forwardRef } from 'react';
import { Text, TextInput, View } from 'react-native';

import { cn } from '@/lib/utils';
import MaskInput, { Mask } from 'react-native-mask-input';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  mask: Mask;
}
const MaskedInput = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, mask, ...props }, ref) => (
    <View className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <Text className={cn('text-base text-blue', labelClasses)}>{label}</Text>}
      <MaskInput
        className={cn(
          inputClasses,
          'border border-input py-2.5 px-4 rounded-lg bg-white'
        )}
        {...props}
        mask={mask}
      />
    </View>
  )
);

export { MaskedInput };
