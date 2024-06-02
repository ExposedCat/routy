import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/root/Page.js';

export const Route = createFileRoute('/signup')({ component: SignupPage });

function SignupPage(): React.JSX.Element {
  return (
    <Page>
      <h2>Sign Up</h2>
    </Page>
  );
}
