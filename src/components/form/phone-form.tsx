import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as z from 'zod';

import type { Country } from '@/configs/country';
import { defaultCountry as dfCountry } from '@/configs/country';
import { ERROR_KEY } from '@/constants/error-key';
import { Button, View } from '@/ui';
import type { PhoneInputRef } from '@/ui/phone-input';
import PhoneInput from '@/ui/phone-input';

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
  defaultCountry: Country | null;
  containterClassName?: string;
  submitButtonCalssName?: string;
  secondaryButtonClassName?: string;
  allowEditPhone?: boolean;
  errorApi?: string;
  setApiError?: (error: string) => void;
  onSubmit: (data: PhoneFormSchemaType, selectedCountry: Country) => void;
  onScanQR?: () => void;
};

// eslint-disable-next-line max-lines-per-function
function PhoneForm({
  phoneLabel,
  phonePlaceholder,
  submitLabel,
  scanLabel,
  defaultForm,
  defaultCountry = dfCountry,
  containterClassName,
  submitButtonCalssName,
  secondaryButtonClassName,
  allowEditPhone = true,
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
    mode: 'onChange',
    defaultValues: defaultForm,
  });

  const phoneInputRef = React.useRef<PhoneInputRef>(null);

  // state
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className={clsx(
            'flex flex-1 flex-col justify-between',
            containterClassName
          )}
        >
          <View className="flex-1">
            <PhoneInput
              allowEditPhone={allowEditPhone}
              ref={phoneInputRef}
              name="phone"
              control={control}
              phoneError={errors.phone}
              phoneLabel={phoneLabel}
              phonePlaceholder={phonePlaceholder}
              defaultCountry={defaultCountry}
              errorApi={errorApi}
              clearErrorApi={setApiError}
            />
          </View>
          <View>
            <Button
              loading={loading}
              className={submitButtonCalssName}
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
            {onScanQR && (
              <Button
                className={secondaryButtonClassName}
                label={scanLabel}
                textClassName="text-black font-normal"
                onPress={onScanQR}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PhoneForm;
