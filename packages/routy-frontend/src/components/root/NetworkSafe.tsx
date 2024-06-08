import React from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useNullableSession } from '~/providers/session.js';
import { LoginIcon, RefreshIcon } from '~/icons/react-icons.js';
import { useNetworkState } from '~/hooks/network.js';
import { Flex } from '../general/Flex.js';
import { Button } from '../general/Button.js';
import { ErrorView } from './ErrorView.js';

export const NetworkSafe: React.FC<React.PropsWithChildren> = props => {
  const navigate = useNavigate();
  const session = useNullableSession();
  const isOnline = useNetworkState();

  const errorMessage = React.useMemo(
    () =>
      isOnline
        ? !session
          ? 'Log In to view this page'
          : 'Uh-oh, something went horrbily wrong. Please try again later'
        : 'Uh-oh, connection is lost. Are you connected to the Internet?',
    [isOnline, session],
  );

  return isOnline && session ? (
    props.children
  ) : (
    <Flex direction="column" align="center" justify="center" gap="sm" full>
      <ErrorView
        error={{
          message: errorMessage,
        }}
      />
      <Button
        variant="outline"
        icon={isOnline && !session ? LoginIcon : RefreshIcon}
        label={isOnline && !session ? 'Log In' : 'Reload Page'}
        onClick={() => (isOnline && !session ? navigate({ to: '/login' }) : window.location.reload())}
      />
    </Flex>
  );
};
