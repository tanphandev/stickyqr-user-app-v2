import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useGetProfile, useLogin } from '@/api/auth';
import type { LoginWithPassword } from '@/api/auth/type';
import PATH from '@/configs/navs';
import { useAuth } from '@/core/auth';
import { setToken } from '@/core/auth/utils';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import type { CheckUserData } from '@/types/auth';
import type { PhonePasswordFormSchemaType } from '@/ui/form/phone-password-form';
import PhonePasswordForm from '@/ui/form/phone-password-form';

type Props = {
  checkUserData: CheckUserData;
  nextStep: (step: any) => void;
};

function SignInStep({ checkUserData, nextStep }: Props) {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: getProfile } = useGetProfile();
  const onSubmit = async (data: PhonePasswordFormSchemaType) => {
    try {
      const loginData: LoginWithPassword = await login({
        phone: data.phone,
        password: data.password,
      });

      if (loginData) {
        const token = {
          access: loginData.accessToken,
          refresh: loginData.refreshToken,
          expiresIn: loginData.expiresIn,
        };
        setToken(token);
        // get profile
        const userData = await getProfile();
        // sign in
        signIn(token, userData);
        router.push(PATH.HOME);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: translate('ERROR_MESSAGE.PHONE_OR_PASSWORD_INVALID'),
      });
      logger('log', '[LoginSubmit]-[Error]', error);
    }
  };
  return (
    <View className="flex flex-1 flex-col">
      <Text className="mb-6 mt-9 text-center text-xl font-semibold">
        {translate('AUTH.SIGN_IN')}
      </Text>
      <PhonePasswordForm
        defaultForm={{
          phone: checkUserData.phone ?? '',
          password: '',
        }}
        phoneLabel={translate('AUTH.PHONE_NUMBER')}
        phonePlaceholder={translate('AUTH.PHONE_NUMBER')}
        passwordLabel={translate('AUTH.PASSWORD')}
        passwordPlaceholder={translate('AUTH.PASSWORD')}
        submitLabel={translate('AUTH.NEXT')}
        containterClassName="px-8"
        submitButtonClassName="h-12 mt-0 mb-10 rounded-lg bg-primary"
        onSubmit={onSubmit}
        nextStep={nextStep}
      />
    </View>
  );
}

export default SignInStep;
