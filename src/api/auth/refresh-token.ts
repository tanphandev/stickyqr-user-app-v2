import { CustomError } from '@/types/common.type';

import { API_PATH } from './path';
import type { RefreshToken, RefreshTokenDto } from './type';

export const refreshToken = async (rfToken: string): Promise<RefreshToken> => {
  const body: RefreshTokenDto = {
    token: rfToken,
  };
  const response = await fetch(API_PATH.REFRESH_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new CustomError(error?.message, error.statusCode);
  }
  const data: RefreshToken = await response.json();
  return data;
};
