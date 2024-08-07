import { Env } from '@/core/env';

const BASE_API = Env.API_URL;
export const API_PATH = {
  CHECK_PHONE: BASE_API + '/auth/check',
  LOGIN: BASE_API + '/auth/login',
  SET_USER_PASSWORD_IS_VALID_CODE:
    BASE_API + '/auth/set-userpass/is-valid-code',
  PROFILE: BASE_API + '/users/profile',
  REFRESH_TOKEN: BASE_API + '/auth/token',
};
