import React from 'react';
import { Outlet, createFileRoute } from '@tanstack/react-router';

import { get_tasks } from '~/queries/tasks.js';
import { ProvideTasks } from '~/providers/tasks.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { PageLoader } from '~/components/root/PageLoader.js';

export const Route = createFileRoute('/_authorized')({
  component: AuthorizedRouteWrapper,
});

function AuthorizedRouteWrapper() {
  const query = useApiLoad({ apiCall: get_tasks });

  return (
    <PageLoader query={query}>
      {query.hasData && (
        <ProvideTasks value={query.data.tasks}>
          <Outlet />
        </ProvideTasks>
      )}
    </PageLoader>
  );
}
