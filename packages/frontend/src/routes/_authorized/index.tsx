import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/root/Page.js';

export const Route = createFileRoute('/_authorized/')({ component: HomepagePage });

function HomepagePage(): React.JSX.Element {
  return (
    <Page title="Dashboard">
      <h2>Homepage</h2>
    </Page>
  );
}
