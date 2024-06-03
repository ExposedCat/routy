import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';
import { DotIcon } from '~/icons/react-icons.js';
import type { IconType } from '~/icons/index.js';
import { _Badge, type _BadgeProps } from '../shadow-panda/_Badge.js';
import { cva } from '../../styled-system/css/cva.mjs';
import { Tooltip } from './Tooltip.js';
import { SubLabel } from './Text.js';
import { Icon, type IconProps } from './Icon.js';
import { Flex } from './Flex.js';

const badgeStyler = cva({
  base: {
    borderWidth: 'thin',
  },
  variants: {
    variant: {
      success: {
        bgColor: 'light.success',
        borderColor: 'light.success',
        color: 'text.success',
      },
      warning: {
        bgColor: 'light.warning',
        borderColor: 'light.warning',
        color: 'text.warning',
      },
      error: {
        bgColor: 'light.error',
        borderColor: 'light.error',
        color: 'text.error',
      },
      active: {
        bgColor: 'light.active',
        borderColor: 'light.active',
        color: 'text.active',
      },
      gray: {
        bgColor: 'light.gray',
        borderColor: 'light.gray',
        color: 'text.gray',
      },
      white: {
        bgColor: 'white',
        borderColor: 'decoration.gray',
        color: 'black',
      },
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
});

export type BadgeProps = Omit<_BadgeProps, 'variant' | 'label'> &
  PropsFromCVA<typeof badgeStyler> & {
    label: React.ReactNode;
    dot?: boolean;
    icon?: IconType | null;
    iconSize?: IconProps['size'];
    iconPosition?: 'start' | 'end';
    iconClassName?: string;
    tooltip?: React.ReactNode;
  };

export const Badge = (props: BadgeProps) => {
  const {
    icon,
    iconPosition = 'start',
    dot = false,
    iconSize,
    iconClassName,
    label,
    variant,
    className,
    pointerEvents = 'none',
    cursor = 'auto',
    tooltip,
    ...rest
  } = props;

  const BadgeComponent = () => (
    <_Badge
      className={clsx(badgeStyler({ variant }), className)}
      pointerEvents={tooltip ? 'visible' : pointerEvents}
      cursor={tooltip ? 'help' : cursor}
      {...rest}
    >
      <Flex
        direction={iconPosition === 'start' ? 'row' : 'row-reverse'}
        justify="space-evenly"
        align="center"
        gap="xs"
        whiteSpace="nowrap"
      >
        {(icon || dot) && (
          <Icon
            icon={icon ?? DotIcon}
            size={iconSize ?? dot ? 'xxs' : undefined}
            className={clsx(iconClassName)}
            pointerEvents={'none'}
          />
        )}
        <SubLabel text={label} color="unset" weight="bold" />
      </Flex>
    </_Badge>
  );

  return tooltip ? (
    <Tooltip content={tooltip}>
      <BadgeComponent />
    </Tooltip>
  ) : (
    <BadgeComponent />
  );
};
