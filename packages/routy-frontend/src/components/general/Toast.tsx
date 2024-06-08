'use client';

import React from 'react';
import { toast } from '@styled-system/recipes/toast.mjs';
import { toastViewport } from '@styled-system/recipes/toast-viewport.mjs';
import { icon } from '@styled-system/recipes/icon.mjs';
import { styled } from '@styled-system/jsx/factory.mjs';
import { createStyleContext } from '@shadow-panda/style-context';
import * as ToastPrimitive from '@radix-ui/react-toast';

import type { Provider, Nested } from '~/utils/types.js';
import { colorStyles } from '~/recipes/colors.js';
import type { ColorStylesProps } from '~/recipes/colors.js';
import { CloseIcon } from '~/icons/react-icons.js';
import { __Toast, _ToastAction, _ToastClose, _ToastTitle, _ToastDescription } from '../shadow-panda/_Toast.js';

const { withProvider, withContext } = createStyleContext(toast);

const _Toast: Provider<typeof __Toast, typeof toast> = withProvider(__Toast, 'root', { className: 'group' });

export type UseToastProps = React.ComponentPropsWithoutRef<typeof _Toast> & ColorStylesProps;

export const Toast = ({ variant = 'outline', colorVariant = 'white', ...props }: UseToastProps) => {
  return <_Toast className={colorStyles({ colorVariant, variant })} {...props} />;
};

// TODO: move to shadow-panda and keep only custom styles here
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = styled(ToastPrimitive.Viewport, toastViewport);
export const ToastAction: Nested<typeof _ToastAction> = withContext(_ToastAction, 'action');
export const ToastClose: Nested<typeof _ToastClose> = withContext(_ToastClose, 'close', {
  children: <CloseIcon className={icon()} />,
});
export const ToastTitle: Nested<typeof _ToastTitle> = withContext(_ToastTitle, 'title');
export const ToastDescription: Nested<typeof _ToastDescription> = withContext(_ToastDescription, 'description');

export type ToastActionElement = React.ReactElement<typeof ToastAction>;
