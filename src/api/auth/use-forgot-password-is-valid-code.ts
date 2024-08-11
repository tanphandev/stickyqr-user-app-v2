import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { ForgotPasswordIsValidCodeDto } from './type';

type Variables = {
  phone: string;
  verifyId: string;
  code: string;
};

export const useForogotPasswordIsValidCode = createMutation<boolean, Variables>(
  {
    mutationFn: async (variables) => {
      const body: ForgotPasswordIsValidCodeDto = {
        identity: variables.phone,
        verifyId: variables.verifyId,
        code: variables.code,
      };
      console.log('forgotPasswordIsValidCode-body', body);
      const response = await fetchApi(API_PATH.FORGOT_PASSWORD_IS_VALID_CODE, {
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

      console.log('forgotPasswordIsValidCode-data', true);
      return true;
    },
  }
);
