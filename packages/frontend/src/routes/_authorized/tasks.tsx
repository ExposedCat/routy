import { z } from 'zod';
import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getShortDateTime } from '@routy/routy-shared';
import type { Task, TaskStatus } from '@routy/routy-shared';

import { update_task } from '~/queries/update-task.js';
import { get_tasks } from '~/queries/tasks.js';
import { remove_task } from '~/queries/remove-task.js';
import { get_dashboard } from '~/queries/get-dashboard.js';
import { AddIcon, RemoveIcon } from '~/icons/react-icons.js';
import { useToast } from '~/hooks/use-toast.js';
import { useUpdateSearchParams } from '~/hooks/route.js';
import { ProvideMultiModalContext, useNewMultiModalContext, type ModalContext } from '~/hooks/modal.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { TaskStatusButton } from '~/components/tasks/TaskStatusButton.js';
import { TableSkeleton } from '~/components/skeletons/Table.js';
import { QueryErrorHandler } from '~/components/root/QueryErrorHandler.js';
import { Page } from '~/components/root/Page.js';
import { TaskDetailModel, type TaskDetailModalContext } from '~/components/modals/TaskDetailModal.js';
import { AddTaskModel } from '~/components/modals/AddTaskModal.js';
import type { AddTaskModalContext } from '~/components/modals/AddTaskModal.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/general/table/Table.js';
import { ConfirmationModal, type ConfirmationModalContext } from '~/components/general/modal/ConfirmationModal.js';
import { Flex } from '~/components/general/Flex.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/_authorized/tasks')({
  component: TasksPage,
  validateSearch: z.object({
    view: z.enum(['table', 'add']).optional(),
    taskId: z.string().optional(),
  }),
});

type TasksModalContext = ConfirmationModalContext & AddTaskModalContext & TaskDetailModalContext;

type TaskRowProps = {
  task: Task;
  onRemove: () => void;
  onUpdate: () => void;
  modalContext: ModalContext<TasksModalContext>;
};

const TaskRow: React.FC<TaskRowProps> = props => {
  const { task, onUpdate, onRemove, modalContext } = props;

  const { toast } = useToast();
  const updateSearch = useUpdateSearchParams<typeof Route.id>();

  const removeQuery = useApiAction({
    apiCall: remove_task,
    onSuccess: onRemove,
    onError: error =>
      toast({
        title: 'Failed to remove task',
        description: error?.cause?.detail ?? (error?.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      }),
  });

  const handleRemove = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      event.stopPropagation();
      modalContext.open('confirm', {
        header: 'Remove Task',
        description: `Are you sure you want to remove this task?`,
        onConfirm: () => removeQuery.execute({ body: { id: task.id } }),
      });
    },
    [modalContext, removeQuery, task.id],
  );

  const updateQuery = useApiAction({
    apiCall: update_task,
    onSuccess: onUpdate,
    onError: error =>
      toast({
        title: 'Failed to update task status',
        description: error?.cause?.detail ?? (error?.message || 'Unknown error'),
        colorVariant: 'error',
        duration: 'long',
      }),
  });

  const handleUpdateStatus = React.useCallback(
    (status: TaskStatus) => updateQuery.execute({ body: { id: task.id, status } }),
    [task, updateQuery],
  );

  const handleRowClick = React.useCallback(() => {
    void updateSearch({ taskId: task.id });
  }, [task.id, updateSearch]);

  return (
    <TableRow key={task.id} onClick={handleRowClick}>
      <TableCell fontWeight="medium">{task.title}</TableCell>
      <TableCell>{getShortDateTime(task.deadline)}</TableCell>
      <TableCell hideBelow="sm" minWidth="table.cell.min-width" fontWeight="medium">
        {task.description}
      </TableCell>
      <TableCell>
        <Flex full justify="end" gap="sm">
          <TaskStatusButton status={task.status} onChange={handleUpdateStatus} />
          <Button variant="outline" colorVariant="error" icon={RemoveIcon} onClick={handleRemove} />
        </Flex>
      </TableCell>
    </TableRow>
  );
};

function TasksPage(): React.JSX.Element {
  const { taskId, view } = Route.useSearch();
  const updateSearch = useUpdateSearchParams<typeof Route.id>();

  const { toast } = useToast();
  const modalContext = useNewMultiModalContext<TasksModalContext>();

  const query = useApiLoad({ apiCall: get_tasks });
  const dashboardQuery = useApiLoad({ apiCall: get_dashboard, fetchImmediately: false });

  const handleUpdate = React.useCallback(() => {
    query.refetch();
    dashboardQuery.refetch();
  }, [dashboardQuery, query]);

  const handleRemove = React.useCallback(() => {
    toast({
      title: 'Task removed',
      colorVariant: 'success',
    });
    query.refetch();
  }, [query, toast]);

  React.useEffect(() => {
    if (query.hasData && taskId) {
      const selectedTask = query.data.tasks.find(task => task.id === taskId);
      if (selectedTask) {
        modalContext.open('detail', {
          task: selectedTask,
          onUpdate: handleUpdate,
        });
      } else {
        modalContext.close('detail');
      }
    } else {
      modalContext.close('detail');
    }
  }, [handleUpdate, modalContext, query.data?.tasks, query.hasData, taskId, updateSearch]);

  React.useEffect(() => {
    if (view === 'table') {
      modalContext.close('add');
    } else if (view === 'add') {
      modalContext.open('add', {
        onSuccess: query.refetch,
      });
    }
  }, [modalContext, query.refetch, view]);

  return (
    <>
      <ProvideMultiModalContext context={modalContext}>
        <AddTaskModel onClose={() => updateSearch({ view: 'table' })} />
        <ConfirmationModal />
        <TaskDetailModel onClose={() => updateSearch({ taskId: undefined })} />
      </ProvideMultiModalContext>
      <Page
        title="Tasks"
        actions={<Button label="Add Task" icon={AddIcon} onClick={() => updateSearch({ view: 'add' })} />}
        networkSafe
      >
        {!query.finished && <TableSkeleton />}
        {query.hasData && (
          <Table empty={query.data.tasks.length === 0} entity="tasks">
            <TableHeader>
              <TableHead>Title</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead hideBelow="sm">Description</TableHead>
              <TableHead>{/* Buttons */}</TableHead>
            </TableHeader>
            <TableBody>
              {query.data.tasks.map(task => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                  modalContext={modalContext}
                />
              ))}
            </TableBody>
          </Table>
        )}
        <QueryErrorHandler query={query} />
      </Page>
    </>
  );
}
