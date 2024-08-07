import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import { translate } from '@/core/i18n';
import type { CheckUserData } from '@/types/auth';
import { Button } from '@/ui';
import type { OTPFormData } from '@/ui/otp-input';
import OTPInput from '@/ui/otp-input';

type Props = {
  checkUserData: CheckUserData;
  nextStep: (step: any) => void;
};

// eslint-disable-next-line max-lines-per-function
function SetPasswordStep({ checkUserData, nextStep }: Props) {
  // form
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<OTPFormData>({
    mode: 'onSubmit',
    defaultValues: {
      otp: ['', '', '', '', '', ''],
    },
  });

  console.log('nextStep', nextStep);

  // handle submit
  const onSubmitOTP = (data: OTPFormData) => {
    const otp = data.otp.join('');
    const isEmpty = data.otp.every((value) => value === '');
    const hasEmptyField = data.otp.some((value) => value === '');

    if (isEmpty) {
      setError('otp', {
        type: 'manual',
        message: 'OTP is required',
      });
      return;
    } else if (hasEmptyField) {
      setError('otp', {
        type: 'manual',
        message: 'OTP is invalid',
      });
      return;
    }

    console.log('otp', otp);
  };

  console.log('errors', errors.otp);
  return (
    <View className="flex flex-1 flex-col justify-between px-8">
      <View>
        <Text className="mb-6 mt-9 text-center text-xl font-semibold">
          {translate('AUTH.VERIFICATION_CODE')}
        </Text>
        <Text className="text-center text-base leading-[24px]">
          {translate('AUTH.ENTER_THE_CODE_WE_SENT_OVER_SMS_TO')}
        </Text>
        <Text className="text-center text-base leading-[24px]">
          +{checkUserData?.phoneCode! + checkUserData?.phone!}
        </Text>
        <OTPInput
          control={control}
          value={getValues('otp')}
          setValue={setValue}
          clearErrors={clearErrors}
          setError={setError}
        />
        <View className="flex flex-row items-center justify-center gap-1">
          <Text>{translate("AUTH.DIDN'T_RECEIVE_A_CODE")}</Text>
          <Pressable>
            <Text className="text-blue-344 underline">
              {translate('AUTH.USE_ANOTHER_METHOD')}
            </Text>
          </Pressable>
        </View>
      </View>
      <Button
        onPress={handleSubmit(onSubmitOTP)}
        className="mb-10 mt-0 h-12 rounded-lg bg-primary"
        label={translate('AUTH.VERIFY')}
        textClassName="font-normal"
      />
    </View>
  );
}

export default SetPasswordStep;
