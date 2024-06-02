'use client';

import * as React from 'react';
import { progress } from '@styled-system/recipes/progress.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { cx } from '@styled-system/css/cx.mjs';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const BaseProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  // eslint-disable-next-line react/prop-types
>(({ className, value, ...props }, ref) => {
  const styles = progress();

  return (
    <ProgressPrimitive.Root ref={ref} className={cx(styles.root, className)} {...props}>
      <ProgressPrimitive.Indicator
        className={styles.indicator}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
BaseProgress.displayName = ProgressPrimitive.Root.displayName;

export const Progress = styled(BaseProgress);
