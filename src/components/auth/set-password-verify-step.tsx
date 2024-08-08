import React, { Fragment, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import type { SharedDataForm } from '@/api/auth/type';
import { useSetPasswordIsValidCode } from '@/api/auth/use-set-password-is-valid-code';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import { AuthStepList, type CheckUserData } from '@/types/auth';
import { Button } from '@/ui';
import type { OTPFormData } from '@/ui/otp-input';
import OTPInput from '@/ui/otp-input';

import type { GetCodeByBottomSheetRefType } from '../modal/get-code-by';
import GetCodeByBottomSheet from '../modal/get-code-by';

type Props = {
  checkUserData: CheckUserData;
  sharedDataForm: SharedDataForm;
  setSharedDataForm: React.Dispatch<
    React.SetStateAction<SharedDataForm | null>
  >;
  nextStep: (step: AuthStepList) => void;
};

// eslint-disable-next-line max-lines-per-function
function SetPasswordVerifyStep({
  checkUserData,
  sharedDataForm,
  setSharedDataForm,
  nextStep,
}: Props) {
  console.log('sharedDataForm', sharedDataForm);
  const { mutateAsync: setPasswordIsValid } = useSetPasswordIsValidCode();

  // ref
  const getByCoderef = useRef<GetCodeByBottomSheetRefType>(null);

  // state
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
      <GetCodeByBottomSheet ref={getByCoderef} />
    </Fragment>
  );
}

export default SetPasswordVerifyStep;
