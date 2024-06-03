import React from 'react';
import { createFileRoute, Navigate } from '@tanstack/react-router';

import { Flex } from '~/styled-system/jsx/flex.mjs';
import { sessionService } from '~/services/session.js';
import { RequestBodySchema, login_query } from '~/queries/login.js';
import type { LoginInput } from '~/queries/login.js';
import { useNullableSession } from '~/providers/session.js';
import { LoginIcon } from '~/icons/react-icons.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { PublicPage } from '~/components/root/PublicPage.js';
import { Label, Header } from '~/components/general/Text.js';
import { PasswordInput } from '~/components/general/PasswordInput.js';
import { Input } from '~/components/general/Input.js';
import { Form, FormField, useForm } from '~/components/general/Form.js';
import { RedirectButton } from '~/components/general/Button.js';

export const Route = createFileRoute('/login')({ component: LoginPage });

export function LoginPage(): React.JSX.Element {
  const session = useNullableSession();
  const form = useForm(RequestBodySchema, { email: '', password: '' });

  const query = useApiAction({
    apiCall: login_query,
    onSuccess: data => {
      console.log('Data', data);
      sessionService.set(data.token);
    },
    onError: error => form.setError('email', { type: 'value', message: error.message }),
  });

  const handleSubmit = React.useCallback(
    (fields: LoginInput) => {
      query.execute({ body: fields });
    },
    [query],
  );

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <PublicPage>
      <Flex direction="column" gap="sm" width="container.xs" maxWidth="full" maxHeight="full">
        <Flex direction="column">
          <Header text="Routy" />
          <Label text="Please enter your credentials" />
        </Flex>
        <Form
          form={form}
          submitLabel={query.isPending ? 'Loading...' : 'Log In'}
          submitActionFull
          submitIcon={LoginIcon}
          onSubmit={handleSubmit}
          disabled={values => !values.email || !values.password || query.isPending}
        >
          <FormField
            form={form}
            name="email"
            label="Email"
            render={field => <Input type="email" placeholder="Email" {...field} />}
          />
          <FormField
            form={form}
            name="password"
            label="Password"
            render={field => <PasswordInput placeholder="Password" variant="new" {...field} />}
          />
        </Form>
        <Flex gap="xxs" direction="column" align="center">
          <RedirectButton variant="link" label="No account? Sign Up here." navigate={{ to: '/signup' }} />
          {/* <Button variant="link" label="Forgot Password?" navigate={{ to: '/reset-password' }} /> */}
        </Flex>
      </Flex>
    </PublicPage>
  );
}
