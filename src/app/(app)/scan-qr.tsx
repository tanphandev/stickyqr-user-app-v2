import React from 'react';
import { Text, View } from 'react-native';

import { translate } from '@/core/i18n/utils';
import { FocusAwareStatusBar } from '@/ui';

export default function ScanQrScreen() {
  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <View className="flex-1 px-4">
        <Text className="text-xl font-bold">
          {translate('SCAN_QR.SCAN_QR_SCREEN')}
        </Text>
      </View>
    </View>
  );
}
