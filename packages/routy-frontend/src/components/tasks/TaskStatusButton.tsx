import React from 'react';
import type { TaskStatus } from '@routy/routy-shared';

import { readableStatus, statusIcon } from '~/services/task.js';
import { InProgressIcon, CloseIcon, WaitingIcon, DoneIcon } from '~/icons/react-icons.js';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuTrigger } from '../shadow-panda/DropdownMenu.js';
import { DropdownMenuContent, DropdownMenuItem } from '../general/DropdownMenu.js';
import { Button } from '../general/Button.js';

export type TaskStatusButtonProps = {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
};

export const TaskStatusButton: React.FC<TaskStatusButtonProps> = props => {
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
          {(['open', 'active', 'done', 'closed'] as TaskStatus[]).map(
            newStatus =>
              newStatus !== status && (
                <DropdownMenuItem
                  key={newStatus}
                  onClick={event => handleSelect(event, newStatus)}
                  label={readableStatus(newStatus)}
                  icon={statusIcon(newStatus)}
                />
              ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
