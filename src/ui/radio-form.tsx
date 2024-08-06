import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import RadioButton from './radio-button';

type RadioFormProps = {
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  classNameRadioForm?: string;
  classNameRadioButton?: string;
  initialValue: string;
};

const RadioForm: React.FC<RadioFormProps> = ({
  options,
  onValueChange,
  classNameRadioButton,
  classNameRadioForm,
  initialValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handlePress = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View className={`my-[10px] flex flex-col ${classNameRadioForm}`}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={handlePress}
          className={classNameRadioButton}
        />
      ))}
    </View>
  );
};

export default RadioForm;
