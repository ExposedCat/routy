'use client';

import * as React from 'react';
import { slider } from '@styled-system/recipes/slider.mjs';
import { Flex } from '@styled-system/jsx/flex.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { css } from '@styled-system/css/css.mjs';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { clsx } from '~/utils/types.js';
import { SubLabel } from '../general/Text.js';

const BaseSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { showLabels?: boolean }
  // eslint-disable-next-line react/prop-types
>(({ className, min, max, value = [], showLabels = false, defaultValue = value ?? [], ...rest }, ref) => {
  const styles = slider();

  const thumbStyles = css({ position: 'relative' });
  const labelStyles = css({
    position: 'absolute',
    top: '100%',
    left: 'calc(-1 * token(sizes.slider.label) / 3)',
    width: 'slider.label',
    textAlign: 'center',
  });

  return (
    <Flex gap="xs" width="full">
      {showLabels && <SubLabel text={min} />}
      <SliderPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
        defaultValue={defaultValue}
        {...{ min, max, value }}
        {...rest}
      >
        <SliderPrimitive.Track className={styles.track}>
          <SliderPrimitive.Range className={styles.range} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={clsx(styles.thumb, thumbStyles)}>
          {showLabels && value[0] !== min && value[0] !== max && <SubLabel className={labelStyles} text={value[0]} />}
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
      {showLabels && <SubLabel text={max} />}
    </Flex>
  );
});
BaseSlider.displayName = SliderPrimitive.Root.displayName;

export const _Slider = styled(BaseSlider);
