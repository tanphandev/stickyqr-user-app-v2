import { Platform } from 'react-native';

import { LANG } from '@/configs/lang';
import { getLanguage } from '@/core';
import { signOut } from '@/core/auth';
import type { TokenType } from '@/core/auth/utils';
import { getToken, setToken } from '@/core/auth/utils';
import { logger } from '@/helper';

import type { RefreshToken } from '../auth';
import { refreshToken } from '../auth/refresh-token';
import { USER_APP_PLATFORM } from './constant';

export async function fetchApi(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const lang = getLanguage();
  const os = Platform.OS;
  const platform = USER_APP_PLATFORM;

  if (typeof input === 'string') {
    const url = new URL(input);
    url.searchParams.append('lang', lang || LANG.EN);
    url.searchParams.append('platform', platform!);
    url.searchParams.append('os', os);
    input = url.toString();
  }

  init = {
    ...init,
    cache: 'no-store',
  };

  return fetch(input, init);
}

export async function authFetchApi(
  input: RequestInfo,
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
      console.log('token expired ===');
      try {
        const responseData: RefreshToken = await refreshToken(token.refresh);
        token.access = responseData.accessToken;
        const newToken: TokenType = {
          access: responseData.accessToken,
          refresh: responseData.refreshToken,
          expiresIn: responseData.expiresIn,
        };
        logger('log', '[ApiService]-[RefreshToken]-[Data]', responseData);
        console.log('newToken', newToken);
        setToken(newToken);
      } catch (error) {
        logger('log', '[ApiService]-[RefreshToken]-[Error]', error);
        signOut();
      }
    }
  }

  console.log('token.access', token.access);
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

export const isTokenExpired = (expiresIn: string) => {
  const exp = new Date(expiresIn)?.getTime();
  const now = Date.now();

  const diff = exp - now;
  console.log('diff', diff / 1000);
  return diff < 86370 * 1000;
};
