import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/root/Page.js';

export const Route = createFileRoute('/')({ component: HomepagePage });

function HomepagePage(): React.JSX.Element {
  return (
    <Page>
      <h2>Homepage</h2>
    </Page>
  );
}
