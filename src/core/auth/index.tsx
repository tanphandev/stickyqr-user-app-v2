import { create } from 'zustand';

import type { Profile } from '@/api/auth';
import { getProfile } from '@/api/auth/use-profile';
import { logger } from '@/helper';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

export enum AuthStatus {
  Idle = 'idle',
  SignIn = 'signIn',
  SignOut = 'signOut',
}

interface AuthState {
  userData: Profile | null;
  token: TokenType | null;
  status: AuthStatus;
  signIn: (data: TokenType, userData: Profile) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  userData: null,
  status: AuthStatus.Idle,
  token: null,
  signIn: (token, userData) => {
    setToken(token);
    set({ status: AuthStatus.SignIn, token: token, userData: userData });
  },
  signOut: () => {
    removeToken();
    set({ status: AuthStatus.SignOut, token: null, userData: null });
  },
  hydrate: async () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        const userData = await getProfile();
        if (userData) {
          get().signIn(userToken, userData);
        }
      } else {
        get().signOut();
      }
    } catch (err: any) {
      logger('log', '[ApiService]-[GetProfile]-[Error]', err);
      if (err?.statusCode === 401) {
        get().signOut();
      }
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType, userData: Profile) =>
  _useAuth.getState().signIn(token, userData);
export const hydrateAuth = () => _useAuth.getState().hydrate();
