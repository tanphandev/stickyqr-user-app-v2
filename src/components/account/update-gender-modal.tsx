import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/ui';
import RadioForm from '@/ui/radio-form';

type UpdateGenderModalType = {
  initialValue: string;
  type: string;
  handleUpdateProfile: (type: string, value: string) => void;
};

export const UpdateGenderModal = ({
  initialValue,
  type,
  handleUpdateProfile,
}: UpdateGenderModalType) => {
  const [newGender, setNewGender] = useState(initialValue);
  const onSave = () => {
    handleUpdateProfile(type, newGender);
  };

  const handleValueChange = (value: string) => {
    setNewGender(value);
  };

  return (
    <View className="flex items-center justify-center gap-6 px-4">
      <View className="w-full">
        <RadioForm
          options={[
            { label: 'Male', value: 'm' },
            { label: 'Female', value: 'f' },
            { label: 'Other', value: 'o' },
          ]}
          onValueChange={handleValueChange}
          classNameRadioForm="mb-3"
          initialValue={initialValue}
        />
        <Button
          className="rounded-8 h-[48px] w-full bg-[#FF4F0F] px-4 py-3 text-[16px] font-semibold leading-6"
          label="Save"
          onPress={onSave}
        />
      </View>
    </View>
  );
};
