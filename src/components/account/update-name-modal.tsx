import * as React from 'react';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Button } from '@/ui';

type UpdateNameModalType = {
  initialValue: string;
  type: string;
  handleUpdateProfile: (type: string, value: string) => void;
};

export const UpdateNameModal = ({
  initialValue,
  type,
  handleUpdateProfile,
}: UpdateNameModalType) => {
  const [text, setText] = useState(initialValue);

  const onSave = () => {
    handleUpdateProfile(type, text);
  };

  return (
    <View className="flex items-center justify-center gap-6 p-4">
      <View className="w-full">
        <Text className="text-sm font-normal text-[#7D7D7D]">Your name</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-300 px-4 py-2 text-left'
          }
          placeholder="Enter your name"
        />
      </View>
      <Button
        className="rounded-8 h-[48px] w-full bg-[#FF4F0F] px-4 py-3 text-[16px] font-semibold leading-6"
        label="Save"
        onPress={onSave}
      />
    </View>
  );
};
