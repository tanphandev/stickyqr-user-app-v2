import clsx from 'clsx';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ERROR_KEY } from '@/constants/error-key';
import { Button, View } from '@/ui';

import PhoneInput from '../phone-input';

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
        <PhoneInput
          name="phone"
          control={control}
          phoneError={errors.phone}
          phoneLabel={phoneLabel}
          phonePlaceholder={phonePlaceholder}
          errorApi={errorApi}
          clearErrorApi={setApiError}
        />
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
