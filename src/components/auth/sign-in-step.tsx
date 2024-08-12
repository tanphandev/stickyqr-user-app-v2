import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { useGetProfile, useLogin } from '@/api/auth';
import type { LoginWithPassword } from '@/api/auth/type';
import type { PhonePasswordFormType } from '@/components/form/phone-password-form';
import PhonePasswordForm from '@/components/form/phone-password-form';
import type { Country } from '@/configs/country';
import PATH from '@/configs/navs';
import { useAuth } from '@/core/auth';
import { setToken } from '@/core/auth/utils';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import { findCountry } from '@/helper/country';
import type { CheckUserData } from '@/types/auth';

type Props = {
  checkUserData: CheckUserData;
  nextStep: (step: any) => void;
};

// eslint-disable-next-line max-lines-per-function
function SignInStep({ checkUserData, nextStep }: Props) {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: getProfile } = useGetProfile();
  const onSubmit = async (
    data: PhonePasswordFormType,
    countrySelected: Country
  ) => {
    const userPhone = '+' + countrySelected.phoneCode + data.phone;
    try {
      const loginData: LoginWithPassword = await login({
        phone: userPhone,
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
        router.push(PATH.HOME as Href);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
            defaultCountry={findCountry(
              checkUserData.isoCode,
              checkUserData.phoneCode
            )}
            allowEditPhone={false}
            submitLabel={translate('AUTH.NEXT')}
            containterClassName="px-8"
            submitButtonClassName="h-12 mt-0 rounded-lg bg-primary"
            onSubmit={onSubmit}
            nextStep={nextStep}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignInStep;
