import Hide from 'assets/actions/eye-close.svg';
import Show from 'assets/actions/eye-show.svg';
import Warning from 'assets/actions/warning-1.svg';
import clsx from 'clsx';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
} from 'react-native';

import type { Country } from '@/configs/country';
import { ERROR_KEY } from '@/constants/error-key';
import { translate, type TxKeyPath } from '@/core/i18n';
import { AuthStepList } from '@/types/auth';
import { Button, View } from '@/ui';

import type { PhoneInputRef } from '../phone-input';
import PhoneInput from '../phone-input';

export type PhonePasswordFormType = {
  phone: string;
  password: string;
};

type Props = {
  phoneLabel: string;
  phonePlaceholder?: string;
  passwordLabel: string;
  passwordPlaceholder?: string;
  defaultForm: PhonePasswordFormType;
  defaultCountry: Country | null;
  allowEditPhone?: boolean;
  submitLabel?: string;
  containterClassName?: string;
  submitButtonClassName?: string;
  nextStep: (step: AuthStepList) => void;
  onSubmit: (data: PhonePasswordFormType, countrySelected: Country) => void;
};

// eslint-disable-next-line max-lines-per-function
function PhonePasswordForm({
  phoneLabel,
  phonePlaceholder,
  passwordLabel,
  passwordPlaceholder,
  defaultCountry,
  allowEditPhone,
  submitLabel,
  containterClassName,
  submitButtonClassName,
  defaultForm,
  nextStep,
  onSubmit,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhonePasswordFormType>({
    mode: 'onChange',
    defaultValues: defaultForm,
  });
  const phoneInputRef = React.useRef<PhoneInputRef>(null);

  // state
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}
    >
      <View
        className={clsx(
          'flex flex-1 flex-col justify-between',
          containterClassName
        )}
      >
        <View className="">
          <View className="mb-6">
            <PhoneInput
              ref={phoneInputRef}
              name="phone"
              control={control}
              phoneError={errors.phone}
              phoneLabel={phoneLabel}
              phonePlaceholder={phonePlaceholder}
              defaultCountry={defaultCountry}
              allowEditPhone={allowEditPhone}
            />
          </View>
          <View>
            <Text className="mb-2 text-base font-light">{passwordLabel}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  className={clsx(
                    'flex h-12 flex-row items-center justify-between rounded-lg border border-gray-ebe px-4',
                    {
                      'border-red-ff0': errors.password?.message,
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
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className=""
                    >
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
          <View className="text-end">
            <Pressable
              className="self-end py-4"
              onPress={() => nextStep(AuthStepList.ForgotPassword)}
            >
              <Text className="text-sm font-light">
                {translate('AUTH.FORGOT_PASSWORD')}
              </Text>
            </Pressable>
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
                await onSubmit(data, phoneInputRef.current?.selectedCountry!);
              } finally {
                setLoading(false);
              }
            })}
            textClassName="font-semibold"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PhonePasswordForm;
