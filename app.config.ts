/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: Env.NAME,
  owner: ClientEnv.EAS_PROJECT_OWNER,
  scheme: Env.SCHEME,
  slug: ClientEnv.EAS_PROJECT_SLUG,
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: Env.PACKAGE,
  },
  plugins: [
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
        },
      },
    ],
    [
      'app-icon-badge',
      {
        enabled: Env.APP_ENV !== 'production',
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: ClientEnv.EAS_PROJECT_ID,
    },
  },
});
