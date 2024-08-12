import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { ForgotPassword, ForgotPasswordDto } from './type';

type Variables = {
  phone: string;
};

export const useForgotPassword = createMutation<ForgotPassword, Variables>({
  mutationFn: async (variables) => {
    const body: ForgotPasswordDto = {
      code: variables.phone,
    };

    const response = await fetchApi(API_PATH.FORGOT_PASSWORD, {
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

    const data: ForgotPassword = await response.json();
    console.log('data', data);
    return data;
  },
});
