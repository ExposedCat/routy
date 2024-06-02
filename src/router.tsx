import React from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';

import { routeTree } from './route-tree.generated';

const router = createRouter({ routeTree, notFoundMode: 'root' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export type RouteTree = typeof routeTree;

export type NavigationProps<T extends string = ''> = LinkProps<RouteTree, string, T, string, T>;

export type NavigationRouteId<T extends string = ''> = NavigationProps<T>['to'];

export const Router = (): React.JSX.Element => <RouterProvider router={router} />;
