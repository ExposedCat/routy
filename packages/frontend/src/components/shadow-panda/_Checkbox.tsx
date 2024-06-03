'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { icon } from '@styled-system/recipes/icon.mjs';
import { checkbox } from '@styled-system/recipes/checkbox.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { cx } from '@styled-system/css/cx.mjs';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => {
  const styles = checkbox();

  return (
    <CheckboxPrimitive.Root ref={ref} className={cx('peer', styles.root, className)} {...props}>
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <Check className={icon()} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
BaseCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export const _Checkbox = styled(BaseCheckbox);
