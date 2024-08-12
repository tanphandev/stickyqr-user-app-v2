import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { SetPasswordResend, SetPasswordResendDto } from './type';

type Variables = SetPasswordResendDto;

export const useSetPasswordResendCode = createMutation<
  SetPasswordResend,
  Variables
>({
  mutationFn: async (variables) => {
    const response = await fetchApi(API_PATH.SET_USER_PASSWORD_RESEND, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new CustomError(error?.message, error?.statusCode);
    }

    const data: SetPasswordResend = await response.json();
    return data;
  },
});
