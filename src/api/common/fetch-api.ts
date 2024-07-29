import { Platform } from 'react-native';

import { LANG } from '@/configs/lang';
import { getLanguage } from '@/core';
import { getToken } from '@/core/auth/utils';

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

  console.log('AUTH FETCH');
  let token = getToken();
  console.log('token', token);

  if (typeof input === 'string') {
    const url = new URL(input);
    url.searchParams.append('lang', lang || LANG.EN);
    url.searchParams.append('platform', platform);
    url.searchParams.append('os', os);
    input = url.toString();
  }

  // verify token
  if (token.access && token.refresh && token.expiresIn) {
    // if (!isTokenNotExpired(token.expiresIn)) {
    //   try {
    //     const responseData: RefreshToken = await refreshToken(rfToken);
    //     storeAuthTokenFromClient(
    //       responseData.accessToken,
    //       responseData.refreshToken,
    //       responseData.expiresIn,
    //       true
    //     );
    //     acToken = responseData.accessToken;
    //   } catch (error) {
    //     removeAuthTokenFromClient();
    //     window.location.reload();
    //   }
    // }
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

export const isTokenNotExpired = (expiresIn: string) => {
  const exp = new Date(expiresIn)?.getTime();
  const now = Date.now();

  const diff = exp - now;
  return diff >= 60 * 1000;
};
