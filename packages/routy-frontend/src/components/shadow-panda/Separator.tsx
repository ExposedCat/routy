'use client';

import * as React from 'react';
import { separator } from '@styled-system/recipes/separator.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { cx } from '@styled-system/css/cx.mjs';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

const BaseSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
  // eslint-disable-next-line react/prop-types
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cx(separator({ orientation }), className)}
    {...props}
  />
));
BaseSeparator.displayName = SeparatorPrimitive.Root.displayName;

export const Separator = styled(BaseSeparator);
