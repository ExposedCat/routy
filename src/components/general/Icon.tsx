import type { IconType } from 'react-icons';
import { cva } from '@styled-system/css/cva.mjs';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';

export const iconRecipe = cva({
  base: {
    width: 'icon.primary',
    height: 'icon.primary',
    flexShrink: 0,
  },
  variants: {
    size: {
      xxs: {
        width: 'icon.xxs',
        height: 'icon.xxs',
      },
      xs: {
        width: 'icon.xs',
        height: 'icon.xs',
      },
      sm: {
        width: 'icon.sm',
        height: 'icon.sm',
      },
      md: {
        width: 'icon.md',
        height: 'icon.md',
      },
      lg: {
        width: 'icon.lg',
        height: 'icon.lg',
      },
      xl: {
        width: 'icon.xxl',
        height: 'icon.xxl',
      },
      full: {
        width: 'full',
        height: 'full',
      },
    },
    color: {
      active: { color: 'dark.active' },
      gray: { color: 'dark.gray' },
      black: { color: 'dark.black' },
      white: { color: 'dark.white' },
      error: { color: 'dark.error' },
      success: { color: 'dark.success' },
      warning: { color: 'dark.warning' },
    },
    cursor: {
      default: { cursor: 'default' },
      inherit: { cursor: 'inherit' },
      auto: { cursor: 'auto' },
      poitner: { cursor: 'pointer' },
      help: { cursor: 'help' },
    },
    pointerEvents: {
      none: { pointerEvents: 'none' },
      visible: { pointerEvents: 'visible' },
    },
  },
  defaultVariants: {
    color: 'black',
    size: 'xs',
    cursor: 'inherit',
    pointerEvents: 'visible',
  },
});

export type IconProps = PropsFromCVA<typeof iconRecipe> & {
  icon: IconType;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const Icon = (props: IconProps) => {
  const { icon: RawIcon, className, ...styles } = props;

  return <RawIcon className={clsx(iconRecipe(styles), className)} />;
};
