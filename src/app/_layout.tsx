import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { APIProvider } from '@/api/common';

export { ErrorBoundary } from 'expo-router';

// Import  global CSS file
import '../../global.css';

import React from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import PATH from '@/configs/navs';
import toastConfig from '@/configs/toast';
import { hydrateAuth } from '@/core/auth';
import { loadSelectedTheme } from '@/core/hooks';
import { useThemeConfig } from '@/core/hooks/use-theme-config';

export const unstable_settings = {
  initialRouteName: '(app)',
};

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name={'(auth)' + PATH.ONBOARDING}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'(auth)' + PATH.GET_STARTED}
          options={{ headerShown: false }}
        />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <ThemeProvider value={theme}>
        <APIProvider>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <SafeAreaView
              className="bg-red-500"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                backgroundColor: 'white',
              }}
              edges={['top', 'left', 'right']}
            >
              <BottomSheetModalProvider>
                {children}
                <FlashMessage position="top" />
                <Toast config={toastConfig} />
              </BottomSheetModalProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </APIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
