import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getShortDateTime } from '@routy/routy-shared';
import type { Task } from '@routy/routy-shared';

import { get_tasks } from '~/queries/tasks.js';
import { AddIcon, RemoveIcon } from '~/icons/react-icons.js';
import { ProvideMultiModalContext, useNewMultiModalContext, type ModalContext } from '~/hooks/modal.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { TableSkeleton } from '~/components/skeletons/Table.js';
import { QueryErrorHandler } from '~/components/root/QueryErrorHandler.js';
import { Page } from '~/components/root/Page.js';
import { AddTaskModel } from '~/components/modals/AddTaskModal.js';
import type { AddTaskModalContext } from '~/components/modals/AddTaskModal.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/general/table/Table.js';
import { ConfirmationModal, type ConfirmationModalContext } from '~/components/general/modal/ConfirmationModal.js';
import { Flex } from '~/components/general/Flex.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/_authorized/tasks')({ component: TasksPage });

type TasksModalContext = ConfirmationModalContext & AddTaskModalContext;

type TaskRowProps = {
  task: Task;
  onRemove: () => void;
  modalContext: ModalContext<TasksModalContext>;
};

const TaskRow: React.FC<TaskRowProps> = props => {
  const { task, onRemove, modalContext } = props;

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
      modalContext.open('confirm', {
        header: 'Remove Task',
        description: `Are you sure you want to remove this task?`,
        onConfirm: () => onRemove(), //removeQuery.execute({ body: undefined }),
      });
    },
    [modalContext, onRemove],
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
  const query = useApiLoad({ apiCall: get_tasks });

  const modalContext = useNewMultiModalContext<TasksModalContext>();

  return (
    <>
      <ProvideMultiModalContext context={modalContext}>
        <AddTaskModel />
        <ConfirmationModal />
      </ProvideMultiModalContext>
      <Page
        title="Tasks"
        actions={
          <Button
            label="Add Task"
            icon={AddIcon}
            onClick={() =>
              modalContext.open('add', {
                onSuccess: query.refetch,
              })
            }
          />
        }
      >
        {!query.finished && <TableSkeleton />}
        {query.hasData && (
          <Table empty={query.data.tasks.length === 0} entity="tasks">
            <TableHeader>
              <TableHead>Title</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>{/* Remove */}</TableHead>
            </TableHeader>
            <TableBody>
              {query.data.tasks.map(task => (
                <TaskRow key={task.id} task={task} onRemove={query.refetch} modalContext={modalContext} />
              ))}
            </TableBody>
          </Table>
        )}
        <QueryErrorHandler query={query} />
      </Page>
    </>
  );
}
