'use client';

import * as React from 'react';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { icon } from '@styled-system/recipes/icon.mjs';
import { dropdownMenu } from '@styled-system/recipes/dropdown-menu.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { cx } from '@styled-system/css/cx.mjs';
import { css } from '@styled-system/css/css.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(dropdownMenu);

const SubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    insetLeft?: boolean;
  }
  // eslint-disable-next-line react/prop-types
>(({ className, insetLeft, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger ref={ref} className={cx(insetLeft && css({ pl: '8' }), className)} {...props}>
    {children}
    <ChevronRight className={icon({ left: 'auto' })} />
  </DropdownMenuPrimitive.SubTrigger>
));
SubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
  // eslint-disable-next-line react/prop-types
>(({ sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} {...props} />
  </DropdownMenuPrimitive.Portal>
));
Content.displayName = DropdownMenuPrimitive.Content.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    insetLeft?: boolean;
  }
  // eslint-disable-next-line react/prop-types
>(({ className, insetLeft, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} className={cx(insetLeft && css({ pl: '8' }), className)} {...props} />
));
Item.displayName = DropdownMenuPrimitive.Item.displayName;

const ItemIndicator = withContext(styled(DropdownMenuPrimitive.ItemIndicator), 'itemIndicator');

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} {...props}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
CheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const RadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} {...props}>
    <ItemIndicator>
      <Circle className={icon({ size: 'xs', fillCurrent: true })} />
    </ItemIndicator>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
RadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const Label = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    insetLeft?: boolean;
  }
  // eslint-disable-next-line react/prop-types
>(({ className, insetLeft, ...props }, ref) => (
  <DropdownMenuPrimitive.Label ref={ref} className={cx(insetLeft && css({ pl: '8' }), className)} {...props} />
));
Label.displayName = DropdownMenuPrimitive.Label.displayName;

const _DropdownMenu = styled(DropdownMenuPrimitive.Root);
export const DropdownMenu: Provider<typeof _DropdownMenu, typeof dropdownMenu> = withProvider(_DropdownMenu, 'root');
const _DropdownMenuTrigger = styled(DropdownMenuPrimitive.Trigger);
export const DropdownMenuTrigger: Nested<typeof _DropdownMenuTrigger> = withContext(_DropdownMenuTrigger, 'trigger');
const _DropdownMenuGroup = styled(DropdownMenuPrimitive.Group);
export const DropdownMenuGroup: Nested<typeof _DropdownMenuGroup> = withContext(_DropdownMenuGroup, 'group');
const _DropdownMenuPortal = styled(DropdownMenuPrimitive.Portal);
export const DropdownMenuPortal: Nested<typeof _DropdownMenuPortal> = withContext(_DropdownMenuPortal, 'portal');
const _DropdownMenuSub = styled(DropdownMenuPrimitive.Sub);
export const DropdownMenuSub: Nested<typeof _DropdownMenuSub> = withContext(_DropdownMenuSub, 'sub');
const _DropdownMenuRadioGroup = styled(DropdownMenuPrimitive.RadioGroup);
export const DropdownMenuRadioGroup: Nested<typeof _DropdownMenuRadioGroup> = withContext(
  _DropdownMenuRadioGroup,
  'radioGroup',
);
const _DropdownMenuSubTrigger = styled(SubTrigger);
export const DropdownMenuSubTrigger: Nested<typeof _DropdownMenuSubTrigger> = withContext(
  _DropdownMenuSubTrigger,
  'subTrigger',
);
const _DropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent);
export const DropdownMenuSubContent: Nested<typeof _DropdownMenuSubContent> = withContext(
  _DropdownMenuSubContent,
  'subContent',
);
const __DropdownMenuContent = styled(Content);
export const _DropdownMenuContent: Nested<typeof __DropdownMenuContent> = withContext(__DropdownMenuContent, 'content');
const __DropdownMenuItem = styled(Item);
export const _DropdownMenuItem: Nested<typeof __DropdownMenuItem> = withContext(__DropdownMenuItem, 'item');
const _DropdownMenuCheckboxItem = styled(CheckboxItem);
export const DropdownMenuCheckboxItem: Nested<typeof _DropdownMenuCheckboxItem> = withContext(
  _DropdownMenuCheckboxItem,
  'checkboxItem',
);
const _DropdownMenuRadioItem = styled(RadioItem);
export const DropdownMenuRadioItem: Nested<typeof _DropdownMenuRadioItem> = withContext(
  _DropdownMenuRadioItem,
  'radioItem',
);
const _DropdownMenuLabel = styled(Label);
export const DropdownMenuLabel: Nested<typeof _DropdownMenuLabel> = withContext(_DropdownMenuLabel, 'label');
const _DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator);
export const DropdownMenuSeparator: Nested<typeof _DropdownMenuSeparator> = withContext(
  _DropdownMenuSeparator,
  'separator',
);
const _DropdownMenuShortcut = styled('span');
export const DropdownMenuShortcut: Nested<typeof _DropdownMenuShortcut> = withContext(
  _DropdownMenuShortcut,
  'shortcut',
);
