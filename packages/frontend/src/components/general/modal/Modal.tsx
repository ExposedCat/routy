import React from 'react';
import { DialogClose } from '@radix-ui/react-dialog';

import { clsx } from '~/utils/types.js';
import type { PropsFromCVA } from '~/utils/types.js';
import type { PropertyValue } from '~/styled-system/types/prop-type.mjs';
import { cva } from '~/styled-system/css/cva.mjs';
import { css } from '~/styled-system/css/css.mjs';
import { BackIcon, CrossIcon } from '~/icons/react-icons.js';
import type { ModalContext } from '~/hooks/modal.js';
import { Tooltip } from '../Tooltip.js';
import { SubHeader } from '../Text.js';
import { Flex } from '../Flex.js';
import { Button } from '../Button.js';
import { Dialog, DialogContent, DialogHeader } from '../../shadow-panda/_Dialog.js';
import type { _DialogContent } from '../../shadow-panda/_Dialog.js';

type ModalProps = React.ComponentProps<typeof Dialog>;

type ModalContextAwareProps<T extends Record<string, any>, K extends keyof T> = Omit<
  ModalProps,
  'visible' | 'onClose' | 'children'
> & {
  context: ModalContext<T>;
  which: K;
  onOpen?: () => void;
  onClose?: () => void;
  children: (params: T[K], close: () => void) => React.ReactNode;
  autoFocus?: boolean;
} & { initialState?: OpenState<T, K> };

type OpenState<T extends Record<string, any>, K extends keyof T> =
  | {
      open: false;
      params?: undefined;
    }
  | {
      open: true;
      params: T[K];
    };

export const ModalContextAware = <T extends Record<string, any>, K extends keyof T>(
  props: ModalContextAwareProps<T, K>,
): JSX.Element => {
  const {
    children,
    context: modalContext,
    which,
    initialState = { open: false, params: undefined },
    onOpen,
    onClose,
    ...rest
  } = props;
  const [openState, setOpenState] = React.useState(() => initialState);

  const handleOnOpenChange = React.useCallback(
    (opened: boolean) => {
      if (opened === false) {
        setOpenState({ open: opened });
        onClose?.();
      }
    },
    [onClose],
  );

  React.useEffect(() => {
    if (modalContext) {
      modalContext.listenForActions(which, event => {
        switch (event.action) {
          case 'open':
            setOpenState({ open: true, params: event.params });
            onOpen?.();
            break;
          case 'close':
            setOpenState({ open: false });
            break;
        }
      });
      return () => {
        modalContext.unbindListener(which);
      };
    } else {
      throw new Error(`No ModalContext available!`);
    }
  }, [modalContext, which, onOpen]);

  return (
    <Dialog open={openState.open} onOpenChange={handleOnOpenChange} {...rest}>
      {openState.open ? children(openState.params, () => handleOnOpenChange(false)) : undefined}
    </Dialog>
  );
};

const modalContentStyler = cva({
  base: {
    maxHeight: 'basic.almost-full',
    minHeight: 'container.smaller.xxs',
    minWidth: 'min-content',
    overflowY: 'auto',
    padding: 'sm',
  },
  variants: {
    size: {
      normal: {},
      full: { maxWidth: 'basic.almost-full' },
    },
  },
});

type ModalContentProps = React.ComponentProps<typeof _DialogContent> &
  PropsFromCVA<typeof modalContentStyler> & {
    className?: string;
  };

export const ModalContent = (props: ModalContentProps) => {
  const { className, size, children, ...rest } = props;

  return (
    <DialogContent className={clsx(modalContentStyler({ size }), className)} {...rest}>
      {children}
    </DialogContent>
  );
};

type ModalHeaderProps = {
  title?: React.ReactNode;
  closeButton?: boolean;
  closeButtonMargin?: PropertyValue<'marginRight'>;
  backAction?: () => void;
  actions?: React.ReactNode;
  singleLine?: boolean;
  tooltipContent?: React.ReactNode;
  autoFocus?: boolean;
};

export const ModalHeader = (props: React.PropsWithChildren<ModalHeaderProps>) => {
  const {
    backAction,
    actions,
    closeButton = true,
    children,
    closeButtonMargin = '-xs',
    title,
    singleLine,
    tooltipContent,
    autoFocus = true,
  } = props;

  const tooltip = React.useMemo(() => {
    return typeof tooltipContent === 'string' ? <Flex maxWidth="card.sm">{tooltipContent}</Flex> : tooltipContent;
  }, [tooltipContent]);

  // Focus the dialog when it opens instead of first focusable element
  const autoFocusFix = autoFocus ? { tabIndex: 0, outline: 'none' } : {};

  return (
    <DialogHeader>
      <Flex width="full" align="center" justify="space-between" gap="xs" {...autoFocusFix}>
        <Flex width="full" align="center" justify="start" gap="xxs">
          {backAction && (
            <Button variant="ghost" colorVariant="white" icon={BackIcon} marginLeft="-xs" onClick={backAction} />
          )}
          {title &&
            (singleLine ? (
              <Tooltip
                content={tooltip}
                className={css({ display: 'flex !important', lineHeight: 'unset !important', width: 0, flexGrow: 1 })}
              >
                <SubHeader
                  text={title}
                  className={css({
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  })}
                />
              </Tooltip>
            ) : (
              <Tooltip content={tooltip}>
                <SubHeader text={title} break="word" />
              </Tooltip>
            ))}
          {children}
        </Flex>
        <Flex align="center" justify="normal" gap="xs">
          {actions}
          {closeButton && (
            <DialogClose asChild>
              <Button marginRight={closeButtonMargin} variant="ghost" colorVariant="white" icon={CrossIcon} />
            </DialogClose>
          )}
        </Flex>
      </Flex>
    </DialogHeader>
  );
};

export { DialogFooter as ModalFooter } from '../../shadow-panda/_Dialog.js';
