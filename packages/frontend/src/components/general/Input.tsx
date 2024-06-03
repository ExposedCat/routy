import React from 'react';
import type { PropsWithChildren, Ref } from 'react';

import { clsx } from '~/utils/types.js';
import { cva } from '~/styled-system/css/cva.mjs';
import { css } from '~/styled-system/css/css.mjs';
import { _Input } from '../shadow-panda/_Input.js';
import type { _InputProps } from '../shadow-panda/_Input.js';
import { Flex } from './Flex.js';
import type { FlexProps } from './Flex.js';

export type InputProps = _InputProps & {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};

const inputRecipe = cva({
  base: {
    paddingInlineStart: '3', // --spacing-3
    paddingInlineEnd: '3',
  },
  variants: {
    leftSection: {
      true: {
        paddingInlineStart: 'md',
      },
    },
    rightSection: {
      true: {
        paddingInlineEnd: 'md',
      },
    },
  },
});

const InputSection = (props: PropsWithChildren<FlexProps>) => {
  const { className, children, ...rest } = props;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      className={clsx(css({ position: 'absolute', top: 0, bottom: 0, width: 'icon.lg', height: 'full' }), className)}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export const Input = React.forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { leftSection, rightSection, className, wrapperProps, ...rest } = props;

  const wrapperStyles = css({
    position: 'relative',
    width: 'full',
  });

  return (
    <div className={clsx(wrapperStyles, wrapperProps?.className)} {...wrapperProps}>
      {leftSection && <InputSection className={css({ left: 0 })}>{leftSection}</InputSection>}
      <_Input
        className={clsx(
          inputRecipe({
            leftSection: leftSection ? true : false,
            rightSection: rightSection ? true : false,
          }),
          className,
        )}
        ref={ref}
        {...rest}
      />
      {rightSection && <InputSection className={css({ right: 0 })}>{rightSection}</InputSection>}
    </div>
  );
});
