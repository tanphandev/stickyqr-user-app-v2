import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { SetPasswordIsValidDto } from './type';

type Variables = { identity: string; verifyId: string; code: string };

export const useSetPasswordIsValidCode = createMutation<boolean, Variables>({
  mutationFn: async (variables) => {
    const body: SetPasswordIsValidDto = {
      identity: variables.identity,
      verifyId: variables.verifyId,
      code: variables.code,
    };

    const response = await fetchApi(API_PATH.SET_USER_PASSWORD_IS_VALID_CODE, {
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
    return true;
  },
});
