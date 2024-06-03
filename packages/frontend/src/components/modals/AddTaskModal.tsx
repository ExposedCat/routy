import { z } from 'zod';
import React from 'react';

import { add_task } from '~/queries/add-task.js';
import { useToast } from '~/hooks/use-toast.js';
import { useRequireMultiModalContext } from '~/hooks/modal.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { Textarea } from '../shadow-panda/Textarea.js';
import { ModalContextAware, ModalContent, ModalHeader } from '../general/modal/Modal.js';
import { Input } from '../general/Input.js';
import { Form, FormField, useForm } from '../general/Form.js';
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

const FormFieldsSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  // TODO:
});
type FormFields = z.infer<typeof FormFieldsSchema>;

export const ModalBody = (props: ModalBodyProps): React.JSX.Element => {
  const { handleOnClose, context } = props;

  const { toast } = useToast();

  const form = useForm<FormFields>(FormFieldsSchema, {
    title: '',
    description: '',
  });

  const query = useApiAction({
    apiCall: add_task,
    onSuccess: () => {
      toast({
        title: 'Task created',
        colorVariant: 'success',
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
    (data: FormFields) => {
      query.execute({
        body: {
          ...data,
          description: data.description || undefined,
        },
      });
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
