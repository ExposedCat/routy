import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Page } from '~/components/root/Page.js';

export const Route = createFileRoute('/tasks')({ component: TasksPage });

export function TasksPage(): React.JSX.Element {
  // const session = useNullableSession();
  // const form = useForm(RequestBodySchema, { email: '', password: '' });

  // const query = useApiLoad({
  //   apiCall: login_query,
  //   onSuccess: data => {
  //     console.log('Data', data);
  //     sessionService.set(data.token);
  //   },
  //   onError: error => form.setError('email', { type: 'value', message: error.message }),
  // });

  // const handleSubmit = React.useCallback(
  //   (fields: LoginInput) => {
  //     query.execute({ body: fields });
  //   },
  //   [query],
  // );

  // if (session) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Page title="Tasks">
      <h1>Tasks</h1>
    </Page>
  );
}
