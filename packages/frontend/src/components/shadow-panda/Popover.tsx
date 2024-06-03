'use client';

import * as React from 'react';
import { popover } from '@styled-system/recipes/index.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const { withProvider, withContext } = createStyleContext(popover);

const Portal = withContext(styled(PopoverPrimitive.Portal), 'portal');

const Content = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
  // eslint-disable-next-line react/prop-types
>(({ align = 'center', sideOffset = 4, ...props }, ref) => (
  <Portal>
    <PopoverPrimitive.Content ref={ref} align={align} sideOffset={sideOffset} {...props} />
  </Portal>
));
Content.displayName = PopoverPrimitive.Content.displayName;

export const Popover = withProvider(styled(PopoverPrimitive.Root), 'root');
export const PopoverTrigger = withContext(styled(PopoverPrimitive.Trigger), 'trigger');
export const PopoverContent = withContext(styled(Content), 'content');
