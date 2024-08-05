// (app)/account/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" options={{ title: 'Account' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
    </Stack>
  );
}
