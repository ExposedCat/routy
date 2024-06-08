import React from 'react';
import { SECOND } from '@routy/routy-shared';

import type { UseToastProps, ToastActionElement } from '~/components/general/Toast.js';

const TOAST_LIMIT = 2;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = UseToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        for (const { id } of state.toasts) {
          addToRemoveQueue(id);
        }
      }

      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  for (const listener of listeners) {
    listener(memoryState);
  }
}

export type ToastProps = Omit<ToasterToast, 'id' | 'duration'> & {
  permanent?: boolean;
  duration?: 'default' | 'long';
  onClosed?: () => void;
  name?: string;
};

export function showToast(props: ToastProps) {
  const { permanent, duration = 'default', onClosed, ...rest } = props;

  const id = genId();
  const durationValue = {
    long: 10 * SECOND,
    default: 3.5 * SECOND,
  }[duration];

  const update = (options: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...options, id },
    });

  const dismiss = () => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
    onClosed?.();
  };

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...rest,
      duration: permanent ? Infinity : durationValue,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  if (!permanent) {
    setTimeout(dismiss, durationValue);
  }

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast() {
  const displayedToastsRef = React.useRef<string[]>([]);
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const toast = React.useCallback(
    (props: ToastProps) => {
      const { id } = showToast(props);
      props.name ? displayedToastsRef.current?.push(props.name) : displayedToastsRef.current?.push(id);
    },
    [displayedToastsRef],
  );

  const isToastDisplayed = React.useCallback(
    (name: string) => displayedToastsRef.current.includes(name),
    [displayedToastsRef],
  );

  return {
    ...state,
    displayedToastsRef,
    toast,
    isToastDisplayed,
  };
}
