import React from 'react';
import { Text } from 'react-native';

import { translate } from '@/core/i18n/utils';
import { FocusAwareStatusBar, View } from '@/ui';

export default function RewardsScreen() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <View className="flex-1 px-4 pt-16 ">
        <Text className="text-xl font-bold">
          {translate('REWARDS.REWARDS_SCREEN')}
        </Text>
      </View>
    </View>
  );
}
