import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { SetPassword, SetPasswordDto } from './type';

type Variables = { code: string };

export const useSendCode = createMutation<SetPassword, Variables>({
  mutationFn: async (variables) => {
    const body: SetPasswordDto = {
      code: variables.code,
    };
    const response = await fetchApi(API_PATH.SET_USER_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new CustomError(errorData?.message, response?.status);
    }
    const data: SetPassword = await response.json();
    return data;
  },
});
