import React from 'react';

import type { ColorStylesProps } from '~/recipes/colors.js';
import { useRequireMultiModalContext } from '~/hooks/modal.js';
import { Button } from '../Button.js';
import { Alert } from '../Alert.js';
import { ModalContextAware, ModalContent, ModalHeader, ModalFooter } from './Modal.js';

export type ConfirmationModalContext = {
  confirm: {
    header: string;
    description?: React.ReactNode;
    onConfirm: () => void;
    canCancel?: boolean;
  } & ColorStylesProps;
};

export const ConfirmationModal = React.memo((): JSX.Element => {
  const context = useRequireMultiModalContext<ConfirmationModalContext>();
  return (
    <ModalContextAware context={context} which="confirm">
      {(ctx, handleOnClose) => <ModalBody {...ctx} handleOnClose={handleOnClose} />}
    </ModalContextAware>
  );
});

type ModalBodyProps = ConfirmationModalContext['confirm'] & {
  handleOnClose: () => void;
};

export const ModalBody = (props: ModalBodyProps): React.JSX.Element => {
  const { handleOnClose, onConfirm, header, colorVariant, description, variant = 'outline', canCancel = false } = props;

  const handleConfirm = React.useCallback(() => {
    onConfirm();
    handleOnClose();
  }, [handleOnClose, onConfirm]);

  const ConfirmationButton = () => <Button onClick={handleConfirm}>Confirm</Button>;

  return (
    <ModalContent>
      <ModalHeader title={header} />
      {colorVariant ? <Alert description={description} variant={variant} colorVariant={colorVariant} /> : description}
      {canCancel ? (
        <ModalFooter>
          <Button label="Cancel" onClick={handleOnClose} variant="outline" colorVariant="white" />
          <ConfirmationButton />
        </ModalFooter>
      ) : (
        <ConfirmationButton />
      )}
    </ModalContent>
  );
};
