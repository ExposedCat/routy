import type { IconType } from 'react-icons';
import React from 'react';
import type { HTMLStyledProps } from '@styled-system/types/jsx.mjs';
import { Flex } from '@styled-system/jsx/flex.mjs';
import { cva } from '@styled-system/css/cva.mjs';
import { css } from '@styled-system/css/css.mjs';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA, Customizable } from '~/utils/types.js';
import { hoverStyles } from '~/recipes/hover.js';
import type { HoverColorStylesProps } from '~/recipes/hover.js';
import { colorStyles } from '~/recipes/colors.js';
import { SelectIcon } from '~/icons/react-icons.js';
import { _Button } from '../shadow-panda/_Button.js';
import { Separator } from '../shadow-panda/Separator.js';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../shadow-panda/DropdownMenu.js';
import { Label } from './Text.js';
import { Navigational } from './Navigational.js';
import type { WithNavigate } from './Navigational.js';
import { Icon } from './Icon.js';
import type { IconProps } from './Icon.js';
import { DropdownMenuContent, DropdownMenuItem } from './DropdownMenu.js';

const customButtonStyler = cva({
  base: {
    rounded: 'common',
  },
  variants: {
    size: {
      icon: {
        flexShrink: 0,
      },
      sm: {
        height: 'lineHeights.sm',
      },
      xs: {
        height: 'lineHeights.xs',
      },
    },
  },
});

type ButtonSelectItem = {
  id: string;
  value: React.ReactNode;
};

type ExtraButtonProps = PropsFromCVA<typeof customButtonStyler> & {
  icon?: IconType | null;
  iconProps?: Partial<IconProps>;
  iconPosition?: 'start' | 'end';
  label?: React.ReactNode | null;
  withSelector?: {
    items: ButtonSelectItem[];
    action?: React.ReactNode;
    onAction?: () => void;
    onSelect?: ((id: string) => void) | null;
  } | null;
};

export type RawButtonProps = Omit<HTMLStyledProps<typeof _Button>, 'variant'> &
  HoverColorStylesProps &
  ExtraButtonProps;

export const RawButton = React.forwardRef<HTMLButtonElement, RawButtonProps>((props, ref) => {
  const {
    icon,
    iconProps = {},
    iconPosition = 'start',
    label,
    children,
    withSelector: selector,
    onClick: _onClick,
    type,
    size = icon && !label ? 'icon' : undefined,
    variant,
    colorVariant,
    hoverStyle,
    className,
    ...rest
  } = props;

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (_onClick) {
        event.stopPropagation();
        _onClick(event);
      }
    },
    [_onClick],
  );

  const customStyles = customButtonStyler({ size });
  const withSelectorStyles = css({ paddingRight: 0 });

  return (
    <_Button
      {...rest}
      ref={ref}
      size={!label && !children ? 'icon' : undefined}
      type={type ?? 'button'}
      onClick={onClick}
      className={clsx(
        colorStyles({ variant, colorVariant }),
        hoverStyles({ variant, colorVariant, hoverStyle }),
        customStyles,
        selector ? withSelectorStyles : null,
        className,
      )}
    >
      <Flex align="center" gap="xs">
        {iconPosition === 'end' && label && <Label text={label} color="unset" weight="medium" break="none" />}
        {icon && <Icon icon={icon} {...iconProps} />}
        {iconPosition === 'start' && label && <Label text={label} color="unset" weight="medium" break="none" />}
        {children}
      </Flex>
      {selector && (
        <Flex height="full">
          <Separator orientation="vertical" height="full" />
          <ButtonSelect {...selector} />
        </Flex>
      )}
    </_Button>
  );
});

type ButtonSelectProps = Customizable<Exclude<RawButtonProps['withSelector'], null | undefined>>;

const ButtonSelect = (props: ButtonSelectProps) => {
  const { items, action, onSelect: _onSelect, className } = props;

  const onSelect = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>, id: string) => {
      if (_onSelect) {
        event.stopPropagation();
        _onSelect(id);
      }
    },
    [_onSelect],
  );

  const styles = css({
    roundedLeft: 0,
    marginY: '-xs',
    padding: 'smaller.sm',
    color: 'inherit',
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-cy={'dropdown-menu-trigger'}>
        <div>
          <Flex className={clsx(className, styles)} onClick={event => event.preventDefault()} role="button">
            <Icon icon={SelectIcon} />
          </Flex>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent maxHeight="container.smaller.sm" overflowY="auto">
        {action && (
          <>
            <DropdownMenuGroup>{action}</DropdownMenuGroup>
            {items.length > 0 && <DropdownMenuSeparator />}
          </>
        )}
        <DropdownMenuGroup data-cy={'dropdown-menu-items'}>
          {items.map(item => (
            <DropdownMenuItem
              key={`button-select-item-${item.id}`}
              onClick={event => onSelect(event, item.id)}
              label={item.value}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export type ButtonProps<T extends string = ''> = WithNavigate<typeof RawButton, T>;

export const Button = <T extends string = ''>(props: ButtonProps<T>) => {
  const { navigate, ...rest } = props;

  return (
    <Navigational navigate={navigate}>
      <RawButton variant="link" width="full" {...rest} />
    </Navigational>
  );
};
