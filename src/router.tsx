import React from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';

import { routeTree } from './route-tree.generated';

const router = createRouter({ routeTree, notFoundMode: 'root' });

export type Router = typeof router;

declare module '@tanstack/react-router' {
  interface Register {
    router: Router;
  }
}

export type NavigationProps<T extends string = ''> = LinkProps<Router, string, T, string, T>;

export type NavigationRouteId<T extends string = ''> = NavigationProps<T>['to'];

export const Router = (): React.JSX.Element => <RouterProvider router={router} />;
