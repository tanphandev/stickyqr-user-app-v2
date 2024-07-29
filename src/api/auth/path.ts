import { Env } from '@/core/env';

// ================================= API PATH ================================= //
export const BASE_API = Env.API_URL;
export const API_PATH = {
  CHECK_PHONE: BASE_API + '/auth/check',
  LOGIN: BASE_API + '/auth/login',
  PROFILE: BASE_API + '/users/profile',
};
