import React from 'react';
import { Text } from 'react-native';

import { translate } from '@/core';
import { FocusAwareStatusBar, View } from '@/ui';

export default function HomeScreen() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Text className="text-xl font-bold">{translate('HOME.HOME_SCREEN')}</Text>
    </View>
  );
}
