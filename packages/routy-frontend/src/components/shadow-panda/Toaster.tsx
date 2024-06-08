'use client';

import { css } from '@styled-system/css/css.mjs';

import { useToast } from '~/hooks/use-toast.js';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '../general/Toast.js';

export function Toaster() {
  const { toasts } = useToast();

  const toastStyles = css({
    top: 0, // Move toasts to the top
    pointerEvents: 'none', // Fix unresponsive UI while toast is active
    gap: 'sm',
  });

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className={toastStyles} />
    </ToastProvider>
  );
}
