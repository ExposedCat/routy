'use client';

import * as React from 'react';
import { Circle } from 'lucide-react';
import { radioGroup } from '@styled-system/recipes/radio-group.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(radioGroup);

const Indicator = withContext(RadioGroupPrimitive.Indicator, 'indicator');
const Icon = withContext(Circle, 'icon');

const Item = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ children: _children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item ref={ref} {...props}>
      <Indicator>
        <Icon />
      </Indicator>
    </RadioGroupPrimitive.Item>
  );
});
Item.displayName = RadioGroupPrimitive.Item.displayName;

const __RadioGroup = styled(RadioGroupPrimitive.Root);
export const _RadioGroup: Provider<typeof __RadioGroup, typeof radioGroup> = withProvider(__RadioGroup, 'root');
const __RadioGroupItem = styled(Item);
export const _RadioGroupItem: Nested<typeof __RadioGroupItem> = withContext(__RadioGroupItem, 'item');
