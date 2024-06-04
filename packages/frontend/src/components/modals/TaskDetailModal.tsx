import React from 'react';
import type { Task, TaskPriority, TaskStatus } from '@routy/routy-shared';

import { RequestBodySchema, update_task } from '~/queries/update-task.js';
import type { UpdateTaskInput } from '~/queries/update-task.js';
import { useToast } from '~/hooks/use-toast.js';
import { useRequireMultiModalContext } from '~/hooks/modal.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { TaskStatusButton } from '../tasks/TaskStatusButton.js';
import { Textarea } from '../shadow-panda/Textarea.js';
import { ModalContextAware, ModalContent, ModalHeader } from '../general/modal/Modal.js';
import { Switch } from '../general/Switch.js';
import { Input } from '../general/Input.js';
import { Form, FormField, useForm } from '../general/Form.js';
import { Flex } from '../general/Flex.js';
import { DateTimePicker } from '../general/DateTimePicker.js';
import { Button } from '../general/Button.js';

export type TaskDetailModalContext = {
  detail: {
    task: Task;
    onUpdate?: () => void;
  };
};

export type TaskDetailModalProps = {
  onClose?: () => void;
};

export const TaskDetailModel = React.memo((props: TaskDetailModalProps): JSX.Element => {
  const { onClose } = props;
  const context = useRequireMultiModalContext<TaskDetailModalContext>();

  return (
    <ModalContextAware onClose={onClose} context={context} which="detail">
      {(ctx, handleOnClose) => <ModalBody handleOnClose={handleOnClose} context={ctx} />}
    </ModalContextAware>
  );
});

type ModalBodyProps = {
  context: TaskDetailModalContext['detail'];
  handleOnClose: () => void;
};

export const ModalBody = (props: ModalBodyProps): React.JSX.Element => {
  const { handleOnClose, context } = props;

  const { toast } = useToast();

  const form = useForm<UpdateTaskInput>(RequestBodySchema, {
    id: context.task.id,
    title: context.task.title,
    description: context.task.description,
    deadline: context.task.deadline,
    priority: context.task.priority,
  });

  const query = useApiAction({
    apiCall: update_task,
    onSuccess: () => {
      toast({
        title: 'Task updated',
        colorVariant: 'success',
      });
      context.onUpdate?.();
    },
    onError: error => {
      toast({
        title: 'Failed to update task',
        description: error?.cause?.detail ?? (error.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      });
    },
  });

  const updateQuery = useApiAction({
    apiCall: update_task,
    onSuccess: context.onUpdate,
    onError: error =>
      toast({
        title: 'Failed to update task status',
        description: error?.cause?.detail ?? (error?.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      }),
  });

  const handleSubmit = React.useCallback((data: UpdateTaskInput) => query.execute({ body: data }), [query]);

  const handleUpdateStatus = React.useCallback(
    (status: TaskStatus) => updateQuery.execute({ body: { id: context.task.id, status } }),
    [context.task.id, updateQuery],
  );

  return (
    <ModalContent>
      <ModalHeader
        title={context.task.title}
        actions={<TaskStatusButton status={context.task.status} onChange={handleUpdateStatus} />}
      />
      <Form
        errorToast
        form={form}
        submitLabel={query.isPending ? 'Updating...' : 'Update'}
        actions={
          <Button
            label={form.formState.isDirty ? 'Cancel' : 'Close'}
            type="button"
            variant="outline"
            colorVariant="white"
            onClick={handleOnClose}
          />
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
                value={field.value ?? 'normal'}
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
