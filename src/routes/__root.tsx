import React from 'react';
import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import { Flex } from '@styled-system/jsx/flex.mjs';
import { css } from '@styled-system/css/css.mjs';

import { PUBLIC_ROUTES } from '~/services/routing.js';
import { session_query } from '~/queries/session.js';
import { ProvideSession } from '~/providers/session.js';
import { ProvideIconStyles } from '~/icons/style-provider.js';
import { useMatchesRoutes } from '~/hooks/route.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { Toaster } from '~/components/shadow-panda/Toaster.js';
import { NotFoundPage } from '~/components/root/NotFoundPage.js';
import { Sidebar } from '~/components/general/sidebar/Sidebar.js';

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFoundPage,
});

function Root(): React.JSX.Element {
  const navigate = useNavigate();
  const matches = useMatchesRoutes();

  const [onLogin, setOnLogin] = React.useState(false);

  const sessionQuery = useApiLoad({ apiCall: session_query });

  React.useEffect(() => {
    const refetch = () => sessionQuery.refetch();
    window.addEventListener('storage', refetch);
    return () => window.removeEventListener('storage', refetch);
  }, [sessionQuery]);

  React.useEffect(() => {
    if (!matches(PUBLIC_ROUTES, true) && sessionQuery.hasData && sessionQuery.data === null) {
      // TODO:
      // void navigate({
      //   to: '/login',
      //   search: { origin: 'normal' },
      // });
    } else {
      setOnLogin(matches(PUBLIC_ROUTES, true));
    }
  }, [matches, navigate, sessionQuery.data, sessionQuery.hasData]);

  const contentStyles = css({
    height: '100%',
    overflowY: 'hidden',
  });

  return (
    <ProvideSession value={sessionQuery.data?.session ?? null}>
      <ProvideIconStyles>
        <Flex direction="horizontal" justify="start" align="full" className={contentStyles}>
          {!onLogin && sessionQuery.data && <Sidebar />}
          {(onLogin || (sessionQuery.hasData && sessionQuery.data !== null)) && <Outlet />}
        </Flex>
        <Toaster />
      </ProvideIconStyles>
    </ProvideSession>
  );
}
