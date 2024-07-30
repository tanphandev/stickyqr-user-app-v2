import { Platform } from 'react-native';

import { LANG } from '@/configs/lang';
import type { TokenType } from '@/core/auth/utils';
import { getToken, setToken } from '@/core/auth/utils';
import { getLanguage } from '@/core/i18n';
import { logger } from '@/helper';
import { isTokenExpired } from '@/helper/auth';

import { refreshToken } from '../auth/refresh-token';
import type { RefreshToken } from '../auth/type';
import { USER_APP_PLATFORM } from './constant';

export async function fetchVerifyToken(
  input: RequestInfo,
  signOutCallBack: () => void,
  init?: RequestInit
): Promise<Response> {
  const lang = getLanguage();
  const os = Platform.OS;
  const platform = USER_APP_PLATFORM;
  const token = getToken();

  if (typeof input === 'string') {
    const url = new URL(input);
    url.searchParams.append('lang', lang || LANG.EN);
    url.searchParams.append('platform', platform);
    url.searchParams.append('os', os);
    input = url.toString();
  }

  // verify token
  if (token.access && token.refresh && token.expiresIn) {
    if (isTokenExpired(token.expiresIn)) {
      try {
        const responseData: RefreshToken = await refreshToken(token.refresh);
        token.access = responseData.accessToken;
        const newToken: TokenType = {
          access: responseData.accessToken,
          refresh: responseData.refreshToken,
          expiresIn: responseData.expiresIn,
        };
        logger('log', '[ApiService]-[RefreshToken]-[Data]', responseData);
        setToken(newToken);
      } catch (error) {
        logger('log', '[ApiService]-[RefreshToken]-[Error]', error);
        signOutCallBack();
      }
    }
  }

  if (token.access) {
    init = {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${token.access}`,
      },
      cache: 'no-store',
    };
  }

  return fetch(input, init);
}
