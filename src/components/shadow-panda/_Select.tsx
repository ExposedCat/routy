'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { select } from '@styled-system/recipes/select.mjs';
import { icon } from '@styled-system/recipes/icon.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as SelectPrimitive from '@radix-ui/react-select';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(select);

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={icon({ dimmed: true })} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const Viewport = withContext(SelectPrimitive.Viewport, 'viewport');

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
  // eslint-disable-next-line react/prop-types
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} position={position} data-position={position} {...props}>
      <Viewport data-position={position}>{children}</Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const ItemIndicator = withContext(styled(SelectPrimitive.ItemIndicator), 'itemIndicator');

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} {...props}>
    <ItemIndicator>
      <Check className={icon()} />
    </ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

const __Select = styled(SelectPrimitive.Root);
export const _Select: Provider<typeof __Select, typeof select> = withProvider(__Select, 'root');
const __SelectGroup = styled(SelectPrimitive.Group);
export const _SelectGroup: Nested<typeof __SelectGroup> = withContext(__SelectGroup, 'group');
const __SelectValue = styled(SelectPrimitive.Value);
export const _SelectValue: Nested<typeof __SelectValue> = withContext(__SelectValue, 'value');
const __SelectTrigger = styled(Trigger);
export const _SelectTrigger: Nested<typeof __SelectTrigger> = withContext(__SelectTrigger, 'trigger');
const __SelectContent = styled(Content);
export const _SelectContent: Nested<typeof __SelectContent> = withContext(__SelectContent, 'content');
const __SelectLabel = styled(SelectPrimitive.Label);
export const _SelectLabel: Nested<typeof __SelectLabel> = withContext(__SelectLabel, 'label');
const __SelectItem = styled(Item);
export const _SelectItem: Nested<typeof __SelectItem> = withContext(__SelectItem, 'item');
const __SelectSeparator = styled(SelectPrimitive.Separator);
export const _SelectSeparator: Nested<typeof __SelectSeparator> = withContext(__SelectSeparator, 'separator');
