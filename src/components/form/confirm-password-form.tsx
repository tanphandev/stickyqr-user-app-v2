import Hide from 'assets/actions/eye-close.svg';
import Show from 'assets/actions/eye-show.svg';
import Warning from 'assets/actions/warning-1.svg';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput } from 'react-native';

import { ERROR_KEY } from '@/constants/error-key';
import { translate, type TxKeyPath } from '@/core/i18n';
import { Button, View } from '@/ui';

export type ConfirmPasswordForm = {
  password: string;
  confirmPassword: string;
};

type Props = {
  passwordLabel: string;
  passwordPlaceholder?: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder?: string;
  defaultForm: ConfirmPasswordForm;
  submitLabel?: string;
  containterClassName?: string;
  submitButtonClassName?: string;
  onSubmit: (data: ConfirmPasswordForm) => void;
};

// eslint-disable-next-line max-lines-per-function
function ConfirmPasswordForm({
  passwordLabel,
  passwordPlaceholder,
  confirmPasswordLabel,
  confirmPasswordPlaceholder,
  submitLabel,
  containterClassName,
  submitButtonClassName,
  defaultForm,
  onSubmit,
}: Props) {
  // state
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ConfirmPasswordForm>({
    mode: 'all',
    defaultValues: defaultForm,
  });

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // validate confirm password when password change
  useEffect(() => {
    if (!passwordValue || !confirmPasswordValue) return;
    trigger('confirmPassword');
  }, [passwordValue, confirmPasswordValue, trigger]);

  return (
    <View
      className={clsx(
        'flex flex-1 flex-col justify-between',
        containterClassName
      )}
    >
      <View>
        {/* Password */}
        <View className="mb-6">
          <Text className="mb-2 text-base font-light">{passwordLabel}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                className={clsx(
                  'flex h-12 flex-row items-center justify-between rounded-lg border border-gray-ebe px-4',
                  {
                    'border-red-ff0': errors.password,
                  }
                )}
              >
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  className={'flex-1'}
                  placeholder={passwordPlaceholder}
                  secureTextEntry={!showPassword}
                />
                {
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Hide width={20} height={20} />
                    ) : (
                      <Show width={20} height={20} />
                    )}
                  </Pressable>
                }
              </View>
            )}
            name="password"
            rules={{
              required: ERROR_KEY.PASSWORD_REQUIRED,
              minLength: {
                value: 6,
                message: ERROR_KEY.PASSWORD_LEAST_6_CHARS,
              },
            }}
          />
          {errors.password?.message && (
            <View className="mt-1 flex flex-row items-center gap-1">
              <View className="mt-[2px]">
                <Warning width={10} height={10} />
              </View>
              <Text className="error-message !mt-0">
                {translate(
                  `ERROR_MESSAGE.${errors.password?.message}` as TxKeyPath
                )}
              </Text>
            </View>
          )}
        </View>

        {/* Confirm Password */}
        <View>
          <Text className="mb-2 text-base font-light">
            {confirmPasswordLabel}
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                className={clsx(
                  'flex h-12 flex-row items-center justify-between rounded-lg border border-gray-ebe px-4',
                  {
                    'border-red-ff0': errors.confirmPassword,
                  }
                )}
              >
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  className={'flex-1'}
                  placeholder={confirmPasswordPlaceholder}
                  secureTextEntry={!showConfirmPassword}
                />
                {
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Hide width={20} height={20} />
                    ) : (
                      <Show width={20} height={20} />
                    )}
                  </Pressable>
                }
              </View>
            )}
            name="confirmPassword"
            rules={{
              required: ERROR_KEY.CONFIRM_PASSWORD_REQUIRED,
              validate: {
                match: (value) => {
                  const password = watch('password');
                  if (value === password) {
                    return true;
                  } else {
                    return ERROR_KEY.CONFIRM_PASSWORD_NOT_MATCH;
                  }
                },
              },
            }}
          />
          {errors.confirmPassword?.message && (
            <View className="mt-1 flex flex-row items-center gap-1">
              <View className="mt-[2px]">
                <Warning width={10} height={10} />
              </View>
              <Text className="error-message !mt-0">
                {translate(
                  `ERROR_MESSAGE.${errors.confirmPassword?.message}` as TxKeyPath
                )}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View>
        <Button
          loading={loading}
          className={submitButtonClassName}
          label={submitLabel}
          onPress={handleSubmit(async (data) => {
            try {
              setLoading(true);
              await onSubmit(data);
            } finally {
              setLoading(false);
            }
          })}
          textClassName="font-semibold"
        />
      </View>
    </View>
  );
}

export default ConfirmPasswordForm;
