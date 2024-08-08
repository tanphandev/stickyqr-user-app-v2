import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { SetPasswordVerify, SetPasswordVerifyDto } from './type';

type Variables = {
  phone: string;
  verifyId: string;
  code: string;
  password: string;
};

export const useSetPasswordVerify = createMutation<
  SetPasswordVerify,
  Variables
>({
  mutationFn: async (payload) => {
    const body: SetPasswordVerifyDto = {
      username: payload.phone,
      verifyId: payload.verifyId,
      code: payload.code,
      password: payload.password,
    };

    const response = await fetchApi(API_PATH.SET_USER_PASSWORD_VERIFY, {
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
    const data: SetPasswordVerify = await response.json();
    return data;
  },
});
