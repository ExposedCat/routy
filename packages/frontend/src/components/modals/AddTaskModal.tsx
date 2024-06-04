import React from 'react';
import type { TaskPriority } from '@routy/routy-shared';

import { add_task, RequestBodySchema } from '~/queries/add-task.js';
import type { AddTaskInput } from '~/queries/add-task.js';
import { useToast } from '~/hooks/use-toast.js';
import { useRequireMultiModalContext } from '~/hooks/modal.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { Textarea } from '../shadow-panda/Textarea.js';
import { ModalContextAware, ModalContent, ModalHeader } from '../general/modal/Modal.js';
import { Switch } from '../general/Switch.js';
import { Input } from '../general/Input.js';
import { Form, FormField, useForm } from '../general/Form.js';
import { Flex } from '../general/Flex.js';
import { DateTimePicker } from '../general/DateTimePicker.js';
import { Button } from '../general/Button.js';

export type AddTaskModalContext = {
  add: {
    onSuccess?: () => void;
  };
};

export const AddTaskModel = React.memo((): JSX.Element => {
  const context = useRequireMultiModalContext<AddTaskModalContext>();

  return (
    <ModalContextAware context={context} which="add">
      {(ctx, handleOnClose) => <ModalBody handleOnClose={handleOnClose} context={ctx} />}
    </ModalContextAware>
  );
});

type ModalBodyProps = {
  context: AddTaskModalContext['add'];
  handleOnClose: () => void;
};

export const ModalBody = (props: ModalBodyProps): React.JSX.Element => {
  const { handleOnClose, context } = props;

  const { toast } = useToast();

  const form = useForm<AddTaskInput>(RequestBodySchema, {
    title: '',
    description: undefined,
    deadline: undefined,
    priority: 'normal',
  });

  const query = useApiAction({
    apiCall: add_task,
    onSuccess: () => {
      toast({
        title: 'Task created',
        colorVariant: 'success',
        duration: 'long',
      });
      context.onSuccess?.();
      handleOnClose();
    },
    onError: error => {
      toast({
        title: 'Failed to create task',
        description: error?.cause?.detail ?? (error.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      });
    },
  });

  const handleSubmit = React.useCallback(
    (data: AddTaskInput) => {
      console.log(data);
      query.execute({ body: data });
    },
    [query],
  );

  return (
    <ModalContent>
      <ModalHeader title="New Task" />
      <Form
        errorToast={true}
        form={form}
        submitLabel={query.isPending ? 'Creating...' : 'Create'}
        actions={
          <Button type="button" variant="outline" colorVariant="white" onClick={handleOnClose}>
            Cancel
          </Button>
        }
        onSubmit={handleSubmit}
        disabled={() => !form.formState.isDirty || query.isPending}
      >
        <FormField
          form={form}
          name="title"
          label="Title"
          render={field => <Input placeholder="Enter Title" {...field} />}
        />
        <Flex gap="sm">
          <FormField
            form={form}
            name="deadline"
            label="Deadline"
            render={field => <DateTimePicker date={field.value} setDate={field.onChange} />}
          />
          <FormField
            form={form}
            name="priority"
            label="Priority"
            render={field => (
              <Switch<TaskPriority>
                value={field.value}
                items={[
                  { label: 'Low', value: 'low' },
                  { label: 'Normal', value: 'normal' },
                  { label: 'High', value: 'high' },
                  { label: 'Urgent', value: 'urgent' },
                ]}
                onChange={field.onChange}
              />
            )}
          />
        </Flex>
        <FormField
          form={form}
          name="description"
          label="Description"
          render={field => <Textarea placeholder="Enter Description" {...field} />}
        />
      </Form>
    </ModalContent>
  );
};
