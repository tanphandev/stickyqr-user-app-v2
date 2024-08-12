import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { fetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { ForgotPasswordResend, ForgotPasswordResendDto } from './type';

type Variables = {
  phone: string;
  verifyId: string;
  isVoice: boolean;
};

export const useForgotPasswordResendCode = createMutation<
  ForgotPasswordResend,
  Variables
>({
  mutationFn: async (variables) => {
    const body: ForgotPasswordResendDto = {
      identity: variables.phone,
      verifyId: variables.verifyId,
      isVoice: variables.isVoice,
    };
    console.log('resendCode-body', body);
    const response = await fetchApi(API_PATH.FORGOT_PASSWORD_RESEND, {
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

    const data: ForgotPasswordResend = await response.json();
    console.log('resendCode-data', data);
    return data;
  },
});
