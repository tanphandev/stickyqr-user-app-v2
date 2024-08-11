import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import type { SharedDataForm } from '@/api/auth/type';
import { useForgotPasswordVerify } from '@/api/auth/use-forgot-password-verify';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import { AuthStepList } from '@/types/auth';
import type { ConfirmPasswordForm as ConfirmPasswordFormType } from '@/ui/form/confirm-password-form';
import ConfirmPasswordForm from '@/ui/form/confirm-password-form';

type Props = {
  sharedDataForm: SharedDataForm | null;
  nextStep: (step: AuthStepList) => void;
};

function NewpasswordStep({ sharedDataForm, nextStep }: Props) {
  const { mutateAsync: forgotPasswordVerify } = useForgotPasswordVerify();

  const handleSubmitNewPassword = async (data: ConfirmPasswordFormType) => {
    try {
      const isSuccess = await forgotPasswordVerify({
        id: sharedDataForm?.id!,
        code: sharedDataForm?.code!,
        password: data.password,
      });
      if (isSuccess) {
        nextStep(AuthStepList.ForgotPasswordSuccess);
      }
    } catch (error: any) {
      if (error?.statusCode === 400) {
        Toast.show({
          type: 'error',
          text1: translate('ERROR_MESSAGE.CODE_INVALID'),
        });
      }
      logger('log', '[ApiService]-[forgotPasswordVerify]-[Error]', error);
    }
  };

  return (
    <View className="flex flex-1 flex-col justify-between px-8">
      <Text className="mb-6 mt-9 text-center text-xl font-semibold">
        {translate('AUTH.NEW_PASSWORD')}
      </Text>
      <ConfirmPasswordForm
        passwordLabel={translate('AUTH.PASSWORD')}
        passwordPlaceholder={translate('AUTH.ENTER_YOUR_PASSWORD')}
        confirmPasswordLabel={translate('AUTH.CONFIRM_PASSWORD')}
        confirmPasswordPlaceholder={translate('AUTH.ENTER_YOUR_PASSWORD')}
        submitLabel={translate('AUTH.NEXT')}
        defaultForm={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmitNewPassword}
        submitButtonClassName="mt-0 h-12 rounded-lg bg-primary"
      />
    </View>
  );
}

export default NewpasswordStep;
