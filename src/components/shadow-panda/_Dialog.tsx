'use client';

import React from 'react';
import { dialog } from '@styled-system/recipes/dialog.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import DialogPrimitive from '@radix-ui/react-dialog';

import type { Nested, Provider } from '~/utils/types.js';

const { withProvider, withContext } = createStyleContext(dialog);

const DialogPortal = withContext(styled(DialogPrimitive.Portal), 'portal');
const DialogOverlay = withContext(styled(DialogPrimitive.Overlay), 'overlay');

const __DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
__DialogContent.displayName = DialogPrimitive.Content.displayName;

const _Dialog = styled(DialogPrimitive.Root);
export const Dialog: Provider<typeof _Dialog, typeof dialog> = withProvider(_Dialog, 'root');

const _DialogTrigger = styled(DialogPrimitive.Trigger);
export const DialogTrigger: Nested<typeof _DialogTrigger> = withContext(_DialogTrigger, 'trigger');

export const _DialogContent = styled(__DialogContent);
export const DialogContent: Nested<typeof _DialogContent> = withContext(_DialogContent, 'content');

const _DialogHeader = styled('div');
export const DialogHeader: Nested<typeof _DialogHeader> = withContext(_DialogHeader, 'header');

const _DialogFooter = styled('div');
export const DialogFooter: Nested<typeof _DialogFooter> = withContext(_DialogFooter, 'footer');

const _DialogTitle = styled(DialogPrimitive.Title);
export const DialogTitle: Nested<typeof _DialogTitle> = withContext(_DialogTitle, 'title');

const _DialogDescription = styled(DialogPrimitive.Description);
export const DialogDescription: Nested<typeof _DialogDescription> = withContext(_DialogDescription, 'description');
