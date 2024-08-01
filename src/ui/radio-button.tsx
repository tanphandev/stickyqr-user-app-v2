import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

type Props = {
  checked: boolean;
};

const RadioButton = ({ checked }: Props) => {
  return (
    <View
      className={clsx(
        'flex h-4 w-4 items-center justify-center rounded-full border-2 border-black',
        {
          'border-black': checked,
        }
      )}
    >
      {checked && <View className="h-2 w-2 rounded-full bg-black" />}
    </View>
  );
};

export default RadioButton;
