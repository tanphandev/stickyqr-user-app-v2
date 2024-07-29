import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { LoginWithPassword, LoginWithPasswordDto } from './type';

type Variables = { phone: string; password: string };

export const useLogin = createMutation<LoginWithPassword, Variables>({
  mutationFn: async (variables) => {
    const body: LoginWithPasswordDto = {
      username: variables.phone,
      password: variables.password,
    };

    const response = await fetchApi(API_PATH.LOGIN, {
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
    return response.json();
  },
});
