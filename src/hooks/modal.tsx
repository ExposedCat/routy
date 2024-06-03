import React from 'react';

type ModalListener<T extends Record<string, any>, K extends keyof T> = (
  args:
    | {
        action: 'open';
        params: T[K];
      }
    | {
        action: 'close';
      },
) => void;

export class ModalContext<T extends Record<string, any>> {
  private listeners: Map<keyof T, ModalListener<T, any>> = new Map();

  open<K extends keyof T>(modal: K, params: T[K]): void {
    const listener = this.listeners.get(modal);
    if (!listener) throw new Error(`No Modal component connected to ${String(modal)}`);
    listener({ action: 'open', params });
  }

  close<K extends keyof T>(modal: K): void {
    const listener = this.listeners.get(modal);
    if (!listener) throw new Error(`No Modal component connected to ${String(modal)}`);
    listener({ action: 'close' });
  }

  listenForActions<K extends keyof T>(modal: K, listener: ModalListener<T, K>): void {
    this.listeners.set(modal, listener);
  }

  unbindListener<K extends keyof T>(modal: K): void {
    this.listeners.delete(modal);
  }
}

const ReactMultiModalContext = React.createContext<ModalContext<any> | null>(null);

export const useNewMultiModalContext = <T extends Record<string, any>>(): ModalContext<T> => {
  const ref = React.useRef<ModalContext<T>>();
  if (!ref.current) {
    ref.current = new ModalContext();
  }
  return ref.current;
};

type ModalContextProviderProps = {
  context: ModalContext<any>;
  children: React.ReactNode;
};

export const ProvideMultiModalContext = (props: ModalContextProviderProps): JSX.Element => {
  return <ReactMultiModalContext.Provider value={props.context}>{props.children}</ReactMultiModalContext.Provider>;
};

export const useMultiModalContext = <T extends Record<string, any>>(): ModalContext<T> | null => {
  return React.useContext(ReactMultiModalContext) as ModalContext<T> | null;
};

export const useRequireMultiModalContext = <T extends Record<string, any>>(): ModalContext<T> => {
  const context = useMultiModalContext<T>();
  if (!context) {
    throw new Error('ProvideMultiModalContext missing');
  }
  return context;
};
