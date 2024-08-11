import React from 'react';
import { Text } from 'react-native';

import { translate } from '@/core/i18n/utils';
import { View } from '@/ui';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-red-200">
      <Text className="text-xl font-bold">{translate('HOME.HOME_SCREEN')}</Text>
    </View>
  );
}
