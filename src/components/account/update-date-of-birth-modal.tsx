import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/ui';

type UpdateDateOfBirthModalType = {
  initialValue: string;
  type: string;
  handleUpdateProfile: (type: string, value: string) => void;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export const UpdateDateOfBirthModal = ({
  initialValue,
  type,
  handleUpdateProfile,
}: UpdateDateOfBirthModalType) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    initialValue.split('-')[0]
  );
  const [selectedDay, setSelectedDay] = useState<string>(
    initialValue.split('-')[1]
  );

  const onSave = () => {
    const newDateOfBirth = `${selectedMonth}-${selectedDay}`;
    handleUpdateProfile(type, newDateOfBirth);
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="mb-5 flex w-full flex-row justify-between">
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {days.map((day, index) => (
            <Picker.Item key={index} label={day} value={day} />
          ))}
        </Picker>
      </View>
      <Button
        className="rounded-8 h-[48px] w-full bg-[#FF4F0F] px-4 py-3 text-[16px] font-semibold leading-6"
        label="Save"
        onPress={onSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});
