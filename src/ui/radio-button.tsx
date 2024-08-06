import React from 'react';
import { Pressable, Text, View } from 'react-native';

type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  className?: string;
  onPress: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  selected,
  className,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(value)}
      className={`my-3 flex flex-row items-center justify-between ${className}`}
    >
      <Text className="text-base">{label}</Text>
      <View
        className={`h-6 w-6 items-center justify-center rounded-full border border-[#000] p-2 `}
      >
        {selected && <View className="h-4 w-4 rounded-full bg-[#000]" />}
      </View>
    </Pressable>
  );
};

export default RadioButton;
