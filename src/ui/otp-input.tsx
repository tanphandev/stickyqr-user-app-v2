import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import type { UseFormSetError } from 'react-hook-form';
import {
  type Control,
  Controller,
  type UseFormClearErrors,
  type UseFormSetValue,
} from 'react-hook-form';
import { Pressable, TextInput } from 'react-native';

type OTPInputProps = {
  containerClassName?: string;
  otpInputItemClassName?: string;
  control: Control<OTPFormData, any>;
  value: string[];
  setValue: UseFormSetValue<OTPFormData>;
  setError: UseFormSetError<OTPFormData>;
  clearErrors: UseFormClearErrors<OTPFormData>;
};

export interface OTPFormData {
  otp: string[];
}

// eslint-disable-next-line max-lines-per-function
const OTPInput: React.FC<OTPInputProps> = ({
  containerClassName,
  otpInputItemClassName,
  control,
  value,
  setValue,
  clearErrors,
}) => {
  // ref
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // state to track focused input
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // handle input change
  const handleChange = (currentValue: string, index: number) => {
    const currentOTP = value;
    currentOTP[index] = currentValue;
    setValue('otp', currentOTP);
    if (currentValue.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    clearErrors('otp');
  };

  // handle backspace
  const handleKeyPress = (e: any, index: number) => {
    const currentOTP = value;
    if (e.nativeEvent.key === 'Backspace') {
      if (currentOTP[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
          currentOTP[index - 1] = '';
          setValue('otp', currentOTP);
        }
      } else {
        currentOTP[index] = '';
        setValue('otp', currentOTP);
      }
    }
    clearErrors('otp');
  };

  // handle focus
  const handleFocus = (index: number) => {
    const nextUnfilledIndex = value.findIndex((val) => val === '');
    if (index !== nextUnfilledIndex) {
      inputRefs.current[nextUnfilledIndex]?.focus();
    } else {
      setFocusedIndex(index);
    }
  };

  // handle blur
  const handleBlur = () => {
    setFocusedIndex(null);
  };

  // handle container click
  const handleContainerClick = () => {
    const nextUnfilledIndex = value.findIndex((val) => val === '');
    if (nextUnfilledIndex !== -1) {
      inputRefs.current[nextUnfilledIndex]?.focus();
    }
  };

  return (
    <Pressable
      className={clsx(
        'my-6 flex h-[56px] flex-row justify-between gap-4 px-2',
        containerClassName
      )}
      onPress={handleContainerClick}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <Controller
          key={i}
          control={control}
          name={`otp.${i}`}
          render={() => {
            const isFocused = focusedIndex === i;
            return (
              <TextInput
                ref={(ref) => (inputRefs.current[i] = ref)}
                className={clsx(
                  'h-full flex-1 rounded-lg border text-center',
                  isFocused ? 'border-black' : 'border-gray-ebe',
                  otpInputItemClassName
                )}
                onChangeText={(value) => handleChange(value, i)}
                value={value[i]}
                keyboardType="number-pad"
                maxLength={1}
                onKeyPress={(e) => handleKeyPress(e, i)}
                onFocus={() => handleFocus(i)}
                onBlur={handleBlur}
              />
            );
          }}
        />
      ))}
    </Pressable>
  );
};

export default OTPInput;
