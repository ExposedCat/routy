import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { UpdateUserInputSchema } from '@routy/routy-shared';
import type { UpdateUserInput } from '@routy/routy-shared';

import { update_user } from '~/queries/update-user.js';
import { useSession } from '~/providers/session.js';
import { useToast } from '~/hooks/use-toast.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { Page } from '~/components/root/Page.js';
import { Input } from '~/components/general/Input.js';
import { Form, FormField, useForm } from '~/components/general/Form.js';
import { Card } from '~/components/general/Card.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/_authorized/settings')({ component: SettingsPage });

const ChangePasswordCard: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<UpdateUserInput>(UpdateUserInputSchema, {
    currentPassword: '',
    password: '',
  });

  const query = useApiAction({
    apiCall: update_user,
    onSuccess: () => {
      toast({
        title: 'Password changed',
        colorVariant: 'success',
      });
    },
    onError: error => {
      toast({
        title: 'Failed to change password',
        description: error?.cause?.detail ?? (error.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      });
    },
  });

  const handleSubmit = React.useCallback((data: UpdateUserInput) => query.execute({ body: data }), [query]);

  return (
    <Card title="Change Password" fullWidth>
      <Form
        errorToast
        form={form}
        submitLabel={query.isPending ? 'Changing...' : 'Change'}
        actions={
          <Button
            type="button"
            variant="outline"
            colorVariant="white"
            onClick={() => form.reset()}
            label="Discard"
            disabled={!form.formState.isDirty}
          />
        }
        onSubmit={handleSubmit}
        disabled={() => !form.formState.isDirty || query.isPending}
      >
        <FormField
          form={form}
          name="currentPassword"
          label="Current Password"
          render={field => (
            <Input autoComplete="current-password" type="password" placeholder="Enter Current Password" {...field} />
          )}
        />
        <FormField
          form={form}
          name="password"
          label="New Password"
          render={field => (
            <Input autoComplete="new-password" type="password" placeholder="Enter New Password" {...field} />
          )}
        />
      </Form>
    </Card>
  );
};

const UpdateDetailsCard: React.FC = () => {
  const session = useSession();
  const { toast } = useToast();

  const form = useForm<UpdateUserInput>(UpdateUserInputSchema, {
    name: session.name,
    email: session.email,
  });

  const query = useApiAction({
    apiCall: update_user,
    onSuccess: () => {
      toast({
        title: 'Details updated',
        colorVariant: 'success',
      });
    },
    onError: error => {
      toast({
        title: 'Failed to update details',
        description: error?.cause?.detail ?? (error.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      });
    },
  });

  const handleSubmit = React.useCallback((data: UpdateUserInput) => query.execute({ body: data }), [query]);

  return (
    <Card title="Personal Details" fullWidth>
      <Form
        errorToast={true}
        form={form}
        submitLabel={query.isPending ? 'Saving...' : 'Save'}
        actions={
          <Button
            type="button"
            variant="outline"
            colorVariant="white"
            onClick={() => form.reset()}
            label="Discard"
            disabled={!form.formState.isDirty}
          />
        }
        onSubmit={handleSubmit}
        disabled={() => !form.formState.isDirty || query.isPending}
      >
        <FormField
          form={form}
          name="name"
          label="Name"
          render={field => <Input placeholder="Enter Name" {...field} />}
        />
        <FormField
          form={form}
          name="email"
          label="Email"
          render={field => <Input type="email" placeholder="Enter Email" {...field} />}
        />
      </Form>
    </Card>
  );
};

export function SettingsPage(): React.JSX.Element {
  return (
    <Page title="Settings">
      <UpdateDetailsCard />
      <ChangePasswordCard />
    </Page>
  );
}
