import * as React from 'react';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import type { Address } from '@/types/profile.type';
import { Button } from '@/ui';

type UpdateAddressModalType = {
  initialValue: Address;
  type: string;
  handleUpdateProfile: (type: string, value: Address) => void;
};

export const UpdateAddressModal = ({
  initialValue,
  type,
  handleUpdateProfile,
}: UpdateAddressModalType) => {
  const [street, setStreet] = useState(initialValue.street);
  const [city, setCity] = useState(initialValue.city);
  const [state, setState] = useState(initialValue.state);
  const [zipCode, setZipCode] = useState(initialValue.zipCode);

  const onSave = () => {
    handleUpdateProfile(type, {
      street,
      city,
      state,
      zipCode,
    });
  };

  return (
    <View className="flex items-center justify-center gap-6 p-4">
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">Street</Text>
        <TextInput
          value={street}
          onChangeText={setStreet}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'Street'}
        />
      </View>
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">City</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'City'}
        />
      </View>
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">State</Text>
        <TextInput
          value={state}
          onChangeText={setState}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'State'}
        />
      </View>
      <View className="w-full">
        <Text className="mb-2 text-sm font-normal text-black ">Zipcode</Text>
        <TextInput
          value={zipCode}
          onChangeText={setZipCode}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-400 px-4 py-2 text-left'
          }
          placeholder={'Zipcode'}
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
