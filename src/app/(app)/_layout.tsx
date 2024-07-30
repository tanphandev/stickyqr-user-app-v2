/* eslint-disable react/no-unstable-nested-components */
import AccountFilled from 'assets/navigation/account-filled.svg';
import AccountRegular from 'assets/navigation/account-regular.svg';
import RewardsFilled from 'assets/navigation/gift-filled.svg';
import RewardsRegular from 'assets/navigation/gift-regular.svg';
import HomeIconFilled from 'assets/navigation/home-filled.svg';
import HomeIconRegular from 'assets/navigation/home-regular.svg';
import ScanQrFilled from 'assets/navigation/scan-qr-filled.svg';
import ScanQrRegular from 'assets/navigation/scan-qr-regular.svg';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth } from '@/core/auth';
import { useIsFirstTime } from '@/core/hooks';
import { translate } from '@/core/i18n/utils';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: translate('MAIN_TABS.HOME'),
          tabBarIcon: ({ focused }) =>
            focused ? <HomeIconFilled /> : <HomeIconRegular />,
        }}
      />

      <Tabs.Screen
        name="scan-qr"
        options={{
          title: translate('MAIN_TABS.SCAN_QR'),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <ScanQrFilled /> : <ScanQrRegular />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: translate('MAIN_TABS.REWARDS'),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <RewardsFilled /> : <RewardsRegular />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: translate('MAIN_TABS.ACCOUNT'),
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? <AccountFilled /> : <AccountRegular />,
        }}
      />
    </Tabs>
  );
}
