import { Env } from '@/core/env';

const BASE_API = Env.API_URL;
export const API_PATH = {
  CHECK_PHONE: BASE_API + '/auth/check',
  LOGIN: BASE_API + '/auth/login',
  SET_USER_PASSWORD: BASE_API + '/auth/set-userpass',
  SET_USER_PASSWORD_IS_VALID_CODE:
    BASE_API + '/auth/set-userpass/is-valid-code',
  SET_USER_PASSWORD_RESEND: BASE_API + '/auth/set-userpass/ressend',
  SET_USER_PASSWORD_VERIFY: BASE_API + '/auth/set-userpass/verify',
  FORGOT_PASSWORD: BASE_API + '/auth/forgot-password',
  PROFILE: BASE_API + '/users/profile',
  REFRESH_TOKEN: BASE_API + '/auth/token',
};
