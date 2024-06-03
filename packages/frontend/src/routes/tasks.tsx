import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getShortDateTime } from '@routy/routy-shared';
import type { Task } from '@routy/routy-shared';

import { AddIcon, RemoveIcon } from '~/icons/react-icons.js';
import { ProvideMultiModalContext, useNewMultiModalContext, type ModalContext } from '~/hooks/modal.js';
import { Page } from '~/components/root/Page.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/general/table/Table.js';
import { ConfirmationModal, type ConfirmationModalContext } from '~/components/general/modal/ConfirmationModal.js';
import { Flex } from '~/components/general/Flex.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/tasks')({ component: TasksPage });

type TaskRowProps = {
  task: Task;
  onRemove: () => void;
  confirmationContext: ModalContext<ConfirmationModalContext>;
  // modalContext: ModalContext<AppConfigurationTemplateModalContext>;
};

const TaskRow: React.FC<TaskRowProps> = props => {
  const { task, onRemove, confirmationContext } = props;

  // const removeQuery = useApiAction({
  //   apiCall: api_app_config_templates_$configTemplateId_remove,
  //   urlParams: { configTemplateId: template.id },
  //   _ported: true,
  //   onSuccess: () => onRemove(),
  //   onError: error => log.error({ error: error.cause }, error.message),
  // });

  const handleRemove = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      event.stopPropagation();
      confirmationContext.open('confirm', {
        header: 'Remove Task',
        description: `Are you sure you want to remove this task?`,
        onConfirm: () => onRemove(), //removeQuery.execute({ body: undefined }),
      });
    },
    [confirmationContext, onRemove],
  );

  const handleRowClick = React.useCallback(() => {
    // modalContext.open('info', { template });
  }, []);

  return (
    <TableRow key={task.id} onClick={handleRowClick}>
      <TableCell fontWeight="medium">{task.title}</TableCell>
      <TableCell>{getShortDateTime(task.deadline)}</TableCell>
      <TableCell minWidth="table.cell.min-width" fontWeight="medium">
        {task.description}
      </TableCell>
      <TableCell>
        <Flex full justify="end">
          <Button variant="outline" colorVariant="error" icon={RemoveIcon} onClick={handleRemove} />
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export function TasksPage(): React.JSX.Element {
  const confirmationContext = useNewMultiModalContext<ConfirmationModalContext>();

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Test',
      deadline: new Date(),
      description: 'This is an important task',
      priority: 'normal',
      status: 'open',
    },
    {
      id: '2',
      title: 'Test',
      deadline: new Date(),
      description: 'This is an important task',
      priority: 'normal',
      status: 'open',
    },
    {
      id: '3',
      title: 'Test',
      deadline: new Date(),
      description: 'This is an important task',
      priority: 'normal',
      status: 'open',
    },
    {
      id: '4',
      title: 'Test',
      deadline: new Date(),
      description: 'This is an important task',
      priority: 'normal',
      status: 'open',
    },
    {
      id: '5',
      title: 'Test',
      deadline: new Date(),
      description: 'This is an important task',
      priority: 'normal',
      status: 'open',
    },
  ];

  return (
    <>
      <ProvideMultiModalContext context={confirmationContext}>
        <ConfirmationModal />
      </ProvideMultiModalContext>
      <Page title="Tasks" actions={<Button label="Add Task" icon={AddIcon} />}>
        <Table empty={tasks.length === 0} entity="tasks">
          <TableHeader>
            <TableHead>Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>{/* Remove */}</TableHead>
          </TableHeader>
          <TableBody>
            {tasks.map(task => (
              <TaskRow key={task.id} task={task} onRemove={() => {}} confirmationContext={confirmationContext} />
            ))}
          </TableBody>
        </Table>
      </Page>
    </>
  );
}
