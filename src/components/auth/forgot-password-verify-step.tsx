import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import type { SharedDataForm } from '@/api/auth/type';
import { useForogotPasswordIsValidCode } from '@/api/auth/use-forgot-password-is-valid-code';
import { useForgotPasswordResendCode } from '@/api/auth/use-forgot-password-resend-code';
import { ERROR_KEY } from '@/constants/error-key';
import useCountdown from '@/core/hooks/use-count-down';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import { AuthStepList } from '@/types/auth';
import { type CheckUserData } from '@/types/auth';
import { Button } from '@/ui';
import type { OTPFormData } from '@/ui/otp-input';
import OTPInput from '@/ui/otp-input';

import type { METHOD } from '../modal/get-code-by';

export type SendCodeType = {
  type: METHOD;
  value: string;
};

type Props = {
  checkUserData: CheckUserData;
  sharedDataForm: SharedDataForm;
  setSharedDataForm: React.Dispatch<
    React.SetStateAction<SharedDataForm | null>
  >;
  nextStep: (step: AuthStepList) => void;
};

// eslint-disable-next-line max-lines-per-function
function ForgotPasswordVerifyStep({
  checkUserData,
  sharedDataForm,
  setSharedDataForm,
  nextStep,
}: Props) {
  const { mutateAsync: forgotPasswordResendCode } =
    useForgotPasswordResendCode();
  const { mutateAsync: forgotPasswordIsValidCode } =
    useForogotPasswordIsValidCode();

  // state
  const [isVoice, setIsVoice] = useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  // form
  const { countdown, isDone, startCountdown } = useCountdown(0);

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

  // handle submit
  const onSubmitOTP = (data: OTPFormData) => {
    const otp = data.otp.join('');
    const isEmpty = data.otp.every((value) => value === '');
    const hasEmptyField = data.otp.some((value) => value === '');

    if (isEmpty) {
      setError('otp', {
        type: 'manual',
        message: ERROR_KEY.OTP_REQUIRED,
      });
      return;
    } else if (hasEmptyField) {
      Toast.show({
        type: 'error',
        text1: translate('ERROR_MESSAGE.THE_OTP_IS_INVALID_OR_EXPIRED'),
      });
      return;
    }
    verifyCode(otp);
  };

  const verifyCode = async (code: string) => {
    try {
      setLoading(true);
      const isSuccess: boolean = await forgotPasswordIsValidCode({
        phone: `+${checkUserData.phoneCode}${checkUserData.phone}`,
        verifyId: sharedDataForm.id!,
        code: code,
      });
      if (isSuccess) {
        setSharedDataForm((prev: any) => ({ ...prev, code: code }));
        nextStep(AuthStepList.NewPassword);
      }
    } catch (error: any) {
      if (error?.statusCode === 400) {
        Toast.show({
          type: 'error',
          text1: translate('ERROR_MESSAGE.THE_OTP_IS_INVALID_OR_EXPIRED'),
        });
      }
      logger('log', '[ApiService]-[ForgotPasswordIsValidCode]-[Error]', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAndResendCode = async () => {
    try {
      await resendCode(!isVoice);
      setIsVoice(!isVoice);
    } catch (error: any) {
      logger('log', '[ApiService]-[ResendCode]-[Error]', error);
    }
  };

  const resendCode = async (newIsVoice?: boolean) => {
    try {
      const { id } = await forgotPasswordResendCode({
        phone: `+${checkUserData.phoneCode}${checkUserData.phone}`,
        verifyId: sharedDataForm.id!,
        isVoice: newIsVoice ?? isVoice,
      });

      if (id) {
        setSharedDataForm((prev: any) => ({ ...prev, id: id }));
        startCountdown(30);
      }
    } catch (error: any) {
      logger('log', '[ApiService]-[ForgotPasswordResendCode]-[Error]', error);
    }
  };

  useEffect(() => {
    handleSubmit(onSubmitOTP)();
    startCountdown(30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <View className="flex flex-1 flex-col justify-between px-8">
          <View className="flex-1">
            <Text className="mb-6 mt-9 text-center text-xl font-semibold">
              {translate('AUTH.VERIFICATION_CODE')}
            </Text>
            <Text className="text-center text-base leading-[24px]">
              {translate('AUTH.ENTER_THE_CODE_SENT_TO_YOUR_DEVICE')}
            </Text>
            <OTPInput
              control={control}
              value={getValues('otp')}
              setValue={setValue}
              clearErrors={clearErrors}
              setError={setError}
              isValidateChange={true}
            />
            <View className="">
              <Text className="text-center">
                {isVoice
                  ? translate('AUTH.PLEASE_ENTER_THE_CODE_YOU_HEAR_ON_THE_CALL')
                  : translate(
                      'AUTH.PLEASE_ENTER_THE_CODE_TEXTED_TO_YOUR_PHONE',
                      {
                        haveEmail: checkUserData?.email
                          ? ' ' +
                            translate('AUTH.AND_EMAIL') +
                            ' ' +
                            checkUserData?.email
                          : '',
                      }
                    )}
                {'\u00A0'}
                <Text
                  className="text-blue-344 underline"
                  onPress={toggleAndResendCode}
                >
                  {translate('AUTH.TAP_HERE')}
                </Text>
              </Text>
            </View>
          </View>
          <View className="flex flex-row gap-4">
            <Button
              disabled={!isDone}
              onPress={() => resendCode()}
              variant="link"
              className="mt-0 h-12 flex-1 rounded-lg font-semibold disabled:bg-white"
              label={`${
                isVoice
                  ? translate('AUTH.CALL_AGAIN')
                  : translate('AUTH.TEXT_AGAIN')
              }${countdown > 0 ? ` (${countdown})` : ''}`}
              textClassName={clsx('font-semibold', {
                'text-gray-999': !isDone,
              })}
            />
            <Button
              loading={loading}
              disabled={!!errors.otp}
              onPress={handleSubmit(onSubmitOTP)}
              className="mt-0 h-12 flex-1 rounded-lg bg-primary disabled:bg-gray-ebe"
              label={translate('AUTH.VERIFY')}
              textClassName={clsx('font-semibold', {
                'text-white': !!errors.otp,
              })}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordVerifyStep;
