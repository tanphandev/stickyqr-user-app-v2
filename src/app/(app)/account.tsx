import React from 'react';
import { ScrollView, Text } from 'react-native';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { translate, useAuth } from '@/core';
import { FocusAwareStatusBar, View } from '@/ui';

export default function AccountScreen() {
  const signOut = useAuth.use.signOut();
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16">
          <Text className="text-xl font-bold">
            {translate('ACCOUNT.ACCOUNT')}
          </Text>
          <ItemsContainer title="SETTING.LANGUAGE">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>
          <View className="my-8">
            <ItemsContainer>
              <Item text="AUTH.SIGN_OUT" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
