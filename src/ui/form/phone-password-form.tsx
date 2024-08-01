import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput } from 'react-native';
import * as z from 'zod';

import { ERROR_KEY } from '@/constants/error-key';
import { translate, type TxKeyPath } from '@/core/i18n';
import { AuthStepList } from '@/types/auth';
import { Button, View } from '@/ui';

const phonePasswordFormSchema = z.object({
  phone: z.string().min(1, { message: ERROR_KEY.PHONE_REQUIRED }),
  password: z.string().min(1, { message: ERROR_KEY.PASSWORD_REQUIRED }),
});

export type PhonePasswordFormSchemaType = z.infer<
  typeof phonePasswordFormSchema
>;

type Props = {
  phoneLabel: string;
  phonePlaceholder?: string;
  passwordLabel: string;
  passwordPlaceholder?: string;
  submitLabel?: string;
  containterClassName?: string;
  submitButtonClassName?: string;
  defaultForm: PhonePasswordFormSchemaType;
  nextStep: (step: AuthStepList) => void;
  onSubmit: SubmitHandler<PhonePasswordFormSchemaType>;
};

// eslint-disable-next-line max-lines-per-function
function PhoneForm({
  phoneLabel,
  phonePlaceholder,
  passwordLabel,
  passwordPlaceholder,
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
  } = useForm<PhonePasswordFormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(phonePasswordFormSchema),
    defaultValues: defaultForm,
  });

  return (
    <View
      className={clsx(
        'flex flex-1 flex-col justify-between',
        containterClassName
      )}
    >
      <View className="">
        <View className="mb-6">
          <Text className="mb-2 text-base font-light">{phoneLabel}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                className={clsx('h-12 rounded-lg border border-gray-ebe px-4', {
                  'border-red-ff0': errors.phone?.message,
                })}
                placeholder={phonePlaceholder}
              />
            )}
            name="phone"
          />
          {errors.phone?.message && (
            <Text className="error-message">
              {translate(`ERROR_MESSAGE.${errors.phone?.message}` as TxKeyPath)}
            </Text>
          )}
        </View>
        <View>
          <Text className="mb-2 text-base font-light">{passwordLabel}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                className={clsx('h-12 rounded-lg border border-gray-ebe px-4', {
                  'border-red-ff0': errors.password?.message,
                })}
                placeholder={passwordPlaceholder}
              />
            )}
            name="password"
          />
          {errors.password?.message && (
            <Text className="error-message">
              {translate(
                `ERROR_MESSAGE.${errors.password?.message}` as TxKeyPath
              )}
            </Text>
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
          className={submitButtonClassName}
          label={submitLabel}
          onPress={handleSubmit(onSubmit)}
          textClassName="font-normal"
        />
      </View>
    </View>
  );
}

export default PhoneForm;
