import type { IconType } from 'react-icons';
import React from 'react';
import { cva } from '@styled-system/css/cva.mjs';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';
import type { NavigationRouteId } from '~/router.js';
import { useMatchesRoutes } from '~/hooks/route.js';
import { Tooltip } from '../Tooltip.js';
import { RedirectButton } from '../Button.js';
import type { RedirectButtonProps } from '../Button.js';

const sidebarButtonRecipe = cva({
  base: {
    paddingX: 'sm',
    whiteSpace: 'nowrap',
    borderWidth: 0,
    bgColor: { _hover: 'white' },
  },
  variants: {
    layout: {
      fullWidth: {
        width: 'full',
      },
    },
    position: {
      top: { roundedBottom: 0 },
      middle: { rounded: 0 },
      bottom: { roundedTop: 0 },
    },
    align: {
      left: { justifyContent: 'start' },
      center: { justifyContent: 'center' },
      right: { justifyContent: 'end' },
    },
    active: {
      true: { color: 'primary' },
    },
    disabled: {
      true: { color: 'gray' },
    },
  },
});

export type SidebarButtonStyleProps = PropsFromCVA<typeof sidebarButtonRecipe>;
export type SidebarButtonProps = SidebarButtonStyleProps &
  RedirectButtonProps & {
    label: string;
    icon: IconType;
    expanded?: boolean;
    position?: 'top' | 'middle' | 'bottom';
    onClick?: () => void;
    isActive?: boolean;
    redirect?: NavigationRouteId;
  };

export type SidebarButtonListProps = {
  expanded: boolean;
  options: SidebarButtonStyleProps;
};

export const SidebarButton: React.FC<SidebarButtonProps> = props => {
  const { redirect, label, icon, position, layout, align, id, isActive, className, expanded = false, ...rest } = props;
  const matches = useMatchesRoutes();

  const active = isActive ?? (redirect ? matches(redirect, redirect === '/') : false);
  const buttonStyles = sidebarButtonRecipe({
    position,
    layout,
    align,
    active,
    disabled: rest.disabled,
  });

  return (
    <Tooltip content={label} side="right">
      <RedirectButton
        {...rest}
        icon={icon}
        iconProps={{ size: 'sm' }}
        colorVariant="white"
        label={expanded ? label : null}
        className={clsx(buttonStyles, className)}
        navigate={redirect ? { to: redirect } : undefined}
      />
    </Tooltip>
  );
};
