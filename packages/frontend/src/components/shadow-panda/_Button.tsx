import * as React from 'react';
import { button } from '@styled-system/recipes/button.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { Slot } from '@radix-ui/react-slot';

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; children?: React.ReactNode }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} {...props} />;
});
BaseButton.displayName = 'Button';

export const _Button = styled(BaseButton, button);
