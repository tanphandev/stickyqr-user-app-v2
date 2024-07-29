import { useRouter } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, View } from '@/ui';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1 px-4 pt-16">
        {/* <Cover /> */}
        <Text className="text-xl font-bold">On Boarding Screen</Text>
      </View>
      <View className="justify-end ">
        <SafeAreaView className="mt-6">
          <Button
            label="Let's Get Started "
            onPress={() => {
              setIsFirstTime(false);
              router.replace('/login');
            }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
