/* eslint-disable react/react-in-jsx-scope */
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useGetProfile } from '@/api/auth';
import type { SetPasswordVerify, SharedDataForm } from '@/api/auth/type';
import { useSetPasswordVerify } from '@/api/auth/use-set-password-verify';
import type { ConfirmPasswordForm as ConfirmPasswordFormType } from '@/components/form/confirm-password-form';
import ConfirmPasswordForm from '@/components/form/confirm-password-form';
import PATH from '@/configs/navs';
import { signIn } from '@/core/auth';
import { setToken } from '@/core/auth/utils';
import { translate } from '@/core/i18n';
import { logger } from '@/helper';
import type { CheckUserData } from '@/types/auth';

type Props = {
  checkUserData: CheckUserData | null;
  sharedDataForm: SharedDataForm | null;
};

function SetPasswordStep({ checkUserData, sharedDataForm }: Props) {
  const router = useRouter();

  const { mutateAsync: verifyPassword } = useSetPasswordVerify();
  const { mutateAsync: getProfile } = useGetProfile();

  // verify password
  const handleSubmitVerifyPassword = async (data: ConfirmPasswordFormType) => {
    try {
      const phone = `+${checkUserData?.phoneCode}${checkUserData?.phone}`;
      const resData: SetPasswordVerify = await verifyPassword({
        phone: phone,
        verifyId: sharedDataForm?.id!,
        code: sharedDataForm?.code!,
        password: data.password,
      });
      if (resData) {
        const token = {
          access: resData.accessToken,
          refresh: resData.refreshToken,
          expiresIn: resData.expiresIn,
        };
        setToken(token);
        // get profile
        const userData = await getProfile();
        // sign in
        signIn(token, userData);
        router.push(PATH.HOME as Href);
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: translate('ERROR_MESSAGE.CODE_INVALID'),
      });
      logger('log', '[SetPasswordVerify]-[Error]', error);
    }
  };

  return (
    <View className="flex flex-1 flex-col justify-between px-8">
      <Text className="mb-6 mt-9 text-center text-xl font-semibold">
        {translate('AUTH.SET_PASSWORD')}
      </Text>
      <ConfirmPasswordForm
        passwordLabel={translate('AUTH.PASSWORD')}
        passwordPlaceholder={translate('AUTH.PASSWORD')}
        confirmPasswordLabel={translate('AUTH.CONFIRM_PASSWORD')}
        confirmPasswordPlaceholder={translate('AUTH.CONFIRM_PASSWORD')}
        submitLabel={translate('AUTH.NEXT')}
        defaultForm={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmitVerifyPassword}
        submitButtonClassName="mt-0 h-12 rounded-lg bg-primary"
      />
    </View>
  );
}

export default SetPasswordStep;
