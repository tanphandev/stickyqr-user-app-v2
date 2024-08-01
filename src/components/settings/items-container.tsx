import React from 'react';

import type { TxKeyPath } from '@/core';
import { Text, View } from '@/ui';

type Props = {
  children: React.ReactNode;
  title?: TxKeyPath;
  titleClassName?: string;
  containerClassName?: string;
  childrenClassName?: string;
};

export const ItemsContainer = ({
  children,
  title,
  titleClassName,
  containerClassName,
  childrenClassName,
}: Props) => {
  return (
    <View className={`${containerClassName}`}>
      {title && (
        <Text className={`pb-2 pt-4 text-lg ${titleClassName}`} tx={title} />
      )}
      {
        <View
          className={`rounded-md border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 ${childrenClassName}`}
        >
          {children}
        </View>
      }
    </View>
  );
};
