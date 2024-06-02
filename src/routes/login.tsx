import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/root/Page.js';

export const Route = createFileRoute('/login')({ component: LoginPage });

function LoginPage(): React.JSX.Element {
  return (
    <Page>
      <h2>Log In</h2>
    </Page>
  );
}
