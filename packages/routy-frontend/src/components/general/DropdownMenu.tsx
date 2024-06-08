import type { IconType } from 'react-icons';
import React from 'react';

import { _DropdownMenuItem, _DropdownMenuContent } from '../shadow-panda/DropdownMenu.js';
import { Label } from './Text.js';
import { Icon } from './Icon.js';

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof _DropdownMenuItem> & {
  icon?: IconType;
  wrapper?: (props: React.PropsWithChildren) => React.JSX.Element | null;
  label?: React.ReactNode;
};

export const DropdownMenuItem = React.forwardRef((props: DropdownMenuItemProps, ref: React.Ref<HTMLDivElement>) => {
  const { icon, label, children, wrapper, ...rest } = props;

  const Wrapper = React.useMemo(() => (wrapper ? wrapper : React.Fragment), [wrapper]);

  return (
    <Wrapper>
      <_DropdownMenuItem width="full" height="full" cursor="pointer" ref={ref} {...rest}>
        {icon && <Icon icon={icon} />}
        {label && typeof label === 'string' ? <Label text={label} color="normal" /> : label}
        {children}
      </_DropdownMenuItem>
    </Wrapper>
  );
});

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof _DropdownMenuContent>;

export const DropdownMenuContent = React.forwardRef(
  (props: DropdownMenuContentProps, ref: React.Ref<HTMLDivElement>) => (
    <_DropdownMenuContent ref={ref} marginX="xs" {...props} />
  ),
);
