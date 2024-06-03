import React from 'react';
import { useNavigate, useParams, useRouterState } from '@tanstack/react-router';

import type { NavigationRouteId, NavigationProps } from '../router.tsx';

export { useNavigate } from '@tanstack/react-router';

export function useMatchesRoutes() {
  const pathname = useRouterState({ select: state => state.location.pathname });

  const currentSegments = React.useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

  return React.useCallback(
    <T extends string = ''>(routeIds: NavigationRouteId<T> | NavigationRouteId<T>[], exact = false): boolean => {
      const list = Array.isArray(routeIds) ? routeIds : [routeIds];
      for (const routeId of list) {
        const routeSegments = routeId?.split('/').filter(Boolean) ?? [];
        if (
          (routeSegments.length !== currentSegments.length && exact) ||
          routeSegments.length > currentSegments.length
        ) {
          continue;
        }

        let match = true;
        for (let i = 0; i < currentSegments.length; ++i) {
          if (
            typeof routeSegments[i] !== 'undefined' &&
            routeSegments[i][0] !== '$' &&
            routeSegments[i] !== currentSegments[i]
          ) {
            match = false;
            break;
          }
        }
        if (match) {
          return true;
        }
      }
      return false;
    },
    [currentSegments],
  );
}

export function useUpdateSearchParams<T extends string = ''>() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });

  return React.useCallback(
    (newParams: Partial<NavigationProps<T>['search']>) =>
      navigate({
        params,
        search: prev => ({
          ...prev,
          ...newParams,
        }),
      }),
    [navigate, params],
  );
}
