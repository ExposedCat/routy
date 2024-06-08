'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { accordion } from '@styled-system/recipes/accordion.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(accordion);

const Header = withContext(styled(AccordionPrimitive.Header), 'header');

const Trigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <Header>
    <AccordionPrimitive.Trigger ref={ref} {...props}>
      {children}
      <ChevronDown />
    </AccordionPrimitive.Trigger>
  </Header>
));
Trigger.displayName = AccordionPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} {...props}>
    {children}
  </AccordionPrimitive.Content>
));
Content.displayName = AccordionPrimitive.Content.displayName;

const _Accordion = styled(AccordionPrimitive.Root);
export const Accordion: Provider<typeof _Accordion, typeof accordion> = withProvider(_Accordion, 'root');
const _AccordionItem = styled(AccordionPrimitive.Item);
export const AccordionItem: Nested<typeof _AccordionItem> = withContext(_AccordionItem, 'item');
const _AccordionTrigger = styled(Trigger);
export const AccordionTrigger: Nested<typeof _AccordionTrigger> = withContext(_AccordionTrigger, 'trigger');
const _AccordionContent = styled(Content);
export const AccordionContent: Nested<typeof _AccordionContent> = withContext(_AccordionContent, 'content');
