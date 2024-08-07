import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { ListTimezones } from '@/core/configs/timezone.config';
import { Button } from '@/ui';
import RadioForm from '@/ui/radio-form';
type UpdateTimezoneModalType = {
  initialValue: string;
  type: string;
  handleUpdateProfile: (type: string, value: string) => void;
};

export const UpdateTimezoneModal = ({
  initialValue,
  type,
  handleUpdateProfile,
}: UpdateTimezoneModalType) => {
  const [text, setText] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState(initialValue);
  const [filteredTimezones, setFilteredTimezones] = useState(ListTimezones);

  useEffect(() => {
    // Filter timezones based on the search text
    setFilteredTimezones(
      ListTimezones.filter((tz) =>
        tz.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  }, [text]);

  const onSave = () => {
    handleUpdateProfile(type, selectedTimezone);
  };

  const handleValueChange = (value: string) => {
    setSelectedTimezone(value);
  };

  const timezoneOptions = filteredTimezones.map((tz) => ({
    label: tz.name,
    value: tz.utcCode,
  }));

  return (
    <View className="flex items-center justify-center gap-6 p-4">
      <View className="w-full">
        <TextInput
          value={text}
          onChangeText={setText}
          className={
            'h-[48px] w-full items-start rounded-[12px] border border-neutral-300 px-4 py-2 text-left'
          }
          placeholder="Search timezone"
        />
      </View>
      {timezoneOptions.length > 0 ? (
        <>
          <RadioForm
            options={timezoneOptions}
            onValueChange={handleValueChange}
            initialValue={selectedTimezone}
            classNameRadioForm="px-6 w-full"
          />
          <Button
            className="rounded-8 h-[48px] w-full bg-[#FF4F0F] px-4 py-3 text-[16px] font-semibold leading-6"
            label="Save"
            onPress={onSave}
          />
        </>
      ) : (
        <Text>No timezones found</Text>
      )}
    </View>
  );
};
