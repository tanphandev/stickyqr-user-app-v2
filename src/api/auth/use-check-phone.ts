import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { CheckUser, CheckUserDto } from './type';

type Variables = { phone: string };

export const useCheckPhone = createMutation<CheckUser, Variables>({
  mutationFn: async (variables) => {
    const body: CheckUserDto = {
      code: variables.phone,
    };

    const response = await fetchApi(API_PATH.CHECK_PHONE, {
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
