import React, { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import type { SetPasswordResendDto, SharedDataForm } from '@/api/auth/type';
import { useSetPasswordIsValidCode } from '@/api/auth/use-set-password-is-valid-code';
import { useSetPasswordResendCode } from '@/api/auth/use-set-password-resend-code';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import { AuthStepList, type CheckUserData } from '@/types/auth';
import { Button } from '@/ui';
import type { OTPFormData } from '@/ui/otp-input';
import OTPInput from '@/ui/otp-input';

import type { GetCodeByBottomSheetRefType } from '../modal/get-code-by';
import { METHOD } from '../modal/get-code-by';
import GetCodeByBottomSheet from '../modal/get-code-by';

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
  const { mutateAsync: setPasswordIsValid } = useSetPasswordIsValidCode();
  const { mutateAsync: setPasswordResendCode } = useSetPasswordResendCode();

  // ref
  const getByCoderef = useRef<GetCodeByBottomSheetRefType>(null);

  // state
  const [sendCodeSharedData, setSendCodeSharedData] = useState<SendCodeType>({
    type: METHOD.phoneText,
    value: `+${checkUserData?.phoneCode!}${checkUserData?.phone!}`,
  });

  console.log('sendCodeSharedData', sendCodeSharedData);
  const [loading, setLoading] = React.useState<boolean>(false);

  // form
  const { handleSubmit, control, setValue, getValues, setError, clearErrors } =
    useForm<OTPFormData>({
      mode: 'onSubmit',
      defaultValues: {
        otp: ['', '', '', '', '', ''],
      },
    });

  // handle submit
  const onSubmitOTP = (data: OTPFormData) => {
    const otp = data.otp.join('');
    const hasInvalidField = data.otp.some((value) => value === '');

    if (hasInvalidField) {
      Toast.show({
        type: 'error',
        text1: translate('ERROR_MESSAGE.THE_OTP_IS_INVALID_OR_EXPIRED'),
      });
      return;
    }
    verifyCode(otp);
  };

  // verify code
  const verifyCode = async (code: string) => {
    try {
      setLoading(true);
      const isSuccess = await setPasswordIsValid({
        identity: `+${checkUserData?.phoneCode!}${checkUserData?.phone!}`,
        verifyId: sharedDataForm.id!,
        code: code,
      });
      if (isSuccess) {
        setSharedDataForm((prevData: any) => ({
          ...prevData,
          code,
        }));
        nextStep(AuthStepList.SetPassword);
      }
    } catch (error: any) {
      logger('log', '[ApiService]-[SetPasswordIsValid]-[Error]', error);
      Toast.show({
        type: 'error',
        text1: translate('ERROR_MESSAGE.THE_OTP_IS_INVALID_OR_EXPIRED'),
      });
    } finally {
      setLoading(false);
    }
  };

  //  use another method to get code
  const getCode = async (method: METHOD, value: string) => {
    try {
      const payload: SetPasswordResendDto = {
        phone: `+${checkUserData?.phoneCode!}${checkUserData?.phone!}`,
        verifyId: sharedDataForm?.id!,
      };

      if (method === METHOD.phoneCall) {
        payload.isVoice = true;
      } else if (method === METHOD.email) {
        payload.isVoice = false;
        payload.method = METHOD.email;
        payload.mValue = value;
      }
      const data = await setPasswordResendCode(payload);
      setSharedDataForm((prevData) => ({
        ...prevData,
        id: data.id,
      }));
      setSendCodeSharedData({
        type: method,
        value:
          method === METHOD.email
            ? value
            : `+${checkUserData?.phoneCode!}${checkUserData?.phone!}`,
      });
    } catch (error: any) {
      if (error?.statusCode === 406) {
        Toast.show({
          type: 'error',
          text1: error?.message,
        });
      } else {
        logger('log', '[ApiService]-[setPasswordResendCode]-[Error]', error);
      }
    }
  };

  return (
    <Fragment>
      <View className="flex flex-1 flex-col justify-between px-8">
        <View>
          <Text className="mb-6 mt-9 text-center text-xl font-semibold">
            {translate('AUTH.VERIFICATION_CODE')}
          </Text>
          <Text className="text-center text-base leading-[24px]">
            {translate('AUTH.ENTER_THE_CODE_WE_SENT_OVER_SMS_TO')}
          </Text>
          <OTPInput
            control={control}
            value={getValues('otp')}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
          <View className="container flex max-w-[300px] flex-row flex-wrap items-center justify-center gap-1 self-center">
            <Text>{translate("AUTH.DIDN'T_RECEIVE_A_CODE")}</Text>
            <Pressable
              onPress={() => {
                getByCoderef.current?.present();
              }}
            >
              <Text className="text-blue-344 underline">
                {translate('AUTH.USE_ANOTHER_METHOD')}
              </Text>
            </Pressable>
          </View>
        </View>
        <Button
          loading={loading}
          onPress={handleSubmit(onSubmitOTP)}
          className="mb-10 mt-0 h-12 rounded-lg bg-primary"
          label={translate('AUTH.VERIFY')}
          textClassName="font-normal"
        />
      </View>
      <GetCodeByBottomSheet ref={getByCoderef} onSubmit={getCode} />
    </Fragment>
  );
}

export default ForgotPasswordVerifyStep;
