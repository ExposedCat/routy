import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authorized')({
  component: AuthorizedRouteWrapper,
});

function AuthorizedRouteWrapper() {
  return <Outlet />;
}
