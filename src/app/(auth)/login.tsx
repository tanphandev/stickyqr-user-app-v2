import { useRouter } from 'expo-router';
import React from 'react';

import { useLogin } from '@/api/auth';
import type { LoginWithPassword } from '@/api/auth/type';
import { useGetProfile } from '@/api/auth/use-profile';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import PATH from '@/configs/navs';
import { useAuth } from '@/core/auth';
import { setToken } from '@/core/auth/utils';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { logger } from '@/helper';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: getProfile } = useGetProfile();

  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
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
      logger('log', '[LoginSubmit]-[Error]', error);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
