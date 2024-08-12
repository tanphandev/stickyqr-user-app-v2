import { createMutation } from 'react-query-kit';

import { CustomError } from '@/types/common.type';

import { authFetchApi } from '../common/fetch-api';
import { API_PATH } from './path';
import type { Profile } from './type';

export const getProfile = async () => {
  const response = await authFetchApi(API_PATH.PROFILE);
  if (!response.ok) {
    const errorData = await response.json();
    throw new CustomError(errorData?.message, response?.status);
  }
  return response.json();
};

export const useGetProfile = createMutation<Profile>({
  mutationFn: getProfile,
});
