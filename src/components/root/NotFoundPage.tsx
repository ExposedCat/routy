import { Button } from '../general/Button.js';
import { Page } from './Page.js';
import { ErrorView } from './ErrorView.js';

export const NotFoundPage = () => {
  return (
    <Page>
      <ErrorView
        error={{ message: 'Uh-oh, page not found' }}
        actions={<Button variant="link" label="Go to Homepage" navigate={{ to: '/' }} />}
      />
    </Page>
  );
};
