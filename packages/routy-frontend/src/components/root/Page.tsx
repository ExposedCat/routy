import React from 'react';
import { Flex } from '@styled-system/jsx/flex.mjs';
import { css } from '@styled-system/css/css.mjs';

import type { NavigationProps } from '~/router.js';
import { useNullableSession } from '~/providers/session.js';
import { BackIcon } from '~/icons/react-icons.js';
import { useNetworkState } from '~/hooks/network.js';
import { useOnMobile } from '~/hooks/mobile.js';
import { Wrap } from '../shadow-panda/Wrap.js';
import { Sidebar } from '../general/sidebar/Sidebar.js';
import { PageTitle } from '../general/Text.js';
import type { FlexProps } from '../general/Flex.js';
import { RedirectButton } from '../general/Button.js';
import { NetworkSafe } from './NetworkSafe.js';

export type PageProps<T extends string = ''> = FlexProps &
  React.PropsWithChildren<{
    title?: React.ReactNode;
    actions?: React.ReactNode;
    backTo?: NavigationProps<T>;
    networkSafe?: boolean;
  }>;

export const Page = <T extends string = ''>(props: PageProps<T>): React.JSX.Element => {
  const { title, actions, children, backTo, networkSafe = false, ...rest } = props;
  const session = useNullableSession();
  const isOnline = useNetworkState();
  const onMobile = useOnMobile();

  const pageStyles = css({
    overflowY: 'auto',
    padding: 'sm',
    gap: 'sm',
    width: 'full',
  });

  const content = React.useMemo(
    () => (
      <Flex
        justify="start"
        align="start"
        flexDirection="column"
        width="full"
        gap="sm"
        maxWidth="container.xl"
        position="relative"
        {...rest}
      >
        {children}
      </Flex>
    ),
    [children, rest],
  );

  return (
    <Flex justify="start" align="center" flexDirection="column" className={pageStyles}>
      {(title || actions || onMobile) && (
        <Wrap justify={!title && actions ? 'end' : 'space-between'} align="center" width="full" maxWidth="container.xl">
          {(title || backTo) && (
            <Flex align="center" gap="xs">
              {backTo && <RedirectButton navigate={backTo} variant="ghost" colorVariant="white" icon={BackIcon} />}
              {title && (typeof title === 'string' ? <PageTitle text={title} /> : title)}
            </Flex>
          )}
          <Flex gap="sm" align="center">
            {session && isOnline && actions}
            {onMobile && <Sidebar />}
          </Flex>
        </Wrap>
      )}
      {networkSafe ? <NetworkSafe>{content}</NetworkSafe> : content}
    </Flex>
  );
};
