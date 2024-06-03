import React from 'react';

import type { Customizable } from '~/utils/types.js';
import { Flex } from './Flex.js';
import type { FlexProps } from './Flex.js';
import { Button } from './Button.js';

export type SwitchProps<T extends string> = Omit<FlexProps, 'onChange' | 'value' | 'items'> &
  Customizable<{
    value: T;
    items: { label: string; value: T }[];
    onChange?: (newValue: T) => void;
  }>;

export const Switch = <T extends string>(props: SwitchProps<T>, ref: React.Ref<HTMLDivElement>) => {
  const { value, items, onChange, ...flexProps } = props;

  return (
    <Flex ref={ref} {...flexProps}>
      {items.map((item, i) => (
        <Button
          key={item.value}
          label={item.label}
          variant={item.value === value ? 'filled' : 'outline'}
          colorVariant={item.value === value ? 'active' : 'white'}
          {...(i === 0 ? { roundedRight: 0 } : i === items.length - 1 ? { roundedLeft: 0 } : { rounded: 0 })}
          onClick={() => onChange?.(item.value)}
        />
      ))}
    </Flex>
  );
};
