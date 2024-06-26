import React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Flex } from '@styled-system/jsx/flex.mjs';
import { css } from '@styled-system/css/css.mjs';

import { PUBLIC_ROUTES } from '~/services/routing.js';
import { get_session } from '~/queries/session.js';
import { ProvideSession } from '~/providers/session.js';
import { ProvideIconStyles } from '~/icons/style-provider.js';
import { useMatchesRoutes } from '~/hooks/route.js';
import { useOnMobile } from '~/hooks/mobile.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { Toaster } from '~/components/shadow-panda/Toaster.js';
import { NotFoundPage } from '~/components/root/NotFoundPage.js';
import { Sidebar } from '~/components/general/sidebar/Sidebar.js';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFoundPage,
});

function Root(): React.JSX.Element {
  const matches = useMatchesRoutes();
  const onMobile = useOnMobile();

  const sessionQuery = useApiLoad({ apiCall: get_session });

  React.useEffect(() => {
    const refetch = () => sessionQuery.refetch();
    window.addEventListener('storage', refetch);
    return () => window.removeEventListener('storage', refetch);
  }, [sessionQuery]);

  const contentStyles = css({
    height: '100%',
    overflowY: 'hidden',
    flexDirection: {
      base: 'column',
      sm: 'row',
    },
  });

  return (
    <ProvideSession value={sessionQuery.data ?? null}>
      <ProvideIconStyles>
        <Flex justify="start" className={contentStyles}>
          {!matches(PUBLIC_ROUTES) && !onMobile && <Sidebar />}
          <Outlet />
        </Flex>
        <Toaster />
      </ProvideIconStyles>
    </ProvideSession>
  );
}
