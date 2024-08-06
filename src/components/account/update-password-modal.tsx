import * as React from 'react';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Button } from '@/ui';

type UpdatePasswordModalType = {
  type: string;
  handleUpdateProfile: (currentPassword: string, newPassword: string) => void;
};

export const UpdatePasswordModal = ({
  handleUpdateProfile,
}: UpdatePasswordModalType) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSave = () => {
    handleUpdateProfile(currentPassword, newPassword);
  };

  return (
    <View className="flex items-center justify-center gap-6 p-4">
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">
          Current Password
        </Text>
        <TextInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'Current Password'}
        />
      </View>
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">
          New Password
        </Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'New Password'}
        />
      </View>
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">
          Confirm Password
        </Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'Confirm Password'}
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
