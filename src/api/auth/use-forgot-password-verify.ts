import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { ForgotPasswordVerifyDto } from './type';

type Variables = {
  id: string;
  code: string;
  password: string;
};

export const useForgotPasswordVerify = createMutation<boolean, Variables>({
  mutationFn: async (variables) => {
    const body: ForgotPasswordVerifyDto = {
      id: variables.id,
      code: variables.code,
      password: variables.password,
    };
    const response = await fetchApi(API_PATH.FORGOT_PASSWORD_VERIFY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new CustomError(error?.message, error?.statusCode);
    }
    return true;
  },
});
