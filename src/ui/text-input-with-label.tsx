import clsx from 'clsx';
import React, { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { Text, TextInput, View } from 'react-native';

function TextInputWithLabel({
  value,
  onChange,
  placeholder,
  autoFocus,
  className,
  containerClassName,
  placeholderClassName,
}: TextInputProps & { containerClassName?: string }) {
  // State để theo dõi trạng thái focus
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={clsx(
        'h-14 rounded-xl border px-4 transition-all',
        isFocused ? 'border-black' : 'border-gray-ebe',
        containerClassName
      )}
    >
      <Text
        className={clsx(
          'mt-[5px] text-xs text-[#999CA0]',
          placeholderClassName
        )}
      >
        {placeholder}
      </Text>
      <TextInput
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={clsx('h-5 text-base', className)}
        autoCapitalize="none"
      />
    </View>
  );
}

export default TextInputWithLabel;
