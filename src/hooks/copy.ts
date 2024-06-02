import React from 'react';

import { useToast } from './use-toast.js';
import type { ToastProps } from './use-toast.js';

export type CopyWithToastProps = Omit<ToastProps, 'description'> & {
  text: string;
  description?: string | null;
  entity?: string | null;
};

export function useCopyWithToast() {
  const { toast } = useToast();

  return React.useCallback(
    (props: CopyWithToastProps) => {
      const { text, description, entity } = props;

      void navigator.clipboard.writeText(text);
      if (description !== null) {
        const label = entity ? `${entity} copied to the clipboard.` : description ?? 'Copied';
        toast({ description: label });
      }
    },
    [toast],
  );
}
