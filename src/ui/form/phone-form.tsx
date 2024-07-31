import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import * as z from 'zod';

import { ERROR_KEY } from '@/constants/error-key';
import { translate, type TxKeyPath } from '@/core/i18n';
import { Button, View } from '@/ui';

const phoneFormSchema = z.object({
  phone: z.string().min(1, { message: ERROR_KEY.PHONE_REQUIRED }),
});

export type PhoneFormSchemaType = z.infer<typeof phoneFormSchema>;

type Props = {
  phoneLabel: string;
  phonePlaceholder?: string;
  submitLabel?: string;
  scanLabel?: string;
  defaultForm: PhoneFormSchemaType;
  containterClassName?: string;
  submitButtonCalssName?: string;
  secondaryButtonClassName?: string;
  errorApi?: string;
  setApiError?: (error: string) => void;
  onSubmit: SubmitHandler<PhoneFormSchemaType>;
  onScanQR: () => void;
};

// eslint-disable-next-line max-lines-per-function
function PhoneForm({
  phoneLabel,
  phonePlaceholder,
  submitLabel,
  scanLabel,
  defaultForm,
  containterClassName,
  submitButtonCalssName,
  secondaryButtonClassName,
  errorApi,
  setApiError,
  onSubmit,
  onScanQR,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PhoneFormSchemaType>({
    mode: 'all',
    resolver: zodResolver(phoneFormSchema),
    defaultValues: defaultForm,
  });

  return (
    <View
      className={clsx(
        'flex flex-1 flex-col justify-between',
        containterClassName
      )}
    >
      <View>
        <Text className="mb-4 text-base font-light">{phoneLabel}</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                setApiError?.('');
              }}
              className={clsx('h-12 rounded-lg border px-4', {
                'border-red-ff0': errors.phone?.message,
              })}
              placeholder={phonePlaceholder}
            />
          )}
          name="phone"
        />
        {(errorApi || errors.phone?.message) && (
          <Text className="error-message-form">
            {errorApi
              ? errorApi
              : translate(
                  `ERROR_MESSAGE.${errors.phone?.message}` as TxKeyPath
                )}
          </Text>
        )}
      </View>
      <View>
        <Button
          className={submitButtonCalssName}
          label={submitLabel}
          onPress={handleSubmit(onSubmit)}
          textClassName="font-normal"
        />
        <Button
          className={secondaryButtonClassName}
          label={scanLabel}
          textClassName="text-black font-normal"
          onPress={onScanQR}
        />
      </View>
    </View>
  );
}

export default PhoneForm;
