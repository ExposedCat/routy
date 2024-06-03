import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getShortDateTime } from '@routy/routy-shared';
import type { Task, TaskStatus } from '@routy/routy-shared';

import { update_task_status } from '~/queries/update-task-status.js';
import { get_tasks } from '~/queries/tasks.js';
import { remove_task } from '~/queries/remove-task.js';
import { AddIcon, CloseIcon, DoneIcon, InProgressIcon, RemoveIcon, WaitingIcon } from '~/icons/react-icons.js';
import { useToast } from '~/hooks/use-toast.js';
import { ProvideMultiModalContext, useNewMultiModalContext, type ModalContext } from '~/hooks/modal.js';
import { useApiLoad } from '~/hooks/fetch/load.js';
import { useApiAction } from '~/hooks/fetch/action.js';
import { TableSkeleton } from '~/components/skeletons/Table.js';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuTrigger } from '~/components/shadow-panda/DropdownMenu.js';
import { QueryErrorHandler } from '~/components/root/QueryErrorHandler.js';
import { Page } from '~/components/root/Page.js';
import { AddTaskModel } from '~/components/modals/AddTaskModal.js';
import type { AddTaskModalContext } from '~/components/modals/AddTaskModal.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/general/table/Table.js';
import { ConfirmationModal, type ConfirmationModalContext } from '~/components/general/modal/ConfirmationModal.js';
import { Flex } from '~/components/general/Flex.js';
import { DropdownMenuContent, DropdownMenuItem } from '~/components/general/DropdownMenu.js';
import { Button } from '~/components/general/Button.js';

export const Route = createFileRoute('/_authorized/tasks')({ component: TasksPage });

type TasksModalContext = ConfirmationModalContext & AddTaskModalContext;

type TaskStatusButtonProps = {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
};

const TaskStatusButton: React.FC<TaskStatusButtonProps> = props => {
  const { status } = props;

  const handleSelect = React.useCallback(
    (event: React.MouseEvent, newStatus: TaskStatus) => {
      event.stopPropagation();
      props.onChange(newStatus);
    },
    [props],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          label={
            status === 'active' ? 'In progress' : status === 'closed' ? 'Closed' : status === 'open' ? 'Open' : 'Done'
          }
          colorVariant={
            status === 'active' ? 'active' : status === 'closed' ? 'error' : status === 'open' ? 'warning' : 'success'
          }
          icon={
            status === 'active'
              ? InProgressIcon
              : status === 'closed'
                ? CloseIcon
                : status === 'open'
                  ? WaitingIcon
                  : DoneIcon
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent maxHeight="container.smaller.sm" overflowY="auto">
        <DropdownMenuGroup>
          {status !== 'open' && (
            <DropdownMenuItem onClick={event => handleSelect(event, 'open')} label="Open" icon={WaitingIcon} />
          )}
          {status !== 'active' && (
            <DropdownMenuItem onClick={event => handleSelect(event, 'active')} label="Active" icon={InProgressIcon} />
          )}
          {status !== 'done' && (
            <DropdownMenuItem onClick={event => handleSelect(event, 'done')} label="Done" icon={DoneIcon} />
          )}
          {status !== 'closed' && (
            <DropdownMenuItem onClick={event => handleSelect(event, 'closed')} label="Closed" icon={CloseIcon} />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type TaskRowProps = {
  task: Task;
  onUpdate: () => void;
  modalContext: ModalContext<TasksModalContext>;
};

const TaskRow: React.FC<TaskRowProps> = props => {
  const { task, onUpdate, modalContext } = props;

  const { toast } = useToast();

  const removeQuery = useApiAction({
    apiCall: remove_task,
    onSuccess: onUpdate,
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

  const updateStatusQuery = useApiAction({
    apiCall: update_task_status,
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
    (status: TaskStatus) => updateStatusQuery.execute({ body: { id: task.id, status } }),
    [task.id, updateStatusQuery],
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
        <Flex full justify="end" gap="sm">
          <TaskStatusButton status={task.status} onChange={handleUpdateStatus} />
          <Button variant="outline" colorVariant="error" icon={RemoveIcon} onClick={handleRemove} />
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export function TasksPage(): React.JSX.Element {
  const query = useApiLoad({ apiCall: get_tasks });

  const { toast } = useToast();

  const modalContext = useNewMultiModalContext<TasksModalContext>();

  const handleUpdate = React.useCallback(() => {
    toast({ title: 'Task updated', colorVariant: 'success' });
    query.refetch();
  }, [query, toast]);

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
              <TableHead>{/* Buttons */}</TableHead>
            </TableHeader>
            <TableBody>
              {query.data.tasks.map(task => (
                <TaskRow key={task.id} task={task} onUpdate={handleUpdate} modalContext={modalContext} />
              ))}
            </TableBody>
          </Table>
        )}
        <QueryErrorHandler query={query} />
      </Page>
    </>
  );
}
