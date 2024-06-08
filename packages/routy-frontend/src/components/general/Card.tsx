import React from 'react';

import { clsx } from '~/utils/types.js';
import { _Card } from '../shadow-panda/_Card.js';
import { Separator } from '../shadow-panda/Separator.js';
import type { Property } from '../../styled-system/types/csstype.mjs';
import { css } from '../../styled-system/css/css.mjs';
import { hoverStyles } from '../../recipes/hover.js';
import type { HoverColorStylesProps } from '../../recipes/hover.js';
import { colorStyles } from '../../recipes/colors.js';
import { Header, SubLabel } from './Text.js';
import { Flex, type FlexProps } from './Flex.js';

export type CardProps = Omit<FlexProps, 'title'> & {
  title?: React.ReactNode | null;
  titleSeparator?: boolean;
  subtitle?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  wrapper?: (props: React.PropsWithChildren) => React.JSX.Element | null;
  fullWidth?: boolean;
  cardStyles?: string;
  disabled?: boolean;
  withHoverEffect?: boolean;
} & HoverColorStylesProps;

export const Card = (props: CardProps) => {
  const {
    title,
    titleSeparator = true,
    subtitle,
    actions,
    footer,
    wrapper,
    children,
    fullWidth,
    cardStyles,
    disabled,
    variant = 'outline',
    colorVariant = 'white',
    withHoverEffect,
    hoverStyle,
    ...rest
  } = props;

  const styles = clsx(
    colorStyles({ variant, colorVariant }),
    withHoverEffect ? hoverStyles({ variant, colorVariant, hoverStyle }) : undefined,
    cardStyles,
    fullWidth ? css({ width: 'full', overflow: 'auto' }) : null,
    css({ borderRadius: 'common' }),
  );

  const cursor: Property.Cursor | undefined = React.useMemo(
    () => (disabled ? 'not-allowed' : rest.onClick ? 'pointer' : undefined),
    [disabled, rest.onClick],
  );

  const Wrapper = React.useMemo(() => (wrapper ? wrapper : React.Fragment), [wrapper]);

  return (
    <_Card className={styles} cursor={cursor}>
      {((title !== undefined && title !== null) || subtitle !== undefined) && (
        <>
          <Flex justify="space-between" align="center" gap="sm" padding="sm">
            <Flex direction="column" maxWidth="full">
              {typeof title === 'string' ? <Header text={title} break="none" /> : title}
              {subtitle && <SubLabel text={subtitle} />}
            </Flex>
            {actions}
          </Flex>
          {titleSeparator && <Separator />}
        </>
      )}
      <Wrapper>
        <Flex direction="column" padding="sm" {...rest}>
          {children}
        </Flex>
      </Wrapper>
      {footer && (
        <>
          <Separator />
          <Flex justify="space-between" align="center" padding="sm">
            {footer}
          </Flex>
        </>
      )}
    </_Card>
  );
};
